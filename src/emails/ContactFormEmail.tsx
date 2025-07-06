import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone = 'Non renseigné',
  subject = 'Demande de contact',
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nouveau message via le formulaire de contact d&apos;Anthracite Applications</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Nouveau message de {name}
          </Heading>
          <Text style={paragraph}>
            Un nouveau message a été transmis via le portail de contact d'Anthracite Applications.
          </Text>
          <Section style={section}>
            <Heading as="h2" style={subheading}>
              Informations du contact
            </Heading>
            <Text style={infoText}>
              <strong>Nom :</strong> {name}
            </Text>
            <Text style={infoText}>
              <strong>Email :</strong> {email}
            </Text>
            <Text style={infoText}>
              <strong>Téléphone :</strong> {phone}
            </Text>
            <Text style={infoText}>
              <strong>Sujet :</strong> {subject}
            </Text>
          </Section>
          <Hr style={hr} />
          <Section>
            <Heading as="h2" style={subheading}>
              Message
            </Heading>
            <Text style={messageText}>{message}</Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>
            © {new Date().getFullYear()} Anthracite Applications. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#0a0a0a',
  color: '#e5e5e5',
  fontFamily: '"Geist", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '2rem',
  borderRadius: '0.5rem',
  border: '1px solid #333',
  backgroundColor: '#1a1a1a',
  maxWidth: '600px',
};

const heading = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#ffffff',
  backgroundImage: 'linear-gradient(to right, #8a2be2, #00bfff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  padding: '0.2rem 0',
};

const subheading = {
  fontSize: '18px',
  fontWeight: '600',
  color: '#e5e5e5',
  margin: '1.5rem 0 0.5rem',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#a3a3a3',
};

const section = {
  padding: '0.75rem 0',
};

const infoText = {
  margin: '0.3rem 0',
  fontSize: '15px',
  color: '#d4d4d4',
};

const messageText = {
  margin: '0.5rem 0',
  fontSize: '15px',
  lineHeight: '1.6',
  color: '#d4d4d4',
  whiteSpace: 'pre-wrap',
};

const hr = {
  borderColor: '#333',
  margin: '1.5rem 0',
};

const footer = {
  textAlign: 'center' as const,
  fontSize: '14px',
  color: '#737373',
  margin: '2rem 0 0',
};

export default ContactFormEmail; 