import React from 'react';
import { motion } from 'framer-motion';
import PincodeSearch from '@/components/PincodeSearch';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const AboutUsPage = () => {
  return (
    <div className="bg-background min-h-screen">
      <div className="relative bg-gradient-to-br from-primary to-teal-600 flex flex-col items-center justify-center p-4 py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img className="w-full h-full object-cover opacity-20" alt="Map with location pins for service areas" src="https://images.unsplash.com/photo-1578925773717-a41e4a7fa4b0" />
        </div>
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">Our Service Areas</h1>
            <p className="max-w-2xl mx-auto text-lg text-primary-foreground/90 mb-8">
              We are dedicated to providing compassionate and professional home care services. Check if we serve your area by entering your zip code below.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <PincodeSearch />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ duration: 0.5, delay: 0.5 }} 
            className="mt-12"
          >
            <Link to="/" className="inline-flex items-center text-white hover:text-blue-100 transition-colors duration-300">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;