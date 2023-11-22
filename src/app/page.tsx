import Image from 'next/image';
import Container from '@/components/Container';

export default function Home() {
  return (
    <Container component="main" className="min-h-screen">
      <Image
        data-testid="logo"
        src="/static/icons/Logo.svg"
        alt="Ahamove Logo"
        width={255}
        height={44}
        className="m-auto"
      />
    </Container>
  );
}
