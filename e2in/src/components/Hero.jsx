import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Users, ShieldCheck, HeartHandshake } from "lucide-react";
import PincodeSearch from "@/components/PincodeSearch";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/20 text-foreground min-h-[85vh] md:min-h-[calc(100vh-80px)] flex items-center justify-center py-20 md:py-0 overflow-hidden">
      <div className="absolute inset-0 opacity-50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heroPattern" patternUnits="userSpaceOnUse" width="60" height="60" patternTransform="scale(1) rotate(45)">
              <path d="M0 30 L30 0 L60 30 L30 60 Z" fill="hsl(var(--primary) / 0.05)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroPattern)" />
        </svg>
      </div>
      
      <motion.div 
        className="absolute top-0 left-0 w-full h-full opacity-20"
        animate={{
          backgroundImage: [
            "radial-gradient(circle at 20% 80%, hsl(var(--primary) / 0.1) 0%, transparent 30%)",
            "radial-gradient(circle at 80% 30%, hsl(var(--secondary) / 0.1) 0%, transparent 30%)",
            "radial-gradient(circle at 50% 50%, hsl(var(--accent) / 0.05) 0%, transparent 20%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 w-full max-w-3xl mx-auto aspect-video overflow-hidden rounded-lg shadow-2xl"
        >
          <video
            src="/videos/final3.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/video-poster.jpg"
          >
            Your browser does not support the video tag.
          </video>
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
        >
          At <span className="font-semibold text-primary">e2i home care</span>, we go beyond skills. Our dedicated coordinators personally ensure a compassionate match based on emotional connection, cultural compatibility, and mutual respect.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-base text-muted-foreground max-w-2xl mx-auto mb-10 italic"
        >
          "Here's someone who sees me, includes me, and truly cares." – This is the feeling we strive for, for every client and caregiver.
        </motion.div>


        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-12 w-full max-w-md mx-auto"
        >
          <PincodeSearch />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/consultation">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg transition-transform hover:scale-105 w-full sm:w-auto group text-base py-3 px-8"
            >
              Book a Free Consultation
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link to="/services">
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-primary hover:bg-primary/5 shadow-lg transition-transform hover:scale-105 w-full sm:w-auto group text-base py-3 px-8"
            >
              Explore Our Services
              <Users className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-4 text-muted-foreground"
        >
          <div className="flex items-center">
            <HeartHandshake className="h-5 w-5 mr-2 text-primary" />
            <span>Relationship-Based Matching</span>
          </div>
          <div className="flex items-center">
            <Users className="h-5 w-5 mr-2 text-primary" />
            <span>Experienced & Vetted Caregivers</span>
          </div>
          <div className="flex items-center">
            <ShieldCheck className="h-5 w-5 mr-2 text-primary" />
            <span>Personalized Care Plans</span>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-background to-transparent z-0"></div>
    </section>
  );
};

export default Hero;