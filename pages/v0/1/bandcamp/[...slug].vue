<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const { data: post } = await useAsyncData("bandcamp", () => {
  return queryCollection("bandcamp").path(route.path).first()
})

const selectedEmbeddingPlayer = ref("")

const onEmbeddingPlayerChange = (value: string) => {
  selectedEmbeddingPlayer.value = value
  localStorage.setItem("selectedEmbeddingPlayer", value)
}

onMounted(() => {
  const savedEmbeddingPlayer = localStorage.getItem("selectedEmbeddingPlayer")
  selectedEmbeddingPlayer.value = savedEmbeddingPlayer || ""
})
</script>

<template>
  <v-main>
    <v-container>
      <h2>{{ post?.by }}</h2>
      <ContentRenderer v-if="post" :value="post" />
      <div v-else>コンテンツが見つかりませんでした。</div>

      <v-row class="mt-3" justify="center">
        <v-col v-if="post?.bandcampId" cols="auto">
          <iframe
        style="border: 0; width: 350px; height: 470px;"
        :src="`https://bandcamp.com/EmbeddedPlayer/album=${post.bandcampId}/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/transparent=true/`"
        seamless
          ></iframe>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>
