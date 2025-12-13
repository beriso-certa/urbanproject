'use client';

import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '../components/layout/Footer';
import { useRouter } from 'next/navigation';


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
  const router = useRouter();
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
    
    return () => observer.disconnect();
  }, [index]);

  // Handle click on the arrow button
  const handleArrowClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling to parent
    router.push(`/blog/${post.slug}`);
  };

  // Handle click on the entire card
  const handleCardClick = () => {
    router.push(`/blog/${post.slug}`);
  };

  return (
    <div
     ref={cardRef}
      className="group relative overflow-hidden cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
     
        {/* Image Section */}
        <div className="relative overflow-hidden rounded-sm h-[300px] lg:h-[500px] w-full">
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 ease-out "
            style={{
              backgroundImage: `url(${post.image})`,
               transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover'
            
             

            }}
          />
         <div className={`absolute inset-0 transition-all duration-500 ${
    isHovered ? 'bg-black/30' : 'bg-black/40'
  }`} />

  {/* Category tag */}
  <div className="absolute bottom-6 left-6">
    <span className="inline-block bg-white/90 text-black px-4 py-1 text-sm font-medium uppercase tracking-wider">
      {post.category}
    </span>
  </div>


        </div>

        {/* Content Section */}
        <div className="space-y-6 py-6 lg:py-12 px-4 lg:px-12">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl lg:text-3xl font-bold tracking-tight max-w-md">
              {post.title}
            </h3>
            <button 
  className="flex-shrink-0 w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-all duration-300"
  onClick={(e) => {
    // Your click handler code here
  }}
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
      <Header data={{
        logo: '/images/logos.png',
        menu: ['HOME', 'WORK', 'SERVICES', 'ABOUT US', 'BLOGS'],
        cta: 'CONTACT US'
      }} />
  
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16">
          <div className="w-full h-1 bg-black mb-8" />
          <h2 
            ref={titleRef}
            className="text-5xl lg:text-7xl font-bold text-red-600 tracking-tight 
            font-family: Typograpghy/Heading/H1/font family;
font-weight: 800;
font-style: ExtraBold;
font-size: Typograpghy/Heading/H1/font Size;
leading-trim: NONE;
line-height: 110.00000000000001%;
letter-spacing: 0%;
text-transform: uppercase;
color/Urban Color/Urban Red"
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