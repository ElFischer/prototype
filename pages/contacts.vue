<template>
    <NuxtLayout name="table">
        <template #title>
            <v-toolbar>
                <v-toolbar-title class="text-h6">
                    Kontakte
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <!-- <v-btn icon>
                    <v-icon>mdi-plus</v-icon>
                </v-btn> -->
            </v-toolbar>
        </template>
        <template #content>
            <ViewsTable :data="data?.data" :meta="data?.meta" :type="'contact'" />
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

const getSchema = async (page) => {
    // post query with page and page size variables
    try {
        let { schema, errors } = await sendRestReq(`${restURL}/content-type-builder/content-types/plugin::users-permissions.user`);
        if (errors) throw Error(errors);
        return schema;
    } catch (error) {
        console.log({ error });
    }
};

const getusersPermissionsUsers = async (page) => {
    // post query with page and page size variables
    const usersPermissionsUsersQuery = {
        query: `query($page: Int, $pageSize: Int) {
            usersPermissionsUsers(pagination: {page: $page, pageSize:$pageSize}, sort: "updatedAt:desc") {
            data {
                id
                attributes {
                updatedAt
                username
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
        let { usersPermissionsUsers, errors } = await sendReq(graphqlURL, { body: JSON.stringify(usersPermissionsUsersQuery) });
        if (errors) throw Error(errors);
        return usersPermissionsUsers;
    } catch (error) {
        console.log({ error });
    }
};


const { data } = await useAsyncData("usersPermissionsUsers", async ({ _route: { query } }) => {
    let { page } = query;
    return await getusersPermissionsUsers(page);
});

onBeforeRouteUpdate(async (to, from) => {
    if (to.query.page) {
        await useAsyncData("usersPermissionsUsers", async () => {
            let { page } = to.query;
            return await getusersPermissionsUsers(page);
        });
    }
})
</script>