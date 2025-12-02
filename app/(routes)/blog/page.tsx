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

        <div className="w-[275px] h-[70px] mx-auto mb-4 opacity-100">
          <h3 
            className="text-center font-['Typograpghy'] text-[var(--color-Urban-Color-Urban-White)] font-extrabold uppercase leading-[110%]"
            style={{
              fontStyle: 'ExtraBold',
              letterSpacing: '0%',
              lineHeight: '110.00000000000001%',
              textTransform: 'uppercase',
              fontSize: 'var(--font-size-heading-h2)'
            }}
          >
            PLAY IT. FEEL IT.
          </h3>
        </div>
        <div className="w-full max-w-[1280px] h-[54px] mx-auto mb-16 opacity-100 flex items-center justify-center">
          <p 
            className="font-['Typograpghy'] text-[var(--color-Urban-Color-Urban-Red,#F40000)] text-center leading-[150%]"
            style={{
              fontWeight: 400,
              fontStyle: 'Regular',
              fontSize: 'var(--font-size-body-large)',
              letterSpacing: '0%',
              lineHeight: '150%'
            }}
          >
            Every frame, every story,<br />
            every result.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
              ref={(el: HTMLDivElement | null) => {
                if (el) cardsRef.current[index] = el;
              }}
              className="group relative overflow-hidden rounded-lg bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-6">
                <span className="text-red-500 text-sm font-medium">{post.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-4">{post.title}</h3>
                <p className="text-gray-400 mb-6">{post.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">{post.date}</span>
                  <div className="arrow-icon group-hover:translate-y-[-5px] transition-transform duration-300">
                    <svg 
                      className="w-6 h-6" 
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
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}