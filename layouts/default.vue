<template>
  <v-app>
    <v-app-bar color="primary" scroll-behavior="hide" app>
      <v-app-bar-title>
        <nuxt-link
          to="/"
          :style="{ 'text-decoration': 'inherit', color: 'inherit' }">
          BebiJake
        </nuxt-link>
      </v-app-bar-title>
    </v-app-bar>
    <slot />
  </v-app>
</template>
