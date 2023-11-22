'use client';

import { useGetRewardSession } from '@/api/rewards/useGetRewardSession';
import { useProtocol } from '@/app/ProtocolProvider';
import SessionFeatureItem from './SessionFeatureItem';
import SessionFeatureWrapper from './SessionFeatureWrapper';

export default function SessionFeatureList() {
  const { isAuthenticated } = useProtocol();
  const { data: sessions, isLoading } = useGetRewardSession(
    {
      offset: 0,
      limit: 10,
    },
    { enabled: isAuthenticated },
  );

  return (
    <>
      {sessions && sessions.length > 0 ? (
        sessions.map((session) => <SessionFeatureItem key={session.id} session={session} />)
      ) : isLoading ? (
        <>
          {Array.from(Array(3).keys()).map((item, index) => (
            <SessionFeatureWrapper key={index} isLoading />
          ))}
        </>
      ) : null}
    </>
  );
}
