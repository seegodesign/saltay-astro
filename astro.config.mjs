import { defineConfig } from 'astro/config';
import node from '@astrojs/node';
import tina from '@tinacms/astro/integration';
import { tinaAdminDevRedirect } from '@tinacms/astro/vite';

export default defineConfig({
  site: 'https://www.saltayhanaleibay.com',
  output: 'static',
  adapter: node({ mode: 'standalone' }),
  integrations: [tina()],
  vite: { plugins: [tinaAdminDevRedirect()] },
});
