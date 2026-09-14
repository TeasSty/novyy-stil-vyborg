import { defineConfig } from 'vite'

export default defineConfig({
  base: '/novyy-stil-vyborg/',
  build: {
    target: 'es2019',
    assetsInlineLimit: 2048,
  },
})
