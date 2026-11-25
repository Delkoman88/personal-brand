import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vendor-react', test: /node_modules[\\/](react|react-dom|react-router|react-router-dom)/ },
            { name: 'vendor-gsap', test: /node_modules[\\/](gsap|@gsap)/ },
            { name: 'vendor-markdown', test: /node_modules[\\/](react-markdown|remark-|unified|mdast-|micromark|hast-)/ },
          ],
        },
      },
    },
  },
});
