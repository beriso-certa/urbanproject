import { ImageAsset, Slug } from '@sanity/types';

export interface Work {
  _id: string;
  _createdAt: string;
  title: string;
  slug: Slug;
  mainImage: {
    asset: ImageAsset;
    alt?: string;
  };
  categories?: {
    title: string;
  }[];
  publishedAt: string;
  body: any[]; // You can define a more specific type based on your Sanity schema
}
