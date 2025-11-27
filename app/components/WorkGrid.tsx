'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import { Work } from '@/types';

gsap.registerPlugin(ScrollTrigger);

interface WorkGridProps {
  works: Work[];
}

const WorkGrid = ({ works }: WorkGridProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

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

    // Button animation
    gsap.fromTo(
      buttonRef.current,
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

    // Work items animation
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: 0.1 * index,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            }
          }
        );
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-4 bg-white w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-5xl font-bold text-black mb-8 uppercase"
          >
            OUR WORK, OUR VOICE
          </h2>
          <Link
            ref={buttonRef}
            href="/work"
            className="flex items-center gap-2 px-6 py-3 border-2 border-black text-black text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300"
          >
            VIEW ALL PROJECTS
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          {works.slice(0, 4).map((work, index) => (
            <div
              key={work._id}
              ref={el => itemsRef.current[index] = el}
              className="group relative overflow-hidden bg-white border border-gray-200 hover:border-black transition-all duration-300"
            >
              <Link href={`/work/${work.slug?.current || '#'}`} className="block h-full">
                <div className="relative h-96 w-full overflow-hidden">
                  <Image
                    src={urlFor(work.mainImage).url()}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 flex justify-between items-center">
                  <h3 className="text-xl font-bold uppercase tracking-wide">
                    {work.title}
                  </h3>
                  <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center group-hover:bg-white group-hover:text-black border-2 border-black transition-colors duration-300">
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkGrid;