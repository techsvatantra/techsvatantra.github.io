import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Check, Send, User, Phone, Mail, ArrowRight, MessageCircle, ArrowLeft, Shield } from "lucide-react";
import ProgressIndicator from "@/components/ProgressIndicator";
import Footer from "@/components/Footer";
import { GOOGLE_APPS_SCRIPT_URLS, createFormData, submitToGoogleScript } from "@/config/googleAppsScript";
import ReCAPTCHA from "react-google-recaptcha";

const serviceItems = [
  { id: "personal-care", title: "Personal Care", description: "Support with activities of daily living like bathing, dressing, and mobility." },
  { id: "overnight-supervision", title: "Overnight Supervision", description: "Continuous care and monitoring throughout the night for safety and peace of mind." },
  { id: "meal-support", title: "Meal Support", description: "Nutritious meal planning, preparation, and grocery shopping based on dietary needs." },
  { id: "companionship", title: "Companionship", description: "Friendly company for social engagement, hobbies, and emotional support." },
  { id: "medication-reminders", title: "Medication Reminders", description: "Ensuring medications are taken safely, correctly, and on schedule." },
  { id: "housekeeping", title: "Light Housekeeping", description: "Help with light household tasks to maintain a clean and safe environment." },
];

const steps = ["Choose Care", "Your Info", "Final Note"];

const AllServicesPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "", smsConsent: false });
  const [isLoading, setIsLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const { toast } = useToast();

  // Get reCAPTCHA site key from environment variables
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

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

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSmsConsentChange = (checked) => {
    setFormData((prev) => ({ 
      ...prev, 
      smsConsent: checked 
    }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) {
      toast({ title: "Please select at least one service.", variant: "destructive" });
      return;
    }
    if (currentStep === 2) {
      if (!formData.name) {
        toast({ title: "Please let us know your name.", variant: "destructive" });
        return;
      }
      if (!formData.phone && !formData.email) {
        toast({ title: "How can we reach you?", description: "Please provide either a phone number or an email address.", variant: "destructive" });
        return;
      }
      if (formData.phone && !formData.smsConsent) {
        toast({ title: "SMS Consent Required", description: "Please agree to receive SMS notifications to continue.", variant: "destructive" });
        return;
      }
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check reCAPTCHA validation
    if (!recaptchaToken) {
      toast({
        title: "Security Check Required",
        description: "Please complete the reCAPTCHA verification.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const selectedServiceDetails = serviceItems.filter(service => selectedServices.includes(service.id));
    const selectedServiceTitles = selectedServiceDetails.map(s => s.title).join(", ");

    // Create form data using centralized helper
    const submissionData = createFormData({
      name: formData.name,
      email: formData.email,
      message: formData.message,
      phone: formData.phone,
      selectedServices: selectedServiceTitles,
      recaptchaToken: recaptchaToken
    }, 'Services Request');

    try {
      // Submit to Google Script using centralized configuration
      const response = await submitToGoogleScript(GOOGLE_APPS_SCRIPT_URLS.SERVICES_REQUEST, submissionData);
      
      // Check if the response contains error information
      const responseData = await response.json();
      
      if (responseData.result === 'error') {
        throw new Error(responseData.message || 'Unknown error occurred');
      }

      // Since no-cors doesn't return readable response
      // We assume success if no error is thrown
      toast({
        title: "We've received your message!",
        description: `Thank you, ${formData.name}. We'll be in touch very soon.`,
        variant: "success",
      });
      
      setSelectedServices([]);
      setFormData({ name: "", phone: "", email: "", message: "", smsConsent: false });
      setCurrentStep(1);
      
      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      setRecaptchaToken(null);

    } catch (error) {
      console.error("Submission failed:", error);
      toast({
        title: "Oh no! Something went wrong.",
        description: "We couldn't send your request. Please try again.",
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

  const renderStepContent = () => {
    const selectedServiceDetails = serviceItems.filter(service => selectedServices.includes(service.id));
    const selectedServiceTitles = selectedServiceDetails.map(s => s.title).join(", ");

    const stepVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
      exit: { opacity: 0, y: -30, transition: { duration: 0.4, ease: [0.7, 0, 0.84, 0] } },
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div key={currentStep} variants={stepVariants} initial="hidden" animate="visible" exit="exit">
          {currentStep === 1 && (
            <div>
              <div className="text-center mb-12">
                <Link to="/" className="inline-flex items-center text-sm font-semibold text-white/80 hover:text-white transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
                <h1 className="text-3xl md:text-4xl font-bold text-white mt-4 tracking-tight">What kind of care are you looking for?</h1>
                <p className="text-lg text-white/70 mt-2">Select all that apply. We'll find the perfect fit.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {serviceItems.map((service, index) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.07 }}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`relative flex items-start space-x-4 p-5 rounded-xl border cursor-pointer transition-all duration-300 shadow-lg overflow-hidden group
                        ${isSelected
                          ? "bg-white/20 border-white/30 ring-2 ring-white/90 backdrop-blur-md"
                          : "bg-white/10 border-white/20 hover:bg-white/20 backdrop-blur-sm"
                        }`
                      }
                    >
                      <div className={`flex-shrink-0 mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
                        ${isSelected ? "bg-white border-white" : "border-white/50 group-hover:border-white"}`
                      }>
                        <AnimatePresence>
                          {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="h-4 w-4 text-primary" /></motion.div>}
                        </AnimatePresence>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-base leading-tight">{service.title}</p>
                        <p className="text-sm text-white/70 mt-1">{service.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <AnimatePresence>
                {selectedServices.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="mt-12 text-center">
                    <Button size="lg" className="bg-white hover:bg-gray-100 text-primary text-lg py-3 px-8 group rounded-full shadow-xl hover:shadow-2xl transition-all" onClick={handleNextStep}>
                      Continue ({selectedServices.length}) <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {currentStep === 2 && (
            <div className="w-full max-w-lg mx-auto bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20 text-foreground">
              <div className="text-center mb-6">
                <h1 className="text-xl font-semibold tracking-tight text-primary">How would you like us to reach you?</h1>
                <p className="text-muted-foreground mt-2 text-sm">Just a name & a way to reach you — that's it for now.</p>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" name="name" type="text" placeholder="What should we call you?" value={formData.name} onChange={handleInputChange} required className="pl-10 h-11 bg-white/80 focus:bg-white" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="phone" name="phone" type="tel" placeholder="Phone Number" value={formData.phone} onChange={handleInputChange} className="pl-10 h-11 bg-white/80 focus:bg-white" />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="email" name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} className="pl-10 h-11 bg-white/80 focus:bg-white" />
                  </div>
                </div>
              </div>
              
              {/* SMS Consent Checkbox */}
              <div className="space-y-2">
                <div className="flex items-start space-x-3">
                  <Checkbox 
                    id="smsConsent" 
                    checked={formData.smsConsent}
                    onCheckedChange={handleSmsConsentChange}
                    className="mt-1"
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label 
                      htmlFor="smsConsent" 
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      By sharing your phone number you agree to receive SMS notifications from <b>e2i home care.</b>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 flex items-center gap-4">
                 <Button type="button" variant="outline" onClick={handlePrevStep} className="w-1/3 bg-white/80 hover:bg-white">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                <Button type="button" onClick={handleNextStep} className="w-2/3 bg-primary hover:bg-primary/90 text-base py-2 px-4 rounded-md group">
                  Next Step <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">We'll never spam or share your info — just one thoughtful follow-up.</p>
            </div>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-lg p-8 rounded-xl shadow-2xl border border-white/20 text-foreground">
              <div className="text-center mb-6">
                <h1 className="text-xl font-semibold tracking-tight text-primary">One last thing...</h1>
              </div>
              <div className="space-y-4">
                {selectedServiceTitles && (
                  <div className="space-y-2">
                    <Label htmlFor="selected-services">Selected Services</Label>
                    <Textarea id="selected-services" name="selected-services" value={selectedServiceTitles} readOnly className="bg-muted/50 rounded-lg text-sm" rows={2} />
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center text-muted-foreground text-sm">
                    <MessageCircle className="h-4 w-4 mr-2" />Anything else to share? (optional)
                  </Label>
                  <Textarea id="message" name="message" placeholder="Feel free to add any other details here." value={formData.message} onChange={handleInputChange} rows={3} className="rounded-lg bg-white/80 focus:bg-white" />
                </div>
                
                {/* reCAPTCHA widget */}
                <div className="flex flex-col items-center space-y-2">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Security verification required</span>
                  </div>
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={handleRecaptchaChange}
                    onExpired={handleRecaptchaExpired}
                    theme="light"
                  />
                </div>
                
                <div className="pt-2 flex items-center gap-4">
                   <Button type="button" variant="outline" onClick={handlePrevStep} className="w-1/3 bg-white/80 hover:bg-white">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                  <Button type="submit" className="w-2/3 bg-primary hover:bg-primary/90 text-base py-2 px-4 rounded-md group" disabled={isLoading || !recaptchaToken}>
                    {isLoading ? <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full" /> : <>Send My Request <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></>}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-teal-600">
        <div className="min-h-screen flex flex-col justify-center py-20 md:py-28">
          <div className="container mx-auto px-4 md:px-6">
            <ProgressIndicator currentStep={currentStep} steps={steps} />
            {renderStepContent()}
          </div>
        </div>
        <Footer />
    </div>
  );
};

export default AllServicesPage;