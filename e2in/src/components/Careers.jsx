import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Briefcase, Send, ArrowRight, ArrowLeft, ArrowDown, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import ProgressIndicator from "@/components/ProgressIndicator";
import JobOpenings from "./careers/JobOpenings";
import BasicInfoStep from "./careers/BasicInfoStep";
import ExperienceStep from "./careers/ExperienceStep";
import ReviewStep from "./careers/ReviewStep";
import { stepNames, defaultIssuingAuthority } from "./careers/constants";
import { careerValidationSchemas } from "@/lib/validation";
import { GOOGLE_APPS_SCRIPT_URLS, GOOGLE_APPS_SCRIPT_CONFIG } from "@/config/googleAppsScript";
import ReCAPTCHA from "react-google-recaptcha";

const Careers = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [localFormData, setLocalFormData] = useState({ resumeName: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const formRef = useRef(null);
  const recaptchaRef = useRef(null);

  // reCAPTCHA handlers
  const handleRecaptchaChange = (token) => {
    setRecaptchaToken(token);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    toast({
      title: "reCAPTCHA Expired",
      description: "Please complete the reCAPTCHA verification again.",
      variant: "destructive",
      duration: 5000,
    });
  };

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
      signature: "",
      smsConsent: false
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
    console.log('File change event:', file);
    console.log('File details:', file ? {
      name: file.name,
      type: file.type,
      size: file.size
    } : 'No file');

    if (file) {
      setLocalFormData(prev => ({ ...prev, resumeName: file.name }));
      setValue("resume", file, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });

      // Verify it was set
      setTimeout(() => {
        const currentValue = getValues('resume');
        console.log('Form value after setValue:', currentValue);
        console.log('Is current value a File?', currentValue instanceof File);
      }, 100);

    } else {
      setLocalFormData(prev => ({ ...prev, resumeName: '' }));
      setValue("resume", null, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true
      });
    }
  };

  const nextStep = async () => {
    console.log('Before validation - current form values:', getValues());
    console.log('Resume value before validation:', getValues('resume'));

    const isValid = await trigger();
    console.log('Validation result:', isValid);
    console.log('After validation - current form values:', getValues());
    console.log('Resume value after validation:', getValues('resume'));

    if (isValid) {
      setCurrentStep(prev => prev < 3 ? prev + 1 : prev);
    }
  };

  const prevStep = () => setCurrentStep(prev => prev > 1 ? prev - 1 : prev);

  const onSubmit = async (data) => {
    // Check reCAPTCHA validation
    if (!recaptchaToken) {
      toast({
        title: "Security Check Required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    console.group('Form Submission Debug');
    console.log('Form data:', data);
    console.log('Resume file:', data.resume);
    console.log('Resume file type:', typeof data.resume);
    console.log('Is File?:', data.resume instanceof File);
    console.log('Is Blob?:', data.resume instanceof Blob);
    console.log('Local form data:', localFormData);
    console.log('All form values:', getValues());
    console.log('reCAPTCHA token:', recaptchaToken);
    console.groupEnd();

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
      // Convert resume file to base64
      let fileBase64 = '';
      let contentType = '';
      let fileName = '';

      console.log('Checking resume file:', data.resume);
      console.log('Resume exists?', !!data.resume);

      if (data.resume) {
        console.log('Resume file details:', {
          name: data.resume.name,
          type: data.resume.type,
          size: data.resume.size,
          lastModified: data.resume.lastModified
        });

        // Check if data.resume is actually a File/Blob object
        if (data.resume instanceof File || data.resume instanceof Blob) {
          fileName = data.resume.name || 'resume';
          contentType = data.resume.type || 'application/octet-stream';

          console.log('Processing file:', { fileName, contentType });

          try {
            // Read the file as base64
            const reader = new FileReader();
            fileBase64 = await new Promise((resolve, reject) => {
              reader.onload = () => {
                console.log('FileReader onload triggered');
                // Get base64 string without the prefix (e.g., "data:application/pdf;base64,")
                const result = reader.result;
                console.log('FileReader result type:', typeof result);
                console.log('FileReader result preview:', result?.substring(0, 100));

                if (typeof result === 'string') {
                  const base64String = result.split(',')[1];
                  console.log('Base64 string length:', base64String?.length);
                  resolve(base64String);
                } else {
                  reject(new Error('Failed to read file as string'));
                }
              };
              reader.onerror = (error) => {
                console.error('FileReader error:', error);
                reject(new Error('File reading failed'));
              };
              console.log('Starting FileReader.readAsDataURL...');
              reader.readAsDataURL(data.resume);
            });

            console.log('Final fileBase64 length:', fileBase64?.length);

          } catch (fileError) {
            console.error('Error reading file:', fileError);
            throw new Error('Failed to process the resume file. Please try again.');
          }
        } else {
          // Handle case where data.resume is not a proper File object
          console.error('Invalid file object:', data.resume);
          throw new Error('Invalid file selected. Please select a valid file.');
        }
      } else {
        console.log('No resume file provided - this might be optional');
      }

      // Prepare the payload as expected by the Google Apps Script
      const payload = {
        positionApplyingFor: data.positionApplyingFor,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        licenseType: data.licenseType,
        issuingAuthority: data.issuingAuthority,
        licenseNumber: data.licenseNumber,
        expirationDate: data.expirationDate,
        education: data.education,
        experienceDuration: data.experienceDuration,
        workHistory: JSON.stringify(data.workHistory),
        consent: data.consent,
        signature: data.signature,
        fileBase64: fileBase64,
        contentType: contentType,
        fileName: fileName,
        recaptchaToken: recaptchaToken
      };

      console.log('Final payload:', {
        ...payload,
        fileBase64: fileBase64 ? `[Base64 string of length ${fileBase64.length}]` : 'EMPTY',
        workHistory: '[JSON string]'
      });
      
      // Convert payload to form-encoded format using centralized helper
      const formData = new URLSearchParams();
      Object.keys(payload).forEach(key => {
        formData.append(key, payload[key]);
      });
      // Add standard fields
      const standardFields = GOOGLE_APPS_SCRIPT_CONFIG.getStandardFields();
      Object.keys(standardFields).forEach(key => {
        formData.append(key, standardFields[key]);
      });
      formData.append('source', 'Careers Form');

      // Submit to Google Script using centralized configuration
      const response = await fetch(GOOGLE_APPS_SCRIPT_URLS.CAREERS_APPLICATION, {
        method: GOOGLE_APPS_SCRIPT_CONFIG.METHOD,
        headers: GOOGLE_APPS_SCRIPT_CONFIG.HEADERS,
        body: formData.toString(),
      });

      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Parse JSON response
      let result;
      try {
        result = await response.json();
      } catch (e) {
        result = await response.text();
      }
      
      console.log('Google Script response:', result);
      
      // Check for success in response
      if (result.status != 'success') {
        throw new Error(result.message || 'Submission failed');
      }

      // Show success message with server response
      toast({
        title: "Application Submitted!",
        description: result.message || `Thank you, ${data.fullName}. We've received your application and will be in touch.`,
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
        signature: "",
        smsConsent: false
      });
      setLocalFormData({ resumeName: '' });
      
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error.message || "There was an issue sending your application. Please try again.",
        variant: "destructive",
      });
      
      // Reset reCAPTCHA on error
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);
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
        return <BasicInfoStep
          control={control} // Add this
          register={register}
          errors={errors}
          formData={localFormData}
          handleFileChange={handleFileChange}
        />;
      case 2:
        return <ExperienceStep control={control} register={register} errors={errors} />;
      case 3:
        return <ReviewStep 
          control={control} 
          register={register} 
          errors={errors} 
          recaptchaRef={recaptchaRef}
          recaptchaToken={recaptchaToken}
          handleRecaptchaChange={handleRecaptchaChange}
          handleRecaptchaExpired={handleRecaptchaExpired}
        />;
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
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading || !recaptchaToken}>
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