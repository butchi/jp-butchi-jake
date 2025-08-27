<template>
  <v-main class="d-flex align-center justify-center" style="background: linear-gradient(135deg, #e0e7ff 0%, #f5f5fa 100%); min-height: 100vh;">
    <v-card class="pa-8" elevation="8" max-width="400" style="width:80%; text-align:center;">
      <v-icon size="48" color="primary">mdi-phone</v-icon>
      <h2 class="mt-2" style="font-weight:700; letter-spacing:2px;">カスタム電話</h2>
      <p class="mb-6">(自分のスマホ専用)</p>
      <div v-if="!isEditing && savedPhoneNumber">
        <div class="mb-4">
          <span style="font-size:2rem; font-weight:600; letter-spacing:2px;">{{ savedPhoneNumber }}</span>
        </div>
        <v-btn color="success" :href="`tel:${savedPhoneNumber}`" size="x-large" class="rounded-circle mb-2" style="width:85px; height:85px;">
          <v-icon size="32">mdi-phone</v-icon>
        </v-btn>
        <div>
          <v-btn color="primary" @click="startEdit" variant="outlined" class="mt-2">編集</v-btn>
        </div>
      </div>
      <div v-else>
        <v-form @submit.prevent="savePhoneNumber">
          <v-text-field
            v-model="phoneNumber"
            label="電話番号を入力"
            type="tel"
            required
            prepend-inner-icon="mdi-cellphone"
            class="mb-4"
            style="font-size:1.5rem;"
          ></v-text-field>
          <v-btn color="primary" @click="savePhoneNumber" size="large" class="rounded-pill mr-2">保存</v-btn>
          <v-btn color="default" @click="cancelEdit" size="large" class="rounded-pill">キャンセル</v-btn>
        </v-form>
      </div>
    </v-card>
  </v-main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const phoneNumber = ref('')
const savedPhoneNumber = ref('')
const isEditing = ref(false)

const storageKey = 'customTelNumber'

onMounted(() => {
  const stored = localStorage.getItem(storageKey)
  if (stored) {
    savedPhoneNumber.value = stored
    phoneNumber.value = stored
  }
  isEditing.value = !stored;
})

function savePhoneNumber() {
  if (phoneNumber.value) {
    localStorage.setItem(storageKey, phoneNumber.value)
    savedPhoneNumber.value = phoneNumber.value
    isEditing.value = false;
  }
}

function startEdit() {
  isEditing.value = true;
}

function cancelEdit() {
  phoneNumber.value = savedPhoneNumber.value;
  isEditing.value = false;
}
</script>
