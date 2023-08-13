# nuxt3-supabase-oidc
A repository for testing how to implement a system using Nuxt3, Supabase, and Firebase in conjunction, while also integrating with a proprietary OIDC IdP.

## TL;DR (WIP)

- Using Supabase with custom issued JWT worked fine, so it seems there are no major issues with OIDC integration. However, since the registration timing of JWT to the Supabase client is limited on 'createClient', additional thought is required to make it handy.
- Implementation of Nuxt3 / useStorage may not be mature yet. While it's easy to build access to Redis, it's hard to appropriately set things like TTL.
- It's possible to run whole Nuxt3 stack on GCP (cloud functions, memorystore, hosting), but there are many considerations for production use as the framework does not solve problems like connection pools for Redis or cold start issues.


## Goals

- Nuxt3
  - hosting
    - [x] deploy on firebase (hosting, cloud functions)
    - [x] run with SSR disabled (envisioning usage in a SaaS web application)
  - enable session w/redis
    - [x] issue sessionID on server side and set-cookie to client
    - [ ] set ttl for server side session
    - [ ] save sessionID related values into server side redis (state, nonce, IdP access_token, IdP refresh_token)
    - [ ] connect server APIs to redis hosted on firebase memorystore
  - Supabase JWT
    - [x] issue custom Supabase JWT securely
    - [X] call supabase database with custom issued JWT
- firebase
  - [x] connect to cloud memorystore redis from firebase cloud functions
  - [ ] connect to supabase postgresql from firebase cloud functions
  - [ ] use firebase cloud functions gen 2 environment

## Setup

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
# yarn
yarn install
```

Implement `.env` and `.env.production` file in `./nuxt3`:

```
REDIS_HOST=localhost
REDIS_PORT=6379
SUPABASE_JWT_SECRET="YOUR_SUPABASE_JWT_SECRET_HERE"
SUPABASE_URL="YOUR_SUPABASE_API_URL_HERE"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANONYMOUS_KEY_HERE"
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# yarn
yarn dev
```

## Production

Build the application for production:

```bash
# yarn
yarn deploy
```