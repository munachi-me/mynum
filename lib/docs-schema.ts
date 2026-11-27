import { pageSchema } from 'fumadocs-core/source/schema';
import { z } from 'zod';

/**
 * Documentation frontmatter.
 *
 * Extends the Fumadocs page schema with `related`, a list of documentation
 * URLs shown under each page.
 */
export const docsPageSchema = pageSchema.extend({
  related: z.array(z.string()).optional(),
});

export type DocsPageData = z.infer<typeof docsPageSchema>;
