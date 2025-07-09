import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";

const TrainingTeaser = () => {
  return (
    <section className="py-16 md:py-20 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-primary/80 to-blue-500/80 rounded-2xl p-8 md:p-12 shadow-lg text-white flex flex-col md:flex-row items-center justify-between"
        >
          <div className="md:w-2/3 mb-6 md:mb-0 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-3">
              <BookOpen className="h-8 w-8 mr-3" />
              <h2 className="text-2xl md:text-3xl font-bold">
                Grow Your Career with Us
              </h2>
            </div>
            <p className="text-white/90 text-lg mb-6 max-w-xl">
              Invest in your future. We offer comprehensive training programs and licensing assistance to help you become a certified caregiver.
            </p>
          </div>
          <div className="md:w-1/3 flex justify-center md:justify-end">
            <Link to="/training">
              <Button size="lg" variant="secondary" className="group text-primary bg-white hover:bg-gray-100 w-full sm:w-auto">
                Explore Training Programs
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingTeaser;