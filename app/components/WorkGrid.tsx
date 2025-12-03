'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Mock Sanity data - replace with actual Sanity fetch
export interface WorkItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  mainImage: string;
  featured?: boolean;
}

const mockWorks: WorkItem[] = [
  { _id: '1', title: 'DANKIRA', slug: 'dankira', category: 'tv-commercial', mainImage: '/images/dankira.png', featured: true },
  { _id: '2', title: 'KOBA', slug: 'koba', category: 'campaign', mainImage: '/images/service02.png', featured: true },
  { _id: '3', title: 'SAFARICOM', slug: 'safaricom', category: 'storytelling', mainImage: '/images/service03.png', featured: true },
  { _id: '4', title: 'DANKIRA', slug: 'dankira-2', category: 'tv-commercial', mainImage: '/images/service04.png', featured: true },
  { _id: '5', title: 'DANKIRA', slug: 'dankira-3', category: 'tv-commercial', mainImage: '/images/service05.png', featured: true },
  { _id: '6', title: 'KOBA', slug: 'koba-2', category: 'campaign', mainImage: '/images/service01.png', featured: true },
  { _id: '7', title: 'SAFARICOM', slug: 'safaricom-2', category: 'storytelling', mainImage: '/images/service02.png', featured: true },
  { _id: '8', title: 'DANKIRA', slug: 'dankira-4', category: 'tv-commercial', mainImage: '/images/service03.png', featured: true },
];

interface OurWorkSectionProps {
  works: WorkItem[];
}

// Custom hook for intersection observer
function useIntersectionObserver() {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    // Only run in browser
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return [ref, isIntersecting] as const;
}

export default function OurWorkSection({ works: initialWorks }: OurWorkSectionProps) {
  const [displayedWorks, setDisplayedWorks] = useState<WorkItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const [sectionRef, isSectionVisible] = useIntersectionObserver();

  useEffect(() => {
    // Only run on client side
    setIsMounted(true);
    setDisplayedWorks(mockWorks.slice(0, 8));
  }, []);

  // If not mounted yet, return a skeleton
  if (!isMounted) {
    return (
      <section className="relative bg-[#1a2332] text-white py-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-800 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      className="relative bg-[#1a2332] text-white py-20 px-4 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-red-600 text-sm font-bold tracking-widest mb-4 transition-all duration-1000">
            OUR WORK
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 transition-all duration-1000">
            OUR WORK, OUR VOICE
          </h2>
        </div>

        {/* Work Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {displayedWorks.map((work, index) => (
            <Link 
              key={work._id}
              href={`/work/${work.slug}`}
              className={`group block transition-all duration-1000 ${
                isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-lg bg-gray-800">
                <div className="relative aspect-[4/3] bg-gray-700">
                  <Image
                    src={work.mainImage}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white font-medium text-lg">View Project</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{work.title}</h3>
                  <p className="text-gray-400 text-sm uppercase tracking-wider">{work.category}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: `${displayedWorks.length * 100}ms` }}
        >
          <Link 
            href="/works"
            className="inline-flex items-center gap-3 px-8 py-3 border border-white text-white hover:bg-white hover:text-black transition-all duration-300 group"
          >
            <span className="font-medium tracking-wide">VIEW ALL PROJECTS</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none" />
      </div>
    </section>
  );
}