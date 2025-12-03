import { createClient } from 'next-sanity';
import clientConfig from '../../sanity.config';

// Regular client for non-preview data
const client = createClient({
  ...clientConfig,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_TOKEN,
});

// Preview client for draft content
const previewClient = createClient({
  ...clientConfig,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: 'previewDrafts',
});

export { client, previewClient };

export async function sanityFetch<T>(query: string, params = {}, preview = false) {
  const currentClient = preview ? previewClient : client;
  return currentClient.fetch<T>(query, params);
}

// For live preview with React hooks
export function useLiveQuery<T>(initialData: T, query: string, params = {}) {
  // This is a simplified version - in a real app, you'd want to use the actual useLiveQuery hook
  // from @sanity/preview-kit if you need live updates
  return { data: initialData, loading: false };
}

import definePreview from 'next-sanity/preview';

export { definePreview };
