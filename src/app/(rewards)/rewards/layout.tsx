import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
  // modal: ReactNode;
};

export default async function RewardLayout(props: Props) {
  return (
    <>
      {props.children}
      {/* {props.modal} */}
    </>
  );
}
