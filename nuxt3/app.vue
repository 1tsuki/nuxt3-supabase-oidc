<script setup lang="ts">

  const resDataSuccess = ref('')
  const resData = ref({})
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
  
</script>

<template>
  <div>
    <div><button @click="post">post</button></div>
    <div>Post state: {{ resDataSuccess }}</div>
    <div><button @click="get">get</button></div>
    <div>Get Data: {{ JSON.stringify(resData) }}</div>
  </div>
</template>