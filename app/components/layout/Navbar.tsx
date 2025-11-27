"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const navItems = ["Home", "Work", "Services", "About Us", "Blogs"];

export default function Navbar() {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div
      ref={navRef}
      className="w-full relative bg-[#0a0f1c] border border-purple-500 px-10 py-4 flex items-center justify-between"
    >
      {/* ✅ Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/images/logo.png"
          alt="Urban Logo"
          width={40}
          height={40}
          className="object-contain"
        />
        <span className="text-white text-xl font-bold lowercase">urban</span>
      </div>

      {/* ✅ Center Menu */}
      <div className="flex items-center gap-3">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`px-4 py-2 border text-sm uppercase tracking-wide transition-all
              ${
                item === "Home"
                  ? "bg-white text-black"
                  : "border-white/30 text-white hover:border-white"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* ✅ Contact Button */}
      <button className="px-5 py-2 bg-white text-black font-medium uppercase text-sm hover:bg-gray-200 transition">
        CONTACT US
      </button>

      {/* ✅ Bottom Glow Line */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400" />
    </div>
  );
}
