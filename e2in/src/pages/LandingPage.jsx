import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, UserPlus, HeartHandshake, Info, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import CTA from '@/components/CTA';
import Contact from '@/components/Contact';
import OurApproach from '@/components/OurApproach';
import GuidingPillars from '@/components/GuidingPillars';
import Footer from '@/components/Footer';

const LandingPage = () => {
  const panelVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const hoverEffect = {
    scale: 1.02,
    transition: { duration: 0.3 },
  };

  return (
    <div className="bg-background relative">
      <div className="absolute top-4 right-4 z-20">
        <Link to="/about-us">
          <Button variant="outline" className="bg-white/90 backdrop-blur-sm hover:bg-white text-foreground hover:text-primary border-gray-200 shadow-sm">
            <Info className="mr-2 h-4 w-4" />
            About & Service Areas
          </Button>
        </Link>
      </div>

      <main className="flex flex-col md:flex-row min-h-screen">
        {/* Left Panel: I Need Care */}
        <motion.div
          className="relative flex-1 flex items-center justify-center p-8 text-white bg-gradient-to-br from-primary to-teal-600 overflow-hidden"
          whileHover={hoverEffect}
        >
          <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-20" alt="Comforting caregiver assisting an elderly person" src="https://images.unsplash.com/photo-1507044567281-dfe1ec724575" />
          </div>
          <motion.div className="relative z-10 text-center flex flex-col items-center" variants={panelVariants} initial="initial" animate="animate">
            <div className="bg-white/20 p-4 rounded-full mb-6">
              <HeartHandshake className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              I Need Care
            </h1>
            <p className="max-w-md text-lg text-primary-foreground/90 mb-8">Every home is different. That's why we listen first — and find care that feels natural and comforting</p>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link to="/services">
                <Button size="lg" variant="outline" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary text-base py-3 px-8 group w-full sm:w-auto">
                  Choose Our Services
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/20 text-white h-12 py-3 px-8 group w-full sm:w-auto">
                  <Phone className="mr-2 h-5 w-5" />
                  443-333-9645
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Panel: I'm a Caregiver */}
        <motion.div
          className="relative flex-1 flex items-center justify-center p-8 text-foreground bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden"
          whileHover={hoverEffect}
        >
           <div className="absolute inset-0 z-0">
            <img className="w-full h-full object-cover opacity-20" alt="Team of happy and diverse caregivers" src="https://images.unsplash.com/photo-1686813215426-8a54e0053fd0" />
          </div>
          <motion.div className="relative z-10 text-center flex flex-col items-center" variants={panelVariants} initial="initial" animate="animate">
            <div className="bg-secondary/50 p-4 rounded-full mb-6">
              <UserPlus className="h-12 w-12 text-secondary-foreground" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">I am a Care Giver</h1>
            <p className="max-w-md text-lg text-muted-foreground mb-8">We understand that caregiving is personal. That's why we listen to your preferences and help place you where you feel at home</p>
            <Link to="/careers">
              <Button size="lg" variant="secondary" className="text-base py-3 px-8 group">
                View Open Positions
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>

      <OurApproach />
      <GuidingPillars />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
};
export default LandingPage;