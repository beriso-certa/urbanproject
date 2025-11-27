"use client";

import { useState } from "react";
import { RevealOnScroll } from "./gsap/RevealsOnScroll";

export interface Service {
  _id: string;
  title: string;
  description: string;
}

interface Props {
  services: Service[];
}

const ServicesAccordion: React.FC<Props> = ({ services }) => {
 const [openId, setOpenId] = useState<string | null>(
  services?.[0]?._id ?? null
);



  return (
    <section className="section border-y border-brand-gray/50 bg-brand-gray/40">
      <RevealOnScroll>
        <p className="section-title">What we do</p>
        <h2 className="section-heading">Services</h2>

        <div className="divide-y divide-brand-gray/60">
          {services.map((s) => {
            const isOpen = openId === s._id;
            return (
              <button
                key={s._id}
                onClick={() => setOpenId(isOpen ? null : s._id)}
                className="w-full text-left py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <span className="h-7 w-7 rounded-full border border-brand-gray/70 flex items-center justify-center text-xs">
                    {isOpen ? "-" : "+"}
                  </span>
                  <span className="text-sm md:text-base font-medium uppercase tracking-[0.2em]">
                    {s.title}
                  </span>
                </div>
                <p
                  className={`md:max-w-xl text-xs text-gray-300 transition-all duration-300 ${
                    isOpen ? "opacity-100 max-h-40" : "opacity-60 max-h-0 md:max-h-12 overflow-hidden"
                  }`}
                >
                  {s.description}
                </p>
              </button>
            );
          })}
        </div>
      </RevealOnScroll>
    </section>
  );
};

export default ServicesAccordion;