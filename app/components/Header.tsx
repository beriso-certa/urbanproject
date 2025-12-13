"use client";

import { useEffect, useRef, useState } from "react";
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

export default function Header({ data }: Props) {
  const navRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  // Set hash from window only after component mounts
  useEffect(() => {
    setHash(window.location.hash);

    // Listen for hash changes
    const handleHashChange = () => {
      setHash(window.location.hash);
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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
    
    // Special handling for sections on home page with hash
    if (currentPath === '/') {
      if (item === 'WORK' && hash === '#work') return true;
      if (item === 'SERVICES' && hash === '#services') return true;
      if (item === 'BLOGS' && hash === '#blog') return true;
      if (item === 'CONTACT US' && hash === '#contact') return true;
    }
    
    return false;
  };

  // Add scroll effect for header
  useEffect(() => {
    const header = navRef.current?.parentElement;
    if (!header) return;

    let lastScroll = 0;
    
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      
      if (currentScroll <= 0) {
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = 'none';
      } else if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
      } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
      
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[1000] w-full bg-[#0a0f1c] bg-opacity-95 backdrop-blur-sm border-b border-gray-800 transition-transform duration-300 ease-in-out"
      style={{ willChange: 'transform' }}
    >
      {/* Top gradient line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 to-blue-500" />
      
      <div
        ref={navRef}
        className="container mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between"
      >
        {/* Logo with Link */}
        <Link href="/" className="flex items-center group">
          <div className="relative w-32 h-10 md:w-40 md:h-12">
            <Image
              src="/images/logos.png"
              alt="Urban Project Logo"
              fill
              className="object-contain object-left transition-opacity duration-300 group-hover:opacity-90"
              priority
            />
          </div>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-3">
          {safeData.menu.map((item, index) => {
            const path = getPath(item);
            const active = isActive(item);
            
            return (
              <Link
                key={index}
                href={path}
                className={`px-4 py-2 text-xs font-medium uppercase tracking-wider transition-all duration-300
                  ${active 
                    ? 'bg-white text-black' 
                    : 'text-white border border-white hover:bg-white hover:bg-opacity-10'}`}
                style={{
                  letterSpacing: '0.1em',
                  lineHeight: '1.5',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.125rem'
                }}
              >
                {item}
              </Link>
            );
          })}
        </nav>

        {/* Contact Button */}
        <div className="hidden md:block ml-6">
          <Link 
            href="/contact"
            className="bg-white text-black px-6 py-2 text-xs font-medium uppercase tracking-wider hover:bg-gray-100 transition-colors"
            style={{
              letterSpacing: '0.1em',
              lineHeight: '1.5',
              padding: '0.5rem 1.5rem',
              borderRadius: '0.125rem',
              whiteSpace: 'nowrap'
            }}
          >
            {safeData.cta}
          </Link>
        </div>

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