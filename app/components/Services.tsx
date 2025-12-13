'use client';

import { useRef, useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';

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
  const hoverPanelsRef = useRef<(HTMLDivElement | null)[]>([]);
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
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (index: number, id: number) => {
    setHoveredId(id);
    const hoverPanel = hoverPanelsRef.current[index];
    const serviceItem = itemsRef.current[index];
    
    if (hoverPanel) {
      hoverPanel.style.opacity = '1';
      hoverPanel.style.pointerEvents = 'auto';
      hoverPanel.style.maxHeight = '400px';
      
      const contentElements = hoverPanel.querySelectorAll('[data-hover-content]');
      contentElements.forEach((el, i) => {
        const element = el as HTMLElement;
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });
    }

    if (serviceItem) {
      serviceItem.style.backgroundColor = 'rgba(220, 38, 38, 0.1)';
    }
  };

  const handleMouseLeave = (index: number) => {
    setHoveredId(null);
    const hoverPanel = hoverPanelsRef.current[index];
    const serviceItem = itemsRef.current[index];

    if (hoverPanel) {
      hoverPanel.style.opacity = '0';
      hoverPanel.style.pointerEvents = 'none';
      hoverPanel.style.maxHeight = '0px';
      
      const contentElements = hoverPanel.querySelectorAll('[data-hover-content]');
      contentElements.forEach((el) => {
        const element = el as HTMLElement;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
      });
    }

    if (serviceItem) {
      serviceItem.style.backgroundColor = 'transparent';
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="w-full py-24 px-4 md:px-6 bg-[#101820]"
      style={{
        paddingTop: '96px',
        paddingBottom: '96px',
        gap: '48px'
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-24 gap-8 fade-in opacity-0 translate-y-8 transition-all duration-1000">
          <div className="max-w-3xl">
            <h2 
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 uppercase tracking-wider"
            >
              OUR SERVICE
            </h2>
            <p 
              ref={taglineRef}
              className="text-lg md:text-xl text-gray-300 font-light"
            >
              We don't just produce we create stories that connect.
            </p>
          </div>
          
          <a
            ref={buttonRef}
            href="#services"
            className="flex items-center justify-center gap-2 px-8 py-4 bg-red-600 text-white text-sm font-bold hover:bg-red-700 transition-all duration-300 uppercase tracking-wider"
          >
            SERVICES
            <ArrowRight size={16} strokeWidth={3} />
          </a>
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 mb-12" />

        {/* Services List */}
        <div className="space-y-0">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative fade-in opacity-0 translate-y-8 transition-all duration-1000"
              style={{
                transitionDelay: `${200 + index * 100}ms`
              }}
            >
              {/* Main Service Item */}
              <div
                ref={el => { itemsRef.current[index] = el; }}
                onMouseEnter={() => handleMouseEnter(index, service.id)}
                onMouseLeave={() => handleMouseLeave(index)}
                className="relative py-12 px-8 cursor-pointer group transition-all duration-300 border-b border-gray-700/50"
              >
                <div className="flex items-center justify-between gap-8">
                  {/* Left - Number and Title */}
                  <div className="flex items-center gap-8 flex-1">
                    {/* Circular Number */}
                    <div className="w-20 h-20 rounded-full border-2 border-gray-400 flex items-center justify-center text-white text-xl font-bold flex-shrink-0 group-hover:border-red-600 group-hover:text-red-600 transition-all duration-300">
                      {service.number}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-3xl lg:text-4xl font-bold text-white uppercase tracking-wider group-hover:text-red-600 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                  </div>

                  {/* Right - Arrow */}
                  <div className="flex-shrink-0 transform group-hover:rotate-45 transition-transform duration-300">
                    <ArrowRight size={32} className="text-gray-400 group-hover:text-red-600 transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
              </div>

              {/* Hover Details Panel */}
              <div
                ref={el => {
                  if (el) {
                    hoverPanelsRef.current[index] = el;
                  }
                }}
                className="relative bg-white overflow-hidden transition-all duration-500"
                style={{
                  opacity: 0,
                  pointerEvents: 'none',
                  maxHeight: '0px'
                }}
              >
                <div className="py-16 px-8">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl">
                    {/* Number Column */}
                    <div 
                      data-hover-content
                      style={{
                        opacity: 0,
                        transform: 'translateY(20px)',
                        transition: 'opacity 0.4s ease, transform 0.4s ease'
                      }}
                    >
                      <div className="text-red-600 text-6xl font-bold">
                        {service.number}
                      </div>
                    </div>

                    {/* Title and Description Column */}
                    <div className="md:col-span-3">
                      <h4 
                        data-hover-content
                        style={{
                          opacity: 0,
                          transform: 'translateY(20px)',
                          transition: 'opacity 0.4s ease, transform 0.4s ease'
                        }}
                        className="text-4xl font-bold text-red-600 mb-6 uppercase tracking-wide"
                      >
                        {service.title}
                      </h4>
                      
                      <p 
                        data-hover-content
                        style={{
                          opacity: 0,
                          transform: 'translateY(20px)',
                          transition: 'opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s'
                        }}
                        className="text-lg text-gray-700 leading-relaxed mb-8 font-light"
                      >
                        {service.detailedDescription}
                      </p>
                      
                      <div 
                        data-hover-content
                        style={{
                          opacity: 0,
                          transform: 'translateY(20px)',
                          transition: 'opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s'
                        }}
                        className="flex items-center text-red-600 font-bold text-lg cursor-pointer group/link hover:translate-x-2 transition-transform duration-300"
                      >
                        Learn more
                        <ArrowRight className="ml-3" size={24} strokeWidth={2.5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-700 mt-0" />
      </div>
    </section>
  );
};

export default Services;