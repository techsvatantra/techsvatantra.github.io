import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
} from '@react-email/components';

const ApplicantConfirmationEmail = ({ applicantName }) => {
  const previewText = `Thank you for applying to e2i Home Care!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="bg-white border border-gray-200 rounded-lg mx-auto my-10 p-10 w-[600px]">
            <Img
              src="https://i.imgur.com/mP33fC1.png"
              width="120"
              height="auto"
              alt="e2i Home Care Logo"
              className="mx-auto"
            />
            <Heading className="text-2xl font-bold text-center mt-8">
              Thank You For Your Application!
            </Heading>
            <Text className="text-base text-gray-700">
              Dear {applicantName},
            </Text>
            <Text className="text-base text-gray-700">
              We have successfully received your application for a position at e2i Home Care. We appreciate your interest in joining our team of dedicated professionals.
            </Text>
            <Text className="text-base text-gray-700">
              Our hiring team is now reviewing your qualifications. If your experience aligns with our needs, we will be in touch with you soon to discuss the next steps.
            </Text>
            <Text className="text-base text-gray-700 mt-6">
              Best regards,
              <br />
              The e2i Home Care Team
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ApplicantConfirmationEmail;