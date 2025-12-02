import { createClient } from 'next-sanity';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-10-01', // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: process.env.NODE_ENV === 'production', // `false` if you want to ensure fresh data
  token: process.env.SANITY_API_TOKEN, // Only if you want to update content with the client
});
