import { defineConfig, splitVendorChunkPlugin, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'

/* Project building configuration for Vite and Rollup. Includes a plugin that shows the size of the app chunks
 * when building and an option to supress console messages in production environments
 */

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), splitVendorChunkPlugin(), visualizer() as unknown as PluginOption],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id: string) {}
            },
            plugins: [
                terser({
                    compress: { drop_console: true }
                }) as unknown as PluginOption
            ]
        }
    }
})
