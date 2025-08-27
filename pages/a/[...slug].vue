<script lang="ts" setup>
import { ref } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const { data: post } = await useAsyncData("example", () => {
  return queryCollection("a").path(route.path).first()
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

      <v-form v-if="post">
        <v-btn
          :href="`https://open.spotify.com/intl-ja/album/${post?.spotifyId}`"
          target="_blank"
          rel="noopener"
          class="mt-3"
          color="#1ED760"
          dark
          block>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-spotify"
            viewBox="0 0 16 16">
            <path
              d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288" />
          </svg>
          <span class="ml-2">Spotify</span>
        </v-btn>
        <v-btn
          :href="`https://music.apple.com/jp/album/${post?.appleMusicId}`"
          target="_blank"
          rel="noopener"
          class="mt-3"
          color="#FF4E6B"
          dark
          block>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-apple-music"
            viewBox="0 0 16 16">
            <path
              fill-rule="evenodd"
              d="m10.995 0 .573.001q.241 0 .483.007c.35.01.705.03 1.051.093.352.063.68.166.999.329a3.36 3.36 0 0 1 1.47 1.468c.162.32.265.648.328 1 .063.347.084.7.093 1.051q.007.241.007.483l.001.573v5.99l-.001.573q0 .241-.008.483c-.01.35-.03.704-.092 1.05a3.5 3.5 0 0 1-.33 1 3.36 3.36 0 0 1-1.468 1.468 3.5 3.5 0 0 1-1 .33 7 7 0 0 1-1.05.092q-.241.007-.483.008l-.573.001h-5.99l-.573-.001q-.241 0-.483-.008a7 7 0 0 1-1.052-.092 3.6 3.6 0 0 1-.998-.33 3.36 3.36 0 0 1-1.47-1.468 3.6 3.6 0 0 1-.328-1 7 7 0 0 1-.093-1.05Q.002 11.81 0 11.568V5.005l.001-.573q0-.241.007-.483c.01-.35.03-.704.093-1.05a3.6 3.6 0 0 1 .329-1A3.36 3.36 0 0 1 1.9.431 3.5 3.5 0 0 1 2.896.1 7 7 0 0 1 3.95.008Q4.19.002 4.432 0h.573zm-.107 2.518-4.756.959H6.13a.66.66 0 0 0-.296.133.5.5 0 0 0-.16.31c-.004.027-.01.08-.01.16v5.952c0 .14-.012.275-.106.39-.095.115-.21.15-.347.177l-.31.063c-.393.08-.65.133-.881.223a1.4 1.4 0 0 0-.519.333 1.25 1.25 0 0 0-.332.995c.031.297.166.582.395.792.156.142.35.25.578.296.236.047.49.031.858-.043.196-.04.38-.102.555-.205a1.4 1.4 0 0 0 .438-.405 1.5 1.5 0 0 0 .233-.55c.042-.202.052-.386.052-.588V6.347c0-.276.08-.35.302-.404.024-.005 3.954-.797 4.138-.833.257-.049.378.025.378.294v3.524c0 .14-.001.28-.096.396-.094.115-.211.15-.348.178l-.31.062c-.393.08-.649.133-.88.223a1.4 1.4 0 0 0-.52.334 1.26 1.26 0 0 0-.34.994c.03.297.174.582.404.792a1.2 1.2 0 0 0 .577.294c.237.048.49.03.858-.044.197-.04.381-.098.556-.202a1.4 1.4 0 0 0 .438-.405q.173-.252.233-.549a2.7 2.7 0 0 0 .044-.589V2.865c0-.273-.143-.443-.4-.42-.04.003-.383.064-.424.073" />
          </svg>
          <span class="ml-2">Apple Music</span>
        </v-btn>
        <v-btn
          :href="`https://music.youtube.com/watch?list=${post?.youTubeMusicId}`"
          target="_blank"
          rel="noopener"
          class="mt-3"
          color="#FF3333"
          dark
          block>
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/8a/ba/67148b1d4d39b28ce58a6989c017/youtube-music.webp=s96-fcrop64=1,00000000ffffffff-rw"
            width="24"
            height="24" />
          <span class="ml-2">YouTube Music</span>
        </v-btn>
      </v-form>

      <v-btn-toggle
        v-model="selectedEmbeddingPlayer"
        class="my-5"
        mandatory
        @update:model-value="onEmbeddingPlayerChange">
        <v-btn value="" :disabled="!post">埋め込みなし</v-btn>
        <v-btn value="spotify" :disabled="!post?.spotifyId">Spotify</v-btn>
        <v-btn value="appleMusic" :disabled="!post?.appleMusicId"
          >Apple Music</v-btn
        >
        <v-btn value="youTubeMusic" :disabled="!post?.youTubeMusicId"
          >YouTube Music</v-btn
        >
      </v-btn-toggle>

      <iframe
        v-if="post?.spotifyId"
        v-show="selectedEmbeddingPlayer === 'spotify'"
        data-testid="embed-iframe"
        style="border-radius: 12px"
        :src="`https://open.spotify.com/embed/album/${post?.spotifyId}?utm_source=generator`"
        width="100%"
        height="352"
        frameBorder="0"
        allowfullscreen="false"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy" />
      <iframe
        v-if="post?.appleMusicId"
        v-show="selectedEmbeddingPlayer === 'appleMusic'"
        allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
        frameborder="0"
        height="450"
        style="
          width: 100%;
          max-width: 660px;
          overflow: hidden;
          border-radius: 10px;
        "
        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
        :src="`https://embed.music.apple.com/jp/album/richard-d-james-album/${post?.appleMusicId}`" />
      <iframe
        v-if="post?.youTubeMusicId"
        v-show="selectedEmbeddingPlayer === 'youTubeMusic'"
        id="ytplayer"
        type="text/html"
        width="640"
        height="360"
        :src="`https://www.youtube.com/embed?listType=playlist&list=${post?.youTubeMusicId}`"
        frameborder="0" />
    </v-container>
  </v-main>
</template>
