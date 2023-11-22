import { SVGProps } from 'react';

export const RadioFilledIcon = ({ fill = ' #EA5800 ', ...props }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...props} xmlns="http://www.w3.org/2000/svg">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M12 6.5C8.92 6.5 6.5 8.92 6.5 12C6.5 15.08 8.92 17.5 12 17.5C15.08 17.5 17.5 15.08 17.5 12C17.5 8.92 15.08 6.5 12 6.5ZM12 1C5.95 1 1 5.95 1 12C1 18.05 5.95 23 12 23C18.05 23 23 18.05 23 12C23 5.95 18.05 1 12 1ZM12 20.8C7.16 20.8 3.2 16.84 3.2 12C3.2 7.16 7.16 3.2 12 3.2C16.84 3.2 20.8 7.16 20.8 12C20.8 16.84 16.84 20.8 12 20.8Z"
      fill={fill}
    />
  </svg>
);
