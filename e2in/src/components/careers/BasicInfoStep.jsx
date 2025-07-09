import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormError from "./FormError";

const BasicInfoStep = ({ register, errors, formData, handleFileChange }) => {
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
      <div className="space-y-2">
        <Label htmlFor="resume">Have a resume? Upload it here (optional)</Label>
        <Input 
          id="resume" 
          type="file" 
          {...rest}
          ref={(e) => {
            ref(e);
          }}
          onChange={handleFileChange}
          className="file:mr-3 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
        />
        {formData.resumeName && <p className="text-xs text-muted-foreground mt-1">Selected: {formData.resumeName}</p>}
        <FormError message={errors.resume?.message} />
      </div>
    </div>
  );
};

export default BasicInfoStep;