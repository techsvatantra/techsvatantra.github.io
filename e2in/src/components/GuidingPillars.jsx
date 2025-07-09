import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Home } from 'lucide-react';
import { HeartHandshake as Handshake } from 'lucide-react';

const GuidingPillars = () => {
    const fourPillars = [
    {
      icon: <Heart className="h-8 w-8 text-primary" />,
      title: "Empathize Deeply",
      description: "Understanding your unique story and feelings to provide truly sensitive and personalized care connections."
    },
    {
      icon: <Handshake className="h-8 w-8 text-primary" />,
      title: "Connect Compassionately",
      description: "Fostering genuine, kind, and supportive relationships between clients, caregivers, and our team."
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Include Everyone",
      description: "Creating a welcoming space where every individual's background and identity is valued and respected."
    },
    {
      icon: <Home className="h-8 w-8 text-primary" />, 
      title: "Foster Belonging",
      description: "Building a community where clients and caregivers feel like part of our extended family, truly seen and understood."
    }
  ];

  return (
     <motion.div
      id="guiding-pillars"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="py-20"
    >
      <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12 px-4">
            <h3 className="text-3xl font-bold mb-3">
              Our Guiding Pillars at <span className="font-brand text-primary">e2i home care</span>
            </h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              These four pillars are the heart of <span className="font-semibold text-primary">e2i home care</span>. They define our approach to every match we make and every moment of care we provide, ensuring genuine human connection and support.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 px-4 md:px-10">
            {fourPillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow h-full border"
              >
                <div className="p-4 bg-primary/10 rounded-full mb-4">
                  {pillar.icon}
                </div>
                <h4 className="text-xl font-semibold mb-2">{pillar.title}</h4>
                <p className="text-sm text-muted-foreground flex-grow">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
           <p className="text-center text-muted-foreground mt-10 px-4 max-w-3xl mx-auto">
            The name <span className="font-brand text-primary">e2i</span> reflects our commitment to <span className="font-semibold text-primary">Empathy</span> and <span className="font-semibold text-primary">Inclusion</span>. These principles guide every personal connection our coordinators foster, ensuring a caring, supportive, and welcoming environment for everyone.
          </p>
      </div>
    </motion.div>
  )
}

export default GuidingPillars;