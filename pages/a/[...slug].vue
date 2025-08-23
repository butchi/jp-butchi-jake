<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const { data: post } = await useAsyncData('example', () => {
  return queryCollection('a')
    .path(route.path)
    .first()
})
</script>

<template>
  <ContentRenderer v-if="post" :value="post" />
  <div v-else>コンテンツが見つかりませんでした。</div>
</template>
