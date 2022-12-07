<template>
    <NuxtLayout name="table">
        <template #title>
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                    Fristen
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                    <v-icon>mdi-plus</v-icon>
                </v-btn> -->
            </v-toolbar>
        </template>
        <template #content>
            <ViewsTable :data="data?.data" :meta="data?.meta" :type="'deadline'" />
        </template>
    </NuxtLayout>
</template>

<script setup>
const {
    public: { graphqlURL, restURL },
} = useRuntimeConfig();

const schema = ref({});

onMounted(async () => {
    schema.value = await getSchema()
});

const getSchema = async () => {
    // post query with page and page size variables
    try {
        let { schema, errors } = await sendRestReq(`${restURL}/content-type-builder/content-types/api::frist.frist`);
        if (errors) throw Error(errors);
        return schema;
    } catch (error) {
        console.log({ error });
    }
};

const getfristen = async (page) => {

    // post query with page and page size variables
    const fristenQuery = {
        query: `query($page: Int, $pageSize: Int) {
            fristen(pagination: {page: $page, pageSize:$pageSize}, sort: "updatedAt:desc") {
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
        let { fristen, errors } = await sendReq(graphqlURL, { body: JSON.stringify(fristenQuery) });
        if (errors) throw Error(errors);
        return fristen;
    } catch (error) {
        console.log({ error });
    }
};

const { data } = await useAsyncData("fristen", async ({ _route: { query } }) => {
    let { page } = query;
    return await getfristen(page);
});

onBeforeRouteUpdate(async (to, from) => {
    console.log(to)
    if (to.query.page) {
        await useAsyncData("fristen", async () => {
            let { page } = to.query;
            return await getfristen(page);
        });
    }
})
</script>