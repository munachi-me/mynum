import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Provider } from '@/components/provider';
import { siteConfig } from '@/lib/site';
import './global.css';

const dmSans = localFont({
  src: [
    { path: './fonts/dm-sans-latin.woff2', weight: '100 1000', style: 'normal' },
    { path: './fonts/dm-sans-latin-ext.woff2', weight: '100 1000', style: 'normal' },
    { path: './fonts/dm-sans-italic-latin.woff2', weight: '100 1000', style: 'italic' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  fallback: ['system-ui', 'Segoe UI', 'sans-serif'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author, url: siteConfig.authorUrl }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [
    'Numiq',
    'Numviz',
    'data analysis',
    'data visualization',
    'TypeScript',
    'JavaScript',
    'documentation',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: '/',
    locale: siteConfig.locale,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFFFFF' },
    { media: '(prefers-color-scheme: dark)', color: '#0A0A0A' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={dmSans.variable} suppressHydrationWarning>
      <body className="bg-fd-background text-fd-foreground flex min-h-screen flex-col antialiased">
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
