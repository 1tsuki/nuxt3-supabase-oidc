<script setup lang="ts">
  import { createClient } from '@supabase/supabase-js';


  const resDataSuccess = ref('')
  const resData = ref({})
  const jwt = ref('')
  const users = ref({})
  const post = async () => {
    const { data } = await useFetch('/api/session', {
      method: 'post',
      body: { text: 'Nuxt is Awesome!' }
    })
    resDataSuccess.value = data.value || ''
  }

  const get = async () => {
    const { data } = await useFetch('/api/session')
    resData.value = data.value || ''
  }

  const config = useRuntimeConfig()

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

    console.log('getdata')
    const { data } = await useAsyncData(async () => {
      const { data } = await supabase.from('users').select('*')
      users.value = data || {}
    })
  }
</script>

<template>
  <div>
    <div>
      <h2>sessions</h2>
      <div><button @click="post">post</button></div>
      <div>Post state: {{ resDataSuccess }}</div>
      <div><button @click="get">get</button></div>
      <div>Get Data: {{ JSON.stringify(resData) }}</div>
    </div>

    <div>
      <h2>JWT</h2>
      <div><button @click="getJwt">getJwt</button></div>
      <div>Get Data: {{ JSON.stringify(jwt) }}</div>
      <div><button @click="getData">getData</button></div>
      <p>{{ JSON.stringify(users) }}</p>
    </div>

    <div>
      <h2>Runtime config in client side</h2>
      <p>{{ JSON.stringify(config) }}</p>
    </div>
  </div>
</template>
