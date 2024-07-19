# Web Push Example (Client)

[Web Push Server Link](https://github.com/wkdaudwn11/web-push-server)

# How to use

## Step1

### Generate vapid keys

```
node generate-vapid-keys.ts
```

## Step2

### Edit .env file (You must use the same key value as the backend server)

```
NEXT_PUBLIC_VAPID_PUBLIC_KEY=[Your VAPID Public Key]
NEXT_PUBLIC_VAPID_PRIVATE_KEY=[Your VAPID Private Key]
```
