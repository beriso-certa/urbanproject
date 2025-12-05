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
  { _id: '1', title: 'DANKIRA', slug: 'dankira', category: 'tv-commercial', mainImage: '/images/dankira.png', featured: true },
  { _id: '2', title: 'KOBA', slug: 'koba', category: 'campaign', mainImage: '/images/koba.png', featured: true },
  { _id: '3', title: 'SAFARICOM', slug: 'safaricom', category: 'storytelling', mainImage: '/images/safaricomworks.png', featured: true },
  { _id: '4', title: 'DANKIRA', slug: 'dankira-2', category: 'tv-commercial', mainImage: '/images/dankira03.png', featured: true },
    { _id: '1', title: 'DANKIRA', slug: 'dankira', category: 'tv-commercial', mainImage: '/images/dankira.png', featured: true },
  { _id: '2', title: 'KOBA', slug: 'koba', category: 'campaign', mainImage: '/images/koba.png', featured: true },
  { _id: '3', title: 'SAFARICOM', slug: 'safaricom', category: 'storytelling', mainImage: '/images/safaricomworks.png', featured: true }, 
  { _id: '5', title: 'DANKIRA', slug: 'dankira-3', category: 'tv-commercial', mainImage: '/images/dankira03.png', featured: true },
  { _id: '6', title: 'KOBA', slug: 'koba-2', category: 'campaign', mainImage: '/images/service01.png', featured: true },
  { _id: '7', title: 'SAFARICOM', slug: 'safaricom-2', category: 'storytelling', mainImage: '/images/service02.png', featured: true },
  { _id: '8', title: 'DANKIRA', slug: 'dankira-4', category: 'tv-commercial', mainImage: '/images/service03.png', featured: true },
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
      className="relative bg-[#1a2332] text-white py-20 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
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

        {/* Work Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12"
        >
          {displayedWorks.map((work, index) => (
            <Link 
              key={work._id}
              href={`/works/${work.slug}`}
              className="group block fade-in opacity-0 translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-800">
                {/* Image Container */}
                <div className="relative aspect-[4/2] bg-gray-700">
                  <Image
                    src={work.mainImage}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 500px) 50vw, 50vw"
                  />
                  
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Title and Arrow Overlay */}
                <div className="absolute bottom-0 left-4 right-4 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                  <div className="flex items-center ">
                    <h3 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wide">
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

        {/* View All Button */}
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

      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}