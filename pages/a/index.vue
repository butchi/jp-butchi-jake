<script lang="ts" setup>
import { useAsyncData } from "#app"
import { queryCollection } from "#imports"
import { onMounted, ref } from "vue"

import QRCode from "qrcode"

const width = 1024

const { data: posts } = await useAsyncData(() => {
  return queryCollection("a")
    .select("title", "by", "description", "image", "path")
    .order("by", "ASC")
    .all()
})

const txtToQrUrl = async (url: string) =>
  await QRCode.toDataURL(url, { width: width })

// QRコードのデータURLを格納するリアクティブオブジェクト
const qrCodes = ref<Record<string, string>>({})

onMounted(async () => {
  if (posts.value) {
    for (const post of posts.value) {
      const url = location.origin + post.path
      qrCodes.value[post.path] = await txtToQrUrl(url)
    }
  }
})
</script>

<template>
  <div>
    <h1>コレクション一覧</h1>
    <div>
      <div v-for="post in posts" :key="post.title">
        <nuxt-link :to="post.path">
          <img
            v-if="post.image"
            :src="post.image"
            alt="Post Image"
            width="128"
            height="128" />
          <img
            v-if="qrCodes[post.path]"
            :src="qrCodes[post.path]"
            alt="QR Code"
            width="128"
            height="128" />
          {{ post?.by }} / {{ post?.title }}
        </nuxt-link>
      </div>
    </div>
  </div>
</template>
