    <!-- layouts/default.vue -->
<template>
    <v-container>
        <v-row>
            <v-col>
                <slot name="title" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <slot name="content" />
            </v-col>
        </v-row>
    </v-container>

    <slot />
</template>
