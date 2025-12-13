"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface TeamMember {
  name: string;
  role: string;
  images: [string, string]; // Two images: [default, hover]
}

interface TeamMemberCardProps {
  member: TeamMember;
}

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

   const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const difference = touchStartX.current - touchEndX.current;
    const images = sanityData.culture.images;

    if (Math.abs(difference) > swipeThreshold) {
      if (difference > 0) {
        // Swiped left - show next image
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      } else {
        // Swiped right - show previous image
        setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    }
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  }

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
      // Update the Team Section with grayscale-to-color hover effect
{/* Team Section */}
<section ref={teamRef} className="py-24 px-6 md:px-16 bg-black">
  <div className="max-w-7xl mx-auto">
    <h3 className="text-center text-red-600 text-sm font-bold tracking-widest mb-4">THE TEAM</h3>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 text-white">
      BEHIND THE STORIES.
    </h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sanityData.team.map((member, index) => {
        const imageSrc = member.image; // Using the image path from your data

        return (
          <div 
            key={index}
            className="group relative"
            style={{
              width: '232px',
              height: '264px',
              border: 'top-30px right-32px bottom-64px left-32px',
              margin: '16px auto' // Centers the card and adds 16px spacing
            }}
          >
            {/* Card Container */}
            <div 
              className="relative w-full h-full overflow-hidden bg-white"
              
              
              style={{
                transition: 'all 300ms ease-out'
              }}
            >
              <Image
    src="/images/hilina.svg"
    alt="Rectangle SVG"
    fill
    className="object-cover bg-black width: 232;
height: 264;
angle: 0 deg;
opacity: 1;
border-top-width: 10px;
border-right-width: 14;
border-bottom-width: 64px;
border-left-width: 32px;
border-width: 32px, 32px, 64px, 32px;

border-style: solid;

border-color: var(--color-Urban-Color-Urban-Gray, #E5E5E5);

"
  />
              {/* Frame - Will be styled with pseudo-elements for better performance */}
              <div className="absolute inset-0 border-4 border-black group-hover:border-red-600 transition-colors duration-300 z-10 pointer-events-none" />
              
              {/* Grayscale Image */}
              <div 
                className="absolute inset-0 transition-all duration-300 ease-out"
                style={{
                  opacity: 1,
                  transform: 'translate(0, 0)'
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{
                      transition: 'all 300ms ease-out'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                </div>
              </div>
              
              {/* Colored Image */}
              <div 
                className="absolute inset-0"
                style={{
                  opacity: 0,
                  transform: 'translate(0, 10px)',
                  transition: 'all 300ms ease-out'
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
                </div>
              </div>
              
              {/* Member Info */}
              <div 
                className="absolute bottom-0 left-0 right-0 p-6 text-center z-10"
                style={{
                  transform: 'translateY(20px)',
                  opacity: 0,
                  transition: 'all 300ms ease-out'
                }}
              >
                <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-red-500 font-medium text-sm tracking-widest">{member.role}</p>
              </div>
            </div>
            
            {/* Hover State Styles */}
            <style jsx>{`
              .group:hover .absolute {
                opacity: 1 !important;
                transform: translate(0, 0) !important;
              }
              .group:hover .grayscale {
                opacity: 0;
                transform: translateY(-10px);
              }
              .group:hover .text-red-500 {
                color: #ef4444; /* Slightly brighter red on hover */
              }
            `}</style>
          </div>
        );
      })}
    </div>
  </div>
</section>


      {/* Culture Section */}
    // Update the Culture Section in your about/page.tsx
<section ref={cultureRef} className="py-24 px-6 md:px-16 relative overflow-hidden bg-[#1a1f2e]">
  <div className="max-w-7xl mx-auto">
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-20 text-white fade-in opacity-0 translate-y-8 transition-all duration-1000">
      {sanityData.culture.title}
    </h2>

    {/* Background text */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[12rem] lg:text-[16rem] font-bold text-white/5 whitespace-nowrap pointer-events-none">
      OUR CULTURE
    </div>

    {/* Polaroid Gallery */}
    <div className="relative flex justify-center items-center gap-12 flex-wrap max-w-6xl mx-auto px-4">
      {sanityData.culture.images.map((img, index) => (
        <div
          key={index}
          className="group relative h-80 w-80 transition-all duration-500"
          ref={(el: HTMLDivElement | null) => {
            if (el) imagesRef.current[index] = el;
          }}
        >
          {/* Collapsed State - Single Image */}
          <div className="absolute inset-0 transition-all duration-500 group-hover:opacity-0 group-hover:scale-95">
            <div
              className={`bg-white p-4 shadow-2xl h-full w-72 mx-auto transition-all duration-500 ${
                index % 2 === 0 ? 'rotate-[-8deg]' : 'rotate-[5deg]'
              }`}
              style={{
                transitionDelay: `${index * 150}ms`,
                transform: `rotate(${index % 2 === 0 ? -8 : 5}deg)`
              }}
            >
              <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 h-full">
                <Image
                  src={img}
                  alt={`Culture image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>

          {/* Expanded State - Split View (appears on hover) */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="relative w-full h-full">
              {/* Left Image */}
              <div className="absolute bg-white p-4 shadow-2xl w-56 h-64 transition-all duration-500 group-hover:translate-x-[-140px] group-hover:translate-y-[-10px] group-hover:rotate-[-8deg] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 h-full">
                  <Image
                    src={img}
                    alt={`Culture image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Center Image (main) */}
              <div className="absolute bg-white p-4 shadow-2xl w-64 h-72 transition-all duration-500 group-hover:translate-y-[30px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 h-full">
                  <Image
                    src={img}
                    alt={`Culture image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>

              {/* Right Image */}
              <div className="absolute bg-white p-4 shadow-2xl w-56 h-64 transition-all duration-500 group-hover:translate-x-[140px] group-hover:translate-y-[-10px] group-hover:rotate-[8deg] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-200 h-full">
                  <Image
                    src={img}
                    alt={`Culture image ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
      <Footer />
    </div>
  );
};

export default AboutPage;