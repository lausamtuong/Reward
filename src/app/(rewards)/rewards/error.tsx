'use client'; // Error components must be Client Components
import Container from '@/components/Container';
import ErrorBlock from '@/components/ErrorBlock';

type Props = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: Props) {
  return (
    <Container className="min-h-screen">
      <ErrorBlock error={error} resetAction={reset} />
    </Container>
  );
}
