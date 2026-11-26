import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import { readdirSync } from 'node:fs';
import { diffSlugs } from './src/lib/procedure-meta.ts';

const parityCheck = {
  name: 'procedure-parity',
  hooks: {
    'astro:build:start': () => {
      const ls = (l) => readdirSync(`src/content/procedures/${l}`).filter((f) => f.endsWith('.md')).map((f) => f.replace('.md', ''));
      diffSlugs(ls('en'), ls('tr'));
    },
  },
};

export default defineConfig({
  site: 'https://northwesternclinic.com',
  trailingSlash: 'always',
  build: { format: 'directory' },
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    parityCheck,
    tailwind(),
    sitemap({ i18n: { defaultLocale: 'en', locales: { en: 'en', tr: 'tr' } } }),
  ],
});
