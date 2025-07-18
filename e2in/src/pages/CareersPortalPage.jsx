import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Briefcase, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CareersPortalPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/90 to-teal-600">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            <Briefcase className="h-5 w-5 mr-2" />
            Career Opportunities
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Join Our Team - <span className="font-brand">e2i home care</span>
          </h1>
          <p className="text-white/80 max-w-3xl mx-auto mb-8">
            Explore our current job openings and discover rewarding career opportunities in home healthcare.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl mx-auto bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 overflow-hidden"
        >
          <div className="p-6 bg-white/90 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Current Job Openings</h2>
              <a 
                href="https://www.careers-page.com/e2ihomecare" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </a>
            </div>
          </div>
          
          <div className="relative" style={{ height: "calc(100vh - 300px)", minHeight: "600px" }}>
            <iframe
              src="https://www.careers-page.com/e2ihomecare"
              className="w-full h-full border-0"
              title="e2i Home Care Careers"
              loading="lazy"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
            />
          </div>
          
          <div className="p-6 bg-white/90 border-t border-gray-200">
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Having trouble viewing the careers page? 
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a 
                  href="https://www.careers-page.com/e2ihomecare" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Careers Page Directly
                  </Button>
                </a>
                <Link to="/careers">
                  <Button className="w-full sm:w-auto">
                    Use Our Application Form
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CareersPortalPage;
