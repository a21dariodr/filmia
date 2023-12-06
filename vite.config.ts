import { defineConfig, splitVendorChunkPlugin, type PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import terser from '@rollup/plugin-terser'
import { visualizer } from 'rollup-plugin-visualizer'

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
