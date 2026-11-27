import { loader } from 'fumadocs-core/source';
import { defineDocs } from 'fumadocs-mdx/macro';
import { metaSchema } from 'fumadocs-core/source/schema';
import { docsPageSchema } from './docs-schema';

const numiqDocs = defineDocs({
  dir: 'content/numiq',
  docs: {
    schema: docsPageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

const numvizDocs = defineDocs({
  dir: 'content/numviz',
  docs: {
    schema: docsPageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

export const numiqSource = loader({
  baseUrl: '/numiq/docs',
  source: numiqDocs.toFumadocsSource(),
});

export const numvizSource = loader({
  baseUrl: '/numviz/docs',
  source: numvizDocs.toFumadocsSource(),
});

export type DocsSource = typeof numiqSource;
