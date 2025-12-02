"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
  data: {
    logo: string;
    menu: string[];
    cta: string;
  };
}

export default function Navbar({ data }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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

  // Helper function to get the path for each menu item
const getPath = (item: string) => {
  const pathMap: Record<string, string> = {
    'HOME': '/',
    'WORK': '/work',
    'SERVICES': '/services',
    'ABOUT US': '/about',
    'BLOGS': '/Blogs',
    'CONTACT US': '/contact'
  };
  
  return pathMap[item] || `/${item.toLowerCase().replace(' ', '-')}`;
};

  // Check if a menu item is active based on current pathname
  const isActive = (item: string) => {
    const path = getPath(item);
    const currentPath = pathname.toLowerCase();
    
    // Special case for home page
    if (item === 'HOME') {
      return currentPath === '/' || currentPath === '';
    }
    
    // Check if the current path starts with the item's path
    if (currentPath.startsWith(path.toLowerCase())) {
      return true;
    }
    
    // Special handling for work section in home page
    if (currentPath === '/' && item === 'WORK' && window.location.hash === '#work') {
      return true;
    }
    
    // Special handling for services section in home page
    if (currentPath === '/' && item === 'SERVICES' && window.location.hash === '#services') {
      return true;
    }
    
    // Special handling for blog section in home page
    if (currentPath === '/' && item === 'BLOGS' && window.location.hash === '#blog') {
      return true;
    }
    
    // Special handling for contact section in home page
    if (currentPath === '/' && item === 'CONTACT US' && window.location.hash === '#contact') {
      return true;
    }
    
    return false;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full bg-[#0a0f1c] bg-opacity-90 backdrop-blur-sm border-b border-gray-800">
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      
      <div
        ref={navRef}
        className="container mx-auto px-6 py-4 flex items-center justify-between"
      >
        {/* Logo with Link */}
        <Link href="/" className="flex items-center gap-3 text-white text-2xl font-bold">
          <Image
            src={safeData.logo}
            alt="Urban Logo"
            width={40}
            height={40}
            priority
          />
          <span className="font-light">urban</span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-1">
          {safeData.menu.map((item, index) => {
            const path = getPath(item);
            const active = isActive(item);
            
            return (
              <Link
                key={index}
                href={path}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors
                  ${active 
                    ? 'bg-white text-black px-6' 
                    : 'text-gray-300 hover:text-white'}`}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Contact Button */}
        <Link 
          href="/contact"
          className="hidden md:block bg-white text-black px-6 py-2 text-sm font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
        >
          {safeData.cta}
        </Link>

        {/* Mobile menu button (hidden for now) */}
        <button className="md:hidden text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </div>
  );
}