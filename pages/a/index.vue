<script lang="ts" setup>
import { useAsyncData } from '#app'
import { queryCollection } from '#imports'

const { data: posts } = await useAsyncData(() => {
  return queryCollection('a')
    .select('title', 'description', 'path')
    .order('title', 'ASC')
    .all()
})
</script>

<template>
  <div>
    <h1>コレクション一覧</h1>
    <div>
      <div
        v-for="post in posts"
        :key="post.title"
      >
        <nuxt-link :to="post.path">
          {{ post.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
