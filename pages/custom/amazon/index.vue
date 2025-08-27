<template>
  <v-main class="d-flex align-center justify-center" style="background: linear-gradient(135deg, #e0e7ff 0%, #f5f5fa 100%); min-height: 100vh;">
    <v-card class="pa-8" elevation="8" max-width="500" style="width:100%; text-align:center;">
      <v-icon size="48" color="primary">mdi-cart</v-icon>
      <h2 class="mt-2" style="font-weight:700; letter-spacing:2px;">Amazonカスタム</h2>
      <p class="mb-6">(自分のスマホ専用)</p>
      <v-form @submit.prevent="addLink">
        <v-text-field
          v-model="inputLink"
          label="Amazon商品ページのURLを貼り付け"
          type="url"
          required
          prepend-inner-icon="mdi-link"
          class="mb-4"
        ></v-text-field>
        <v-btn color="primary" @click="addLink" size="large" class="rounded-pill">追加</v-btn>
      </v-form>
      <v-divider class="my-6"></v-divider>
      <div v-if="cartLinks.length">
        <h3 class="mb-4" style="font-weight:600;">商品一覧</h3>
        <div class="d-flex flex-wrap justify-center">
          <v-card
            v-for="(link, idx) in cartLinks"
            :key="link"
            class="ma-2 pa-4 d-flex flex-column align-center"
            elevation="4"
            max-width="220"
            style="width:220px; min-height:320px;"
          >
            <template v-if="getAmazonImageUrl(link)">
              <v-img
                :src="getAmazonImageUrl(link) || ''"
                alt="商品画像"
                width="120"
                height="120"
                class="mb-3"
                style="border-radius:12px; background:#f5f5fa; object-fit:contain;"
              />
            </template>
            <v-btn color="success" :href="link" target="_blank" size="large" class="rounded-pill mb-2">商品ページを開く</v-btn>
            <v-btn icon color="error" @click="removeLink(idx)"><v-icon>mdi-delete</v-icon></v-btn>
          </v-card>
        </div>
      </div>
      <div v-else>
        <p>カートは空です。</p>
      </div>
    </v-card>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const inputLink = ref('');
const cartLinks = ref<string[]>([]);
const storageKey = 'amazonCartLinks';

onMounted(() => {
  const stored = localStorage.getItem(storageKey);
  if (stored) {
    try {
      cartLinks.value = JSON.parse(stored);
    } catch {
      cartLinks.value = [];
    }
  }
});

function addLink() {
  const url = inputLink.value.trim();
  if (!url || !url.startsWith('http')) return;
  if (!cartLinks.value.includes(url)) {
    cartLinks.value.push(url);
    localStorage.setItem(storageKey, JSON.stringify(cartLinks.value));
    inputLink.value = '';
  }
}

function removeLink(idx: number) {
  cartLinks.value.splice(idx, 1);
  localStorage.setItem(storageKey, JSON.stringify(cartLinks.value));
}

function getAmazonImageUrl(url: string): string | null {
  // ASIN抽出（/dp/ASIN, /gp/product/ASIN, /product/ASIN など）
  const asinMatch = url.match(/(?:\/dp\/|\/gp\/product\/|\/product\/)([A-Z0-9]{10})/i);
  const asin = asinMatch ? asinMatch[1] : null;
  if (!asin) return null;
  // Amazon公式画像URL生成（最も一般的な形式）
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01._SCLZZZZZZZ_.jpg`;
}
</script>
