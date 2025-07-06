import React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface AutoReplyEmailProps {
  name: string;
  subject?: string;
}

export default function AutoReplyEmail({
  name = 'Client',
  subject = 'le message',
}: AutoReplyEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Accusé de réception - Anthracite Applications</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Heading style={logo}>Anthracite Applications</Heading>
          </Section>
          <Heading style={h1}>
            Message bien reçu, {name}
          </Heading>
          <Text style={paragraph}>
            Votre message concernant {subject.toLowerCase()} a été transmis avec succès.
          </Text>
          <Text style={paragraph}>
            Une attention particulière sera portée à votre demande et une réponse personnalisée sera transmise dans les plus brefs délais,
            généralement sous 48 heures ouvrées.
          </Text>
          <Text style={paragraph}>
            En attendant, n'hésitez pas à explorer les créations présentées sur le portail.
          </Text>
          <Text style={paragraph}>
            Pour les demandes urgentes, un contact direct reste possible au +33 6 31 15 67 84.
          </Text>
          <Hr style={hr} />
          <Text style={paragraph}>
            Bien cordialement,
          </Text>
          <Text style={signature}>
            Antoine Foussier<br />
            Développeur Web<br />
            Anthracite Applications<br />
            <Link href="https://anthracite.app" style={link}>
              anthracite.app
            </Link>
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            © {new Date().getFullYear()} Anthracite Applications. Tous droits réservés.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

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

const logoContainer = {
  textAlign: 'center' as const,
  marginBottom: '2rem',
};

const logo = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#ffffff',
  backgroundImage: 'linear-gradient(to right, #8a2be2, #00bfff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  padding: '0.2rem 0',
};

const h1 = {
  fontSize: '24px',
  lineHeight: '1.3',
  fontWeight: '700',
  color: '#ffffff',
  backgroundImage: 'linear-gradient(to right, #8a2be2, #00bfff)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  padding: '0.2rem 0',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#d4d4d4',
  margin: '1rem 0',
};

const signature = {
  fontSize: '16px',
  lineHeight: '1.5',
  color: '#d4d4d4',
  margin: '1.5rem 0',
};

const link = {
  color: '#00bfff',
  textDecoration: 'none',
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