"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

interface Props {
  data: {
    logo: string;
    menu: string[];
    cta: string;
  };
}

export default function Navbar({ data }: Props) {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Add default values
  const safeData = data || {
    logo: '/images/logos.png',
    menu: ['HOME', 'WORK', 'SERVICES', 'ABOUT US', 'BLOGS'],
    cta: 'CONTACT US'
  };

  return (
    <div className="relative w-full bg-[#0a0f1c] border-b border-gray-800">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      
      <div
        ref={navRef}
        className="container mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 text-white text-2xl font-bold">
          <Image
            src={safeData.logo}
            alt="Urban Logo"
            width={40}
            height={40}
            priority
          />
          <span className="font-light">urban</span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {safeData.menu.map((item, index) => (
            <a
              key={index}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors
                ${index === 0 
                  ? 'bg-white text-black px-6' 
                  : 'text-gray-300 hover:text-white'}`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Contact Button */}
        <button className="hidden md:block bg-white text-black px-6 py-2 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors">
          {safeData.cta}
        </button>

        {/* Mobile menu button (hidden for now) */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      
      {/* Bottom gradient line */}
     
    </div>
  );
}