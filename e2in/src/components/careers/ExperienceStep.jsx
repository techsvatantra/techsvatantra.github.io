import React from "react";
import { Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { defaultIssuingAuthority } from "./constants";
import FormError from "./FormError";

const ExperienceStep = ({ control, register, errors }) => {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary mb-6">Step 2: License & Experience</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>License Type</Label>
          <Controller
            name="licenseType"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger><SelectValue placeholder="Select license type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="RN">RN (Registered Nurse)</SelectItem>
                  <SelectItem value="LPN">LPN (Licensed Practical Nurse)</SelectItem>
                  <SelectItem value="CHHA">CHHA (Certified Home Health Aide)</SelectItem>
                  <SelectItem value="NA">NA (Nursing Assistant)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <FormError message={errors.licenseType?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="issuingAuthority">Issuing Authority or Board</Label>
          <Input
            id="issuingAuthority"
            {...register("issuingAuthority")}
            className={control._getWatch("issuingAuthority") === defaultIssuingAuthority ? 'text-gray-400' : ''}
          />
          <FormError message={errors.issuingAuthority?.message} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="licenseNumber">License Number</Label>
          <Input id="licenseNumber" {...register("licenseNumber")} />
           <a 
            href="https://newjersey.mylicense.com/verification/Search.aspx?facility=N" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-[#3B82F6] hover:underline pt-1"
          >
            Look up license
          </a>
          <FormError message={errors.licenseNumber?.message} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="expirationDate">Expiration Date</Label>
          <Input id="expirationDate" type="date" {...register("expirationDate")} />
          <FormError message={errors.expirationDate?.message} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">Education</Label>
        <Textarea id="education" {...register("education")} placeholder="List your relevant education..." />
        <FormError message={errors.education?.message} />
      </div>
      <div className="space-y-2">
         <Label>Areas of experience & Duration</Label>
         <Textarea id="experienceDuration" {...register("experienceDuration")} placeholder="e.g., Geriatric care (5 years), Pediatric care (2 years)..." />
         <FormError message={errors.experienceDuration?.message} />
      </div>
    </div>
  );
};

export default ExperienceStep;