import { getSingleBlog } from "@/components/lib/sanity.fetch";
import Image from "next/image";

export default async function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const blog = await getSingleBlog(params.slug);

  return (
    <section className="max-w-4xl mx-auto px-6 py-24">
      <Image
        src={blog.image.asset.url}
        alt={blog.title}
        width={900}
        height={500}
        className="rounded-lg mb-10"
      />

      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      <div className="prose max-w-none">
        {blog.content.map((block: any, i: number) => (
          <p key={i}>{block.children?.[0]?.text}</p>
        ))}
      </div>
    </section>
  );
}
