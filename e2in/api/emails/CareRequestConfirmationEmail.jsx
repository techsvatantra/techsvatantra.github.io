
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

const CareRequestConfirmationEmail = ({ userName }) => {
  const previewText = `Thank you for your request to e2i Home Care!`;

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
              Thank You For Your Request!
            </Heading>
            <Text className="text-base text-gray-700">
              Dear {userName},
            </Text>
            <Text className="text-base text-gray-700">
              We have successfully received your request for care services. We appreciate you considering e2i Home Care.
            </Text>
            <Text className="text-base text-gray-700">
              A member of our team will be reviewing your information and will be in touch with you very soon to discuss your needs and how we can help.
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

export default CareRequestConfirmationEmail;
