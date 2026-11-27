#!/usr/bin/env node
/**
 * Documentation accuracy check.
 *
 * Verifies, against the installed packages:
 *   1. every named import used in a code example exists (runtime or type declaration)
 *   2. documented versions in lib/products.ts match the installed versions
 *   3. installation commands use the published package names
 *   4. documented Numviz error codes exist in the package
 *
 * The check reads only the packages installed in node_modules, so run
 * `npm install` first.
 */
import { readdir, readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const root = process.cwd();
const require = createRequire(import.meta.url);
const failures = [];
const warnings = [];

function fail(message) {
  failures.push(message);
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

const packageDirs = {
  '@munachi-me/numiq': path.dirname(require.resolve('@munachi-me/numiq/package.json')),
  '@munachi-me/numviz': path.dirname(require.resolve('@munachi-me/numviz/package.json')),
};

const packageJson = {};
const declarations = {};

for (const [name, dir] of Object.entries(packageDirs)) {
  packageJson[name] = JSON.parse(await readFile(path.join(dir, 'package.json'), 'utf8'));
  const dts = (await walk(dir)).filter((file) => file.endsWith('.d.ts'));
  declarations[name] = (await Promise.all(dts.map((file) => readFile(file, 'utf8')))).join('\n');
}

const runtime = {
  '@munachi-me/numiq': await import('@munachi-me/numiq'),
  '@munachi-me/numviz': await import('@munachi-me/numviz'),
};

function declaredType(pkg, name) {
  const source = declarations[pkg];
  const patterns = [
    new RegExp(
      `export\\s+(?:declare\\s+)?(?:interface|type|class|enum|function|const|let|var)\\s+${name}\\b`,
    ),
    new RegExp(`export\\s*\\{[^}]*\\b${name}\\b[^}]*\\}`),
  ];
  return patterns.some((pattern) => pattern.test(source));
}

const files = (await walk(path.join(root, 'content'))).filter((file) => file.endsWith('.mdx'));
const codeBlocks = [];

for (const file of files) {
  const source = await readFile(file, 'utf8');
  const origin = path.relative(root, file);
  const fence = /```([^\n]*)\n([\s\S]*?)```/g;

  for (const match of source.matchAll(fence)) {
    const lang = match[1].trim().split(/\s+/)[0];
    if (!['ts', 'tsx', 'js', 'jsx', 'javascript', 'typescript'].includes(lang)) continue;
    const startLine = source.slice(0, match.index).split('\n').length;
    codeBlocks.push({ code: match[2], origin, startLine });
  }
}

const importPattern =
  /import\s+(type\s+)?\{([^}]*)\}\s*from\s*["'](@munachi-me\/(?:numiq|numviz)(?:\/react)?)["']/g;

const checkedModules = new Set();
let importCount = 0;

for (const block of codeBlocks) {
  for (const match of block.code.matchAll(importPattern)) {
    const typeOnlyBlock = Boolean(match[1]);
    const specifiers = match[2]
      .split(',')
      .map((specifier) => specifier.trim())
      .filter(Boolean)
      .map((specifier) => ({
        typeOnly: typeOnlyBlock || specifier.startsWith('type '),
        name: specifier
          .replace(/^type\s+/, '')
          .split(/\s+as\s+/)[0]
          .trim(),
      }));

    const pkg = match[3].startsWith('@munachi-me/numiq')
      ? '@munachi-me/numiq'
      : '@munachi-me/numviz';
    const where = `${block.origin}:${block.startLine}`;

    if (match[3] === '@munachi-me/numviz/react') {
      // The React entry needs a DOM and React; verify the names in the declaration files.
      for (const specifier of specifiers) {
        if (!declaredType(pkg, specifier.name)) {
          fail(`Unknown export ${specifier.name} from ${match[3]} (${where})`);
        }
      }
      checkedModules.add(match[3]);
      importCount += specifiers.length;
      continue;
    }

    const namespace = runtime[pkg];
    for (const specifier of specifiers) {
      importCount += 1;
      const atRuntime = Object.prototype.hasOwnProperty.call(namespace, specifier.name);
      const inTypes = declaredType(pkg, specifier.name);

      if (specifier.typeOnly) {
        if (!inTypes) fail(`Unknown type export ${specifier.name} from ${pkg} (${where})`);
      } else if (!atRuntime && !inTypes) {
        fail(`Unknown export ${specifier.name} from ${pkg} (${where})`);
      } else if (!atRuntime) {
        warnings.push(`Type-only export ${specifier.name} imported as a value (${where})`);
      }
    }

    checkedModules.add(match[3]);
  }
}

// Versions documented on the site must match the installed packages.
const productsSource = await readFile(path.join(root, 'lib/products.ts'), 'utf8');
for (const [pkg, config] of Object.entries(packageJson)) {
  const block = new RegExp(`packageName:\\s*'${pkg}'[\\s\\S]*?version:\\s*'([^']+)'`).exec(
    productsSource,
  );
  if (!block) {
    fail(`lib/products.ts does not declare ${pkg}`);
    continue;
  }
  if (block[1] !== config.version) {
    fail(`Documented version ${block[1]} for ${pkg} does not match installed ${config.version}`);
  }
}

// Installation commands must use the published names.
const installPattern = /npm install (@munachi-me\/[a-z-]+)/g;
for (const file of files) {
  const source = await readFile(file, 'utf8');
  for (const match of source.matchAll(installPattern)) {
    if (!(match[1] in packageJson)) {
      fail(`Install command names unknown package ${match[1]} (${path.relative(root, file)})`);
    }
  }
}

// Documented error codes must match the unions the packages declare.
function unionMembers(source, name) {
  const match = new RegExp(`type\\s+${name}\\s*=([\\s\\S]*?);`).exec(source);
  return new Set(match ? [...match[1].matchAll(/"([A-Z_]+)"/g)].map((item) => item[1]) : []);
}

const errorCodes = {
  numviz: unionMembers(declarations['@munachi-me/numviz'], 'NumvizErrorCode'),
  numiq: unionMembers(declarations['@munachi-me/numiq'], 'NumiqErrorCode'),
};
// Thrown at runtime by the loaders even though it is missing from the union type.
errorCodes.numiq.add('COLUMN_NOT_FOUND');

// Codes listed under an "error" heading must belong to the product's error union.
const productSource = {};
for (const file of files) {
  const product = path.relative(path.join(root, 'content'), file).split(path.sep)[0];
  const codes = errorCodes[product];
  if (!codes || codes.size === 0) continue;

  const source = await readFile(file, 'utf8');
  const sections = source.split(/^## /m).filter((section) => /^errors?\b/i.test(section));
  const documented = new Set(
    sections.flatMap((section) =>
      [...section.matchAll(/^\|.*?`([A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)`/gm)].map((match) => match[1]),
    ),
  );

  for (const code of documented) {
    if (!codes.has(code) && !(product === 'numiq' && code === 'COLUMN_NOT_FOUND')) {
      fail(`Error code ${code} in ${path.relative(root, file)} is not declared by ${product}`);
    }
  }

  productSource[product] = (productSource[product] ?? '') + source;
}

for (const [product, codes] of Object.entries(errorCodes)) {
  for (const code of codes) {
    if (!(productSource[product] ?? '').includes(`\`${code}\``)) {
      warnings.push(
        `${product} error code ${code} is not documented anywhere in content/${product}`,
      );
    }
  }
}

for (const warning of warnings) console.warn(`warning: ${warning}`);

if (failures.length > 0) {
  for (const failure of failures) console.error(`error: ${failure}`);
  console.error(`\n${failures.length} documentation accuracy problem(s) found.`);
  process.exit(1);
}

console.log(
  `Verified ${importCount} imported identifiers across ${codeBlocks.length} code blocks and ${checkedModules.size} entry points.`,
);
