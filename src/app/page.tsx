'use client';

import { subscribeUser } from '@/services/web-push';

const Home = () => (
  <main className="flex flex-col items-center justify-between p-24 gap-4">
    <h1>Welcome to your PWA</h1>
    <button
      type="button"
      className="p-2 bg-slate-900 hover:bg-slate-800"
      onClick={subscribeUser}
    >
      Subscribe for push notifications
    </button>
  </main>
);

export default Home;
