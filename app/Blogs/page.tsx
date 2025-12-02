'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '../components/layout/Footer';


// Mock blog data (replace with Sanity CMS data)
const blogPosts = [
  {
    id: 1,
    title: "SAFARICOM ETHIOPIA THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: "/images/SafaricomBlog1.png",
    category: "Campaign",
    slug: "safaricom-ethiopia-connection"
  },
  {
    id: 2,
    title: "SAFARICOM ETHIOPIA THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: "/images/SafaricomBlog1.png",
    category: "Digital",
    slug: "safaricom-ethiopia-digital"
  },
  {
    id: 3,
    title: "SAFARICOM ETHIOPIA THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
   image: "/images/SafaricomBlog1.png",
    category: "Production",
    slug: "safaricom-ethiopia-production"
  },
  {
    id: 4,
    title: "SAFARICOM ETHIOPIA THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: "/image/SafaricomBlog1.png",
    category: "Storytelling",
    slug: "safaricom-ethiopia-storytelling"
  }
];

interface BlogPost {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  slug: string;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

const BlogCard = ({ post, index }: BlogCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    
    if (!card) return; // Early return if card is null

    // Scroll animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`;
    observer.observe(card);
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
     
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-sm h-[300px] lg:h-[400px]">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out"
            style={{
              backgroundImage: `url(${post.image})`,
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight max-w-md">
              {post.title}
            </h3>
            <button 
              className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300"
              style={{
                transform: isHovered ? 'scale(1.1) rotate(45deg)' : 'scale(1) rotate(0deg)'
              }}
            >
              <ArrowRight className="w-6 h-6 text-white" />
            </button>
          </div>
          
          <p className="text-gray-700 text-base lg:text-lg leading-relaxed">
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const BlogsSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    
    // Title animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && title) {
            title.style.opacity = '1';
            title.style.transform = 'translateX(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (title) {
      title.style.opacity = '0';
      title.style.transform = 'translateX(-50px)';
      title.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
      observer.observe(title);
    }

    return () => observer.disconnect();
  }, []);

  return (
    
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-24">
      <Header />
  
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="w-full h-1 bg-black mb-8" />
          <h2 
            ref={titleRef}
            className="text-5xl lg:text-7xl font-bold text-red-600 tracking-tight"
          >
            BLOGS 
          </h2>
        </div>

        {/* Blog Posts */}
        <div className="space-y-20">
          {blogPosts.map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>
      </div>
      <Footer />
      
     
    </section>
  );
};

export default BlogsSection;