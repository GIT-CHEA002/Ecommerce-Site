import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "https://ecommerce-site-backend-0gp2.onrender.com/api": {
        target: "http://localhost:3000", // work like htaccess of the backend api endpoint
      },
      "/images": {
        target: "http://localhost:3000",
      },
    },
  },
});
