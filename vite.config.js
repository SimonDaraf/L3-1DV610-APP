import { defineConfig } from 'vite'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig ({
  esbuild: {
    supported: {
      'top-level-await': true //browsers can handle top-level-await features
    },
  },
  build: {
    lib: {
      entry: 'src/index.js',
      formats: ['es']
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html')
      },
      output: {
        format: 'es',
        dir: 'dist',
        preserveModules: true,
        preserveModulesRoot: 'src'
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'src/**/*.html',
          dest: ''
        },
        {
          src: 'src/**/*.css',
          dest: '',
        },
        {
          src: 'src/**/*.png',
          dest: 'view/cards',
        },
      ]
    })
  ]
})