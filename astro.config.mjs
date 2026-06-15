import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://sovgatg.uz',
  output: 'server',
  trailingSlash: 'never',
  adapter: vercel(),
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'uz',
      locales: {
        uz: 'uz-UZ',
        ru: 'ru-RU',
      },
    },
    filter: (page) =>
      !page.includes('/modad') &&
      !page.includes('/api/') &&
      !page.includes('/admin'),
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: new Date(),
    serialize: (item) => {
      const strip = (u) => (u && u.length > 'https://sovgatg.uz/'.length)
        ? u.replace(/\/$/, '')
        : (u === 'https://sovgatg.uz/' ? 'https://sovgatg.uz' : u);
      const out = { ...item, url: strip(item.url) };
      if (Array.isArray(item.links)) {
        out.links = item.links.map((l) => ({ ...l, url: strip(l.url) }));
      }
      return out;
    },
  })],
  security: { checkOrigin: false },
});
