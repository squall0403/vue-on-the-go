import { fileURLToPath, URL } from 'node:url'
import { defineConfig,loadEnv } from 'vite'
import { viteSingleFile } from "vite-plugin-singlefile"
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(
      {
        template: {
          compilerOptions:{
            isCustomElement: (tag) => ['spacer-sm','spacer-md','spacer-lg'].includes(tag),
          }
        }
      }
    ),
    vueJsx(),
    viteSingleFile()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
