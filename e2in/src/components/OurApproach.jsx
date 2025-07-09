import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, HeartHandshake as Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';

const OurApproach = () => {
  const benefits = [
    "Relationship-focused matching",
    "Licensed and certified caregivers",
    "Personalized care plans",
    "Regular quality assessments",
    "Continuous caregiver training",
    "24/7 support and availability",
  ];

  return (
    <section id="our-approach" className="py-20 bg-gray-50/70">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-blue-300/30 rounded-3xl blur-3xl transform rotate-3 scale-105"></div>
            
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden shadow-lg h-40 bg-blue-50 p-6 flex items-center justify-center sm:col-span-1">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Commitment to You</div>
                </div>
              </div>
               <div className="rounded-2xl overflow-hidden shadow-lg h-40 bg-primary/10 p-6 flex items-center justify-center sm:col-span-1">
                 <div className="text-center">
                    <Handshake className="h-10 w-10 text-primary mx-auto mb-2" />
                    <div className="text-sm font-semibold text-primary">Connection Focused</div>
                    <p className="text-xs text-muted-foreground">Building Trust</p>
                  </div>
               </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-2 w-fit">
              Our Approach
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              More Than Care, It's a <span className="text-primary">Connection</span>.
            </h2>
            
            <p className="text-muted-foreground">
              At <span className="font-semibold text-primary">e2i home care</span>, we believe the best care stems from genuine relationships. We specialize in matching care aides with clients through a human-first, relationship-based approach. This means a dedicated coordinator personally connects with both the client and the caregiver—ensuring a fit that goes beyond skills, focusing on emotional connection, cultural compatibility, and mutual respect.
            </p>
            
            <p className="text-muted-foreground">
              Our mission is to provide compassionate, high-quality care that not only meets your needs but also makes you feel truly seen, included, and part of our caring community. We want every interaction to affirm: "Here's someone who sees me, includes me, and truly cares."
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                  className="flex items-center space-x-2"
                >
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span className="text-sm">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="pt-6">
              <Link to="/about-us">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;