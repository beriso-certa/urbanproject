'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Service {
  id: number;
  number: string;
  title: string;
  description: string;
  detailedDescription: string;
}

const Services = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const hoverDetailsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'CONTENT CREATION',
      description: 'We craft compelling content that tells your brand story and engages your audience across all platforms.',
      detailedDescription: 'We create films, campaigns, and digital content that make brands impossible to ignore. From bold commercials to heartfelt documentaries we bring stories to life, frame by frame.'
    },
    {
      id: 2,
      number: '02',
      title: 'CREATIVE DIRECTION & PRODUCTION',
      description: 'From concept to execution, we bring creative visions to life with stunning visuals and seamless production.',
      detailedDescription: 'We develop comprehensive creative strategies with meticulous attention to detail. Every shot, every frame, every moment is crafted to deliver maximum impact and engage your audience.'
    },
    {
      id: 3,
      number: '03',
      title: 'STRATEGY & STORYTELLING',
      description: 'We develop powerful narratives and strategic approaches that connect with your audience and drive results.',
      detailedDescription: 'We craft narratives that resonate deeply with your audience. Our strategic storytelling approach transforms complex ideas into compelling visual journeys that drive measurable results.'
    }
  ];

  useEffect(() => {
    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Tagline animation
    gsap.fromTo(
      taglineRef.current,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Button animation
    gsap.fromTo(
      buttonRef.current,
      { x: -20, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );

    // Services items animation
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.6 + (index * 0.1),
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });
  }, []);

  const handleMouseEnter = (index: number, id: number) => {
    setHoveredId(id);
    const detailsEl = hoverDetailsRef.current[index];
    
    if (detailsEl) {
      gsap.fromTo(
        detailsEl,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
        }
      );
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredId(null);
    const detailsEl = hoverDetailsRef.current[index];
    
    if (detailsEl) {
      gsap.to(
        detailsEl,
        {
          opacity: 0,
          y: 20,
          duration: 0.3,
          ease: 'power2.in'
        }
      );
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-[#101820] w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 
              ref={titleRef}
              className="text-4xl md:text-5xl font-bold text-white mb-4 uppercase"
            >
              OUR SERVICE
            </h2>
            <p 
              ref={taglineRef}
              className="text-lg text-gray-300"
            >
              We don't just produce we create stories that connect.
            </p>
          </div>
          <a
            ref={buttonRef}
            href="#services"
            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors duration-300"
          >
            SERVICES
            <ArrowRight size={16} />
          </a>
        </div>

        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              ref={el => { itemsRef.current[index] = el; }}
              onMouseEnter={() => handleMouseEnter(index, service.id)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="group relative py-8 border-b border-gray-800 last:border-0 cursor-pointer"
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white text-lg font-bold flex-shrink-0 group-hover:bg-red-600 group-hover:border-red-600 transition-colors duration-300">
                  {service.number}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-gray-400">
                    {service.description}
                  </p>
                </div>
                <div className="ml-auto">
                  <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#101820] transition-colors duration-300">
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>

              {/* Hover Details Panel */}
              <div
                ref={el => { hoverDetailsRef.current[index] = el; }}
                className="mt-8 pl-20 opacity-0 pointer-events-none"
              >
                <div className="bg-gradient-to-r from-red-600 to-white-700 rounded-lg p-8 text-white">
                  <h4 className="text-2xl font-bold mb-4 uppercase">{service.title}</h4>
                  <p className="text-base leading-relaxed">
                    {service.detailedDescription}
                  </p>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="text-sm font-semibold">Learn More</span>
                    <ArrowRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;