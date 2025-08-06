import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FormError from "./FormError";
import { FileText, HeartPulse } from "lucide-react";

const BasicInfoStep = ({ register, errors, formData, handleFileChange }) => {
  // Don't use register for file inputs as we handle them manually
  const resumeRef = React.useRef(null);
  const healthAttestationRef = React.useRef(null);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary mb-6">Step 1: Basic Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" {...register("fullName")} placeholder="Your Full Name" />
          <FormError message={errors.fullName?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" {...register("email")} placeholder="your.email@example.com" />
          <FormError message={errors.email?.message} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input id="phone" type="tel" {...register("phone")} placeholder="(123) 456-7890" />
        <FormError message={errors.phone?.message} />
      </div>
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <Checkbox id="sms-consent" {...register("smsConsent")} className="mt-1" />
          <div className="grid gap-1.5 leading-none">
            <label 
              htmlFor="sms-consent" 
              className="leading-tight peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              style={{ fontSize: '10px' }}
            >
              <div className="space-y-1">
                <p>By providing a telephone number and submitting this form you are consenting to be contacted by SMS text message from <b>e2i Home Care</b>. Message & data rates may apply. Message frequency may vary. Reply Help for more information. You can reply STOP to opt-out of further messaging.</p>
                <p>To view our policy, visit <a href="https://e2ihomecare.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">https://e2ihomecare.com/privacy-policy</a>.</p>
                <p>No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All other categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.</p>
                <p>Your privacy is our priority, and we ensure that your consent to receive text messages and any related data remains confidential and is not used for any other purpose.</p>
              </div>
            </label>
          </div>
        </div>
        <FormError message={errors.smsConsent?.message} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} placeholder="Street, City, State, Zip" />
        <FormError message={errors.address?.message} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="resume" className="flex items-center">
            <FileText className="h-4 w-4 mr-2 text-primary" />
            Upload Resume (optional)
          </Label>
          <Input 
            id="resume" 
            type="file" 
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ref={resumeRef}
            onChange={(e) => handleFileChange(e, 'resume')}
            className="file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {formData.resumeName && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.resumeName}</p>}
          <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX (max 10MB)</p>
          <FormError message={errors.resume?.message} />
        </div>
        <div className="space-y-2">
           <Label htmlFor="healthAttestation" className="flex items-center">
            <HeartPulse className="h-4 w-4 mr-2 text-primary" />
            Upload Health Attestation Form (optional)
          </Label>
          <Input 
            id="healthAttestation" 
            type="file" 
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            ref={healthAttestationRef}
            onChange={(e) => handleFileChange(e, 'healthAttestation')}
            className="file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
          />
          {formData.healthAttestationName && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.healthAttestationName}</p>}
          <p className="text-xs text-muted-foreground">Accepted formats: PDF, DOC, DOCX (max 10MB)</p>
          <FormError message={errors.healthAttestation?.message} />
        </div>
      </div>
    </div>
  );
};

export default BasicInfoStep;