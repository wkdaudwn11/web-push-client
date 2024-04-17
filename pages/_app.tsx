import { useEffect } from 'react';

import type { AppProps } from 'next/app'; // AppProps 타입을 임포트합니다.

const App = ({ Component, pageProps }: AppProps) => {
  console.log('App');
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
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

  return <Component {...pageProps} />;
};

export default App;
