#!/usr/bin/env node
/**
 * Internal and external link check.
 *
 * Routes are derived from `content/` so the check fails when a page links to a
 * path that does not exist, when a fragment does not match a heading, or when
 * `meta.json` lists a page that has no file.
 *
 * Pass `--external` to also request every external URL. That mode needs
 * network access, so it is opt-in and not part of `npm run verify`.
 */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const contentRoot = path.join(root, 'content');
const checkExternal = process.argv.includes('--external');

const failures = [];
const warnings = [];
const routes = new Map(); // route -> Set of anchors

function fail(message) {
  failures.push(message);
}

function slugify(heading) {
  return heading
    .toLowerCase()
    .replace(/`/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function routeForFile(file) {
  const rel = path.relative(contentRoot, file).replace(/\\/g, '/');
  const [product, ...rest] = rel.split('/');
  const slug = rest.join('/').replace(/\.mdx$/, '');
  const base = `/${product}/docs`;
  if (slug === 'index') return base;
  return `${base}/${slug.replace(/\/index$/, '')}`;
}

function collectAnchors(source) {
  const anchors = new Set();
  const seen = new Map();
  let inFence = false;

  for (const line of source.split('\n')) {
    if (line.trimStart().startsWith('```')) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,6})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    const base = slugify(match[2]);
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    anchors.add(count === 0 ? base : `${base}-${count}`);
  }

  return anchors;
}

function parseFrontmatter(source) {
  if (!source.startsWith('---')) return {};
  const end = source.indexOf('\n---', 3);
  if (end === -1) return {};
  const block = source.slice(3, end);
  const data = {};
  let currentKey = null;

  for (const line of block.split('\n')) {
    const listItem = /^\s+-\s+(.+)$/.exec(line);
    if (listItem && currentKey) {
      data[currentKey] = Array.isArray(data[currentKey])
        ? [...data[currentKey], listItem[1].trim()]
        : [listItem[1].trim()];
      continue;
    }
    const pair = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (pair) {
      currentKey = pair[1];
      const value = pair[2].trim();
      data[currentKey] = value === '' ? [] : value.replace(/^['"]|['"]$/g, '');
    }
  }

  return data;
}

const files = await walk(contentRoot);
const pages = new Map(); // file -> { route, anchors, frontmatter, source }

for (const file of files.filter((name) => name.endsWith('.mdx'))) {
  const source = await readFile(file, 'utf8');
  const route = routeForFile(file);
  if (routes.has(route)) fail(`Duplicate route ${route} (${path.relative(root, file)})`);
  routes.set(route, collectAnchors(source));
  pages.set(file, { route, frontmatter: parseFrontmatter(source), source });
}

for (const route of ['/', '/numiq', '/numviz']) routes.set(route, new Set());

// meta.json entries must resolve to a page or a directory of pages.
for (const file of files.filter((name) => name.endsWith('meta.json'))) {
  const dir = path.dirname(file);
  const meta = JSON.parse(await readFile(file, 'utf8'));
  for (const entry of meta.pages ?? []) {
    if (entry.startsWith('...')) continue;
    if (entry.startsWith('---')) continue;
    const asFile = path.join(dir, `${entry}.mdx`);
    const asDir = path.join(dir, entry);
    if (!existsSync(asFile) && !existsSync(asDir)) {
      fail(`meta.json references missing page "${entry}" in ${path.relative(root, file)}`);
    }
  }
}

const internalLinkPattern = /\]\((\/[^)\s]*)\)/g;
const hrefPattern = /href=["'](\/[^"']*)["']/g;
const externalPattern = /\]\((https?:\/\/[^)\s]+)\)/g;
const externalHrefPattern = /href=["'](https?:\/\/[^"']*)["']/g;

const checked = new Set();
const externalLinks = new Map();

function checkInternal(target, origin) {
  const key = `${origin} -> ${target}`;
  if (checked.has(key)) return;
  checked.add(key);

  const [pathname, fragment] = target.split('#');
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname;

  if (!routes.has(normalized)) {
    fail(`Broken internal link ${target} in ${origin}`);
    return;
  }

  if (fragment) {
    const anchors = routes.get(normalized);
    if (anchors && anchors.size > 0 && !anchors.has(fragment)) {
      fail(`Missing anchor #${fragment} for ${target} in ${origin}`);
    }
  }
}

for (const [file, page] of pages) {
  const origin = path.relative(root, file);

  for (const match of page.source.matchAll(internalLinkPattern)) checkInternal(match[1], origin);
  for (const match of page.source.matchAll(hrefPattern)) checkInternal(match[1], origin);
  for (const target of page.frontmatter.related ?? []) checkInternal(target, `${origin} (related)`);

  for (const pattern of [externalPattern, externalHrefPattern]) {
    for (const match of page.source.matchAll(pattern)) {
      externalLinks.set(match[1], origin);
    }
  }
}

// Navigation and footer links live in components, not content.
const componentFiles = await walk(path.join(root, 'components'));
for (const file of componentFiles.filter((name) => name.endsWith('.tsx'))) {
  const source = await readFile(file, 'utf8');
  const origin = path.relative(root, file);
  for (const match of source.matchAll(hrefPattern)) checkInternal(match[1], origin);
  for (const match of source.matchAll(externalHrefPattern)) externalLinks.set(match[1], origin);
}

// Package and repository URLs are declared in lib/.
const libFiles = await walk(path.join(root, 'lib'));
for (const file of libFiles.filter((name) => name.endsWith('.ts'))) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(/'https:\/\/[^']+'/g)) {
    const url = match[0].slice(1, -1);
    if (!url.includes('localhost')) externalLinks.set(url, path.relative(root, file));
  }
}

if (checkExternal) {
  const urls = [...externalLinks.keys()];
  await Promise.all(
    urls.map(async (url) => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          redirect: 'follow',
          headers: { 'user-agent': 'mynum-link-check' },
          signal: AbortSignal.timeout(15000),
        });
        if (response.status >= 400) {
          warnings.push(
            `External link ${url} returned ${response.status} (${externalLinks.get(url)})`,
          );
        }
      } catch (error) {
        warnings.push(`External link ${url} failed: ${error.message} (${externalLinks.get(url)})`);
      }
    }),
  );
}

for (const warning of warnings) console.warn(`warning: ${warning}`);

if (failures.length > 0) {
  for (const failure of failures) console.error(`error: ${failure}`);
  console.error(`\n${failures.length} broken link(s) found.`);
  process.exit(1);
}

console.log(
  `Checked ${checked.size} internal links across ${pages.size} pages and ${externalLinks.size} external URLs.`,
);
