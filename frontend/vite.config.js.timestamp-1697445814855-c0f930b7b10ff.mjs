// vite.config.js
import { defineConfig } from "file:///C:/Users/Lirae%20Que%20Data/OneDrive/Desktop/HRFlow/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Lirae%20Que%20Data/OneDrive/Desktop/HRFlow/frontend/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{
      find: "@",
      replacement: "/src"
    }, {
      find: "@Components",
      replacement: "/src/components"
    }, {
      find: "@Pages",
      replacement: "/src/pages"
    }, {
      find: "@Services",
      replacement: "/src/services"
    }, {
      find: "@Utils",
      replacement: "/src/Utils"
    }, {
      find: "@Assets",
      replacement: "/src/assets"
    }, {
      find: "@Layouts",
      replacement: "/src/layouts"
    }, {
      find: "@Styles",
      replacement: "/src/styles"
    }, {
      find: "@Hooks",
      replacement: "/src/hooks"
    }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMaXJhZSBRdWUgRGF0YVxcXFxPbmVEcml2ZVxcXFxEZXNrdG9wXFxcXEhSRmxvd1xcXFxmcm9udGVuZFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcTGlyYWUgUXVlIERhdGFcXFxcT25lRHJpdmVcXFxcRGVza3RvcFxcXFxIUkZsb3dcXFxcZnJvbnRlbmRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL0xpcmFlJTIwUXVlJTIwRGF0YS9PbmVEcml2ZS9EZXNrdG9wL0hSRmxvdy9mcm9udGVuZC92aXRlLmNvbmZpZy5qc1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIHJlc29sdmUgOiB7XHJcbiAgICBhbGlhcyA6IFt7XHJcbiAgICAgIGZpbmQgOiBcIkBcIixcclxuICAgICAgcmVwbGFjZW1lbnQgOiBcIi9zcmNcIlxyXG4gICAgfSwge1xyXG4gICAgICBmaW5kIDogXCJAQ29tcG9uZW50c1wiLFxyXG4gICAgICByZXBsYWNlbWVudCA6IFwiL3NyYy9jb21wb25lbnRzXCJcclxuICAgIH0sIHtcclxuICAgICAgZmluZCA6IFwiQFBhZ2VzXCIsXHJcbiAgICAgIHJlcGxhY2VtZW50IDogXCIvc3JjL3BhZ2VzXCIsXHJcbiAgICB9LCB7XHJcbiAgICAgIGZpbmQgOiBcIkBTZXJ2aWNlc1wiLFxyXG4gICAgICByZXBsYWNlbWVudCA6IFwiL3NyYy9zZXJ2aWNlc1wiLFxyXG4gICAgfSwge1xyXG4gICAgICBmaW5kIDogXCJAVXRpbHNcIixcclxuICAgICAgcmVwbGFjZW1lbnQgOiBcIi9zcmMvVXRpbHNcIixcclxuICAgIH0sIHtcclxuICAgICAgZmluZCA6IFwiQEFzc2V0c1wiLFxyXG4gICAgICByZXBsYWNlbWVudCA6IFwiL3NyYy9hc3NldHNcIixcclxuICAgIH0sIHtcclxuICAgICAgZmluZCA6IFwiQExheW91dHNcIixcclxuICAgICAgcmVwbGFjZW1lbnQgOiBcIi9zcmMvbGF5b3V0c1wiLFxyXG4gICAgfSwge1xyXG4gICAgICBmaW5kIDogXCJAU3R5bGVzXCIsXHJcbiAgICAgIHJlcGxhY2VtZW50IDogXCIvc3JjL3N0eWxlc1wiLFxyXG4gICAgfSwge1xyXG4gICAgICBmaW5kIDogXCJASG9va3NcIixcclxuICAgICAgcmVwbGFjZW1lbnQgOiBcIi9zcmMvaG9va3NcIixcclxuICAgIH1dXHJcbiAgfVxyXG59KVxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTRXLFNBQVMsb0JBQW9CO0FBQ3pZLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsU0FBVTtBQUFBLElBQ1IsT0FBUSxDQUFDO0FBQUEsTUFDUCxNQUFPO0FBQUEsTUFDUCxhQUFjO0FBQUEsSUFDaEIsR0FBRztBQUFBLE1BQ0QsTUFBTztBQUFBLE1BQ1AsYUFBYztBQUFBLElBQ2hCLEdBQUc7QUFBQSxNQUNELE1BQU87QUFBQSxNQUNQLGFBQWM7QUFBQSxJQUNoQixHQUFHO0FBQUEsTUFDRCxNQUFPO0FBQUEsTUFDUCxhQUFjO0FBQUEsSUFDaEIsR0FBRztBQUFBLE1BQ0QsTUFBTztBQUFBLE1BQ1AsYUFBYztBQUFBLElBQ2hCLEdBQUc7QUFBQSxNQUNELE1BQU87QUFBQSxNQUNQLGFBQWM7QUFBQSxJQUNoQixHQUFHO0FBQUEsTUFDRCxNQUFPO0FBQUEsTUFDUCxhQUFjO0FBQUEsSUFDaEIsR0FBRztBQUFBLE1BQ0QsTUFBTztBQUFBLE1BQ1AsYUFBYztBQUFBLElBQ2hCLEdBQUc7QUFBQSxNQUNELE1BQU87QUFBQSxNQUNQLGFBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDSDtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
