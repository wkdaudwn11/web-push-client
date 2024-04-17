/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */

const webPush = require('web-push');

const vapidKeys = webPush.generateVAPIDKeys();
console.log(`VAPID Public Key: ${vapidKeys.publicKey}`);
console.log(`VAPID Private Key: ${vapidKeys.privateKey}`);
