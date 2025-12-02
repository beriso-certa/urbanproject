import { getSingleBlog, type Blog } from '../../components/lib/sanity.fetch';
import Image from "next/image";
import Link from "next/link";
import { urlFor } from '../../../sanity/lib/image';

type BlogPost = Blog & {
  content?: any[];
  body?: any[];
  publishedAt?: string;
};

export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getSingleBlog(params.slug);

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-xl mb-8">The requested blog post could not be found.</p>
        <Link 
          href="/Blogs" 
          className="px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      {blog.mainImage?.asset?._ref && (
        <div className="relative w-full h-96 mb-10 rounded-lg overflow-hidden">
          <Image
            src={urlFor(blog.mainImage).url()}
            alt={blog.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
        </div>
      )}

      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
      
      {blog.publishedAt && (
        <p className="text-gray-400 mb-8">
          {new Date(blog.publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      )}

      <div className="prose max-w-none text-gray-300">
        {blog.content?.map((block: any, i: number) => (
          <div key={i} className="mb-4">
            {block.children?.map((child: any, j: number) => (
              <p key={j} className="mb-4">
                {child.text}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-12">
        <Link 
          href="/Blogs" 
          className="inline-flex items-center text-red-500 hover:text-red-400 transition-colors"
        >
          <span className="mr-2">← Back to all posts</span>
        </Link>
      </div>
    </section>
  );
}
