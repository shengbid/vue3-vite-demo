import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import {
  resolve
} from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8092
  },
  resolve: {
    alias: [{
        find: '@',
        replacement: resolve(__dirname, 'src')
      },
      {
        find: '@views',
        replacement: resolve(__dirname, 'src/views')
      }
    ]
  },
  plugins: [vue()]
})