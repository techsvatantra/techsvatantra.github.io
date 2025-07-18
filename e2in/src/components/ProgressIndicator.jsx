
import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const ProgressIndicator = ({ currentStep, steps }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto mb-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepIndex = index + 1;
          const isActive = stepIndex === currentStep;
          const isCompleted = stepIndex < currentStep;

          return (
            <React.Fragment key={step}>
              <motion.div className="flex flex-col items-center text-center" variants={itemVariants}>
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-500 ${
                    isActive ? 'bg-white border-white text-primary' : isCompleted ? 'bg-white/90 border-white/90 text-primary' : 'bg-transparent border-white/40 text-white/50'
                  }`}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <span className="font-bold text-lg">{stepIndex}</span>}
                </div>
                <p className={`mt-2 text-xs sm:text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-white' : isCompleted ? 'text-white/80' : 'text-white/50'}`}>
                  {step}
                </p>
              </motion.div>
              {index < steps.length - 1 && (
                <div className="flex-1 h-1 mx-2 sm:mx-4 rounded-full bg-white/20 relative">
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full bg-white"
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </motion.div>
  );
};

export default ProgressIndicator;
