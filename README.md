# nuxt3-supabase-oidc
Sample code for using Supabase and OpenID Connect together in Nuxt3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Steps

### Deploy Nuxt3 on firebase hosting, cloud functions
[Nuxt3 - Deployment](https://nuxt.com/docs/getting-started/deployment#supported-hosting-providers) > [Nitro - Firebase](https://nitro.unjs.io/deploy/providers/firebase)

1. create firebase project via firebase console
2. Setup Nuxt3 deployment to firebase by following [Nitro - Firebase](https://nitro.unjs.io/deploy/providers/firebase)
    - Recommended to also following instructions on [Nitro - Using 2nd Generation Firebase Functions](https://nitro.unjs.io/deploy/providers/firebase#using-2nd-generation-firebase-functions)
    - tips
        - run `yarn add -D firebase-admin firebase-functions firebase-functions-test`
        - deploy command `yarn build && sed -I.bak \"s/functions.https.onRequest/functions.region('asia-northeast1').https.onRequest/\" .output/server/chunks/nitro/firebase.mjs && firebase deploy`
        - if `Your client does not have permission to get URL /server/ from this server.' nuxt firebase` error occurs on server
            - [stack overflow](https://stackoverflow.com/questions/47511677/firebase-cloud-function-your-client-does-not-have-permission-to-get-url-200-fr)
    - using firebase v2 is better though settings on `nuxt.config.js`doesn't work
        - `nitro: { firebase: { gen: 2 } }`




## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
