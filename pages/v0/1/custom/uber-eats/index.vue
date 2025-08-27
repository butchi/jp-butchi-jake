<template>
  <v-main class="d-flex align-center justify-center" style="background: linear-gradient(135deg, #e0f7fa 0%, #f5f5fa 100%); min-height: 100vh;">
    <v-card class="pa-8" elevation="8" max-width="500" style="width:100%; text-align:center;">
      <v-icon size="48" color="green">mdi-food</v-icon>
      <h2 class="mb-6 mt-2" style="font-weight:700; letter-spacing:2px;">UberEatsカスタム起動</h2>
      <div v-if="!isEditing">
        <div class="mb-4">
          <a :href="savedUrl" target="_blank" style="color:#1976d2; font-weight:500; text-decoration:underline; font-size:1.1rem;">
            {{ savedLabel || 'UberEats商品ページ' }}
          </a>
        </div>
        <v-btn color="success" :href="savedUrl" target="_blank" size="x-large" class="rounded-pill mb-2">UberEatsを開く</v-btn>
        <div>
          <v-btn color="primary" @click="startEdit" variant="outlined" class="mt-2">編集</v-btn>
        </div>
      </div>
      <div v-else>
        <v-form @submit.prevent="saveUrl">
          <v-text-field
            v-model="inputUrl"
            label="UberEats商品ページのURLを入力"
            type="url"
            required
            prepend-inner-icon="mdi-link"
            class="mb-4"
          ></v-text-field>
          <v-text-field
            v-model="inputLabel"
            label="ラベル（任意）"
            type="text"
            prepend-inner-icon="mdi-tag"
            class="mb-4"
          ></v-text-field>
          <v-btn color="primary" @click="saveUrl" size="large" class="rounded-pill mr-2">保存</v-btn>
          <v-btn color="default" @click="cancelEdit" size="large" class="rounded-pill">キャンセル</v-btn>
        </v-form>
      </div>
    </v-card>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const defaultUrl = 'https://www.ubereats.com/jp/brand/lawson';
const inputUrl = ref('');
const inputLabel = ref('');
const savedUrl = ref('');
const savedLabel = ref('');
const isEditing = ref(false);
const storageKey = 'uberEatsCustomUrl';
const labelKey = 'uberEatsCustomLabel';

onMounted(() => {
  const storedUrl = localStorage.getItem(storageKey);
  const storedLabel = localStorage.getItem(labelKey);
  if (storedUrl) {
    savedUrl.value = storedUrl;
    inputUrl.value = storedUrl;
  } else {
    savedUrl.value = defaultUrl;
    inputUrl.value = defaultUrl;
  }
  if (storedLabel) {
    savedLabel.value = storedLabel;
    inputLabel.value = storedLabel;
  } else {
    savedLabel.value = '';
    inputLabel.value = '';
  }
  isEditing.value = !storedUrl;
});

function saveUrl() {
  if (inputUrl.value) {
    localStorage.setItem(storageKey, inputUrl.value);
    savedUrl.value = inputUrl.value;
    localStorage.setItem(labelKey, inputLabel.value);
    savedLabel.value = inputLabel.value;
    isEditing.value = false;
  }
}

function startEdit() {
  isEditing.value = true;
}

function cancelEdit() {
  inputUrl.value = savedUrl.value;
  inputLabel.value = savedLabel.value;
  isEditing.value = false;
}
</script>
