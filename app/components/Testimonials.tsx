'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  company: string;
  quote: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'SAMUEL T.',
      title: 'Brand Manager',
      company: 'Safaricom Ethiopia',
      quote: 'Urban didn\'t just shoot a campaign they built an experience. Every frame carried our brand\'s soul. The response was beyond what we imagined'
    },
    {
      id: 2,
      name: 'ELENA M.',
      title: 'Creative Director',
      company: 'TechVision Studios',
      quote: 'Working with Urban transformed our vision into reality. Their storytelling approach brought depth and authenticity to every single frame we created together.'
    },
    {
      id: 3,
      name: 'DAVID K.',
      title: 'CEO',
      company: 'Global Brands Inc',
      quote: 'The team at Urban understands that great content is more than just visuals. They capture emotions, tell stories, and create lasting impressions with every project.'
    }
  ];

  const currentTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      className="w-full bg-white"
      style={{
        width: '1440px',
        height: '928px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px'
      }}
    >
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-2 gap-12 items-center h-full">
          
          {/* LEFT SIDE - Red Box with Pattern */}
          <div
            className="relative w-full h-full bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-2xl overflow-hidden"
            style={{ minHeight: '600px' }}
          >
            {/* Top Section with Title */}
            <div className="relative z-10 p-12 h-1/3 flex flex-col justify-start">
              <h2 className="text-white text-4xl font-bold uppercase tracking-widest">
                TESTIMONIAL
              </h2>
            </div>

            {/* Center Section with Large Quote Mark */}
            <div className="relative z-10 h-1/3 flex items-center justify-center">
              <div className="opacity-30 w-48 h-48 relative">
                <Image 
                  src="/images/cotation.png" 
                  alt="Quotation mark"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            {/* Bottom Section with Pattern and Text */}
         <div className="relative z-10 h-1/3 flex flex-col justify-end pb-12">
  {/* Geometric Pattern Background */}
  <div className="absolute inset-0 bottom-0 w-full h-full">
    <div className="relative w-full h-full">
      <Image 
        src="/images/Pattern .png" 
        alt="Background pattern"
        fill
        className="object-cover opacity-20"
      />
    </div>
  </div>

  {/* Text on top of pattern */}
  <div className="relative text-center z-20">
    <h3 className="text-white text-3xl font-bold uppercase tracking-widest leading-tight">
      WHAT OUR
    </h3>
    <h3 className="text-white text-3xl font-bold uppercase tracking-widest leading-tight">
      CLIENTS SAY
    </h3>
  </div>
</div>
<div className="flex items-center"></div>
          </div>
          

          {/* RIGHT SIDE - Testimonial Cards with Overlap */}
          {/* Main Testimonial Card */}
<div className="relative flex-1 bg-white p-12 rounded-lg shadow-lg  -ml-14">
  
  
  {/* Opening Quote */}
  <div className="relative w-10 h-10 mb-6">
    <Image 
      src="/images/quote1.svg" 
      alt="Opening quote"
      width={40}
      height={40}
      className="text-red-600"
    />
  </div>

  {/* Client Info */}
  <div className="mb-8">
    <h4 className="text-2xl font-bold text-gray-900 uppercase tracking-wide">
      {currentTestimonial.name}
    </h4>
    <p className="text-gray-600 font-medium mt-2">
      {currentTestimonial.title}, {currentTestimonial.company}
    </p>
  </div>

  {/* Quote Text */}
  <p className="text-gray-700 text-lg leading-relaxed mb-8 flex-1">
    {currentTestimonial.quote}
  </p>

  {/* Closing Quote */}
  <div className="relative w-10 h-10 ml-auto">
    <Image 
      src="/images/quote1.svg" 
      alt="Closing quote"
      width={40}
      height={40}
      className="text-red-600 rotate-180" /* Rotate the closing quote */
    />
  </div>
</div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;