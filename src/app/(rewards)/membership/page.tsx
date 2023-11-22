'use client';

import Container from '@/components/Container';
import MainHeader from '../components/MainHeader';
import MembershipCard from '../components/Membership/MembershipCard';
import RakingInformation from '../components/Membership/RakingInformation';

export default function MembershipPage() {
  return (
    <>
      <MainHeader pathTitle="membership" />
      <Container component="main" className="desktop:px-6 desktop:pt-7 desktop:space-y-4 max-w-3xl px-0 pb-16">
        <MembershipCard isPageMembership />
        <RakingInformation />
      </Container>
    </>
  );
}
