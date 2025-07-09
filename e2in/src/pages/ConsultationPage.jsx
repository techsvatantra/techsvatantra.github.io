import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Phone, Mail, Calendar } from 'lucide-react';

const ConsultationPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="text-2xl font-bold text-primary font-brand hover:text-primary-dark transition-colors">
              e2i home care
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="tel:+1234567890" aria-label="Call us">
                  <Phone className="h-5 w-5 text-primary" />
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="mailto:info@e2ihomecare.com" aria-label="Email us">
                  <Mail className="h-5 w-5 text-primary" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">
            Choose Your Care Path
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help you find the perfect care solution. Select an option below to get started.
          </p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          >
            <div className="p-4 bg-primary/10 rounded-full mb-6">
              <Calendar className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Schedule a Free Consultation</h2>
            <p className="mt-3 text-muted-foreground flex-grow">
              Let's discuss your needs in a no-obligation call. We'll answer your questions and help you understand your options.
            </p>
            <Button size="lg" className="mt-8 w-full">
              Book a Consultation
              <ArrowLeft className="ml-2 h-5 w-5 -rotate-180" />
            </Button>
          </motion.div>

          <motion.div
            className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center text-center"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}
          >
            <div className="p-4 bg-teal-500/10 rounded-full mb-6">
              <Phone className="h-10 w-10 text-teal-500" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Request a Call Back</h2>
            <p className="mt-3 text-muted-foreground flex-grow">
              Busy right now? Leave your number and a convenient time, and one of our care coordinators will call you back.
            </p>
            <Button size="lg" variant="outline" className="mt-8 w-full">
              Request a Call
              <ArrowLeft className="ml-2 h-5 w-5 -rotate-180" />
            </Button>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConsultationPage;