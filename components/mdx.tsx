import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { ProductBadge, ProductCard } from '@/components/docs/product-card';
import { Steps, Step } from '@/components/docs/steps';
import { ApiEntry } from '@/components/docs/api-entry';
import { ExampleFrame } from '@/components/docs/example-frame';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ProductCard,
    ProductBadge,
    Steps,
    Step,
    ApiEntry,
    ExampleFrame,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
