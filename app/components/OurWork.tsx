'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Project One',
    category: 'Branding',
    image: '/project1.jpg',
  },
  {
    id: 2,
    title: 'Project Two',
    category: 'Web Design',
    image: '/project2.jpg',
  },
  {
    id: 3,
    title: 'Project Three',
    category: 'Digital',
    image: '/project3.jpg',
  },
  {
    id: 4,
    title: 'Project Four',
    category: 'Campaign',
    image: '/project4.jpg',
  },
];

const OurWork = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (itemsRef.current.length > 0) {
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.from(item, {
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
          });
        }
      });
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">OUR WORK, OUR VOICE</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest projects and see how we bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={el => { if (el) itemsRef.current[index] = el; }}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-gray-100"
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-black"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <h3 className="text-xl font-bold text-white">{project.title}</h3>
                <p className="text-gray-300">{project.category}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-black px-8 py-3 font-medium rounded-full hover:bg-black hover:text-white transition-colors">
            VIEW ALL PROJECTS
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
