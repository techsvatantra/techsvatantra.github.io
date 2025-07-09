import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin } from 'lucide-react';
import PincodeSearch from '@/components/PincodeSearch';
import About from '@/components/About';

const ServiceAreaPage = () => {
  return (
    <div className="bg-background text-foreground">
      <div className="relative bg-gradient-to-b from-primary/5 via-background to-background pt-24 pb-20">
        <div className="absolute top-6 left-6 z-10">
          <Link to="/">
            <Button variant="outline" className="bg-white/80 backdrop-blur-sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center justify-center bg-primary/10 p-4 rounded-full mb-6">
              <MapPin className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
              Check Our Service Area
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
              Enter your zip code below to see if we provide compassionate home care services in your neighborhood.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10"
          >
            <PincodeSearch />
          </motion.div>
        </div>
      </div>
      
      <About />
    </div>
  );
};

export default ServiceAreaPage;