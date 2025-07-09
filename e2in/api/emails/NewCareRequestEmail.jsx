
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

const NewCareRequestEmail = ({ data }) => {
  const previewText = `New care request from ${data.name}`;

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
              New Care Request Received
            </Heading>
            
            <Section className="mt-8">
              <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">Contact Details</Heading>
              <Row className="mt-4"><Column><strong>Name:</strong></Column><Column>{data.name}</Column></Row>
              {data.phone && <Row><Column><strong>Phone:</strong></Column><Column>{data.phone}</Column></Row>}
              {data.email && <Row><Column><strong>Email:</strong></Column><Column>{data.email}</Column></Row>}
            </Section>

            <Section className="mt-6">
              <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">Requested Services</Heading>
              <Row className="mt-4">
                <Column>
                  <Text className="bg-gray-100 p-3 rounded-md">{data.selectedServices || 'Not specified'}</Text>
                </Column>
              </Row>
            </Section>

            {data.message && (
              <Section className="mt-6">
                <Heading as="h2" className="text-lg font-semibold text-gray-800 border-b pb-2">Additional Message</Heading>
                <Row className="mt-4">
                  <Column>
                    <Text className="bg-gray-100 p-3 rounded-md">{data.message}</Text>
                  </Column>
                </Row>
              </Section>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewCareRequestEmail;
