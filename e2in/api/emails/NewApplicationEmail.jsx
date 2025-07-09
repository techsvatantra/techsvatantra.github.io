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
  Section,
  Row,
  Column,
  Tailwind,
} from '@react-email/components';

const NewApplicationEmail = ({ data }) => {
  const previewText = `New application from ${data.fullName} for ${data.positionApplyingFor}`;
  const workHistory = data.workHistory ? JSON.parse(data.workHistory) : [];

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
              New Job Application Received
            </Heading>
            <Text className="text-base text-center text-gray-600">
              Position: <strong>{data.positionApplyingFor}</strong>
            </Text>

            <Section className="mt-8">
              <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">Applicant Details</Heading>
              <Row className="mt-4"><Column><strong>Full Name:</strong></Column><Column>{data.fullName}</Column></Row>
              <Row><Column><strong>Phone:</strong></Column><Column>{data.phone}</Column></Row>
              <Row><Column><strong>Address:</strong></Column><Column>{data.address}</Column></Row>
            </Section>

            <Section className="mt-6">
              <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">License & Experience</Heading>
              <Row className="mt-4"><Column><strong>License Type:</strong></Column><Column>{data.licenseType}</Column></Row>
              <Row><Column><strong>Issuing Authority:</strong></Column><Column>{data.issuingAuthority}</Column></Row>
              <Row><Column><strong>License Number:</strong></Column><Column>{data.licenseNumber}</Column></Row>
              <Row><Column><strong>Expiration Date:</strong></Column><Column>{data.expirationDate}</Column></Row>
              <Row className="mt-2"><Column><strong>Education:</strong></Column></Row>
              <Row><Column><Text className="bg-gray-100 p-2 rounded-md">{data.education}</Text></Column></Row>
              <Row className="mt-2"><Column><strong>Experience:</strong></Column></Row>
              <Row><Column><Text className="bg-gray-100 p-2 rounded-md">{data.experienceDuration}</Text></Column></Row>
            </Section>

            {workHistory.length > 0 && workHistory[0].name && (
              <Section className="mt-6">
                <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">Work History</Heading>
                {workHistory.map((job, index) => (
                  <div key={index} className="mt-4 border-b pb-4">
                    <Text><strong>Employer #{index + 1}:</strong> {job.name}</Text>
                    <Text><strong>Address:</strong> {job.address}</Text>
                    <Text><strong>Supervisor:</strong> {job.supervisor}</Text>
                    <Text><strong>Reason for Leaving:</strong> {job.reasonForLeaving}</Text>
                  </div>
                ))}
              </Section>
            )}

            <Section className="mt-6">
              <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">Consent & Signature</Heading>
              <Row className="mt-4"><Column><strong>Consent Given:</strong></Column><Column>{data.consent === 'true' ? 'Yes' : 'No'}</Column></Row>
              <Row><Column><strong>Signature:</strong></Column><Column>{data.signature}</Column></Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewApplicationEmail;