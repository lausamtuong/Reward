import { SVGProps } from 'react';

export const CheckboxIcon = ({ fill = ' #4D5358 ', ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path d="M19 5V19H5V5H19ZM22 2H2V22H22V2Z" fill={fill} />
  </svg>
);
