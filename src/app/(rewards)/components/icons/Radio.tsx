import { SVGProps } from 'react';

export const RadioIcon = ({ fill = '#4D5358', ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 22 22" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M11 19.8C15.8601 19.8 19.8 15.8601 19.8 11C19.8 6.13989 15.8601 2.2 11 2.2C6.13989 2.2 2.2 6.13989 2.2 11C2.2 15.8601 6.13989 19.8 11 19.8ZM11 22C17.0751 22 22 17.0751 22 11C22 4.92487 17.0751 0 11 0C4.92487 0 0 4.92487 0 11C0 17.0751 4.92487 22 11 22Z"
      fill={fill}
    />
  </svg>
);
