import React from 'react';
import { motion } from 'framer-motion';
import { useMediaQuery } from '@/hooks/useMediaQuery';

const AnimatedLogo = () => {
  const logoUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/27c53bfd-047f-42e4-ab9b-16dfed8164bd/d4fbf5402d08ad57d0c5205849a01599.png";
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const desktopAnimation = {
    rotateY: 360
  };

  const mobileAnimation = {
    rotateX: 360
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-40" style={{ perspective: '1000px' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.5 }}
        className="md:flex md:items-center md:justify-center"
      >
        <motion.img
          src={logoUrl}
          alt="e2i home care spinning logo"
          className="w-[140px] h-[140px] md:w-[250px] md:h-[250px] rounded-full object-cover"
          animate={isDesktop ? desktopAnimation : mobileAnimation}
          transition={{
            duration: 5,
            ease: 'linear',
            repeat: Infinity,
          }}
        />
      </motion.div>
    </div>
  );
};

export default AnimatedLogo;