'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type Client = {
  id: number;
  name: string;
  logo: string;
};

const clients: Client[] = [
  { id: 1, name: 'Nike', logo: '/images/nike.png' },
  { id: 2, name: 'Coop Bank of Oromia', logo: '/images/coop.png' },
  { id: 3, name: 'Barkas', logo: '/images/barkas.png' },
  { id: 4, name: 'BlueSky Africa', logo: '/images/bluesky.png' },
  { id: 5, name: 'Ahoy Films', logo: '/images/ahoy.png' },
  { id: 6, name: 'African Fixer', logo: '/images/fixer.png' },
  { id: 7, name: 'Ethiopian Airlines', logo: '/images/airlines.png' },
  { id: 8, name: 'Cisco', logo: '/images/cisco.png' },
  { id: 9, name: 'Deutsche Produktions Union', logo: '/images/deutsche.png' },
  { id: 10, name: 'International Trade Centre', logo: '/images/itc.png' },
  { id: 11, name: 'NOC', logo: '/images/oil.png' },
  { id: 12, name: 'Office of the Prime Minister', logo: '/images/fdre.png' },
];

const TrustedBy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Animate main title
    if (mainTitleRef.current) {
      gsap.from(mainTitleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
    }

    // Animate subtitle
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.1,
        ease: 'power3.out',
      });
    }

    // Animate brand logos with staggered delay
    if (itemsRef.current.length > 0) {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            delay: index * 0.05,
            ease: 'power3.out',
          });
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-black text-white border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p 
            ref={titleRef}
            className="text-sm uppercase tracking-widest text-gray-400 mb-2"
          >
            OUR CLIENTS
          </p>
          <h2
            ref={mainTitleRef}
            className="text-4xl md:text-5xl font-bold uppercase tracking-tight"
          >
            TRUSTED BY
          </h2>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-12">
            {clients.map((client, index) => (
              <div
                key={client.id}
                ref={(el) => setItemRef(el, index)}
                className="flex items-center justify-center p-4 h-32 bg-gray-900/50 hover:bg-gray-800/50 transition-colors duration-300"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    fill
                    className="object-contain p-4 grayscale hover:grayscale-0 transition-all duration-300"
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;