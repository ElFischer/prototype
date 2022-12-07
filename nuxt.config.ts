// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
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
