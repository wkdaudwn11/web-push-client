import { urlBase64ToUint8Array } from '@/utils';

import api from '.';

export const clearSubscribeUser = async () => {
  const registration: ServiceWorkerRegistration =
    await navigator.serviceWorker.ready;
  const subscription: PushSubscription =
    await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
      ),
    });

  if (subscription) {
    await subscription.unsubscribe();
    api.delete('/api/subscribe');
  }
};

export const subscribeUser = async () => {
  const registration: ServiceWorkerRegistration =
    await navigator.serviceWorker.ready;

  const newSubscription: PushSubscription =
    await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || '',
      ),
    });

  const keyP256dh = newSubscription.getKey('p256dh');
  const keyAuth = newSubscription.getKey('auth');

  const payload = {
    endpoint: newSubscription.endpoint,
    expirationTime: newSubscription.expirationTime,
    keys: {
      p256dh: keyP256dh
        ? btoa(String.fromCharCode(...new Uint8Array(keyP256dh)))
        : '',
      auth: keyAuth
        ? btoa(String.fromCharCode(...new Uint8Array(keyAuth)))
        : '',
    },
  };

  await api.post('/api/subscribe', {
    ...payload,
  });
};

export const sendNotification = async () => {
  try {
    const response = await api.post('/api/send-notification', {
      title: 'web push test',
      body: 'web push 별거없네ㅋ',
      icon: '/favicon.ico',
      badge: '/favicon.ico',
    });
    console.log('response >', response.data);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
