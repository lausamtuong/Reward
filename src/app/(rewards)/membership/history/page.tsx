import React from 'react';
import Container from '@/components/Container';
import HistoryTransaction from './HistoryTransaction';
import MainHeader from '../../components/MainHeader';

export default function History() {
  return (
    <>
      <MainHeader pathTitle="membership" className="desktop:!flex !hidden" />
      <Container component="main" className="desktop:px-6 desktop:pt-7 max-w-2xl px-0 pb-20">
        <div className="desktop:p-6 desktop:bg-white desktop:rounded-xl relative min-h-[60vh] overflow-hidden pt-11">
          <HistoryTransaction />
        </div>
      </Container>
    </>
  );
}
