
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, Send, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import ProgressIndicator from "@/components/ProgressIndicator";
import JobOpenings from "./careers/JobOpenings";
import BasicInfoStep from "./careers/BasicInfoStep";
import ExperienceStep from "./careers/ExperienceStep";
import ReferencesStep from "./careers/ReferencesStep";
import ReviewStep from "./careers/ReviewStep";
import { stepNames, defaultIssuingAuthority } from "./careers/constants";
import { GOOGLE_APPS_SCRIPT_URLS, createFormData, submitToGoogleScript } from "@/config/googleAppsScript";

const Careers = ({ currentStep, setCurrentStep }) => {
  const { toast } = useToast();
  const [selectedRole, setSelectedRole] = useState(null);
  const [localFormData, setLocalFormData] = useState({ resumeName: '', healthAttestationName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);

  // Get reCAPTCHA site key and development mode flag from environment variables
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  const isRecaptchaDisabled = import.meta.env.VITE_DISABLE_RECAPTCHA === 'true';

  // Auto-set recaptcha token in development mode
  useEffect(() => {
    if (isRecaptchaDisabled) {
      setRecaptchaToken('dev-mode-bypass');
    }
  }, [isRecaptchaDisabled]);

  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    toast({
      title: "reCAPTCHA Expired",
      description: "Please complete the reCAPTCHA verification again.",
      variant: "destructive",
    });
  };

  const { control, register, handleSubmit, trigger, setValue, reset, formState: { errors } } = useFormContext();

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
  
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    const nameKey = `${fieldName}Name`;
    
    console.log('handleFileChange called:', {
      fieldName,
      hasFile: !!file,
      fileDetails: file ? {
        name: file.name,
        size: file.size,
        type: file.type
      } : null
    });
    
    if (file) {
      // Check file type by extension only (most reliable)
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileName = file.name.toLowerCase();
      const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
      
      if (!hasValidExtension) {
        toast({
          title: "Invalid File Type",
          description: "Please upload only PDF, DOC, or DOCX files.",
          variant: "destructive",
        });
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please upload a file smaller than 10MB.",
          variant: "destructive",
        });
        e.target.value = ''; // Clear the input
        return;
      }
      
      setLocalFormData(prev => ({...prev, [nameKey]: file.name}));
      setValue(fieldName, file, { shouldValidate: true });
      
      console.log('File set in form:', {
        fieldName,
        fileName: file.name,
        fileSize: file.size,
        localFormDataUpdated: nameKey
      });
    } else {
      setLocalFormData(prev => ({...prev, [nameKey]: ''}));
      setValue(fieldName, null, { shouldValidate: true });
      
      console.log('File cleared from form:', {
        fieldName,
        localFormDataCleared: nameKey
      });
    }
  };

  const nextStep = async () => {
    const isValid = await trigger();
    if (isValid) {
      setCurrentStep(prev => prev < 4 ? prev + 1 : prev);
    } else {
       Object.values(errors).forEach(error => {
        if (error.message) {
            toast({
                title: "Validation Error",
                description: error.message,
                variant: "destructive",
            });
        }
      });
    }
  };

  const prevStep = () => setCurrentStep(prev => prev > 1 ? prev - 1 : prev);

  const onSubmit = async (data) => {
    console.log('Form submission - Raw data received:', {
      hasResume: !!data.resume,
      resumeType: typeof data.resume,
      resumeConstructor: data.resume?.constructor?.name,
      hasHealthAttestation: !!data.healthAttestation,
      healthAttestationType: typeof data.healthAttestation,
      healthAttestationConstructor: data.healthAttestation?.constructor?.name,
      allKeys: Object.keys(data)
    });

    // Check if reCAPTCHA is completed
    if (!recaptchaToken) {
      toast({
        title: "Verification Required",
        description: "Please complete the reCAPTCHA verification before submitting.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Convert files to base64 for Google Apps Script
      const preparedData = { ...data };
      
      // Add reCAPTCHA token to the data
      preparedData.recaptchaToken = recaptchaToken;
      
      // Handle file uploads by converting to base64
      console.log('Original form data files:', {
        hasResume: !!data.resume,
        resumeInstanceOfFile: data.resume instanceof File,
        resumeDetails: data.resume ? {
          name: data.resume.name,
          size: data.resume.size,
          type: data.resume.type
        } : null,
        hasHealthAttestation: !!data.healthAttestation,
        healthAttestationInstanceOfFile: data.healthAttestation instanceof File,
        healthAttestationDetails: data.healthAttestation ? {
          name: data.healthAttestation.name,
          size: data.healthAttestation.size,
          type: data.healthAttestation.type
        } : null
      });

      if (data.resume && data.resume instanceof File) {
        console.log('Processing resume file:', data.resume.name);
        const resumeBase64 = await convertFileToBase64(data.resume);
        preparedData.resume = resumeBase64;
        preparedData.resumeName = data.resume.name;
        preparedData.resumeType = data.resume.type;
        console.log('Resume processed:', {
          base64Length: resumeBase64 ? resumeBase64.length : 0,
          fileName: data.resume.name
        });
      } else {
        console.log('No resume file to process:', {
          hasResume: !!data.resume,
          isFile: data.resume instanceof File
        });
      }
      // Don't send empty resume fields if no file is selected
      
      if (data.healthAttestation && data.healthAttestation instanceof File) {
        console.log('Processing health attestation file:', data.healthAttestation.name);
        const healthBase64 = await convertFileToBase64(data.healthAttestation);
        preparedData.healthAttestation = healthBase64;
        preparedData.healthAttestationName = data.healthAttestation.name;
        preparedData.healthAttestationType = data.healthAttestation.type;
        console.log('Health attestation processed:', {
          base64Length: healthBase64 ? healthBase64.length : 0,
          fileName: data.healthAttestation.name
        });
      } else {
        console.log('No health attestation file to process:', {
          hasHealthAttestation: !!data.healthAttestation,
          isFile: data.healthAttestation instanceof File
        });
      }
      // Don't send empty healthAttestation fields if no file is selected
      
      // Convert complex objects to JSON strings
      if (data.workHistory) {
        preparedData.workHistory = JSON.stringify(data.workHistory);
      }
      if (data.professionalReferences) {
        preparedData.professionalReferences = JSON.stringify(data.professionalReferences);
      }
      if (data.personalReferences) {
        preparedData.personalReferences = JSON.stringify(data.personalReferences);
      }
      
      // Include SMS consent in the submission
      preparedData.smsConsent = data.smsConsent || false;
      
      // Create form data for Google Apps Script
      const formData = createFormData(preparedData, 'Careers Application');
      
      // Debug: Log the data being sent
      console.log('Sending to Google Apps Script:', {
        hasResume: !!preparedData.resume,
        resumeName: preparedData.resumeName,
        resumeDataLength: preparedData.resume ? preparedData.resume.length : 0,
        hasHealthAttestation: !!preparedData.healthAttestation,
        healthAttestationName: preparedData.healthAttestationName,
        healthAttestationDataLength: preparedData.healthAttestation ? preparedData.healthAttestation.length : 0,
        allFieldsWithFiles: Object.keys(preparedData).filter(key => 
          key.includes('resume') || key.includes('healthAttestation') || key.includes('attachments')
        )
      });
      
      // Submit to Google Apps Script
      const response = await submitToGoogleScript(
        GOOGLE_APPS_SCRIPT_URLS.CAREERS_APPLICATION,
        formData
      );

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
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      reset({
        positionApplyingFor: "",
        fullName: "",
        email: "",
        address: "",
        phone: "",
        smsConsent: false,
        resume: null,
        healthAttestation: null,
        licenseType: "",
        issuingAuthority: defaultIssuingAuthority,
        licenseNumber: "",
        expirationDate: "",
        education: "",
        experienceDuration: "",
        workHistory: [],
        professionalReferences: [ { name: "", phone: "", relationship: "" }, { name: "", phone: "", relationship: "" } ],
        personalReferences: [ { name: "", phone: "", relationship: "" }, { name: "", phone: "", relationship: "" } ],
        consent: false,
        backgroundCheckConsent: false,
        signature: ""
      });
      setLocalFormData({ resumeName: '', healthAttestationName: '' });

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

  // Helper function to convert files to base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        // Remove the data URL prefix (e.g., "data:application/pdf;base64,")
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = error => reject(error);
    });
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
        return <ReferencesStep control={control} register={register} errors={errors} />;
      case 4:
        return (
          <>
            <ReviewStep control={control} register={register} errors={errors} />
            <div className="mt-8 flex justify-center">
              {isRecaptchaDisabled ? (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                  <p className="text-sm font-medium">Development Mode - reCAPTCHA Disabled</p>
                </div>
              ) : (
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={RECAPTCHA_SITE_KEY}
                  onChange={handleRecaptchaChange}
                  onExpired={handleRecaptchaExpired}
                />
              )}
            </div>
          </>
        );
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
                {currentStep < 4 ? (
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
