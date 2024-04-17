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
                applicationServerKey: process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
              })
              .then((res: PushSubscription) => {
                fetch('/api/subscribe', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(res),
                });
              });
          }
        });
    },
  );
};
