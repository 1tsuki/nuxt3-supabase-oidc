# nuxt3-supabase-oidc
Sample code for using Supabase and OpenID Connect together in Nuxt3

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Goals

- firebase
  - [x] deploy Nuxt3 on firebase with SSR
    - [ ] use firebase cloud functions gen 2 environment
  - [ ] connect to redis from firebase cloud functions
  - [ ] connect to supabase postgresql from firebase cloud functions
  - [ ] issue supabase JWT with OIDC ID token
- supabase
  - [ ] access postgREST with JWT issued by firebase cloud functions

## Steps

### Deploy Nuxt3 on firebase hosting, cloud functions
[Nuxt3 - Deployment](https://nuxt.com/docs/getting-started/deployment#supported-hosting-providers) > [Nitro - Firebase](https://nitro.unjs.io/deploy/providers/firebase)

1. Create firebase project via firebase console
2. Setup Nuxt3 deployment to firebase by following [Nitro - Firebase](https://nitro.unjs.io/deploy/providers/firebase)
    - Recommended to also following instructions on [Nitro - Using 2nd Generation Firebase Functions](https://nitro.unjs.io/deploy/providers/firebase#using-2nd-generation-firebase-functions)
    - tips
        - run `yarn add -D firebase-admin firebase-functions firebase-functions-test` to add dependencies
        - set firebase cloud function region by following steps
          - add ``nitro: { preset: 'firebase', replace: { [`functions.https.onRequest`]: `functions.region('asia-northeast1').https.onRequest` } }`` to `nuxt.config.js`
          - add `` "region": "asia-northeast1" `` to `firebase.json` > `hosting.rewrites[0]`
        - if `Your client does not have permission to get URL /server/ from this server.' nuxt firebase` error occurs on server
            - [stack overflow](https://stackoverflow.com/questions/47511677/firebase-cloud-function-your-client-does-not-have-permission-to-get-url-200-fr)
    - using firebase v2 is better though settings on `nuxt.config.js`doesn't work
        - `nitro: { firebase: { gen: 2 } }`
3. Setup redis and allow VPC access from cloud functions by following [Google Cloud - Memorystore](https://cloud.google.com/memorystore/docs/redis/connect-redis-instance-functions?hl=ja)
    - [Nuxt3 - ServerStorage](https://nuxt.com/docs/guide/directory-structure/server#example-using-redis)
    - tips
        - add ``"vpc-connector": "projects/<project-id>/locations/<region>/connectors/<connector-name>"`` to `firebase.json` > `functions`


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
