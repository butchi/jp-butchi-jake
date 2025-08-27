<template>
  <v-main>
    <v-container class="pa-4">
      <h1>電話する</h1>
      <div v-if="!isEditing && savedPhoneNumber">
        <p>保存済み電話番号: <strong>{{ savedPhoneNumber }}</strong></p>
        <v-btn color="success" :href="`tel:${savedPhoneNumber}`">この番号に電話する</v-btn>
        <v-btn color="primary" @click="startEdit">編集</v-btn>
      </div>
      <div v-else>
        <v-form @submit.prevent="savePhoneNumber">
          <v-text-field v-model="phoneNumber" label="電話番号を入力" type="tel" required></v-text-field>
          <v-btn color="primary" @click="savePhoneNumber">保存</v-btn>
          <v-btn color="default" @click="cancelEdit">キャンセル</v-btn>
        </v-form>
      </div>
    </v-container>
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
