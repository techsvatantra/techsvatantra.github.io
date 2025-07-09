
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Stethoscope, UserCheck, Users, BrainCircuit, HelpingHand as HandHelping } from 'lucide-react';

const services = [
  {
    icon: <Heart className="w-8 h-8 text-primary" />,
    title: "Companion Care",
    description: "Engaging companionship and assistance with daily activities to brighten your day.",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-primary" />,
    title: "Skilled Nursing",
    description: "Professional medical care provided by licensed nurses in the comfort of your home.",
  },
  {
    icon: <UserCheck className="w-8 h-8 text-primary" />,
    title: "Personal Care",
    description: "Dignified assistance with personal hygiene, grooming, and mobility.",
  },
  {
    icon: <BrainCircuit className="w-8 h-8 text-primary" />,
    title: "Dementia & Alzheimer's Care",
    description: "Specialized, compassionate care for individuals with memory-related conditions.",
  },
  {
    icon: <HandHelping className="w-8 h-8 text-primary" />,
    title: "Respite Care",
    description: "Temporary relief for primary caregivers, ensuring your loved one is in good hands.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary" />,
    title: "Post-Operative Care",
    description: "Supporting a smooth and safe recovery at home after a hospital stay.",
  },
];

const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const Services = () => {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-brand tracking-tight">
            Experience care that{" "}
            <span className="text-dark-teal">truly connects.</span>
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            We offer a comprehensive range of services tailored to meet your unique needs, all delivered with the e2i promise of empathy and excellence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.3 }}
              className="bg-card p-8 rounded-xl shadow-lg border border-border/50 service-card flex flex-col"
            >
              <div className="flex-shrink-0 mb-6 bg-primary/10 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                {service.icon}
              </div>
              <div className="flex-grow">
                <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Link to="/services">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform hover:scale-105 group text-base py-3 px-8">
              See All Our Services
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
