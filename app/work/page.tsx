'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/layout/Footer';

interface HeroCardProps {
  image: string;
  style: React.CSSProperties;
  className?: string;
}

const HeroCard = ({ image, style, className = '' }: HeroCardProps) => (
  <div
    className={`absolute w-24 h-32 md:w-32 md:h-40 rounded-xl overflow-hidden shadow-2xl transform transition-all duration-700 ${className}`}
    style={style}
  >
    <img
      src={image}
      alt="Portfolio"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
  </div>
);

const HoverImages = () => {
  const images = [
    '/images/workhover1.jpg',
    '/images/workhover2.jpg',
    '/images/workhover3.jpg',
    '/images/workhover4.jpg'
  ];

  const positions = [
    { top: '5%', left: '5%', transform: 'rotate(-5deg)' },
    { top: '5%', right: '5%', transform: 'rotate(5deg)' },
    { bottom: '5%', left: '5%', transform: 'rotate(5deg)' },
    { bottom: '5%', right: '5%', transform: 'rotate(-5deg)' }
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {images.map((src, index) => (
        <div 
          key={index}
          className="absolute w-32 h-40 md:w-48 md:h-60 rounded-lg overflow-hidden shadow-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"
          style={{
            ...positions[index],
            transitionDelay: `${index * 100}ms`,
            transform: `${positions[index].transform} scale(0.9)`,
            zIndex: 10 + index,
          }}
        >
          <img
            src={src}
            alt={`Work ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
};

// Mock data
const mockWorks = [
  { _id: '1', title: 'DANKIRA', slug: 'dankira', category: 'tv-commercial', mainImage: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&h=300&fit=crop' },
  { _id: '2', title: 'KOBA', slug: 'koba', category: 'campaign', mainImage: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop' },
  { _id: '3', title: 'SAFARICOM', slug: 'safaricom', category: 'storytelling', mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop' },
  { _id: '4', title: 'DANKIRA', slug: 'dankira-2', category: 'tv-commercial', mainImage: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400&h=300&fit=crop' },
  { _id: '5', title: 'DANKIRA', slug: 'dankira-3', category: 'tv-commercial', mainImage: 'https://images.unsplash.com/photo-1553531088-ebc8d81eb397?w=400&h=300&fit=crop' },
  { _id: '6', title: 'KOBA', slug: 'koba-2', category: 'campaign', mainImage: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=400&h=300&fit=crop' },
  { _id: '7', title: 'SAFARICOM', slug: 'safaricom-2', category: 'storytelling', mainImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop' },
  { _id: '8', title: 'DANKIRA', slug: 'dankira-4', category: 'tv-commercial', mainImage: 'https://images.unsplash.com/photo-1611339555312-e607c90352fd?w=400&h=300&fit=crop' },
];

export default function WorksPage() {
  const [filter, setFilter] = useState('ALL');
  const [filteredWorks, setFilteredWorks] = useState(mockWorks);
  const heroRef = useRef(null);
  const gridRef = useRef(null);

  // Filter works
  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredWorks(mockWorks);
    } else {
      setFilteredWorks(
        mockWorks.filter(work =>
          work.category === filter.toLowerCase().replace(' ', '-')
        )
      );
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

  return (
    <div className="min-h-screen bg-[#101820]">
      {/* Header */}
     <Header />

      {/* Hero Section */}
      <div
        ref={heroRef}
        className="relative w-full h-screen md:h-[800px] bg-[#101820] flex items-center justify-center overflow-hidden cursor-pointer group"
      >
        {/* Main Content */}
        <div className="relative z-10 text-center px-4 md:px-8 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-6 leading-tight">
            THE WORK SAYS IT ALL.
          </h1>
          <p className="text-base md:text-lg text-gray-300 font-light tracking-wide">
            We let our craft, creativity, and passion
            <br />
            speak louder than words.
          </p>
        </div>

        {/* Hover Images - Only displayed on hover */}
        <HoverImages />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 text-sm font-semibold tracking-wider rounded transition-all duration-300 ${
                filter === category
                  ? 'bg-white text-black'
                  : 'bg-transparent border border-white/30 text-white hover:border-white/60'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {filteredWorks.map((work, index) => (
            <a
              key={work._id}
              href={`/works/${work.slug}`}
              className="group fade-in opacity-0 translate-y-8 transition-all duration-1000 relative rounded-2xl overflow-hidden cursor-pointer"
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                height: '360px',
                aspectRatio: '630/504',
              }}
            >
              <div className="relative w-full h-full">
                <img
                  src={work.mainImage}
                  alt={work.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                />
                <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
                  <div className="flex items-center gap-4">
                    <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-white leading-tight">
                      {work.title}
                    </h3>
                    <div className="w-12 h-12 rounded-lg bg-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <ArrowRight className="w-6 h-6 text-white" strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {filteredWorks.length === 0 && (
          <div className="flex items-center justify-center py-20">
            <p className="text-gray-400 text-lg">No works found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}