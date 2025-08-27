import "@mdi/font/css/materialdesignicons.css"

import "vuetify/styles"
import { type ThemeDefinition, createVuetify } from "vuetify"
import colors from "vuetify/lib/util/colors.mjs"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: colors.blueGrey.lighten5,
    primary: colors.red.darken3,
    accent: colors.blue.accent2,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
}

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: colors.blueGrey.darken3,
    primary: colors.red.darken3,
    accent: colors.green.darken2,
    secondary: colors.amber.darken3,
    info: colors.teal.lighten1,
    warning: colors.amber.base,
    error: colors.deepOrange.accent4,
    success: colors.green.accent3,
  },
}

export default defineNuxtPlugin(app => {
  const vuetify = createVuetify({
    components,
    directives,
    theme: {
      defaultTheme: "light",
      themes: {
        light,
        dark,
      },
    },
  })
  app.vueApp.use(vuetify)
})
