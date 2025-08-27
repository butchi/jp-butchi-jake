<script lang="ts" setup>
import { onMounted, ref } from "vue"

import QRCode from "qrcode"

const pageArr = [{
  title: "電話する",
  image: "https://placehold.jp/150x150.png?text=電話する",
  path: "/custom/tel"
}, {
  title: "カートに追加",
  image: "https://placehold.jp/150x150.png?text=カートに追加",
  path: "/custom/cart"
}]

const width = 1024

const txtToQrUrl = async (url: string) =>
  await QRCode.toDataURL(url, { width: width })

// QRコードのデータURLを格納するリアクティブオブジェクト
const qrCodes = ref<Record<string, string>>({})

onMounted(async () => {
  if (pageArr) {
    for (const page of pageArr) {
      const url = location.origin + page.path
      qrCodes.value[page.path] = await txtToQrUrl(url)
    }
  }
})
</script>

<template>
  <v-main>
    <v-container>
      <h1>カスタムQR</h1>
      <v-row>
        <v-col v-for="page in pageArr" :key="page.title" cols="12" sm="6" md="4" lg="3">
          <v-card class="mt-3">
            <v-card-title>{{ page.title }}</v-card-title>
            <div class="pa-3">
              <div style="display: flex; gap: 16px; align-items: center">
                <nuxt-link :to="page.path" style="flex: 1 1 0; display: flex; justify-content: center">
                  <img v-if="page.image" :src="page.image" alt="Post Image" style="
                      max-width: 100%;
                      max-height: 128px;
                      object-fit: contain;
                    " />
                </nuxt-link>
                <div style="flex: 1 1 0; display: flex; justify-content: center">
                  <img v-if="qrCodes[page.path]" :src="qrCodes[page.path]" alt="QR Code" style="
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
