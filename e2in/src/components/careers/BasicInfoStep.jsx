import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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