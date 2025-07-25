import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "@/lib/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { MapPin, Phone, Mail, Clock, Shield } from "lucide-react";
import { GOOGLE_APPS_SCRIPT_URLS, createFormData, submitToGoogleScript } from "@/config/googleAppsScript";
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const { toast } = useToast();
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm({
    resolver: yupResolver(contactSchema),
    defaultValues: {
      smsConsent: false
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState(null);
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
      duration: 5000,
    });
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      // Check if reCAPTCHA is completed
      if (!recaptchaToken) {
        toast({
          title: "Verification Required",
          description: "Please complete the reCAPTCHA verification before submitting.",
          variant: "destructive",
          duration: 5000,
        });
        setIsSubmitting(false);
        return;
      }

      // Create form data using centralized helper and include reCAPTCHA token
      const formDataWithRecaptcha = {
        ...data,
        recaptchaToken: recaptchaToken
      };
      const formData = createFormData(formDataWithRecaptcha, 'Contact Form');

      // Submit to Google Script using centralized configuration
      const response = await submitToGoogleScript(GOOGLE_APPS_SCRIPT_URLS.CONTACT_FORM, formData);
      
      // Check if response is ok
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Try to parse JSON response
      let result;
      try {
        result = await response.json();
      } catch (e) {
        // If not JSON, get text
        result = await response.text();
      }
      
      console.log('Google Script response:', result);
      
      // Check for success in response
      if (result.success === false) {
        throw new Error(result.message || 'Submission failed');
      }
      
      // Show success message
      toast({
        title: "Message Sent!",
        description: result.message || "Thank you for contacting us. We'll get back to you shortly.",
        duration: 5000,
      });
      
      // Reset form and reCAPTCHA
      reset();
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Reset reCAPTCHA on error
      setRecaptchaToken(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      
      // Show error message
      toast({
        title: "Error",
        description: error.message || "There was an error sending your message. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5 text-primary" />,
      title: "Our Location",
      details: "143 Parker Rd, Plainsboro, NJ 08536"
    },
    {
      icon: <Phone className="h-5 w-5 text-primary" />,
      title: "Phone Number",
      details: "609-360-6020"
    },
    {
      icon: <Mail className="h-5 w-5 text-primary" />,
      title: "Email Address",
      details: "care@e2ihomecare.com" 
    },
    {
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Working Hours",
      details: "24/7 - We're Always Available"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium mb-2"
          >
            Contact Us
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Get in Touch With Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            Have questions about our services or ready to schedule a consultation? Reach out to us and our care specialists will be happy to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 contact-form">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      placeholder="Your email address"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      {...register("phone")}
                      placeholder="Your phone number"
                    />
                     {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    {...register("message")}
                    placeholder="How can we help you?"
                    rows={5}
                  />
                   {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>

                {/* SMS Consent Checkbox */}
                <div className="space-y-2">
                  <div className="flex items-start space-x-3">
                    <Controller
                      name="smsConsent"
                      control={control}
                      render={({ field }) => (
                        <Checkbox 
                          id="smsConsent" 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="mt-1"
                        />
                      )}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label 
                        htmlFor="smsConsent" 
                        className="leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        style={{ fontSize: '10px' }}
                      >
                        <div className="space-y-1">
                          <p>By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message. Message & data rates may apply. Message frequency may vary. Reply Help for more information. You can reply STOP to opt-out of further messaging.</p>
                          <p>To view our policy, visit <a href="https://e2ihomecare.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://e2ihomecare.com/privacy-policy</a>.</p>
                          <p>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
                          <p>Your privacy is our priority, and we ensure that your consent to receive text messages and any related data remains confidential and is not used for any other purpose.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                  {errors.smsConsent && <p className="text-red-500 text-xs mt-1">{errors.smsConsent.message}</p>}
                </div>

                {/* reCAPTCHA Section */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <Label className="text-sm font-medium">Security Verification</Label>
                  </div>
                  <div className="flex justify-center">
                    {isRecaptchaDisabled ? (
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-800">
                          🚀 Development Mode: reCAPTCHA is disabled for faster testing
                        </p>
                      </div>
                    ) : RECAPTCHA_SITE_KEY ? (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={RECAPTCHA_SITE_KEY}
                        onChange={handleRecaptchaChange}
                        onExpired={handleRecaptchaExpired}
                        theme="light"
                        size="normal"
                      />
                    ) : (
                      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p className="text-sm text-yellow-800">
                          reCAPTCHA not configured. Please add VITE_RECAPTCHA_SITE_KEY to your environment variables.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90"
                  disabled={isSubmitting || (!recaptchaToken && RECAPTCHA_SITE_KEY)}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md flex flex-col" 
                >
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-full shrink-0">
                      {item.icon}
                    </div>
                    <div className="flex-grow min-w-0"> 
                      <h4 className="font-medium mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground break-words">{item.details}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;