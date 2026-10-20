import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import sitemap from '@astrojs/sitemap';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

export default defineConfig({
  site: 'https://www.saltayhanaleibay.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [tina(), sitemap({
    filter: (page) => !/^\/(?:admin|tina-island|checkout|my-account)(?:\/|$)/.test(new URL(page).pathname),
  })],
  vite: { plugins: [tinaAdminDevRedirect()] },
});
