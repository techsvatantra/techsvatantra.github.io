import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationPage from "@/pages/ConsultationPage";
import AllServicesPage from "@/pages/AllServicesPage";
import TrainingPage from "@/pages/TrainingPage";
import CareersPage from "@/pages/CareersPage"; 
import NotFoundPage from "@/pages/NotFoundPage";
import ComingSoonPage from "@/pages/ComingSoonPage";
import LandingPage from "@/pages/LandingPage";
import AboutUsPage from "@/pages/AboutUsPage";
import ServiceAreaPage from "@/pages/ServiceAreaPage";
import AnimatedLogo from "@/components/AnimatedLogo";

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const location = useLocation();
  const isLandingPage = location.pathname === '/' || location.pathname === '/home';
  const [showLogo, setShowLogo] = useState(isLandingPage);

  useEffect(() => {
    const handleScroll = () => {
      if (isLandingPage) {
        // Hide logo faster on scroll
        setShowLogo(window.scrollY < 10);
      }
    };

    if (isLandingPage) {
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initial check
    } else {
      setShowLogo(false);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isLandingPage]);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1); 
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  useEffect(() => {
    document.title = "e2i home care - Professional Home Care Services";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {!isLandingPage && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 origin-left"
          style={{ scaleX }}
        />
      )}
      
      {!isLandingPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about-us" element={<ServiceAreaPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/consultation" element={<ConsultationPage />} />
          <Route path="/services" element={<AllServicesPage />} />
          <Route path="/training" element={<TrainingPage />} />
          <Route path="/careers" element={<CareersPage />} /> 
          <Route path="/coming-soon" element={<ComingSoonPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      
      {!isLandingPage && <Footer />}
      <Toaster />
      <AnimatePresence>
        {showLogo && <AnimatedLogo />}
      </AnimatePresence>
    </div>
  );
}

export default App;