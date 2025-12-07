'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Mock Sanity data - replace with actual Sanity fetch
interface WorkItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  mainImage: string;
  featured?: boolean;
}

const mockWorks: WorkItem[] = [
 
  { _id: '1', title: 'dankira', slug: 'koba-2', category: 'campaign', mainImage: '/images/dankira01.jpg', featured: true },
  { _id: '2', title: 'SAFARICOM 2', slug: 'safaricom-2', category: 'storytelling', mainImage: '/images/service02.png', featured: true },
  { _id: '3', title: 'DANKIRA 3', slug: 'dankira-4', category: 'tv-commercial', mainImage: '/images/service03.png', featured: true },
    { _id: '2', title: 'SAFARICOM 2', slug: 'safaricom-2', category: 'storytelling', mainImage: '/images/service02.png', featured: true },
  { _id: '4', title: 'DANKIRA 3', slug: 'dankira-4', category: 'tv-commercial', mainImage: '/images/service03.png', featured: true },
  
];

interface OurWorkSectionProps {
  works: WorkItem[];
}

export default function OurWorkSection({ works: initialWorks }: OurWorkSectionProps) {
  const [displayedWorks, setDisplayedWorks] = useState<WorkItem[]>(initialWorks || []);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show first 8 works
    setDisplayedWorks(mockWorks.slice(0, 8));
  }, []);

  // GSAP-like scroll animations
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
    
    {/* ✅ HEADER */}
    <div className="text-center mb-16">
      <p className="text-red-600 text-sm font-bold tracking-widest mb-4 fade-in opacity-0 translate-y-4 transition-all duration-1000">
        OUR WORK
      </p>
      <h2 
        ref={titleRef}
        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-100"
      >
        OUR WORK, OUR VOICE
      </h2>
    </div>

    {/* ✅ WORK GRID — MATCHES IMAGE */}
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-16 justify-center"
    >
      {displayedWorks.map((work, index) => (
        <Link 
          key={work._id}
          href={`/works/${work.slug}`}
          className="group fade-in opacity-0 translate-y-8 transition-all duration-1000"
          style={{ transitionDelay: `${200 + index * 100}ms` }}
        >
          <div
            className="relative overflow-hidden bg-[#1c2533]"
            style={{
              width: '630px',
              height: '504px',
              borderRadius: '16px',
            }}
          >
            {/* ✅ IMAGE */}
            <div className="relative w-full h-full">
              <Image
                src={work.mainImage}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="630px"
              />

              {/* ✅ DARK OVERLAY */}
              <div className="absolute inset-0 bg-black/30 opacity-100 group-hover:bg-black/40 transition-all duration-300" />
            </div>

            {/* ✅ TITLE + RED ARROW (BOTTOM LEFT) */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-4">
                <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-wide">
                  {work.title}
                </h3>

                <div className="w-10 h-10 rounded-sm bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5 text-white" strokeWidth={2} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>

    {/* ✅ VIEW ALL BUTTON */}
    <div className="text-center fade-in opacity-0 translate-y-4 transition-all duration-1000 delay-1000">
      <Link 
        href="/works"
        className="inline-flex items-center gap-3 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 group"
      >
        <span className="font-medium tracking-wide">VIEW ALL PROJECTS</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </Link>
    </div>
  </div>

  {/* ✅ BACKGROUND GLOW ELEMENTS */}
  <div className="absolute top-20 left-10 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
  <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
</section>

  );
}