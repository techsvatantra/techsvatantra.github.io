import * as yup from 'yup';

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const nameRegex = /^[a-zA-Z\s'-]+$/;

export const contactSchema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
  message: yup.string().required('Message is required').min(10, 'Message must be at least 10 characters long'),
});

const fileSchema = (label, required = false) => {
  let schema = yup.mixed().nullable();
  if (required) {
    schema = schema.required(`${label} is required.`);
  }
  return schema
    .test('fileType', 'Invalid file type. Please use PDF, DOCX, or DOC formats only.', (value) => {
      // If no file is provided, skip validation (handled by required check above)
      if (!value) return true;
      
      // If value is not a File object, skip validation
      if (!(value instanceof File)) return true;
      
      // Check extension only (most reliable)
      const allowedExtensions = ['.pdf', '.doc', '.docx'];
      const fileName = value.name ? value.name.toLowerCase() : '';
      
      // If no filename, reject
      if (!fileName) return false;
      
      return allowedExtensions.some(ext => fileName.endsWith(ext));
    })
    .test('fileSize', 'File size must be less than 10MB.', (value) => {
      // If no file is provided, skip validation
      if (!value) return true;
      
      // If value is not a File object, skip validation
      if (!(value instanceof File)) return true;
      
      // Check file size
      return value.size <= 10 * 1024 * 1024; // 10MB limit
    });
}


const workHistorySchema = yup.array().of(
  yup.object().shape({
    name: yup.string(),
    address: yup.string(),
    reasonForLeaving: yup.string(),
    supervisor: yup.string(),
  })
).max(5, 'You can add a maximum of 5 previous employers.');

const referenceSchema = yup.array().of(
  yup.object().shape({
    name: yup.string().required("Reference's name is required"),
    phone: yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Reference's phone is required"),
    relationship: yup.string().required("Relationship is required"),
  })
).min(2, 'Please provide 2 references.').max(2);


export const careerValidationSchemas = [
  // Step 1: Basic Info
  yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email("Invalid email address").required("Email is required for confirmation"),
    address: yup.string().required("Address is required"),
    phone: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Phone number is required"),
    smsConsent: yup.boolean().optional(),
    resume: fileSchema('Resume', false),
    healthAttestation: fileSchema('Health Attestation Form', false),
  }),
  // Step 2: Experience
  yup.object().shape({
    licenseType: yup.string().required("License type is required"),
    issuingAuthority: yup.string().required("Issuing authority is required"),
    licenseNumber: yup.string().required("License number is required"),
    expirationDate: yup.date().required("Expiration date is required").typeError("Invalid date format"),
    education: yup.string().required("Education information is required"),
    experienceDuration: yup.string().required("Experience is required"),
  }),
  // Step 3: References
  yup.object().shape({
    professionalReferences: referenceSchema,
    personalReferences: referenceSchema,
  }),
  // Step 4: Review & Consent
  yup.object().shape({
    workHistory: workHistorySchema,
    consent: yup
      .boolean()
      .oneOf([true], 'You must certify the information to proceed.')
      .required('You must certify the information to proceed.'),
    backgroundCheckConsent: yup
      .boolean()
      .oneOf([true], 'You must authorize the background check to proceed.')
      .required('You must authorize the background check to proceed.'),
    signature: yup
      .string()
      .trim()
      .matches(nameRegex, 'Please enter a valid full name.')
      .required('Your signature is required.'),
  }),
];