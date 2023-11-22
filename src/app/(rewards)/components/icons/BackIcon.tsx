import { SVGProps } from 'react';

export const BackIcon = ({ fill = '#252A31', ...props }: SVGProps<SVGSVGElement>) => (
  <svg width={24} height={24} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m21.989 12.17.011-.187c0-.763-.554-1.392-1.27-1.484l-.181-.011H7.014L10.9 6.47a1.54 1.54 0 0 0 .096-1.81l-.121-.161a1.419 1.419 0 0 0-1.894-.242l-.155.125-6.343 6.421a1.535 1.535 0 0 0-.14 2.085l6.482 6.726a1.42 1.42 0 0 0 2.05-.109 1.537 1.537 0 0 0 .032-1.97l-3.82-4.056 13.462-.001c.74 0 1.35-.57 1.44-1.308Z"
      fill={fill}
    />
  </svg>
);
