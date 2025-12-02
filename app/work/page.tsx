'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
  
// Mock data - replace with Sanity fetch
const mockWorks = [
  { _id: '1', title: 'DANKIRA', slug: 'dankira', category: 'tv-commercial', image: '/images/Safaricom1.png' },
  { _id: '2', title: 'KOBA', slug: 'koba', category: 'campaign', image: '/images/service02.png' },
  { _id: '3', title: 'SAFARICOM', slug: 'safaricom', category: 'storytelling', image: '/images/service03.png' },
  { _id: '4', title: 'DANKIRA', slug: 'dankira-2', category: 'tv-commercial', image: '/images/service04.png' },
  { _id: '5', title: 'DANKIRA', slug: 'dankira-3', category: 'tv-commercial', image: '/images/service05.png' },
  { _id: '6', title: 'KOBA', slug: 'koba-2', category: 'campaign', image: '/images/service01.png' },
  { _id: '7', title: 'SAFARICOM', slug: 'safaricom-2', category: 'storytelling', image: '/images/service02.png' },
  { _id: '8', title: 'DANKIRA', slug: 'dankira-4', category: 'tv-commercial', image: '/images/service03.png' },
];

export default function WorksPage() {
  const [filter, setFilter] = useState('ALL');
  const [filteredWorks, setFilteredWorks] = useState(mockWorks);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter works when filter changes
  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredWorks(mockWorks);
    } else {
      setFilteredWorks(mockWorks.filter(work => work.category === filter.toLowerCase().replace(' ', '-')));
    }
  }, [filter]);

  // Scroll animations
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
  }, [filteredWorks]);

  const categories = ['ALL', 'TV COMMERCIAL', 'STORYTELLING', 'CAMPAIGN'];

  // Header data
  const headerData = {
    logo: '/images/logos.png',
    menu: ['HOME', 'WORK', 'SERVICES', 'ABOUT US', 'BLOGS'],
    cta: 'CONTACT US'
  };

  return (
    <div className="min-h-screen bg-[#1a1f2e] text-white" ref={sectionRef}>
       <Header data={headerData} />
      {/* Hero Section */}
      <div className="relative h-[60vh] flex items-center justify-center px-4">

        <div className="max-w-7xl mx-auto text-center">
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight fade-in opacity-0 translate-y-8 transition-all duration-1000"
          >
            THE WORK<br />SAYS IT ALL.
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            We let our craft, creativity, and passion<br />speak louder than words.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="flex flex-wrap justify-start gap-4 mb-12">
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 border transition-all duration-300 fade-in opacity-0 translate-y-4 ${
                filter === category
                  ? 'bg-white text-black border-white'
                  : 'bg-transparent text-white border-white hover:bg-white hover:text-black'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Work Grid - Masonry Style */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredWorks.map((work, index) => (
            <Link 
              key={work._id}
              href={`/work/${work.slug}`}
              className="group block fade-in opacity-0 translate-y-8 transition-all duration-1000"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden bg-gray-800 rounded-lg">
                {/* Image */}
                <div className={`relative ${index % 3 === 0 ? 'aspect-[3/4]' : 'aspect-[4/3]'} bg-gray-700`}>
                  <Image
                    src={work.image}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-bold text-white">
                      {work.title}
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Spacer */}
      <div className="h-20" />
      <Footer />
    </div>
  );
}