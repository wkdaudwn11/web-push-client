'use client';

import { useEffect } from 'react';

type Props = {
  children: React.ReactNode;
};

const Providers = ({ children }: Props) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js?v=4')
        .then((registration) => {
          console.log(
            'Service Worker registered with scope:',
            registration.scope,
          );
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return children;
};

export default Providers;
