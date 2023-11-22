import MainHeader from '@/app/(rewards)/components/MainHeader';
import Container from '@/components/Container';
import SessionListing from '../../SessionListing';
import SessionListingWrapper from '../../SessionListingWrapper';

// export async function generateStaticParams() {
//   try {
//     const sessions = await getRewardSessionFn({ offset: 0, limit: 10 });

//     return sessions.map((session) => ({
//       id: session.id,
//     }));
//   } catch (error) {
//     return [];
//   }
// }

type Props = {
  params: {
    id: string;
  };
};

export default function RewardSessionPage({ params: { id } }: Props) {
  return (
    <>
      <MainHeader className="desktop:!flex !hidden" />
      <Container component="main" className="desktop:px-6 desktop:pt-7 max-w-[1044px] px-0 pb-20">
        <SessionListingWrapper sessionId={Number(id)}>
          <SessionListing sessionId={Number(id)} />
        </SessionListingWrapper>
      </Container>
    </>
  );
}
