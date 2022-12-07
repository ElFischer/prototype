    <!-- ./components/SiteHeader.vue -->
<script setup>
/* import { RefreshIcon } from "@heroicons/vue/outline"; */
const session = useSession();
</script>
<template>
    <v-app-bar flat class="w-100">
        <v-container class="fill-height d-flex align-center">
            <NuxtLink to="/">
                <v-avatar class="mr-10 ml-4" color="grey-darken-1" size="32"></v-avatar>
            </NuxtLink>


            <NuxtLink :to="link.url" v-for="link in links" :key="link.name">
                <v-btn variant="text">
                    {{ link.name }}
                </v-btn>
            </NuxtLink>

            <v-spacer></v-spacer>

            <!-- <v-responsive max-width="260">
                <v-text-field density="compact" hide-details variant="solo"></v-text-field>
            </v-responsive> -->

            <nav class="site-nav" v-if="!session.data?.user">
                <!-- Hide if session state is pending -->
                <ul v-if="!session.pending" class="links">
                    <!-- Render Register link if no user in session -->
                    <li v-if="!session.data?.user" class="link">
                        <NuxtLink to="/auth/register">
                            <button class="cta">Register</button>
                        </NuxtLink>
                    </li>
                    <!-- Render Sign in link if no user in session -->
                    <li v-if="!session.data?.user" class="link">
                        <NuxtLink to="/auth/sign-in">
                            <button class="cta">Sign in</button>
                        </NuxtLink>
                    </li>
                    <!-- Else, Render Sign out link if user in session -->
                    <li v-else class="link">
                        <NuxtLink to="/auth/sign-out">
                            <button class="cta">Sign out</button>
                        </NuxtLink>
                    </li>
                </ul>
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
}
</script>