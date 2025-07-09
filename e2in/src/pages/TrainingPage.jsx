import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { BookOpen, Award, Users, ShieldCheck, CheckCircle } from "lucide-react";

const trainingPrograms = [
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Certified Nursing Assistant (CNA) Program",
    description: "Our comprehensive CNA program prepares you with the essential skills and knowledge to provide high-quality patient care in various healthcare settings. Includes classroom instruction and hands-on clinical experience.",
    features: ["State-approved curriculum", "Experienced instructors", "Clinical practicum", "Job placement assistance upon completion"]
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Home Health Aide (HHA) Certification",
    description: "Become a certified HHA and specialize in providing personal care and support to clients in their homes. Our training focuses on compassionate care, safety, and daily living assistance.",
    features: ["Specialized home care training", "Patient safety protocols", "Communication skills", "Understanding client needs"]
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "Specialized Care Workshops",
    description: "Advance your skills with our workshops focusing on specialized areas such as dementia care, palliative care, and pediatric care. Stay updated with the latest best practices.",
    features: ["Dementia & Alzheimer's Care", "Palliative & Hospice Support", "Pediatric Home Care", "Chronic Disease Management"]
  }
];

const TrainingPage = () => {
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  
  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      className="bg-gradient-to-br from-sky-50 to-blue-100/70 py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <header className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <BookOpen className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
            Caregiver Training & Licensing
          </h1>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-lg">
            Start or advance your caregiving career with <span className="font-brand text-primary">e2i home care</span>. We provide comprehensive training programs and assist you in obtaining the necessary licenses.
          </p>
        </header>

        <motion.section 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-8 text-center">Our Training Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trainingPrograms.map((program, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-primary rounded-lg">
                  <CardHeader className="items-center text-center">
                    <div className="p-3 bg-primary/10 rounded-full mb-3">{program.icon}</div>
                    <CardTitle className="text-xl">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow text-center">
                    <CardDescription className="text-sm text-muted-foreground mb-4">{program.description}</CardDescription>
                    <ul className="space-y-1 text-left text-sm text-muted-foreground">
                      {program.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          variants={itemVariants}
          initial="initial"
          animate="animate"
          className="text-center pt-8" 
        >
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Ready to Start Your Journey?</h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Take the first step towards a fulfilling career in home care. Explore our current job openings or contact us to learn more about our training programs and licensing assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/careers">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                View Career Opportunities
              </Button>
            </Link>
            <Link to="/#contact">
              <Button size="lg" variant="outline">
                Contact Us for Training Info
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

export default TrainingPage;