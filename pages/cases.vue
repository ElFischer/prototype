<template>
    <NuxtLayout name="table">
        <template #title>
            <v-toolbar>
                <v-toolbar-title class="text-h6 font-weight-bold ma-0">
                    Table-View: {{ data?.cases?.schema?.classNamePlural }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <ViewsTableCreateItemMenu :requiredFields="requiredFields" /> -->
                <v-text-field density="compact" variant="solo" label="Filter" class="elevation-0"
                    append-inner-icon="mdi-filter" single-line hide-details v-model="filter"></v-text-field>
            </v-toolbar>
        </template>
        <template #content>
            <ViewsTable :data="data" :type="'case'" :headers="headers" />
        </template>
    </NuxtLayout>
</template>
<script lang="ts" setup>
import { DocumentNode } from 'graphql';
import { ref } from 'vue'
const filter = ref('')
const data = ref()
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
  query ($filter: JSONObject, $meta: PaginationArg){
    cases (filter: $filter, meta: $meta){
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

// Variables that could be sent within the query
const variables = {
    filter: { "name": { "$regex": `${filter}` } },
    meta: {
        "page": 2,
        "pageSize": 5
    }
}

onMounted(async () => {
    data.value = await getPosts(query, variables)
});

const getPosts = async (query: DocumentNode, variables: Object) => {
    return await useAsyncQuery(query, variables)
}

const getData = async () => {
    data.value = await getPosts(query, variables)
}
/* data.value = await getPosts(query, variables) */


</script>

<style>
.v-field--variant-solo {
    box-shadow: unset;
}
</style>