import { defineConfig } from 'vite'
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
          dest: 'assets'
        },
        {
          src: 'src/**/*.css',
          dest: 'assets',
        },
        {
          src: 'src/**/*.png',
          dest: 'assets',
        },
      ]
    })
  ]
})