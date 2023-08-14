<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js';

  const config = useRuntimeConfig()

  const text = ref('')
  const resDataSuccess = ref('')
  const resData = ref({})
  const jwt = ref('')
  const users = ref({})

  const post = async () => {
    const { data } = await useFetch('/api/session', {
      method: 'post',
      body: { text: text.value }
    })
    resDataSuccess.value = data.value || ''
  }

  const get = async () => {
    const { data } = await useFetch('/api/session')
    resData.value = data.value || ''
  }

  const getJwt = async () => {
    const { data } = await useFetch('/api/jwt')
    jwt.value = data.value || ''
  }

  const getData = async() => {
    const supabase = createClient(
      config.public.supabaseUrl,
      config.public.supabaseAnonKey,
      { global: { headers: { Authorization: `Bearer ${jwt.value}` } } }
    )

    const { data } = await useAsyncData(async () => {
      const { data } = await supabase.from('users').select('*')
      users.value = data || {}
    })
  }
</script>

<template>
  <div>
    <div>
      <h2>Server side Redis</h2>
      <div>
        <h3>Send text and persist in redis with sessionID</h3>
        <p>By trying to access in incognito mode, you can confirm that the session is properly separated.</p>
        <input v-model="text" />
        <button @click="post">post</button>
        <span> Post state: {{ resDataSuccess }}</span>
      </div>
      <div>
        <h3>Get text saved in serverside redis</h3>
        <button @click="get">get</button>
        <span> Get Data: {{ JSON.stringify(resData) }}</span>
      </div>
    </div>

    <hr>

    <div>
      <h2>Supabase JWT</h2>
      <div>
        <h3>Get manually issued supabase JWT from api</h3>
        <button @click="getJwt">getJwt</button>
        <span> JWT value: {{ JSON.stringify(jwt) }}</span>
      </div>
      <div>
        <h3>Call Supabase database with issued JWT</h3>
        <button @click="getData">getData</button>
        <span> Get Data: {{ JSON.stringify(users) }}</span>
      </div>
    </div>

    <hr>

    <div>
      <h2>OIDC</h2>
      <div>
        <h3>Initialize OIDC sequence</h3>
        <p>The OIDC login sequence involves screen transitions, so it is necessary to use "navigate to" instead of "fetch".</p>
        <p>To allow navigation to external domain, setting "external" prop to true is also required.</p>
        <span><NuxtLink to="/api/oidc/init" :external="true">init OIDC</NuxtLink></span>
      </div>
    </div>

    <hr>

    <div>
      <h2>Runtime config in client side</h2>
      <div>
        <h3>Credentials (e.g. supabase jwt secret) should not be revealed to client.</h3>
        <p>{{ JSON.stringify(config) }}</p>
      </div>
      
    </div>
  </div>
</template>
