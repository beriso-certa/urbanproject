import React, { useEffect, useRef, useState } from 'react';
import { Camera } from 'lucide-react';

const SafaricomCampaign = () => {
  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const statsRef = useRef([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Simulate GSAP ScrollTrigger animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.2 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    statsRef.current.forEach((stat) => {
      if (stat) observer.observe(stat);
    });

    return () => observer.disconnect();
  }, []);

  // Simulated Sanity CMS data
  const campaignData = {
    hero: {
      label: "SAFARICOM",
      title: "CONNECTION IN MOTION",
      subtitle: "A NATIONWIDE CAMPAIGN BY URBAN PRODUCTION THAT TRANSFORMS SAFARICOM'S MESSAGE",
      details: [
        { label: "Agency", value: "Urban Production PLC" },
        { label: "Campaign Type", value: "Safaricom Ethiopia" },
        { label: "Year", value: "2025" }
      ],
      globeImage: "/api/placeholder/600/600"
    },
    sections: [
      {
        id: 1,
        number: "01",
        title: "THE CHALLENGE",
        description: "Safaricom Ethiopia needed to establish a strong brand presence in the Ethiopian market. The challenge was to create a campaign that would resonate with local audiences while maintaining the brand's innovative spirit and connection-focused values.",
        image: "/api/placeholder/400/300",
        imagePosition: "right"
      },
      {
        id: 2,
        number: "02",
        title: "THE IDEA",
        description: "We developed a concept centered around 'Connection in Motion' - showcasing how Safaricom keeps Ethiopia moving forward. The campaign emphasized human connection through technology, blending modern telecommunications with Ethiopia's rich cultural heritage.",
        image: "/api/placeholder/400/300",
        imagePosition: "left"
      },
      {
        id: 3,
        number: "03",
        title: "THE EXECUTION",
        description: "The campaign came to life through dynamic visual storytelling, featuring real Ethiopian stories of connection. We created content that felt authentic and alive, using vibrant colors and engaging narratives that captured the essence of modern Ethiopia.",
        image: "/api/placeholder/400/300",
        imagePosition: "right"
      }
    ],
    impact: {
      number: "04",
      title: "THE IMPACT",
      description: "The campaign resonated deeply with Ethiopian audiences, driving significant brand awareness and engagement across multiple channels.",
      stats: [
        { value: "3M+", label: "People Reached" },
        { value: "20%", label: "Engagement Rate" },
        { value: "50+", label: "Pieces of Content" }
      ],
      image: "/api/placeholder/400/300"
    },
    gallery: {
      images: Array(4).fill("/api/placeholder/300/220")
    },
    behindScenes: {
      title: "BEHIND THE SCENES",
      images: Array(4).fill("/api/placeholder/300/220")
    },
    company: {
      name: "urban",
      tagline: "Crafting stories that move brands forward.",
      contact: {
        phone: "+251 911 465 364",
        email: "info@urbanproduction.com",
        address: "Addis Ababa, Ethiopia\nOffice, DH Geda\nBuilding, 7th Floor, No.\n701"
      },
      social: ["Instagram", "LinkedIn", "YouTube", "Facebook"]
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-in {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-scale {
          animation: fadeInScale 1s ease-out forwards;
        }

        .animate-left {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-right {
          animation: slideInRight 0.8s ease-out forwards;
        }

        .opacity-0 {
          opacity: 0;
        }

        .geometric-pattern {
          background-image: 
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.02) 40px,
              rgba(255, 255, 255, 0.02) 80px
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent 40px,
              rgba(255, 255, 255, 0.02) 40px,
              rgba(255, 255, 255, 0.02) 80px
            );
        }

        .number-text {
          font-size: 6rem;
          font-weight: 700;
          line-height: 1;
        }

        @media (max-width: 768px) {
          .number-text {
            font-size: 4rem;
          }
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 geometric-pattern opacity-30"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">
          {/* Left Content */}
          <div className={`space-y-6 ${isLoaded ? 'animate-left' : 'opacity-0'}`}>
            <p className="text-red-500 font-semibold tracking-wider text-sm">
              {campaignData.hero.label}
            </p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              {campaignData.hero.title}
            </h1>
          </div>

          {/* Right Content - Globe and Details */}
          <div className={`space-y-8 ${isLoaded ? 'animate-right' : 'opacity-0'} delay-200`}>
            <div className="relative">
              <img 
                src={campaignData.hero.globeImage}
                alt="Globe"
                className="w-full max-w-md mx-auto rounded-lg"
              />
            </div>
            
            <div className="space-y-4">
              <p className="text-gray-300 text-sm leading-relaxed max-w-md">
                {campaignData.hero.subtitle}
              </p>
              
              <div className="grid grid-cols-3 gap-6 pt-4">
                {campaignData.hero.details.map((detail, index) => (
                  <div key={index} className="space-y-1">
                    <p className="text-gray-500 text-xs uppercase">{detail.label}</p>
                    <p className="text-white text-sm font-medium">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge, Idea, Execution Sections */}
      {campaignData.sections.map((section, index) => (
        <section 
          key={section.id}
          ref={(el) => (sectionsRef.current[index] = el)}
          className="py-20 px-6 opacity-0"
        >
          <div className="max-w-7xl mx-auto">
            <div className={`grid md:grid-cols-2 gap-12 items-center ${
              section.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
            }`}>
              {/* Content */}
              <div className={`space-y-6 ${section.imagePosition === 'left' ? 'md:order-2' : ''}`}>
                <p className="text-red-500 font-bold number-text">{section.number}</p>
                <h2 className="text-4xl md:text-5xl font-bold">{section.title}</h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {section.description}
                </p>
              </div>

              {/* Image */}
              <div className={section.imagePosition === 'left' ? 'md:order-1' : ''}>
                <div className="bg-white p-4 rounded-lg shadow-2xl">
                  <img 
                    src={section.image}
                    alt={section.title}
                    className="w-full h-auto rounded"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Impact Section */}
      <section 
        ref={(el) => (sectionsRef.current[3] = el)}
        className="py-20 px-6 opacity-0"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="space-y-8">
              <div className="space-y-6">
                <p className="text-red-500 font-bold number-text">
                  {campaignData.impact.number}
                </p>
                <h2 className="text-4xl md:text-5xl font-bold">
                  {campaignData.impact.title}
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  {campaignData.impact.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-4">
                {campaignData.impact.stats.map((stat, index) => (
                  <div 
                    key={index}
                    ref={(el) => (statsRef.current[index] = el)}
                    className="space-y-2 opacity-0"
                  >
                    <p className="text-3xl md:text-4xl font-bold text-red-500">
                      {stat.value}
                    </p>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image */}
            <div>
              <div className="bg-white p-4 rounded-lg shadow-2xl">
                <img 
                  src={campaignData.impact.image}
                  alt="Impact"
                  className="w-full h-auto rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {campaignData.gallery.images.map((img, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-xl transform transition-transform hover:scale-105"
              >
                <img 
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-auto rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Behind the Scenes */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            "{campaignData.behindScenes.title}"
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
            {campaignData.behindScenes.images.map((img, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-xl transform transition-transform hover:scale-105"
              >
                <img 
                  src={img}
                  alt={`Behind scenes ${index + 1}`}
                  className="w-full h-auto rounded"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black mt-20">
        <div className="geometric-pattern">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-3 text-sm">
                  <p className="text-gray-400">📞 {campaignData.company.contact.phone}</p>
                  <p className="text-gray-400">✉️ {campaignData.company.contact.email}</p>
                  <p className="text-gray-400 whitespace-pre-line">
                    📍 {campaignData.company.contact.address}
                  </p>
                </div>

                <nav className="space-y-2 text-sm">
                  {['Work', 'Services', 'About', 'Contact'].map((item) => (
                    <a 
                      key={item}
                      href={`#${item.toLowerCase()}`}
                      className="block text-gray-400 hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Brand */}
              <div className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Camera size={48} className="text-white" />
                    <span className="text-4xl font-bold">{campaignData.company.name}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-bold mb-8 leading-tight">
                    {campaignData.company.tagline}
                  </h3>
                  
                  <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                    {campaignData.company.social.map((platform, index) => (
                      <React.Fragment key={platform}>
                        <a href="#" className="hover:text-white transition-colors">
                          {platform}
                        </a>
                        {index < campaignData.company.social.length - 1 && (
                          <span>●</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                <p className="text-xs text-gray-600 mt-12">
                  © 2025 Urban Film Production PLC. All Rights Reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SafaricomCampaign;