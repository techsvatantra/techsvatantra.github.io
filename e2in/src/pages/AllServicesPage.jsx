import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Check, Send, User, Phone, ArrowRight, MessageCircle, ArrowLeft } from "lucide-react";
import ProgressIndicator from "@/components/ProgressIndicator";

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
  const [formData, setFormData] = useState({ name: "", contact: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev.includes(serviceId)
        ? prev.filter((id) => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) {
      toast({ title: "Please select at least one service.", variant: "destructive" });
      return;
    }
    if (currentStep === 2 && (!formData.name || !formData.contact)) {
      toast({ title: "Just a little more info!", description: "Please let us know your name and how to reach you.", variant: "destructive" });
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "We've received your message!",
      description: `Thank you, ${formData.name}. We'll be in touch very soon.`,
      variant: "success",
    });
    setIsLoading(false);
    setSelectedServices([]);
    setFormData({ name: "", contact: "", message: "" });
    setCurrentStep(1);
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
                <Link to="/" className="inline-flex items-center text-sm font-semibold text-primary hover:underline transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
                <h2 className="text-xl md:text-2xl text-slate-600 mt-2">What kind of care are you looking for?</h2>
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
                      className={`flex items-start space-x-4 p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 shadow-sm ${isSelected ? "bg-accent border-primary ring-2 ring-primary" : "bg-card border-border hover:border-primary/50"}`}
                    >
                      <div className={`flex-shrink-0 mt-1 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isSelected ? "bg-primary border-primary" : "border-muted-foreground/50"}`}>
                        <AnimatePresence>
                          {isSelected && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}><Check className="h-4 w-4 text-primary-foreground" /></motion.div>}
                        </AnimatePresence>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-card-foreground text-base leading-tight">{service.title}</p>
                        <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <AnimatePresence>
                {selectedServices.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5 }} className="mt-12 text-center">
                    <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg py-3 px-8 group rounded-full shadow-lg hover:shadow-xl transition-shadow" onClick={handleNextStep}>
                      Continue ({selectedServices.length}) <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {currentStep === 2 && (
            <div className="w-full max-w-md mx-auto bg-card p-8 rounded-xl shadow-xl border">
              <div className="text-center mb-6">
                <h1 className="text-xl font-semibold tracking-tight text-primary">How would you like us to reach you?</h1>
                <p className="text-muted-foreground mt-2 text-sm">Just a name & a way to reach you — that's it for now.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="name" name="name" type="text" placeholder="What should we call you?" value={formData.name} onChange={handleInputChange} required className="pl-10 h-11" />
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="contact" name="contact" type="text" placeholder="Phone or Email" value={formData.contact} onChange={handleInputChange} required className="pl-10 h-11" />
                </div>
              </div>
              <div className="pt-6">
                <Button type="button" onClick={handleNextStep} className="w-full bg-primary hover:bg-primary/90 text-base py-2 px-4 rounded-md group">
                  Next Step <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground text-center mt-6">We'll never spam or share your info — just one thoughtful follow-up.</p>
            </div>
          )}

          {currentStep === 3 && (
            <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto bg-card p-8 rounded-xl shadow-xl border">
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
                  <Textarea id="message" name="message" placeholder="Feel free to add any other details here." value={formData.message} onChange={handleInputChange} rows={3} className="rounded-lg" />
                </div>
                <div className="pt-2">
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-base py-2 px-4 rounded-md group" disabled={isLoading}>
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
    <div className="bg-background min-h-screen py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <ProgressIndicator currentStep={currentStep} steps={steps} />
        {renderStepContent()}
      </div>
    </div>
  );
};

export default AllServicesPage;