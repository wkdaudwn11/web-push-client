import type { NextApiRequest, NextApiResponse } from 'next';

import { saveSubscription } from '@/utils/db';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    const subscription = req.body;

    try {
      saveSubscription(subscription as PushSubscription);
      res.status(201).json({ message: 'Subscription saved' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to save subscription' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
