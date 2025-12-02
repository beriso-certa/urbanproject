import { client } from "./sanity.client";

// Define the Blog type
export interface Blog {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  excerpt?: string;
  mainImage?: {
    asset: {
      _ref: string;
    };
  };
  content?: any[];
  body?: any[];
  publishedAt?: string;
}

export async function getBlogs(): Promise<Blog[]> {
  try {
    const query = `*[_type == "blog"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug,
      excerpt,
      mainImage,
      publishedAt
    }`;
    
    const blogs = await client.fetch(query);
    return blogs || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getSingleBlog(slug: string): Promise<Blog | null> {
  try {
    const query = `*[_type == "blog" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      mainImage,
      content,
      body,
      publishedAt,
      excerpt
    }`;
    
    const params = { slug };
    const blog = await client.fetch<Blog | null>(query, params);
    return blog || null;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}
