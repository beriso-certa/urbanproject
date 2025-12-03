
import dynamic from 'next/dynamic';
import ServicesAccordion, { Service } from "./components/ServicesAccordion";
import QuoteSection from "./components/QuoteSection";
import TrustedBy, { Client } from "./components/TrustedBy";

import Footer from "./components/layout/Footer";
import Header from "./components/Header";
import { client } from "../sanity/lib/client";
import BlogPage from "./(routes)/blog/page";
import {
  WORK_QUERY,
  SERVICES_QUERY,
  CLIENTS_QUERY,
  QUOTE_QUERY,
  HEADER_QUERY
} from "../sanity/lib/queries";
import Testimonials from "./components/Testimonials";
import WhyUrban from "./components/WhyUrban";
import Services from "./components/Services";
import WorkPage from "./works/page";
import { Hero } from "./components/Hero";

export const revalidate = 60; // ISR

async function getData() {
  const [header, works, services, clients, ] = await Promise.all([
    client.fetch(HEADER_QUERY),

    client.fetch<Service[]>(SERVICES_QUERY),
    client.fetch<Client[]>(CLIENTS_QUERY),
    client.fetch<{ quote: string; author: string; role: string }>(
      QUOTE_QUERY
    ),
  ]);
  

  return { header, works, services, clients, };
}

export default async function Page() {
  const { header, works, services, clients,  } = await getData();

  // Only render Header if header data exists
  
  return (
    <main className="min-h-screen bg-brand-dark text-white">
    <Header data={header} />
      <Hero />
      <WorkPage />
      <Services />
      <WhyUrban />
      <Testimonials />
      <TrustedBy />
      <BlogPage />
  
      <QuoteSection />
   
    
      <Footer />
    </main>
  );
}