// In sanity/schemaTypes/index.ts
import { defineType, defineField } from 'sanity';
import heroSection from './herosection';

// Export an array of schema types
export const schema = [
  heroSection,
  // Add other schema types here
];