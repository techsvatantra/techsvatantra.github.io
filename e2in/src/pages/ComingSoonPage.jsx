import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Construction } from "lucide-react";
import { motion } from "framer-motion";

const ComingSoonPage = () => {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-amber-50 to-orange-100/70">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full"
      >
        <Construction className="h-16 w-16 text-primary mx-auto mb-6" />
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Coming Soon!
        </h1>
        <p className="text-muted-foreground mb-8">
          We're working hard to bring you this feature. Please check back later!
        </p>
        <Link to="/">
          <Button size="lg" className="bg-primary hover:bg-primary/90">
            Go Back to Home
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default ComingSoonPage;