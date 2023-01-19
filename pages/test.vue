<template>
    <NuxtLayout name="table">
        <template #title>
            <v-toolbar>
                <v-toolbar-title class="text-h6 font-weight-bold ma-0">
                    Table-View: {{ data?.cases?.schema?.classNamePlural }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <ViewsTableCreateItemMenu :requiredFields="requiredFields" /> -->
            </v-toolbar>
        </template>
        <template #content>
            <!-- <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="data?.cases?.data" @click:row="handleClick()"
                class="elevation-1"></v-data-table> -->
            <ViewsTable :data="data" :type="'case'" :headers="headers" />
            <!-- <pre>{{ data?.cases?.schema }}</pre> -->
        </template>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const headers = ref([
    {
        title: 'Name',
        sortable: false,
        key: 'name',
    },
    { title: 'Kategorie', align: 'end', key: 'category' },
    { title: 'Aktenzeichen', align: 'end', key: 'caseNr' }
])

const query = gql`
  query {
    cases {
        data {
            _id
            category
            name
            caseNr
        },
        meta {
            page
            pageCount
            pageSize
        },
        schema {
            classNameSingular
            classNamePlural
            classDesc
            classDatabase
            classCollection
        }
    }
  }
`
const variables = { limit: 5 }
const { data } = await useAsyncQuery(query, variables)
console.log(data)

const handleClick = (item) => {
    console.log('roue´', item)
};
</script>