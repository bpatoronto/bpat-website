import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import vitePrerender from 'vite-plugin-prerender'

const { PuppeteerRenderer } = vitePrerender

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    vitePrerender({
      staticDir: path.join(import.meta.dirname, 'dist'),
      routes: ['/', '/map', '/team'],
      renderer: new PuppeteerRenderer({
        renderAfterTime: 3000,
        headless: true,
      }),
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html.replace(
          /<script[^>]*type="module"[^>]*><\/script>/g,
          ''
        )
        return renderedRoute
      },
    }),
  ],
})
