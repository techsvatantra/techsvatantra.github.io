import React from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { PlusCircle, Trash2 } from "lucide-react";
import FormError from "./FormError";

const ReviewStep = ({ control, register, errors }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workHistory",
  });

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-primary mb-6">Step 3: Work History & Consent</h3>
      <div className="space-y-4">
        <Label>Previous Employers (Optional, up to 5)</Label>
        {fields.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg space-y-4 bg-slate-50 relative">
            <Button type="button" variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Input {...register(`workHistory.${index}.name`)} placeholder="Employer Name" />
                <FormError message={errors.workHistory?.[index]?.name?.message} />
              </div>
              <div>
                <Input {...register(`workHistory.${index}.supervisor`)} placeholder="Supervisor Name" />
                <FormError message={errors.workHistory?.[index]?.supervisor?.message} />
              </div>
            </div>
            <div>
              <Input {...register(`workHistory.${index}.address`)} placeholder="Employer Address" />
              <FormError message={errors.workHistory?.[index]?.address?.message} />
            </div>
            <div>
              <Textarea {...register(`workHistory.${index}.reasonForLeaving`)} placeholder="Reason for Leaving" rows={2} />
              <FormError message={errors.workHistory?.[index]?.reasonForLeaving?.message} />
            </div>
          </div>
        ))}
         <FormError message={errors.workHistory?.root?.message} />
        {fields.length < 5 && (
          <Button type="button" variant="outline" onClick={() => append({ name: "", address: "", reasonForLeaving: "", supervisor: "" })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Employer
          </Button>
        )}
      </div>
       <div className="space-y-4 pt-4 border-t">
          <div className="flex items-start space-x-3">
              <Controller
                name="consent"
                control={control}
                render={({ field }) => (
                   <Checkbox id="consent" checked={field.value} onCheckedChange={field.onChange} className="mt-1" />
                )}
              />
              <div className="grid gap-1.5 leading-none">
                  <label htmlFor="consent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      I hereby certify that the information provided is true and complete.
                  </label>
                  <p className="text-sm text-muted-foreground">
                      I understand that any false information may result in the rejection of my application or termination of employment.
                  </p>
              </div>
          </div>
           <FormError message={errors.consent?.message} />
          <div>
              <Label htmlFor="signature">Typed Signature</Label>
              <Input id="signature" {...register("signature")} placeholder="Type your full name" />
              <FormError message={errors.signature?.message} />
          </div>
      </div>
    </div>
  );
};

export default ReviewStep;