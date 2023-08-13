<script setup lang="ts">

  const resDataSuccess = ref('')
  const resData = ref({})
  const jwt = ref('')
  const post = async () => {
    const { data } = await useFetch('/api/test', {
      method: 'post',
      body: { text: 'Nuxt is Awesome!' }
    })
    resDataSuccess.value = data.value || ''
  }
  
  const get = async () => {
    const { data } = await useFetch('/api/test')
    resData.value = data.value || ''
  }

  const getJwt = async () => {
    const { data } = await useFetch('/api/jwt')
    jwt.value = data.value || ''
  }

  const config = useRuntimeConfig()
  
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
      <div><button @click="getJwt">get</button></div>
    <div>Get Data: {{ JSON.stringify(jwt) }}</div>
    </div>
    
    <div>
      <h2>Runtime config in client side</h2>
      <p>{{ JSON.stringify(config) }}</p>
    </div>
  </div>
</template>
