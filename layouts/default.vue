    <!-- layouts/default.vue -->
<template>
    <v-app :theme="theme">
        <v-navigation-drawer v-model="drawer">
            <v-list>
                <v-list-item title="Kanzlei"
                    subtitle="Gansel-Rechtsanwälte">
                    <template v-slot:append>
                        <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                    </template>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list :lines="false" density="compact" nav>
                <v-list-item v-for="(item, i) in links" :key="i" :value="item" active-color="primary">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title>
                        <NuxtLink :to="item.url" 
                            style="text-decoration: none; color: inherit;">
                            {{ item.text }}
                        </NuxtLink>
                    </v-list-item-title>
                </v-list-item>
            </v-list>

        </v-navigation-drawer>
        <SiteHeader @openMenu="val => drawer = val" />
        <v-main class="bg-grey-lighten-3">
            <v-container>
                <slot />
            </v-container>
        </v-main>
    </v-app>
</template>
  
<!-- <script setup>
import { ref } from 'vue'

const theme = ref('light')

function onClick () {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script> -->

<script>
export default {
    data: () => ({
        drawer: false,
        theme: 'light',
        links: [
            {
                text: 'Dashboard',
                icon: 'mdi-folder',
                url: '/'
            },
            {
                text: 'Akten',
                icon: 'mdi-folder',
                url: '/cases'
            },
            {
                text: 'Fristen',
                icon: 'mdi-folder',
                url: '/deadlines'
            },
            {
                text: 'Kontakte',
                icon: 'mdi-folder',
                url: '/contacts'
            }
        ],
    }),
}
</script>