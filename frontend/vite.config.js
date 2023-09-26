import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve : {
    alias : {
      src : "/src",
      components : "/src/components",
      pages : "/src/pages",
      services : "/src/services",
      utils : "/src/utils",
      constants : "/src/constants",
      services : "/src/services",
      assets : "/src/assets"
    }
  }
})
