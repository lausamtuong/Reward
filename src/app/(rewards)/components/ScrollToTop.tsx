'use client';

import { useLayoutEffect } from 'react';

export default function ScrollToTop() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, []);
  return null;
}
