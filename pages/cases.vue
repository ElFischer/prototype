<template>
    <NuxtLayout name="table">
        <template #title>
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                    Table-View: {{ schema?.displayName }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <ViewsTableCreateItemMenu :requiredFields="requiredFields" />
            </v-toolbar>
        </template>
        <template #content>
            <ViewsTable :data="data?.data" :meta="data?.meta" :type="'case'" />
            <pre>{{ requiredFields }}</pre>
            <div v-for="item in requiredFields">
                {{ item }}
            </div>
        </template>
    </NuxtLayout>
</template>

<script setup>
const {
    public: { graphqlURL, restURL },
} = useRuntimeConfig();

const schema = ref({});
const requiredFields = ref({});

onMounted(async () => {
    schema.value = await getSchema()
    for (const [key, value] of Object.entries(schema.value.attributes)) {
        if (value.required) {
            console.log(key)
            requiredFields.value[key] = value;
            requiredFields.value[key].name = key
        }
    }
});

const getSchema = async () => {
    // post query with page and page size variables
    try {
        let { schema, errors } = await sendRestReq(`${restURL}/content-type-builder/content-types/api::akte.akte`);
        if (errors) throw Error(errors);
        return schema;
    } catch (error) {
        console.log({ error });
    }
};

const getakten = async (page) => {

    // post query with page and page size variables
    const aktenQuery = {
        query: `query($page: Int, $pageSize: Int) {
            akten(pagination: {page: $page, pageSize:$pageSize}, sort: "updatedAt:desc") {
            data {
                id
                attributes {
                updatedAt
                name
                }
            }
            meta {
                pagination {
                    total
                    pageSize
                    page
                    pageCount
                }
            }
            }
        }
        `,
        variables: {
            page: parseInt(page),
            pageSize: 10,
        },
    };
    try {
        let { akten, errors } = await sendReq(graphqlURL, { body: JSON.stringify(aktenQuery) });
        if (errors) throw Error(errors);
        return akten;
    } catch (error) {
        console.log({ error });
    }
};

// Get current route page by destructuring useAsyncData context to get route > query > page
const { data } = await useAsyncData("akten", async ({ _route: { query } }) => {
    let { page } = query;
    console.log(query)
    return await getakten(page);
});

onBeforeRouteUpdate(async (to, from) => {

    if (to.query.page) {
        await useAsyncData("akten", async () => {
            let { page } = to.query;
            return await getakten(page);
        });
    }
})
</script>