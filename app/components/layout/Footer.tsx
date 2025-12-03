


import React, { useEffect, useRef } from 'react';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  // GSAP-like scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target instanceof HTMLElement) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate geometric pattern
  useEffect(() => {
    if (!patternRef.current) return;
    
    let animationFrame: number | undefined;
    let offset = 0;
    
    const animate = () => {
      offset += 0.5;
      if (patternRef.current) {
        patternRef.current.style.backgroundPosition = `${offset}px 0`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    // Start the animation
    animationFrame = requestAnimationFrame(animate);
    
    // Cleanup function
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
    
    animate();
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const contactInfo = {
    phone: '+251 911 465 364',
    email: 'info@urbanproduction.com',
    address: 'Addis Ababa, Ethiopia',
    office: 'Office. DH Geda Building, 7th Floor, No. 701'
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Work', href: '#work' },
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#' },
    { name: 'LinkedIn', href: '#' },
    { name: 'YouTube', href: '#' },
    { name: 'Facebook', href: '#' }
  ];

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div 
        ref={footerRef}
        className="relative z-10 opacity-0 transition-all duration-1000"
        style={{ transform: 'translateY(30px)' }}
      >
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-12">
            {/* Contact Information */}
            <div className="space-y-4">
              <a 
                href={`tel:${contactInfo.phone}`}
                className="flex items-center gap-3 hover:text-red-600 transition-colors duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">📞</span>
                <span className="font-mono">{contactInfo.phone}</span>
              </a>

              <a 
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-3 hover:text-red-600 transition-colors duration-300 group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform duration-300">✉️</span>
                <span className="font-mono break-all">{contactInfo.email}</span>
              </a>

              <div className="flex items-start gap-3 text-gray-400">
                <span className="text-xl mt-1">📍</span>
                <div className="font-mono text-sm leading-relaxed">
                  <p>{contactInfo.address}</p>
                  <p className="mt-1">{contactInfo.office}</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-lg hover:text-red-600 hover:translate-x-2 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Brand & Tagline */}
            <div className="lg:text-right">
              <div className="mb-6">
                <h2 className="text-5xl md:text-6xl font-bold mb-2">
                  <span className="inline-block">🏢</span> urban
                </h2>
              </div>
              <p className="text-2xl md:text-3xl font-semibold leading-tight mb-6">
                Crafting stories that<br />
                move brands forward.
              </p>
              
              {/* Social Links */}
              <div className="flex flex-wrap gap-3 justify-start lg:justify-end">
                {socialLinks.map((social, index) => (
                  <React.Fragment key={index}>
                    <a
                      href={social.href}
                      className="hover:text-red-600 transition-colors duration-300"
                    >
                      {social.name}
                    </a>
                    {index < socialLinks.length - 1 && (
                      <span className="text-gray-600">●</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8"></div>

          {/* Copyright */}
          <div className="text-center text-gray-500 text-sm font-mono">
            © 2025 Urban Film Production PLC. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Animated Geometric Pattern */}
      <div 
        ref={patternRef}
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20 L40 30 L40 50 L20 60 L0 50 L0 30 Z M60 20 L80 30 L80 50 L60 60 L40 50 L40 30 Z M100 20 L120 30 L120 50 L100 60 L80 50 L80 30 Z M20 60 L40 70 L40 90 L20 100 L0 90 L0 70 Z M60 60 L80 70 L80 90 L60 100 L40 90 L40 70 Z M100 60 L120 70 L120 90 L100 100 L80 90 L80 70 Z' fill='none' stroke='%23dc2626' stroke-width='1' opacity='0.3'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat-x',
          backgroundSize: '120px 120px',
          opacity: 0.5
        }}
      >
        {/* Additional SVG Pattern Overlay */}
        <svg 
          className="w-full h-full" 
          xmlns="http://www.w3.org/2000/svg"
          style={{ mixBlendMode: 'screen' }}
        >
          <defs>
            <pattern 
              id="hexPattern" 
              x="0" 
              y="0" 
              width="120" 
              height="103.92" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M30 0 L60 17.32 L60 51.96 L30 69.28 L0 51.96 L0 17.32 Z" 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="1.5"
                opacity="0.2"
              />
              <path 
                d="M90 0 L120 17.32 L120 51.96 L90 69.28 L60 51.96 L60 17.32 Z" 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="1.5"
                opacity="0.2"
              />
              <path 
                d="M30 51.96 L60 69.28 L60 103.92 L30 121.24 L0 103.92 L0 69.28 Z" 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="1.5"
                opacity="0.2"
              />
              <path 
                d="M90 51.96 L120 69.28 L120 103.92 L90 121.24 L60 103.92 L60 69.28 Z" 
                fill="none" 
                stroke="#dc2626" 
                strokeWidth="1.5"
                opacity="0.2"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      {/* Gradient Overlay */}
      <div 
        className="absolute bottom-0 left-0 w-full h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
        }}
      ></div>
      <div className="mt-8 w-full">
         <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
           <img 
               src="/images/Footer3d.png" 
              alt="3D Footer Visual"
              className="w-full h-full object-cover"        />
          </div>
        </div>
    </footer>
  );
};

export default Footer;
