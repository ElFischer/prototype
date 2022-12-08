<template>
    <v-row>
        <v-col md="2" lg="2">
            <slot name="left" />
        </v-col>
        <v-col md="10" lg="9">
            <slot name="content" />
        </v-col>
    </v-row>
</template>