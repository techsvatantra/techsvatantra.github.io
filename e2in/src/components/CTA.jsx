import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Users, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  const stats = [
    {
      icon: <Users className="h-8 w-8 text-white" />,
      value: "100% Human-First Matching",
      label: "Ensuring a deep, personal connection between clients and caregivers.",
    },
    {
      icon: <FileText className="h-8 w-8 text-white" />,
      value: "Personalized Care Plans",
      label: "Tailored strategies to meet individual needs and preferences effectively.",
    },
    {
      icon: <Phone className="h-8 w-8 text-white" />,
      value: "24/7 Support & Availability",
      label: "Always here for you, providing peace of mind around the clock.",
    },
  ];

  return (
    <section className="relative py-20 md:py-28 bg-dark-teal text-white overflow-hidden">
      <div className="absolute inset-0 bg-black/20 z-0"></div>
      <div className="absolute -bottom-1/4 -left-20 w-72 h-72 bg-white/10 rounded-full opacity-50"></div>
      <div className="absolute -top-1/4 -right-20 w-96 h-96 bg-white/10 rounded-full opacity-50"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Experience Care That Truly Connects
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-teal-100">
            Ready to feel seen, included, and genuinely cared for? Our dedicated coordinators are here to understand your unique needs and find a heart-centered match. Let's start the conversation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index + 0.3 }}
              className="bg-white/10 p-6 rounded-lg shadow-xl text-center backdrop-blur-sm"
            >
              <div className="flex justify-center items-center mb-4">
                <div className="p-3 bg-white/20 rounded-full">
                  {stat.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-1">{stat.value}</h3>
              <p className="text-sm text-teal-200">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center"
        >
          <Link to="/consultation">
            <Button
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-gray-100 border-2 border-white hover:border-gray-100 text-lg py-3 px-8 shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Request a Free Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;