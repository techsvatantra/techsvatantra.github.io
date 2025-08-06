
import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Careers from '@/components/Careers';
import { careerValidationSchemas } from '@/lib/validation';
import { defaultIssuingAuthority } from "@/components/careers/constants";

const CareersPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const methods = useForm({
    resolver: yupResolver(careerValidationSchemas[currentStep - 1]),
    mode: 'onChange',
    defaultValues: {
      positionApplyingFor: "",
      fullName: "",
      email: "",
      address: "",
      phone: "",
      smsConsent: false,
      resume: null,
      healthAttestation: null,
      licenseType: "",
      issuingAuthority: defaultIssuingAuthority,
      licenseNumber: "",
      expirationDate: "",
      education: "",
      experienceDuration: "",
      workHistory: [],
      professionalReferences: [
        { name: "", phone: "", relationship: "" },
        { name: "", phone: "", relationship: "" }
      ],
      personalReferences: [
        { name: "", phone: "", relationship: "" },
        { name: "", phone: "", relationship: "" }
      ],
      consent: false,
      backgroundCheckConsent: false,
      signature: "",
      captcha: ""
    }
  });

  useEffect(() => {
    methods.trigger();
  }, [currentStep, methods]);

  return (
    <FormProvider {...methods}>
      <div className="relative bg-gradient-to-br from-primary to-teal-600">
        <Careers currentStep={currentStep} setCurrentStep={setCurrentStep} />
      </div>
    </FormProvider>
  );
};

export default CareersPage;
