import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite Configuration Serving the Application From the Repository Sub Path
export default defineConfig({
  base: '/e-plantShopping',
  plugins: [react()],
});
