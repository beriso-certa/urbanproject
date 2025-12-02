// app/components/home/Blogs.tsx
'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface BlogPost {
  id: string;
  title: string;
  description: string;
  image: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'SAFARICOM ETHIOPIA THE POWER OF CONNECTION',
    description: "We turned Safaricom's message of connection into emotion, blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: '/images/blogs/safaricom.jpg',
    slug: 'safaricom-ethiopia'
  },
  {
    id: '2',
    title: 'SAFARICOM ETHIOPIA THE POWER OF CONNECTION',
    description: "We turned Safaricom's message of connection into emotion, blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: '/images/blogs/safaricom-2.jpg',
    slug: 'safaricom-ethiopia-2'
  },
  {
    id: '3',
    title: 'SAFARICOM ETHIOPIA THE POWER OF CONNECTION',
    description: "We turned Safaricom's message of connection into emotion, blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: '/images/blogs/safaricom-3.jpg',
    slug: 'safaricom-ethiopia-3'
  },
  {
    id: '4',
    title: 'SAFARICOM ETHIOPIA THE POWER OF CONNECTION',
    description: "We turned Safaricom's message of connection into emotion, blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: '/images/blogs/safaricom-4.jpg',
    slug: 'safaricom-ethiopia-4'
  }
];

export default function Blogs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const postsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation setup
  useEffect(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      }
    );

    // Animate blog posts
    postsRef.current.forEach((post, index) => {
      if (!post) return;
      
      gsap.fromTo(
        post,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: index * 0.1,
          scrollTrigger: {
            trigger: post,
            start: 'top 90%',
          },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-16">
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-bold text-black opacity-0"
          > 
            BLOGS 
          </h2>
          <div className="w-20 h-1 bg-black mt-2"></div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 gap-12">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              ref={el => postsRef.current[index] = el}
              className="grid md:grid-cols-3 gap-8 group cursor-pointer hover:opacity-90 transition-opacity"
            >
              {/* Blog Image */}
              <div className="relative h-64 md:h-48 lg:h-56 xl:h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              
              {/* Blog Content */}
              <div className="md:col-span-2 flex flex-col justify-center">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mb-6">{post.description}</p>
                <div className="flex items-center text-red-600 font-medium">
                  <span>Read more</span>
                  <svg 
                    className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14 5l7 7m0 0l-7 7m7-7H3" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Divider */}
              {index < blogPosts.length - 1 && (
                <div className="col-span-full border-t border-gray-200 pt-8"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}