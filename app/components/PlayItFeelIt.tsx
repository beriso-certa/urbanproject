"use client";

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const PlayItFeelIt = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  // Animation on component mount
  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial styles
    gsap.set([titleRef.current, subtitleRef.current], { opacity: 0, y: 30 });
    gsap.set(cardsRef.current, { opacity: 0, y: 50 });
    gsap.set(buttonRef.current, { opacity: 0, y: 20 });

    // Create timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Add animations to timeline
    tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
      .to(cardsRef.current, { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15, 
        ease: 'power3.out' 
      }, '-=0.4')
      .to(buttonRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4');

    // Cleanup function
    return () => {
      tl.kill();
    };
  }, []);

  // Blog post data
  const blogPosts = [
    {
      id: 1,
      title: "SAFARICOM ETHIOPIA | THE POWER OF CONNECTION",
      description: "We turned Safaricom's message of connection into emotion blending technology and humanity to craft a campaign that felt alive and truly Ethiopian.",
      image: "/images/service01.png",
      slug: "safaricom-ethiopia"
    },
    {
      id: 2,
      title: "DANKIRA | CELEBRATING ETHIOPIAN CULTURE",
      description: "A visual journey through Ethiopian traditions, capturing the vibrant spirit and rich heritage of the country's cultural celebrations.",
      image: "/images/dankira01.jpg",
      slug: "dankira-culture"
    },
    {
      id: 3,
      title: "KOBA | INNOVATION IN RETAIL",
      description: "Redefining the shopping experience with a campaign that blends modern retail concepts with authentic Ethiopian consumer insights.",
      image: "/images/service03.png",
      slug: "koba-retail"
    }
  ];

  return (
    <section ref={sectionRef} className="relative py-20 md:py-32 bg-black text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24">
          <h2 ref={titleRef} className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 uppercase">
            PLAY IT. FEEL IT.
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-300">
            Every frame, every story, every result.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <div 
              key={post.id}
            ref={el => { cardsRef.current[index] = el; }}
              className="group relative overflow-hidden rounded-lg bg-gray-900 transition-all duration-500 hover:shadow-2xl hover:shadow-red-500/20"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-gray-300 mb-6 line-clamp-3">{post.description}</p>
                <div className="flex items-center text-red-500 font-medium">
                  <span className="mr-2">Read more</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link 
            href="/blog" 
            ref={buttonRef}
            className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-bold uppercase tracking-wider text-sm hover:bg-white hover:text-black transition-colors duration-300"
          >
            VIEW ALL BLOGS
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PlayItFeelIt;