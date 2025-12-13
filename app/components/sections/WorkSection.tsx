'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { Play } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const workItems = [
  {
    id: 1,
    title: 'I BUILT REFRESHING',
    category: 'Content Creation',
    image: '/images/work-1.jpg',
    video: '/videos/work-1.mp4',
  },
  {
    id: 2,
    title: 'SUMMER VIBES',
    category: 'Brand Film',
    image: '/images/work-2.jpg',
    video: '/videos/work-2.mp4',
  },
  {
    id: 3,
    title: 'URBAN NIGHTS',
    category: 'Event Coverage',
    image: '/images/work-3.jpg',
    video: '/videos/work-3.mp4',
  },
  {
    id: 4,
    title: 'STREET STYLE',
    category: 'Fashion',
    image: '/images/work-4.jpg',
    video: '/videos/work-4.mp4',
  },
  {
    id: 5,
    title: 'CITY LIGHTS',
    category: 'Travel',
    image: '/images/work-5.jpg',
    video: '/videos/work-5.mp4',
  },
  {
    id: 6,
    title: 'FUTURE SOUNDS',
    category: 'Music Video',
    image: '/images/work-6.jpg',
    video: '/videos/work-6.mp4',
  },
];

export function WorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Animate title
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    );

    // Animate grid items
    gsap.utils.toArray('.work-item').forEach((item: any, i) => {
      gsap.fromTo(
        item,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  });

  return (
    <section ref={sectionRef} className="py-20 md:py-32 bg-dark text-white">
      <div className="container mx-auto px-4">
        <h2 
          ref={titleRef} 
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-16 text-center"
        >
          <span className="block">OUR WORK,</span>
          <span className="text-red-600">OUR VOICE</span>
        </h2>

        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {workItems.map((item) => (
            <div 
              key={item.id} 
              className="work-item group relative overflow-hidden rounded-lg aspect-video bg-gray-900"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-6 h-6 ml-1" />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-sm text-red-600 font-medium mb-1">{item.category}</p>
                <h3 className="text-xl font-bold">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button className="px-8 py-3 border-2 border-white text-white font-medium uppercase tracking-wider rounded-full hover:bg-white hover:text-dark transition-colors duration-300">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
