    <!-- ./components/SiteHeader.vue -->
<script setup>
/* import { RefreshIcon } from "@heroicons/vue/outline"; */
const session = useSession();
</script>
<template>
    <v-app-bar flat class="w-100">
        <v-app-bar-nav-icon @click="openMenu"></v-app-bar-nav-icon>
        <v-toolbar-title>
            <NuxtLink to="/">
                <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar>
            </NuxtLink>
        </v-toolbar-title>
        <v-container class="fill-height d-flex align-center">



            <!-- <NuxtLink :to="link.url" v-for="link in links" :key="link.name" v-if="session.data?.user"
                style="text-decoration: none; color: inherit;">
                <v-btn variant="text">
                    {{ link.name }}
                </v-btn>
            </NuxtLink> -->

            <v-spacer></v-spacer>

            <!-- <v-responsive max-width="260">
                <v-text-field density="compact" hide-details variant="solo"></v-text-field>
            </v-responsive> -->

            <nav v-if="!session.data?.user">
                <!-- Hide if session state is pending -->
                <div v-if="!session.pending" class="d-flex">
                    <div v-if="!session.data?.user" class="mr-2">
                        <NuxtLink to="/auth/sign-in" style="text-decoration: none; color: inherit;">
                            <v-btn variant="tonal">
                                Sign in
                            </v-btn>
                        </NuxtLink>
                    </div>
                    <div v-if="!session.data?.user">
                        <NuxtLink to="/auth/register" style="text-decoration: none; color: inherit;">
                            <v-btn variant="outlined">
                                Register
                            </v-btn>
                        </NuxtLink>
                    </div>
                    <div v-else class="link">
                        <NuxtLink to="/auth/sign-out">
                            <v-btn>
                                Sign out
                            </v-btn>
                        </NuxtLink>
                    </div>
                </div>
                <!-- Display loading if session state is pending -->
                <div v-else class="cta">
                    <!-- <RefreshIcon class="icon stroke animate-rotate" /> -->Refresh
                </div>
            </nav>
            <UserMenu v-else />
        </v-container>

        <!-- <v-btn :prepend-icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" @click="onClick">Toggle
            Theme</v-btn> -->

    </v-app-bar>
</template>
    
<script>
export default {
    data: () => ({
        drawer: false,
        links: [
            {
                name: 'Dashboard',
                url: '/'
            },
            {
                name: 'Akten',
                url: '/cases'
            },
            {
                name: 'Fristen',
                url: '/deadlines'
            },
            {
                name: 'Kontakte',
                url: '/contacts'
            }
        ],
    }),
    methods: {
        openMenu () {
            this.drawer = !this.drawer
            this.$emit('openMenu', this.drawer)
        }
    }
}
</script>