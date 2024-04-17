import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    theme_color: '#84A59D',
    background_color: '#84A59D',
    display: 'standalone',
    scope: '/',
    start_url: '/',
    name: 'Web push test',
    description: 'By MJ',
    short_name: 'WPT',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
