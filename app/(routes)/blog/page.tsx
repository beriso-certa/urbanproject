// app/(routes)/blog/page.tsx
"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import Image from 'next/image';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Mock data for blog posts
const blogPosts = [
  {
    id: 1,
    title: "SAFARICOM ETHIOPIA | THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: "/images/safaricom1.png",
    category: "Commercial",
    date: "2023-10-15"
  },
  {
    id: 2,
    title: "SAFARICOM ETHIOPIA | THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: "/images/safaricom2.png",
    category: "Campaign",
    date: "2023-09-28"
  },
  {
    id: 3,
    title: "SAFARICOM ETHIOPIA | THE POWER OF CONNECTION",
    description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
    image: "/images/safaricom3.png",
    category: "Branding",
    date: "2023-11-05"
  }
];

export default function BlogPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation on scroll
  useEffect(() => {
    if (cardsRef.current.length > 0) {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.fromTo(card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: index * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            }
          }
        );

        // Hover animation for arrow
        const arrow = card.querySelector('.arrow-icon');
        if (arrow) {
          card.addEventListener('mouseenter', () => {
            gsap.to(arrow, { y: -5, duration: 0.3, ease: "power2.out" });
          });
          card.addEventListener('mouseleave', () => {
            gsap.to(arrow, { y: 0, duration: 0.3, ease: "power2.out" });
          });
        }
      });
    }

    return () => {
      // Cleanup
      cardsRef.current = [];
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-24" ref={sectionRef}>
        <div className="flex justify-between items-center mb-16">
          <span className="text-red-500 font-medium">BLOGS</span>
          <Link 
            href="/blog" 
            className="flex items-center text-white hover:text-red-500 transition-colors"
          >
            VIEW ALL BLOGS
            <svg 
              className="w-5 h-5 ml-2 arrow-icon" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-4 uppercase">
            PLAY IT. FEEL IT.
          </h2>
          <p className="text-lg md:text-xl text-red-500">
            Every frame, every story, every result.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-lg bg-gray-900 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20 flex flex-col"
            >
              {/* Description at the top */}
              <div className="p-6 pb-0 flex-1 flex flex-col">
                <p className="text-gray-300 mb-4 line-clamp-3">{post.title}</p>
              </div>
              
              {/* Image in the middle */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.description}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              {/* Title and white arrow at the bottom */}
              <div className="p-6 pt-4">
                <h3 className="text-xl font-bold mb-4 line-clamp-2">{post.title}</h3>
                <div className="flex justify-between items-center border-t border-gray-800 pt-4">
                  <span className="text-white text-sm font-medium">Read More</span>
                  <svg 
                    className="w-5 h-5 text-white transform transition-transform group-hover:translate-x-1" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}