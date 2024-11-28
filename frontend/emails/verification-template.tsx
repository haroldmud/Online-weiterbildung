import { Html, Body, Button, Container, Head, Hr, Text, Preview, Link, Section } from "@react-email/components";

interface VerificationTemplateProps {
  username: string;
  emailVerificationToken: string;
}

const baseUrl = process.env.NEXTAUTH_URL;

const VerificationTemplate = ({ username, emailVerificationToken }: VerificationTemplateProps) => (
  <Html>
    <Head>
      <Preview>Verify your email address</Preview>
      <Body>
        <Container>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#333",
              marginBottom: "16px",
            }}
          >Welcome to Weiterbildung {username}!</Text>
          <Text>
            Please click on the link below to verify your email address:
          </Text>
          <Button href={`${baseUrl}/auth/verify-email?token=${emailVerificationToken}`}
            style={{
              color: "white",
              backgroundColor: "#dc2626",
              borderRadius: "4px",
              fontSize: "14px",
              padding: "10px 20px",
              display: "inline-block",
              textDecoration: "none",
            }}>
              Click here to verify
          </Button>
          <Hr/>
          <Section style={{ backgroundColor: '#000', padding: '20px 0' }}>
            <Container style={{ maxWidth: '1000px', textAlign: 'center' }}>
              <Link href="#" style={{ color: '#aaa', fontSize: '14px', textDecoration: 'none', margin: '0 15px' }}>
                Conditions Générales de Vente
              </Link>
              <Link href="#" style={{ color: '#aaa', fontSize: '14px', textDecoration: 'none', margin: '0 15px' }}>
                Politique de Confidentialité
              </Link>
            </Container>
          </Section>
        </Container>
      </Body>
    </Head>
  </Html>
  );


  export default VerificationTemplate;
