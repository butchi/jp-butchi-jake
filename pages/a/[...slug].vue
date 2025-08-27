<script lang="ts" setup>
import { useRoute } from "vue-router"

const route = useRoute()
const { data: post } = await useAsyncData("example", () => {
  return queryCollection("a").path(route.path).first()
})
</script>

<template>
  <div>
    <ContentRenderer v-if="post" :value="post" />
    <div v-else>コンテンツが見つかりませんでした。</div>
    <p>
      <a :href="`https://open.spotify.com/album/${post?.spotifyId}`"
        >Spotifyで聴く</a
      >
    </p>
    <p>
      <a :href="`https://music.apple.com/jp/album/${post?.appleMusicId}`"
        >Apple Musicで聴く</a
      >
    </p>
    <p>
      <a
        :href="`https://music.youtube.com/playlist?list=${post?.youTubeMusicId}`"
        >YouTube Musicで聴く</a
      >
    </p>
    <iframe
      v-if="post?.spotifyId"
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
      id="ytplayer"
      type="text/html"
      width="640"
      height="360"
      :src="`https://www.youtube.com/embed?listType=playlist&list=${post?.youTubeMusicId}`"
      frameborder="0" />
  </div>
</template>
