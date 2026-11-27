export type ProductId = 'numiq' | 'numviz';

export interface ProductConfig {
  id: ProductId;
  /** Product brand name. Never rename these: they are the npm package names. */
  name: string;
  /** Short role statement used in navigation and cards. */
  role: string;
  /** One-sentence description. */
  description: string;
  /** npm package name, exactly as published. */
  packageName: string;
  /** Version documented by this site. Keep in sync with the published package. */
  version: string;
  /** Install command shown in documentation. */
  install: string;
  /** Primary accent colour for this product. */
  accent: string;
  /** Accessible foreground colour for text placed on the accent. */
  accentForeground: string;
  /** Documentation route prefix. */
  docsBase: string;
  /** Landing page route. */
  landing: string;
  github: string;
  npm: string;
  /** Path to the wordmark used in navigation. */
  logo: string;
  /** Path to the square icon used for favicons and compact spaces. */
  icon: string;
}

export const products: Record<ProductId, ProductConfig> = {
  numiq: {
    id: 'numiq',
    name: 'Numiq',
    role: 'Data analysis engine',
    description:
      'Load, normalize, prepare, query and analyze structured data with an immutable dataset API.',
    packageName: '@munachi-me/numiq',
    version: '2.0.1',
    install: 'npm install @munachi-me/numiq',
    accent: '#FF7900',
    accentForeground: '#0A0A0A',
    docsBase: '/numiq/docs',
    landing: '/numiq',
    github: 'https://github.com/munachi-me/numiq',
    npm: 'https://www.npmjs.com/package/@munachi-me/numiq',
    logo: '/logos/numiq-logo.svg',
    icon: '/logos/numiq-icon.svg',
  },
  numviz: {
    id: 'numviz',
    name: 'Numviz',
    role: 'Data visualization library',
    description:
      'Render charts, data tables, KPI metrics and dashboards from plain JavaScript data.',
    packageName: '@munachi-me/numviz',
    version: '1.0.2',
    install: 'npm install @munachi-me/numviz',
    accent: '#16A34A',
    accentForeground: '#FFFFFF',
    docsBase: '/numviz/docs',
    landing: '/numviz',
    github: 'https://github.com/munachi-me/numviz',
    npm: 'https://www.npmjs.com/package/@munachi-me/numviz',
    logo: '/logos/numviz-logo.svg',
    icon: '/logos/numviz-icon.svg',
  },
};

export const productList = [products.numiq, products.numviz];

export function getProduct(id: ProductId): ProductConfig {
  return products[id];
}

/** Resolve the product that owns a documentation URL. */
export function productFromUrl(url: string): ProductConfig | null {
  if (url.startsWith('/numiq')) return products.numiq;
  if (url.startsWith('/numviz')) return products.numviz;
  return null;
}
