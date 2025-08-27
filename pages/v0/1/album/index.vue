<script lang="ts" setup>
import { useAsyncData } from "#app"
import { queryCollection } from "#imports"
import { onMounted, ref } from "vue"

import QRCode from "qrcode"

const width = 1024

const { data: posts } = await useAsyncData(() => {
  return queryCollection("album")
    .select("title", "by", "image", "path")
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
  <v-main>
    <v-container>
      <h1>CDアルバム一覧</h1>
      <v-row>
        <v-col
          v-for="post in posts"
          :key="post.title"
          cols="12"
          sm="6"
          md="4"
          lg="3">
          <v-card class="mt-3">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{ post.by }}</v-card-subtitle>
            <div class="pa-3">
              <div style="display: flex; gap: 16px; align-items: center">
                <nuxt-link
                  :to="post.path"
                  style="flex: 1 1 0; display: flex; justify-content: center">
                  <img
                    v-if="post.image"
                    :src="post.image"
                    alt="Post Image"
                    style="
                      max-width: 100%;
                      max-height: 128px;
                      object-fit: contain;
                    " />
                </nuxt-link>
                <div
                  style="flex: 1 1 0; display: flex; justify-content: center">
                  <img
                    v-if="qrCodes[post.path]"
                    :src="qrCodes[post.path]"
                    alt="QR Code"
                    style="
                      max-width: 100%;
                      max-height: 128px;
                      object-fit: contain;
                    " />
                </div>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
