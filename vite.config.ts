import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr({
    // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
    include: '**/*.svg?react',
    //  A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should ignore. By default no files are ignored.
    exclude: '',
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  }
})
