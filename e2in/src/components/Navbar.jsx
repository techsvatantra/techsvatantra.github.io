import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const logoVariants = {
    hidden: {
      opacity: 0,
      x: -20
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "-100%"
    },
    open: {
      opacity: 1,
      x: "0%"
    }
  };

  return <nav className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-lg shadow-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-20">
          <motion.div variants={logoVariants} initial="hidden" animate="visible" className="flex items-center">
            <Link to="/home" className="flex items-center group" onClick={e => {
            if (location.pathname === "/home") {
              e.preventDefault();
              window.scrollTo({
                top: 0,
                behavior: 'smooth'
              });
            } else {
              navigate("/home");
            }
            setIsOpen(false);
          }}>
              <img src="https://storage.googleapis.com/hostinger-horizons-assets-prod/27c53bfd-047f-42e4-ab9b-16dfed8164bd/8aa51d874e9e363e86abac4340dced80.png" alt="e2i home care logo" className="h-16 w-auto mr-3" />
              <div className="flex items-baseline">
                <span className="font-brand text-4xl font-bold text-teal group-hover:text-teal/80 transition-colors">e2i</span>
                <span className="text-2xl font-semibold text-foreground ml-1.5 group-hover:text-foreground/80 transition-colors">home care</span>
              </div>
            </Link>
          </motion.div>
          
          <motion.div initial={{
          opacity: 0,
          x: 20
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="hidden md:block">
            <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground">
              Call us Now! 609-360-6020
            </div>
          </motion.div>

          <div className="md:hidden flex items-center">
            <Button variant="ghost" onClick={toggleNavbar} aria-label="Toggle menu">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      <motion.div variants={mobileMenuVariants} initial="closed" animate={isOpen ? "open" : "closed"} transition={{
      type: "tween"
    }} className={`md:hidden absolute top-20 left-0 w-full bg-background shadow-lg ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <div className="pt-2">
            <Link to="/consultation" onClick={() => setIsOpen(false)} className="block w-full">
              <Button variant="default" className="w-full bg-primary hover:bg-primary/90">
                Free Consultation
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </nav>;
};

export default Navbar;