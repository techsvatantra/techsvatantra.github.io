import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FormError from "./FormError";
import { Controller } from "react-hook-form";

const BasicInfoStep = ({ register, errors, formData, handleFileChange, control }) => {
  const { ref, ...rest } = register("resume");
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
        <Label htmlFor="address">Address</Label>
        <Input id="address" {...register("address")} placeholder="Street, City, State, Zip" />
        <FormError message={errors.address?.message} />
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
        <Label htmlFor="resume">Resume/CV *</Label>
        <Controller
          name="resume"
          control={control}
          render={({ field: { onChange, onBlur, name }, fieldState: { error } }) => (
            <div>
              <Input
                id="resume"
                name={name}
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => {
                  const file = e.target.files[0];
                  onChange(file);
                  handleFileChange(e);
                }}
                onBlur={onBlur}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/80"
              />
              {formData.resumeName && (
                <p className="text-xs text-muted-foreground mt-1">
                  Selected: {formData.resumeName}
                </p>
              )}
              {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default BasicInfoStep;