// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    ssr: false,
    modules: ['@nuxtjs/apollo'],
    apollo: {
        clients: {
          default: {
            httpEndpoint: 'http://localhost:4000/graphql'
          }
        },
      },
    css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
    build: {
        transpile: ['vuetify']
    },
    runtimeConfig: {
        public: {
            graphqlURL: process.env.VITE_STRAPI_GRAPGHQL || 'http://localhost:1337/graphql',
            restURL: process.env.VITE_STRAPI_URL || 'http://localhost:1337',
        }
    },
})
