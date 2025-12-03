"use client";

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/Header';

// Default header data
const defaultHeaderData = {
  logo: "/images/logos.png",
  menu: ["Work", "Services", "About", "Blog", "Contact"],
  cta: "Get in touch"
};

const AboutPage = () => {
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const teamRef = useRef(null);
  const cultureRef = useRef(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);

  // Simulated Sanity data
  const sanityData = {
    hero: {
      title: "ABOUT US",
      subtitle: "Who We Are",
      description: "We tell stories with soul.\nWe create work that hits deep."
    },
    manifesto: {
      title: "Who We Are",
      subtitle: "THE CREATIVE REBELLION",
      description: "Urban is a collective of filmmakers, storytellers and creative visionaries who believe in the power of bold ideas. We don't just produce content—we craft storytelling that resonates and inspires.\n\nAt our core, we're driven by a passion for visual narrative. Whether it's a commercial, documentary, or branded content, we approach each project with fresh eyes and creative courage.\n\nWe're storytellers who challenge the status quo. We ask the hard questions, embrace the uncomfortable, and push creative boundaries to deliver work that doesn't just capture attention—it leaves a mark."
    },
    team: [
      { name: "Hilina Bekele", role: "Creative Director", image: "/images/Hilina.png" },
      { name: "Biniyam Teshome", role: "Lead Producer", image: "/images/Biniyam.png" },
      { name: "Hilina Bekele", role: "Director of Photography", image: "/images/Hilina.png" },
      { name: "Hilina Bekele", role: "Production Manager", image: "/images/Hilina.png" },
      { name: "Biniyam Teshome", role: "Editor", image: "/images/Biniyam.png" },
      { name: "Hilina Bekele", role: "Sound Designer", image: "/images/Hilina.png" }
    ],
    culture: {
      title: "CREATIVITY ISN'T A JOB\nIT'S HOW WE LIVE.",
      images: [
        "/images/service01.png",
        "/images/service02.png",
        "/images/service03.png",
        "/images/service04.png",
        "/images/service05.png",
      ]
    }
  };

  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('.fade-in');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          el.classList.add('opacity-100', 'translate-y-0');
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <div className="bg-[#1a1f2e] text-white min-h-screen">
      <Header data={defaultHeaderData} />
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background video */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          >
            <source src="/images/Aboutusvideo.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-[#1a1f2e]/90" />
        </div>

        <div className="relative z-10 w-full px-6 fade-in opacity-0 translate-y-8 transition-all duration-1000">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl font-medium tracking-wider mb-4 text-red-600">
              {sanityData.hero.subtitle}
            </h2>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-wider mb-8">
              ABOUT US
            </h1>
            <p className="font-sans text-lg md:text-xl leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
              {sanityData.hero.description}
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section 
        ref={manifestoRef}
        className="py-24 px-6 md:px-16 max-w-7xl mx-auto"
      >
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-100">
            <h3 className="text-red-600 text-sm font-bold tracking-widest mb-4">WHO WE ARE</h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              THE<br />CREATIVE<br />REBELLION
            </h2>
          </div>
          <div className="fade-in opacity-0 translate-y-8 transition-all duration-1000 delay-200">
            <p className="text-gray-300 text-base md:text-lg leading-relaxed whitespace-pre-line">
              {sanityData.manifesto.description}
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24 px-6 md:px-16 bg-[#151923]">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-center text-red-600 text-sm font-bold tracking-widest mb-4">THE TEAM</h3>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 fade-in opacity-0 translate-y-8 transition-all duration-1000">
            BEHIND THE STORIES.
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sanityData.team.map((member, index) => {
              const imageSrc = member.name.toLowerCase().includes('hilina') 
                ? '/images/Hilina.png' 
                : member.name.toLowerCase().includes('biniyam')
                ? '/images/Biniyam.png'
                : '/images/placeholder.jpg';

              return (
                <div 
                  key={index}
                  className="fade-in opacity-0 translate-y-8 transition-all duration-1000 group"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="relative overflow-hidden bg-white aspect-[3/4] transform group-hover:scale-105 transition-all duration-500">
                    {/* Team member image */}
                    <div className="absolute inset-0 p-4">
                      <div className="relative w-full h-full overflow-hidden">
                        <Image
                          src={imageSrc}
                          alt={member.name}
                          fill
                          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                    </div>
                    
                    {/* Member info at the bottom */}
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-6 text-center">
                      <h3 className="text-black text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-red-600 font-semibold text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section ref={cultureRef} className="py-24 px-6 md:px-16 relative overflow-hidden bg-[#1a1f2e]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 fade-in opacity-0 translate-y-8 transition-all duration-1000 leading-tight">
            {sanityData.culture.title}
          </h2>

          {/* Background text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold text-white/5 whitespace-nowrap pointer-events-none">
            OUR CULTURE
          </div>

          {/* Polaroid-style Image Grid */}
          <div className="relative flex flex-col items-center gap-8 max-w-4xl mx-auto">
            {/* Top row - 2 images */}
            <div className="flex flex-wrap justify-center gap-8 w-full">
              {sanityData.culture.images.slice(0, 2).map((img, index) => (
                <div
                  key={index}
                  ref={(el: HTMLDivElement | null) => {
                    if (el) imagesRef.current[index] = el;
                  }}
                  className={`fade-in opacity-0 translate-y-8 transition-all duration-1000 hover:scale-110 hover:z-10 hover:rotate-0 ${
                    index === 0 ? 'rotate-[-8deg]' : 'rotate-[5deg]'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="bg-white p-4 shadow-2xl w-72">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-200">
                      <Image
                        src={img}
                        alt={`Culture image ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Middle row - 2 images */}
            <div className="flex flex-wrap justify-center gap-8 w-full -mt-4">
              {sanityData.culture.images.slice(2, 4).map((img, index) => (
                <div
                  key={index + 2}
                  ref={(el: HTMLDivElement | null) => {
                    if (el) imagesRef.current[index + 2] = el;
                  }}
                  className={`fade-in opacity-0 translate-y-8 transition-all duration-1000 hover:scale-110 hover:z-10 hover:rotate-0 ${
                    index === 0 ? 'rotate-[6deg]' : 'rotate-[-7deg]'
                  }`}
                  style={{ transitionDelay: `${(index + 2) * 150}ms` }}
                >
                  <div className="bg-white p-4 shadow-2xl w-72">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-200">
                      <Image
                        src={img}
                        alt={`Culture image ${index + 3}`}
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom row - 1 image */}
            {sanityData.culture.images[4] && (
              <div className="-mt-4">
                <div
                  ref={(el: HTMLDivElement | null) => {
                    if (el) imagesRef.current[4] = el;
                  }}
                  className="fade-in opacity-0 translate-y-8 transition-all duration-1000 hover:scale-110 hover:z-10 hover:rotate-0 rotate-[-4deg]"
                  style={{ transitionDelay: '600ms' }}
                >
                  <div className="bg-white p-4 shadow-2xl w-72">
                    <div className="aspect-[4/3] relative overflow-hidden bg-gray-200">
                      <Image
                        src={sanityData.culture.images[4]}
                        alt="Culture image 5"
                        fill
                        className="object-cover"
                        sizes="300px"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    
      </section>
      <Footer />
    </div>
  );
};

export default AboutPage;