import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  name: "default",
  title: "Urban Site",

  projectId: "YOUR_PROJECT_ID", 
  dataset: "production",

  plugins: [deskTool()],

  schema: {
    types: schema, 
  },
});
