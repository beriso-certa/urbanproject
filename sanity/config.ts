import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schema } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Urban Production',
  projectId: 'otwwa6lf',
  dataset: 'production',
  basePath: '/studio',
  plugins: [
    deskTool(),
    visionTool(),
  ],
  schema: schema,  // Directly pass the schema array
});