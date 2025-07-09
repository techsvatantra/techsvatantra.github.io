import React from "react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Careers from "@/components/Careers";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";

const HomePage = () => {
  return (
    <>
      <Hero />
      <Services />
      <Careers />
      <CTA />
      <Contact />
    </>
  );
};

export default HomePage;