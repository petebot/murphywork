import { createClient } from '@sanity/client';
import type { ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const config: ClientConfig = {
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID, // Access the environment variable
  dataset: import.meta.env.VITE_SANITY_DATASET, // Access the environment variable
  apiVersion: import.meta.env.VITE_SANITY_API_VERSION, // Use the latest API version
  token: import.meta.env.VITE_SANITY_TOKEN, // Your API token
  ignoreBrowserTokenWarning: true,
  useCdn: true, // `false` if you want to ensure fresh data
  perspective: 'published', // 'raw' | 'previewDrafts' | 'published'
};

const client = createClient(config);

export default client;

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}