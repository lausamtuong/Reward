import React from 'react';

export function RightArrowIcon({ fill = '#FE5F00', ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33331 11.8745L8.62976 8.53525L5.33331 5.19596L6.34816 4.17017L10.6666 8.53525L6.34816 12.9003L5.33331 11.8745Z"
        fill={fill}
      />
    </svg>
  );
}
