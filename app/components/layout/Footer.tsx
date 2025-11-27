"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

// Types
type FooterData = {
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  navigation: Array<{ title: string; url: string }>;
  socialLinks: Array<{ platform: string; url: string; icon: any }>;
  copyright: string;
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const elementsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Animation setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (elementsRef.current.length > 0) {
      gsap.from(elementsRef.current, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: footerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }
  }, []);

  // Sanity query would go here
  // Example: const footerData = await client.fetch(`*[_type == 'footer'][0]`);
  
  // Mock data - replace with actual Sanity query
  const footerData: FooterData = {
    contact: {
      phone: '+251 911 465 364',
      email: 'info@urbanproduction.com',
      address: 'Addis Ababa, Ethiopia, Office. DH Geda Building, 7th Floor, No. 701',
    },
    navigation: [
      { title: 'Home', url: '/' },
      { title: 'Work', url: '/work' },
      { title: 'Services', url: '/services' },
      { title: 'About', url: '/about' },
      { title: 'Contact', url: '/contact' },
    ],
    socialLinks: [
      { platform: 'Instagram', url: '#', icon: 'instagram' },
      { platform: 'LinkedIn', url: '#', icon: 'linkedin' },
      { platform: 'YouTube', url: '#', icon: 'youtube' },
      { platform: 'Facebook', url: '#', icon: 'facebook' },
    ],
    copyright: '© 2025 Urban Film Production PLC. All Rights Reserved.',
  };

  const addToRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current[index] = el;
    }
  };

  return (
    <footer 
      ref={footerRef} 
      className="relative bg-black text-white overflow-hidden pt-20 pb-10"
    >
      {/* Background pattern */}
      <div className="absolute inset-0" style={{ 
        backgroundImage: `url('/images/pattern.svg')`, 
        opacity: 0.05,
        backgroundSize: '20px 20px'
      }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Contact Information */}
          <div ref={el => addToRefs(el, 0)}>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 mr-3">+</span>
                <span>{footerData.contact.phone}</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">@</span>
                <a href={`mailto:${footerData.contact.email}`} className="hover:text-red-500 transition-colors">
                  {footerData.contact.email}
                </a>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-3">#</span>
                <span>{footerData.contact.address}</span>
              </li>
            </ul>
            
            </div>

          {/* Navigation */}
          <div ref={el => addToRefs(el, 1)}>
            <h3 className="text-xl font-bold mb-6">Navigation</h3>
            <nav>
              <ul className="space-y-4">
                {footerData.navigation.map((item, index) => (
                  <li key={index}>
                    <Link 
                      href={item.url}
                      className="hover:text-red-500 transition-colors"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Branding & Social */}
          <div ref={el => addToRefs(el, 2)}>
            <div className="mb-6">
              <div className="text-5xl font-bold mb-2">urban</div>
              <div className="flex -space-x-1 mb-4">
                {['U', 'R', 'B', 'A', 'N'].map((letter, i) => (
                  <div 
                    key={i}
                    className="w-8 h-8 bg-red-500 flex items-center justify-center text-sm font-bold"
                  >
                    {letter}
                  </div>
                ))}
              </div>
              <p className="text-gray-300">Crafting stories that move brands forward.</p>
            </div>
            
            <div className="mt-8">
              <div className="flex items-center space-x-4">
                {footerData.socialLinks.map((social, index) => (
                  <React.Fragment key={social.platform + index}>
                    <a 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-red-500 transition-colors"
                      aria-label={social.platform}
                    >
                      {social.platform}
                    </a>
                    {index < footerData.socialLinks.length - 1 && (
                      <span className="text-gray-600">•</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div 
          ref={el => addToRefs(el, 3)}
          className="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm"
        >
          {footerData.copyright}
          
          {/* 3D Footer Image */}
          <div className="mt-8 w-full">
            <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
              <img 
                src="/images/Footer3d.png" 
                alt="3D Footer Visual"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
