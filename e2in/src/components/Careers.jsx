import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, Send, ArrowRight, ArrowLeft, ArrowDown } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import JobOpenings from "./careers/JobOpenings";
import BasicInfoStep from "./careers/BasicInfoStep";
import ExperienceStep from "./careers/ExperienceStep";
import ReviewStep from "./careers/ReviewStep";
import { stepNames, defaultIssuingAuthority } from "./careers/constants";
import { careerValidationSchemas } from "@/lib/validation";

const Careers = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [localFormData, setLocalFormData] = useState({ resumeName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  const currentValidationSchema = careerValidationSchemas[currentStep - 1];

  const { control, register, handleSubmit, trigger, getValues, setValue, reset, formState: { errors } } = useForm({
    resolver: yupResolver(currentValidationSchema),
    mode: "onChange",
    defaultValues: {
      positionApplyingFor: "",
      fullName: "",
      email: "",
      address: "",
      phone: "",
      resume: null,
      licenseType: "",
      issuingAuthority: defaultIssuingAuthority,
      licenseNumber: "",
      expirationDate: "",
      education: "",
      experienceDuration: "",
      workHistory: [],
      consent: false,
      signature: ""
    }
  });

  const handleApplyClick = (roleTitle) => {
    if (selectedRole === roleTitle) {
      setSelectedRole(null);
      setValue("positionApplyingFor", "");
    } else {
      setSelectedRole(roleTitle);
      setValue("positionApplyingFor", roleTitle);
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalFormData(prev => ({...prev, resumeName: file.name}));
      setValue("resume", file, { shouldValidate: true });
    } else {
      setLocalFormData(prev => ({...prev, resumeName: ''}));
      setValue("resume", null, { shouldValidate: true });
    }
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(prev => prev < 3 ? prev + 1 : prev);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev > 1 ? prev - 1 : prev);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'resume' && data.resume) {
        formData.append('resume', data.resume);
      } else if (key === 'workHistory') {
        formData.append('workHistory', JSON.stringify(data.workHistory));
      } else {
        formData.append(key, data[key]);
      }
    });
    
    try {
      const response = await fetch('/api/send-application', {
        method: 'POST',
        body: formData,
      });

      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error("Received an invalid response from the server.");
      }

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      toast({
        title: "Application Submitted!",
        description: `Thank you, ${data.fullName}. We've received your application and will be in touch.`,
        variant: "success",
      });

      setCurrentStep(1);
      setSelectedRole(null);
      reset({
        positionApplyingFor: "",
        fullName: "",
        email: "",
        address: "",
        phone: "",
        resume: null,
        licenseType: "",
        issuingAuthority: defaultIssuingAuthority,
        licenseNumber: "",
        expirationDate: "",
        education: "",
        experienceDuration: "",
        workHistory: [],
        consent: false,
        signature: ""
      });
      setLocalFormData({ resumeName: '' });

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an issue sending your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoStep register={register} errors={errors} formData={localFormData} handleFileChange={handleFileChange} />;
      case 2:
        return <ExperienceStep control={control} register={register} errors={errors} />;
      case 3:
        return <ReviewStep control={control} register={register} errors={errors} />;
      default:
        return null;
    }
  };

  return (
    <section id="careers" className="py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <Link to="/" className="inline-flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium mb-4">
            <Briefcase className="h-5 w-5 mr-2" />
            Join Our Team
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-white">
            Make a Difference with <span className="font-brand">e2i home care</span>
          </h2>
          <p className="text-white/80 max-w-3xl mx-auto">
            We are looking for compassionate and dedicated individuals. Our application process is designed to be straightforward and respectful of your time. Let's start this journey together.
          </p>
        </motion.div>

        <JobOpenings selectedRole={selectedRole} onApplyClick={handleApplyClick} />

        <div ref={formRef} className={`max-w-4xl mx-auto bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20 text-foreground transition-all duration-500 ${!selectedRole && 'opacity-50 pointer-events-none'}`}>
           {!selectedRole && (
              <div className="absolute inset-0 bg-white/50 backdrop-blur-sm z-20 flex items-center justify-center rounded-xl">
                  <p className="text-lg font-semibold text-primary">Please select a role above to begin your application.</p>
              </div>
          )}
          
          <ProgressIndicator currentStep={currentStep} steps={stepNames} />
          
          <form onSubmit={handleSubmit(onSubmit)} className="overflow-hidden relative min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="w-full"
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            <div className="mt-10 pt-6 border-t flex justify-between items-center">
              <div>
                {currentStep > 1 && (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>
              <div>
                {currentStep < 3 ? (
                  <Button type="button" onClick={nextStep}>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                    ) : (
                      <Send className="h-4 w-4 mr-2" />
                    )}
                    {isLoading ? "Submitting..." : "Send My Application"}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Careers;