<template>
    <v-row>
        <v-col cols="2">
            <slot name="left" />
        </v-col>
        <v-col>
            <slot name="content" />
        </v-col>
    </v-row>
</template>