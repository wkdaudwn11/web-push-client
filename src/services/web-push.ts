import { urlBase64ToUint8Array } from '@/utils';

import api from '.';

export const clearSubscribeUser = () => {
  navigator.serviceWorker.ready.then((registration) => {
    registration.pushManager.getSubscription().then((subscription) => {
      if (subscription) {
        subscription
          .unsubscribe()
          .then(() => {
            api
              .delete('/api/subscribe')
              .then(() => {
                console.log(
                  'Successfully clear subscribed and notified the server.',
                );
              })
              .catch((error) => {
                console.error(
                  'Failed to notify the server about the clear subscription',
                  error,
                );
              });
          })
          .catch((error) => {
            console.error('Clear subscription failed', error);
          });
      }
    });
  });
};

export const subscribeUser = () => {
  navigator.serviceWorker.ready.then(
    (registration: ServiceWorkerRegistration) => {
      registration.pushManager
        .getSubscription()
        .then((subscription: PushSubscription | null) => {
          if (subscription) {
            console.log('Already subscribed');
          } else {
            registration.pushManager
              .subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(
                  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
                ),
              })
              .then((subscription2: PushSubscription) => {
                const keyP256dh = subscription2.getKey('p256dh');
                const keyAuth = subscription2.getKey('auth');
                api.post('/api/subscribe', {
                  endpoint: subscription2.endpoint,
                  expirationTime: subscription2.expirationTime,
                  keys: {
                    p256dh: keyP256dh
                      ? btoa(String.fromCharCode(...new Uint8Array(keyP256dh)))
                      : '',
                    auth: keyAuth
                      ? btoa(String.fromCharCode(...new Uint8Array(keyAuth)))
                      : '',
                  },
                });
              });
          }
        });
    },
  );
};

export const sendNotification = async () => {
  try {
    const response = await api.post('/api/send-notification', {
      title: 'web push test',
      body: 'Test push notification',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
    console.log('response >', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
