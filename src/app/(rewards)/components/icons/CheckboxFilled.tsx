import { SVGProps } from 'react';

export const CheckboxFilledIcon = ({ fill = ' #EA5800 ', ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2V22H22V2H2ZM10.5 17.1L4.90002 11.5L7 9.39999L10.4 12.8L16.8 6.39999L18.9 8.5L10.5 17.1Z" fill={fill} />
  </svg>
);
