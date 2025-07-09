import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Clock, Utensils, Activity, Pill, Home } from "lucide-react";
import { Link } from "react-router-dom";

const serviceItems = [
  {
    icon: <Heart className="h-10 w-10 text-primary" />,
    title: "Personal Care",
    description: "Assistance with daily activities including bathing, dressing, grooming, and mobility support.",
    features: ["Bathing assistance", "Dressing assistance", "Mobility support", "Medication reminders"]
  },
  {
    icon: <Clock className="h-10 w-10 text-primary" />,
    title: "24/7 Care",
    description: "Round-the-clock care and monitoring for clients who require continuous assistance and supervision.",
    features: ["Overnight supervision", "Emergency response", "Regular monitoring", "Peace of mind"]
  },
  {
    icon: <Utensils className="h-10 w-10 text-primary" />,
    title: "Meal Preparation",
    description: "Nutritious meal planning and preparation according to dietary needs and preferences.",
    features: ["Dietary planning", "Grocery shopping", "Meal preparation", "Feeding assistance"]
  },
  {
    icon: <Activity className="h-10 w-10 text-primary" />,
    title: "Companionship",
    description: "Friendly companionship, conversation, and social engagement to prevent isolation and loneliness.",
    features: ["Social interaction", "Recreational activities", "Emotional support", "Cognitive stimulation"]
  },
  {
    icon: <Pill className="h-10 w-10 text-primary" />,
    title: "Medication Management",
    description: "Ensuring medications are taken correctly and on schedule according to doctor's instructions.",
    features: ["Medication reminders", "Prescription pickups", "Medication organization", "Adherence monitoring"]
  },
  {
    icon: <Home className="h-10 w-10 text-primary" />,
    title: "Light Housekeeping",
    description: "Maintaining a clean and safe living environment with light cleaning and organization services.",
    features: ["Cleaning", "Laundry", "Bed making", "Organization"]
  }
];

const Services = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium mb-2"
          >
            Our Services
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Comprehensive Home Care Solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            We offer a wide range of personalized care services designed to meet the unique needs of each client, ensuring they receive the highest quality of care in the comfort of their own home.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {serviceItems.map((service, index) => (
            <motion.div key={index} variants={itemVariants} className="service-card">
              <Card className="h-full border-t-4 border-t-primary hover:shadow-xl transition-all duration-300 flex flex-col">
                <CardHeader>
                  <div className="mb-4">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <svg className="w-4 h-4 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="pt-4">
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link to="/about-us">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Check Availability & View All Services
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;