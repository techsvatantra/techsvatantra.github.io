
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, CheckCircle, ArrowDown } from "lucide-react";
import { jobOpenings } from "./constants";

const JobOpenings = ({ selectedRole, onApplyClick }) => {
  return (
    <div className="max-w-6xl mx-auto mb-16">
      <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-center mb-8 text-white">Current Openings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobOpenings.map((job) => {
          const isSelected = selectedRole === job.title;
          return (
            <motion.div
              key={job.title}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className={`h-full transition-all duration-300 flex flex-col bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm text-white shadow-lg ${isSelected ? 'ring-2 ring-white/90' : ''}`}>
                <CardHeader>
                  <CardTitle className="text-xl text-white">{job.title}</CardTitle>
                  <CardDescription className="flex items-center pt-1 text-white/80">
                    <MapPin className="h-4 w-4 mr-2" /> {job.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col flex-grow">
                  <p className="text-white/70 mb-6 flex-grow">{job.note}</p>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isSelected ? 'selected' : 'default'}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-auto"
                    >
                      {isSelected ? (
                        <div className="bg-white/20 text-white font-semibold p-3 flex justify-center items-center rounded-md w-full text-center">
                          <CheckCircle className="h-5 w-5 mr-2" />
                          Applying for this role
                        </div>
                      ) : (
                        <Button onClick={() => onApplyClick(job.title)} className="w-full bg-white hover:bg-gray-100 text-primary group">
                          Apply for this role
                          <ArrowDown className="h-4 w-4 ml-2 transition-transform group-hover:translate-y-0.5" />
                        </Button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
};

export default JobOpenings;
