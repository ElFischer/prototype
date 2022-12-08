<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <v-avatar color="indigo" v-bind="props">
                    <span>{{user?.username?.charAt(0).toUpperCase()}}</span>
                </v-avatar>
            </template>

            <v-card min-width="300">
                <v-list>
                    <v-list-item :title="user?.username" :subtitle="user?.email">
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list v-if="!session.pending">
                    <v-list-item v-if="session.data?.user">
                        <NuxtLink to="/auth/sign-out">
                            <button class="cta">Sign out</button>
                        </NuxtLink>
                    </v-list-item>
                </v-list>

            </v-card>
        </v-menu>
    </div>
</template>
<script setup>
const session = useSession();
const user = useUser();
const menu = ref(false)
</script>
<!-- <script>
export default {
    data: () => ({
        fav: true,
        menu: false,
        message: false,
        hints: true,
    }),
}
</script> -->