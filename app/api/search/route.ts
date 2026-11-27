import { createSearchAPI } from 'fumadocs-core/search/server';
import { buildSearchIndexes } from '@/lib/search';

const search = createSearchAPI('simple', {
  indexes: () => buildSearchIndexes(),
  language: 'english',
});

export async function GET(request: Request) {
  return search.GET(request);
}
