import Container from '@/components/Container';
import RewardSession from './@session/RewardSession';
import CategoryList from './CategoryList';
import HomeBanner from './HomeBanner';
import MainHeader from '../components/MainHeader';
import MembershipCard from '../components/Membership/MembershipCard';
import ScrollToTop from '../components/ScrollToTop';

export default async function RewardPage() {
  return (
    <>
      <ScrollToTop />
      <MainHeader root className="desktop:sticky w-full" />
      <Container
        component="main"
        className="desktop:px-6 desktop:pt-7 desktop:flex-row desktop:gap-5 flex-col flex-nowrap px-0 pb-20">
        <MembershipCard className="desktop:hidden" />
        <CategoryList
          direction="vertical"
          className="desktop:block desktop:sticky top-[calc(64px+28px)] hidden h-fit max-h-[calc(100vh-120px)] w-48 flex-none grow-0"
        />
        <div className="desktop:max-w-[calc(100%-192px-20px)] desktop:m-0 desktop:z-0 z-10 -mt-24 max-w-full grow">
          <div className="desktop:p-0 desktop:bg-transparent desktop:grid-cols-5 desktop:mb-4 grid grid-cols-1 gap-4 bg-white p-4">
            <div className="desktop:col-span-3 col-span-1">
              <HomeBanner autoplay loop />
            </div>
            <div className="desktop:col-span-2 desktop:block col-span-1 hidden">
              <MembershipCard />
            </div>
            <CategoryList className="desktop:hidden border-neutral-10 col-span-1 -mx-4 -mb-4 w-[calc(100%+32px)] border-t" />
          </div>
          <RewardSession />
        </div>
      </Container>
    </>
  );
}
