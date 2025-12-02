'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';

// Initialize Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
  useCdn: false
});

// Image URL builder
const builder = imageUrlBuilder(client);
function urlForImage(source: any) {
  return builder.image(source);
}

gsap.registerPlugin(ScrollTrigger);

type WorkItem = {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage: any;
  categories: string[];
};

type WorksProps = {
  works: WorkItem[];
};

export default function Works({ works }: WorksProps) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [filteredWorks, setFilteredWorks] = useState<WorkItem[]>(works || []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Filter works based on active filter
  useEffect(() => {
    if (activeFilter === 'ALL') {
      setFilteredWorks(works);
    } else {
      const filtered = works.filter(work => 
        work.categories?.some(cat => 
          cat.toUpperCase() === activeFilter
        )
      );
      setFilteredWorks(filtered);
    }
  }, [activeFilter, works]);

  // GSAP Animations
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Filters animation
      if (filtersRef.current?.children) {
        gsap.fromTo(
          Array.from(filtersRef.current.children),
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: filtersRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Grid items animation
      if (gridRef.current?.children) {
        gsap.fromTo(
          Array.from(gridRef.current.children),
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 90%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [filteredWorks]);

  const router = useRouter();

  // Handle hover effect
  const handleHover = (e: React.MouseEvent<HTMLDivElement>, isHovering: boolean) => {
    const target = e.currentTarget;
    gsap.to(target.querySelector('img'), {
      scale: isHovering ? 1.05 : 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  // Navigate to work detail page
  const navigateToWork = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    router.push(`/work/${slug}`);
  };

  return (
    <section ref={sectionRef} className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-6xl font-bold mb-4 opacity-0"
          >
            THE WORK SAYS IT ALL.
          </h2>
          <p 
            ref={subtitleRef} 
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto opacity-0"
          >
            We let our craft, creativity, and passion speak louder than words.
          </p>
        </div>

        {/* Filters */}
        <div 
          ref={filtersRef} 
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {['ALL', 'TV COMMERCIAL', 'STORYTELLING', 'CAMPAIGN'].map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                activeFilter === filter
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-900 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Works Grid */}
        <div 
          ref={gridRef} 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredWorks.map((work, index) => (
            <div 
              key={work._id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              onClick={(e) => navigateToWork(work.slug.current, e)}
            >
              <div 
                className="relative aspect-[4/5] overflow-hidden"
                onMouseEnter={(e) => handleHover(e, true)}
                onMouseLeave={(e) => handleHover(e, false)}
              >
                {work.mainImage && (
                  <Image
                    src={urlForImage(work.mainImage).url()}
                    alt={work.title}
                    fill
                    className="object-cover transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3} // Only prioritize loading first few images
                  />
                )}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center text-white">
                    <span className="mr-2 font-medium">View Project</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-medium">{work.title}</h3>
              {work.categories && work.categories.length > 0 && (
                <p className="text-gray-400 text-sm mt-1">
                  {work.categories.join(' • ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Fetch works from Sanity
export async function getStaticProps() {
  if (!client) {
    return {
      props: {
        works: [],
      },
      revalidate: 60,
    };
  }
  const query = `*[_type == "work"] | order(_createdAt desc) {
    _id,
    title,
    slug,
    mainImage,
    "categories": categories[]->title
  }`;

  const works = await client.fetch(query);

  return {
    props: {
      works,
    },
    revalidate: 60, // Revalidate at most every minute
  };
}