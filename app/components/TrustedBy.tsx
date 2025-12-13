'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image, { StaticImageData } from 'next/image';
import nikeLogo from '../../public/images/nike.png';
import coopLogo from '../../public/images/coop.png';
import baraksLogo from '../../public/images/barkas.png';
import blueskyLogo from '../../public/images/bluesky.png';
import ahoyLogo from '../../public/images/ahoy.png';
import africanLogo from '../../public/images/africa.png';
import ethiopianLogo from '../../public/images/airlines.png';
import ciscoLogo from '../../public/images/cisco.png';
import destuecheproduktionsunionLogo from '../../public/images/deutsche.png';
import nocLogo from '../../public/images/oil.png';
import internationalTradeCentreLogo from '../../public/images/itc.png';
import officeOfThePrimeMinisterLogo from '../../public/images/fdre.png';

gsap.registerPlugin(ScrollTrigger);

export type Client = {
  id: number;
  name: string;
  logo: string | StaticImageData;
};

const clients: Client[] = [
  { id: 1, name: 'Nike', logo: nikeLogo },
  { id: 2, name: 'Coop Bank of Oromia', logo: coopLogo },
  { id: 3, name: 'Barkas', logo:  baraksLogo },
  { id: 4, name: 'BlueSky Africa', logo: blueskyLogo },
  { id: 5, name: 'Ahoy Films', logo: ahoyLogo },
  { id: 6, name: 'African', logo: africanLogo },
  { id: 7, name: 'Ethiopian Airlines', logo: ethiopianLogo },
  { id: 8, name: 'Cisco', logo: ciscoLogo },
  { id: 9, name: 'Deutsche Produktions Union', logo: destuecheproduktionsunionLogo },
  { id: 10, name: 'International Trade Centre', logo: internationalTradeCentreLogo },
  { id: 11, name: 'NOC', logo: nocLogo },
  { id: 12, name: 'Office of the Prime Minister', logo: officeOfThePrimeMinisterLogo },
];

const TrustedBy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const setItemRef = (el: HTMLDivElement | null, index: number) => {
    itemsRef.current[index] = el;
  };

  useEffect(() => {
    // Animate subtitle
    if (subtitleRef.current) {
      gsap.fromTo(
        subtitleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ease: 'power3.out',
        }
      );
    }

    // Animate main title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          ease: 'power3.out',
        }
      );
    }

    // Animate brand logos with staggered delay
    if (itemsRef.current.length > 0) {
      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 30, opacity: 0, scale: 0.9 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.6,
              delay: 0.2 + (index * 0.05),
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
              ease: 'power3.out',
            }
          );
        }
      });
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black text-white py-24 px-4 border-t border-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-20">
          <p
            ref={subtitleRef}
            className="text-sm uppercase tracking-widest text-gray-400 mb-4 font-medium"
          >
            OUR CLIENTS
          </p>
          <h2
            ref={titleRef}
            className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight leading-tight"
          >
            TRUSTED BY
          </h2>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-gray-800 border border-gray-800">
          {clients.map((client, index) => (
            <div
              key={client.id}
              ref={(el) => setItemRef(el, index)}
              className="relative bg-black overflow-hidden group h-40 md:h-48 lg:h-56 flex items-center justify-center border border-gray-800 transition-all duration-300 hover:border-gray-700 hover:bg-gray-900/50"
            >
              {/* Background gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/0 to-red-900/0 group-hover:from-gray-800/20 group-hover:to-red-900/20 transition-all duration-300 pointer-events-none" />

              {/* Logo Container */}
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Logo Text/Icon */}
                <div className="text-5xl md:text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {typeof client.logo === 'string' ? (
                    <span>{client.logo}</span>
                  ) : (
                    <div className="relative w-16 h-16 md:w-20 md:h-20">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 4rem, 5rem"
                      />
                    </div>
                  )}
                </div>

                {/* Brand Name */}
                <p className="text-white text-xs md:text-sm font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {client.name}
                </p>
              </div>

              {/* Hover Border Animation */}
              <div className="absolute inset-0 border-2 border-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-20 text-center">
         
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;