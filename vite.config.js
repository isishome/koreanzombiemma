import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'serve' ? '/' : '/koreanzombiemma/',
    plugins: [vue({
      template: { transformAssetUrls }
    }),
    quasar()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'vue-i18n': `vue-i18n/dist/vue-i18n.cjs${command !== 'serve' ? '.prod' : ''}.js`
      }
    },
    build: {
      outDir: './koreanzombiemma',
      emptyOutDir: true
    }
  }
})