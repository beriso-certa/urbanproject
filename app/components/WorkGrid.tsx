'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface WorkItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  mainImage: string;
  featured?: boolean;
}

const mockWorks: WorkItem[] = [
 { 
    _id: '1', 
    title: 'DANKIRA', 
    slug: 'dankira-1', 
    category: 'campaign', 
    mainImage: '/images/dankira01.jpg',  // Added leading slash
    featured: true 
  },
  { _id: '2', title: 'KOBA', slug: 'koba-1', category: 'storytelling', mainImage: '/images/koba1.png', featured: true },
  { _id: '3', title: 'SAFARICOM', slug: 'safaricom-1', category: 'campaign', mainImage: '/images/safaricom01.jpg', featured: true },
  { _id: '4', title: 'DANKIRA', slug: 'dankira-2', category: 'tv-commercial', mainImage: '/images/safaricom04.jpg', featured: true },
   { 
    _id: '5', 
    title: 'DANKIRA', 
    slug: 'dankira-1', 
    category: 'campaign', 
    mainImage: '/images/dankira01.jpg',  // Added leading slash
    featured: true 
  },
  { _id: '6', title: 'KOBA', slug: 'koba-1', category: 'storytelling', mainImage: '/images/koba1.png', featured: true },
  { _id: '7', title: 'SAFARICOM', slug: 'safaricom-1', category: 'campaign', mainImage: '/images/safaricom01.jpg', featured: true },
  { _id: '8', title: 'DANKIRA', slug: 'dankira-2', category: 'tv-commercial', mainImage: '/images/safaricom04.jpg', featured: true },
];

interface OurWorkSectionProps {
  works?: WorkItem[];
}

export default function OurWorkSection({ works: initialWorks }: OurWorkSectionProps) {
  const [displayedWorks, setDisplayedWorks] = useState<WorkItem[]>(mockWorks);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setDisplayedWorks(mockWorks.slice(0, 8));
  }, []);

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
  }, [displayedWorks]);

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#0e1623] text-white py-24 px-4 overflow-hidden"
    >
      <div className="max-w-[1280px] mx-auto">
        
        {/* HEADER */}
        <div className="text-center mb-20">
          <p className="text-red-600 text-sm font-bold tracking-widest mb-4 fade-in opacity-0 translate-y-4 transition-all duration-1000">
            OUR WORK
          </p>
          <h2 
            className="text-5xl md:text-6xl lg:text-7xl font-bold fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-100"
          >
            OUR WORK, OUR VOICE
          </h2>
        </div>

        {/* GRID - 2x2 Layout */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-20"
          style={{
            maxWidth: '1280px',
            height: 'auto'
          }}
        >
          {displayedWorks.map((work, index) => (
            <Link 
              key={work._id}
              href={`/works/${work.slug}`}
              className="group fade-in opacity-0 translate-y-8 transition-all duration-1000 relative rounded-2xl overflow-hidden"
              style={{ 
                transitionDelay: `${200 + index * 100}ms`,
                aspectRatio: '5/4',
              }}
            >
              {/* Image */}
              <div className="relative w-full h-full">
                <Image
                  src={work.mainImage}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient overlay - stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                
                {/* Content - Bottom positioned */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  {/* Title + Arrow */}
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white">
                      {work.title}
                    </h3>
                    
                    <div 
                      className="w-12 h-12 rounded-lg bg-[#E31C23] flex items-center justify-center 
                                 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                    >
                      <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* VIEW ALL BUTTON */}
        <div className="text-center fade-in opacity-0 translate-y-4 transition-all duration-1000 delay-1000">
          <Link 
            href="/works"
            className="inline-flex items-center gap-3 px-8 py-4 border-2 border-white text-white 
                       hover:bg-white hover:text-[#0e1623] transition-all duration-300 group rounded-lg font-medium tracking-wide"
          >
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* BACKGROUND GLOW */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}