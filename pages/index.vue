<template>
    <v-container>
        <v-row v-if="session.data?.user">
            <v-col md="12">
                <v-toolbar>
                    <v-toolbar-title>
                        Dashboard
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                    
                </v-toolbar>
            </v-col>
            <v-col v-for="n in 16" :key="n" cols="3">
                <v-card flat height="200" class="d-flex justify-center align-self-center">
                    <v-card-text class="d-flex justify-center align-self-center">
                        Widget-Area
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-else>
            Bitte einloggen
        </v-row>
    </v-container>
</template>

<script setup>
/* import { RefreshIcon } from "@heroicons/vue/outline"; */
const session = useSession();
</script>
