import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { GitHubMark } from '@/components/branding/icons';
import { ProductLockup } from '@/components/branding/logo';
import { ProductSwitcher } from '@/components/navigation/product-switcher';
import { numiqSource } from '@/lib/source';
import { products } from '@/lib/products';

const product = products.numiq;

export default function NumiqDocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-product="numiq" className="min-h-screen">
      <DocsLayout
        tree={numiqSource.getPageTree()}
        nav={{
          title: <ProductLockup product="numiq" />,
          url: product.landing,
          children: <ProductSwitcher current="numiq" iconOnly />,
        }}
        links={[
          { type: 'main', text: 'API', url: `${product.docsBase}/api` },
          { type: 'main', text: 'Examples', url: `${product.docsBase}/examples` },
          {
            type: 'icon',
            label: 'Numiq on GitHub',
            text: 'GitHub',
            url: product.github,
            external: true,
            icon: <GitHubMark className="size-4" />,
          },
          {
            type: 'icon',
            label: 'Numiq on npm',
            text: 'npm',
            url: product.npm,
            external: true,
            icon: <span className="font-mono text-[0.6875rem] leading-none">npm</span>,
          },
        ]}
        githubUrl={product.github}
        themeSwitch={{ enabled: true, mode: 'light-dark-system' }}
        sidebar={{ defaultOpenLevel: 1 }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
