import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const FormError = ({ message }) => {
  return (
    <AnimatePresence>
      {message && (
        <motion.p
          className="text-xs text-red-500 mt-1"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
};

export default FormError;