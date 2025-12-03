// sanity.config.ts
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';

const config = defineConfig({
  projectId: 'your-project-id', // Make sure this is set
  dataset: 'production', // Or your dataset name
  title: 'Your Project',
  basePath: '/studio',
  plugins: [deskTool()],
  schema: {
    // Your schema types here
  }
});

export default config;