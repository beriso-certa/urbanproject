// components/sections/Testimonials.tsx
'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface Testimonial {
  _id: string;
  name: string;
  company: string;
  content: string;
  image?: any;
  rating: number;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;

    const animate = () => {
      scrollPos += 0.3;
      if (scrollPos > container.scrollWidth - container.clientWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(animate);
    };

    // Start auto-scroll on hover out
    let isHovering = false;

    container.addEventListener('mouseenter', () => {
      isHovering = true;
      cancelAnimationFrame(animationId);
    });

    container.addEventListener('mouseleave', () => {
      isHovering = false;
      animationId = requestAnimationFrame(animate);
    });

    // Only auto-scroll on desktop
    if (window.innerWidth >= 1024) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < rating ? 'text-yellow-400' : 'text-gray-600'}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-20 px-4 md:px-8 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Clients Say
          </h2>
          <p className="text-gray-400 text-lg">
            Trusted by industry leaders
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
          style={{ scrollBehavior: 'smooth' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial._id}
              className="flex-shrink-0 w-full md:w-96 bg-gradient-to-br from-slate-700 to-slate-800 p-8 rounded-xl border border-slate-600/50"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>

              {/* Quote */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-slate-600">
                {testimonial.image && (
                  <Image
                    src={urlFor(testimonial.image).width(48).height(48).url()}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                )}
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}