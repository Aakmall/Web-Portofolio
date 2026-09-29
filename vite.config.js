import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

// Assemble section partials into real HTML in both dev and production.
export default defineConfig({
  base: './',
  build: {
    rollupOptions: { input: { portfolio: resolve('index.html'), cv: resolve('cv.html') } },
  },
  plugins: [{
    name: 'section-html-includes',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return html.replace(/<!-- include:([^ ]+) -->/g, (_, file) =>
          readFileSync(resolve(file), 'utf8'));
      },
    },
    handleHotUpdate({ file, server }) {
      if (file.endsWith('.html')) server.ws.send({ type: 'full-reload' });
    },
  }],
});
