import Container from '@/components/Container';
import SearchFilterBox from './SearchFilterBox';
import MainHeader from '../../components/MainHeader';
import SessionListing from '../SessionListing';
import SessionListingWrapper from '../SessionListingWrapper';

export default function RewardSearchPage() {
  return (
    <>
      <MainHeader className="desktop:!flex !hidden" />
      <Container component="main" className="desktop:px-6 desktop:pt-7 max-w-[1044px] px-0 pb-20">
        <SessionListingWrapper isSearchPage>
          <SearchFilterBox />
          <SessionListing className="desktop:mt-0 mt-[68px]" />
        </SessionListingWrapper>
      </Container>
    </>
  );
}
