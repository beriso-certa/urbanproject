import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Simulated GSAP animation hook
interface AnimationConfig {
  duration?: number;
  delay?: number;
  // Add other animation config properties as needed
}

const useGSAPAnimation = <T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  animationConfig?: AnimationConfig
) => {
  useEffect(() => {
    if (!ref.current) return;
    
    const element = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );
    
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
};

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useGSAPAnimation(heroRef);
  useGSAPAnimation(formRef);
  useGSAPAnimation(mapRef);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to Sanity
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Form submitted:', formData);
    alert('Message sent successfully!');
    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Addis Ababa coordinates
  const position: LatLngExpression = [9.0320, 38.7469];

  return (
    <div className="bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className="relative py-20 px-4 opacity-0 transition-all duration-1000"
        style={{ transform: 'translateY(50px)' }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            LET'S CREATE SOMETHING
          </h1>
          <h2 className="text-6xl md:text-8xl font-black text-red-600">
            "BOLD"
          </h2>
        </div>
      </div>

      {/* Contact Info Cards */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Phone */}
          <div className="border border-gray-700 p-8 text-center hover:border-red-600 transition-colors duration-300 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">📞</div>
            <p className="text-gray-300 font-mono">+251 911 465 364</p>
          </div>

          {/* Email */}
          <div className="border border-gray-700 p-8 text-center hover:border-red-600 transition-colors duration-300 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">✉️</div>
            <p className="text-gray-300 font-mono">info@urbanproduction.com</p>
          </div>

          {/* Address */}
          <div className="border border-gray-700 p-8 text-center hover:border-red-600 transition-colors duration-300 group">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">📍</div>
            <p className="text-gray-300 font-mono text-sm">
              Office, DM Geda Building,<br />
              7th Floor, No. 701<br />
              Addis Ababa, Ethiopia
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div 
            className="opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
          >
            <h3 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="text-red-600">REACH OUT</span>, SAY<br />
              HELLO, OR<br />
              DROP BY FOR A<br />
              COFFEE.
            </h3>
            <p className="text-gray-400 text-lg font-mono">
              GREAT THINGS START WITH A<br />
              SIMPLE CONVERSATION.
            </p>
          </div>

          {/* Right Form */}
          <form 
            onSubmit={handleSubmit} 
            className="space-y-6 opacity-0 transition-all duration-1000"
            style={{ transform: 'translateY(50px)' }}
            ref={formRef}
          >
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full bg-transparent border-b border-gray-700 py-3 px-0 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="w-full bg-transparent border-b border-gray-700 py-3 px-0 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors duration-300"
              />
            </div>

            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                rows={4}
                className="w-full bg-transparent border-b border-gray-700 py-3 px-0 text-white placeholder-gray-500 focus:border-red-600 focus:outline-none transition-colors duration-300 resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-black px-8 py-3 font-bold hover:bg-red-600 hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'SENDING...' : 'SEND'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Map Section */}
      <div 
        ref={mapRef}
        className="max-w-7xl mx-auto px-4 py-12 opacity-0 transition-all duration-1000"
        style={{ transform: 'translateY(50px)' }}
      >
        <div className="h-[500px] w-full border-4 border-red-600 overflow-hidden">
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                <div className="text-center">
                  <strong>Urban Film Production</strong><br />
                  DM Geda Building, 7th Floor<br />
                  Addis Ababa, Ethiopia
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>

      {/* Bottom Spacing */}
      <div className="h-20"></div>
    </div>
  );
};

export default ContactSection;