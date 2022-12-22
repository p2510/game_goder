// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      charset: "utf-16",
      viewport: "width=500, initial-scale=1",
      title: "Goder game",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { hid: "description", name: "description", content: "Goder est un jeu en ligne qui permet de parier de façon virtuelle sur un aléa de numéro du dé et de gagner . " },
        { name: "format-detection", content: "telephone=no" },
      ],
      link: [{ rel: "icon", type: "image/x-png", href: "/logo.png" }],
    },
  },
  routeRules: {},
  modules: ["@nuxtjs/tailwindcss","@pinia/nuxt"],
});
