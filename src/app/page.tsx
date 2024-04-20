'use client';

import {
  clearSubscribeUser,
  subscribeUser,
  sendNotification,
} from '@/services/web-push';

const Home = () => (
  <main className="flex flex-col items-center justify-between p-24 gap-4">
    <button
      type="button"
      className="p-2 bg-slate-900 hover:bg-slate-800"
      onClick={clearSubscribeUser}
    >
      구독 취소
    </button>
    <button
      type="button"
      className="p-2 bg-slate-900 hover:bg-slate-800"
      onClick={subscribeUser}
    >
      구독하기
    </button>
    <button
      type="button"
      className="p-2 bg-slate-900 hover:bg-slate-800"
      onClick={sendNotification}
    >
      알림 테스트
    </button>
  </main>
);

export default Home;
