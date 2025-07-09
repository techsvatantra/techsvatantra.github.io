import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const contactSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters long'),
});

const basicInfoSchema = yup.object({
  fullName: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email address").required("Email is required for confirmation"),
  address: yup.string().required("Address is required"),
  phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
  resume: yup.mixed().optional()
});

const experienceSchema = yup.object({
  licenseType: yup.string().required("License type is required"),
  issuingAuthority: yup.string().required("Issuing authority is required"),
  licenseNumber: yup.string().required("License number is required"),
  expirationDate: yup.date().required("Expiration date is required").typeError("Invalid date format"),
  education: yup.string().required("Education information is required"),
  experienceDuration: yup.string().required("Experience is required"),
});

const reviewSchema = yup.object({
  workHistory: yup.array().of(
    yup.object().shape({
      name: yup.string(),
      address: yup.string(),
      reasonForLeaving: yup.string(),
      supervisor: yup.string(),
    })
  ),
  consent: yup.boolean().oneOf([true], "You must consent to submit your application"),
  signature: yup.string().required("Signature is required"),
});

export const careerValidationSchemas = [
  basicInfoSchema,
  experienceSchema,
  reviewSchema
];