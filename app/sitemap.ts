import type { MetadataRoute } from 'next';
import { numiqSource, numvizSource } from '@/lib/source';
import { siteConfig } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const docs = [numiqSource, numvizSource].flatMap((source) =>
    source.getPages().map((page) => ({
      url: `${siteConfig.url}${page.url}`,
      changeFrequency: 'weekly' as const,
      priority: page.url.endsWith('/docs') ? 0.8 : 0.7,
    })),
  );

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/numiq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/numviz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...docs,
  ];
}
