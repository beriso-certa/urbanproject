'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/layout/Footer';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  _id: string;
  title: string;
}

interface ServiceCategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  image: string;
  services: ServiceItem[];
}

export default function ServicesPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorLabelRef = useRef<HTMLDivElement>(null);

  // ✅ MOCK DATA (replace with Sanity later)
  const servicesData: ServiceCategory[] = [
    {
      _id: '1',
      title: 'Content Creation',
      slug: 'content-creation',
      description: 'We craft visuals that speak louder than words.',
      image: '/images/contentcreation01.png',
      services: [
        { _id: '1-1', title: 'VIDEO PRODUCTION' },
        { _id: '1-2', title: 'PHOTOGRAPHY' },
        { _id: '1-3', title: 'EDITING & POST PRODUCTION' },
        { _id: '1-4', title: 'SOCIAL MEDIA CONTENT' }
      ]
    },
    {
      _id: '2',
      title: 'Creative Direction & Production',
      slug: 'creative-direction',
      description: 'From concept to execution with full creative control.',
      image: '/images/contentcreation02.png',
      services: [
        { _id: '2-1', title: 'CONCEPT DEVELOPMENT' },
        { _id: '2-2', title: 'CREATIVE DIRECTION' },
        { _id: '2-3', title: 'PRODUCTION MANAGEMENT' },
        { _id: '2-4', title: 'ART DIRECTION' },
        { _id: '2-5', title: 'SET DESIGN & STYLING' },
        { _id: '2-6', title: 'CASTING & TALENT COORDINATION' },
        { _id: '2-7', title: 'VISUAL SUPERVISION' }
      ]
    },
    {
      _id: '3',
      title: 'Strategy & Storytelling',
      slug: 'strategy-storytelling',
      description: 'We build stories that connect brands with people.',
      image: '/images/contentcreation03.png',
      services: [
        { _id: '3-1', title: 'SOCIAL MEDIA MARKETING' },
        { _id: '3-2', title: 'CONTENT STRATEGY' },
        { _id: '3-3', title: 'BRAND STORYTELLING' },
        { _id: '3-4', title: 'BRAND MESSAGING' },
        { _id: '3-5', title: 'CAMPAIGN STRATEGY' },
        { _id: '3-6', title: 'SCRIPTWRITING' },
        { _id: '3-7', title: 'STORYBOARDING' }
      ]
    }
  ];

  // ✅ ANIMATIONS
  useEffect(() => {
    // Initialize animations
    const ctx = gsap.context((self) => {
      if (!self.selector) return;
      
      // Title animation
      if (titleRef.current) {
        gsap.fromTo(titleRef.current,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: titleRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // Service sections animation
      const sections = gsap.utils.toArray<HTMLElement>('.service-section');
      sections.forEach((section, i) => {
        gsap.fromTo(section,
          { opacity: 0, y: 80 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
            },
          }
        );
      });

      // Cursor animation
      if (cursorRef.current) {
        const xTo = gsap.quickTo(cursorRef.current, 'x', { duration: 0.15, ease: 'power3' });
        const yTo = gsap.quickTo(cursorRef.current, 'y', { duration: 0.15, ease: 'power3' });
        
        const handleMouseMove = (e: MouseEvent) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        
        return () => {
          window.removeEventListener('mousemove', handleMouseMove);
        };
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Cursor Hover Effects
  const onMouseEnterCard = () => {
    if(cursorLabelRef.current && cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.3 });
    }
  };

  const onMouseLeaveCard = () => {
    if(cursorLabelRef.current && cursorRef.current) {
        gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.3 });
    }
  };

  return (
    <div ref={sectionRef} className="min-h-screen bg-[#0a0f1c] text-white">
      <Header 
        data={{
          logo: '/images/logos.png',
          menu: ['HOME', 'WORK', 'SERVICES', 'ABOUT US', 'BLOGS'],
          cta: 'CONTACT US'
        }} 
      />

      <div className="container mx-auto px-4 py-20">

        {/* ✅ HERO */}
        <div className="text-center max-w-4xl mx-auto mb-32">
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl font-bold mb-6 opacity-0"
          >
            BEGINS WITH SPARK <br />
            <span className="text-red-500">WE MAKE IT SHINE</span>
          </h1>
          <p className="text-gray-400 text-lg">
            We turn ideas into powerful visual experiences.
          </p>
        </div>

        {/* ✅ SERVICES SECTION (RED LEFT + IMAGE RIGHT) */}
        <div className="space-y-32">
          {servicesData.map((category, index) => (
            <div
              key={category._id}
              className="service-section grid grid-cols-1 lg:grid-cols-2 min-h-[600px]"
            >
              {/* ✅ LEFT RED PANEL */}
              <div className="bg-red-600 p-10 md:p-16 flex flex-col justify-center">
                <div className="mb-6 text-sm font-bold opacity-80">
                  {String(index + 1).padStart(2, '0')}
                </div>

                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  {category.title.toUpperCase()}
                </h2>

                <p className="text-white/90 mb-10 max-w-lg">
                  {category.description}
                </p>

                <ul className="space-y-5">
                  {category.services.map((service) => (
                    <li key={service._id} className="service-item opacity-0">
                      <div className="flex items-center justify-between border-b border-white/30 pb-3">
                        <span className="text-sm md:text-base tracking-wide font-semibold">
                          {service.title}
                        </span>
                        <span className="text-white/60">→</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ✅ RIGHT IMAGE / VIDEO PANEL */}
              <div className="relative h-[400px] md:h-full overflow-hidden bg-gray-100">
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority={index === 0}
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII="
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
