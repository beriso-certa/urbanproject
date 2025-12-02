import { defineType, defineField } from 'sanity';
import heroSection from './herosection';
import { serviceItem, serviceCategory } from './service';

// Export an array of schema types
export const schema = [
  heroSection,
  serviceItem,
  serviceCategory,
];