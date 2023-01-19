import { createAuth0 } from '@auth0/auth0-vue';

export default defineNuxtPlugin(nuxtApp => {
    const auth0 = createAuth0({
        domain: "dev-caseos-tk100.eu.auth0.com",
        client_id: "DFTXO03BUHFbUd85312ReCUPvPn0Ytc7",
        redirect_uri: 'http://localhost:3000'
      })
    nuxtApp.vueApp.use(auth0)
})