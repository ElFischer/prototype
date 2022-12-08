<template>
    <NuxtLayout name="single-view">
        <template #left>
            <v-sheet rounded="lg">
                <v-list rounded="lg">
                    <v-list-item>
                        <template v-slot:title>
                            <span class="text-h6 font-weight-bold ma-0">{{ data?.frist?.data?.attributes.name }}</span>
                        </template>
                        <template v-slot:subtitle>
                            <span class="">Frist-ID: {{ data?.frist?.data?.id }}</span>
                        </template>
                        <template v-slot:append>
                            <v-btn size="small" variant="text" icon="mdi-dots-vertical"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>
                <!-- <v-divider></v-divider>
                <v-card flat>
                    <v-card-text>
                        <pre>{{ data }}</pre>
                    </v-card-text>
                </v-card> -->
            </v-sheet>
        </template>
        <template #content>
            <!-- <v-toolbar>
                <template v-slot:prepend>
                    <v-btn icon="mdi-chevron-left" @click="$router.go(-1)"></v-btn>
                </template>
                <v-toolbar-title class="text-h6 font-weight-bold ma-0">
                    Data-Object - type {{ route.name }}
                </v-toolbar-title>
            </v-toolbar> -->
            <v-sheet min-height="10vh" rounded="lg">
                <v-card title="Data" flat rounded="lg">
                    <v-card-text>
                        <pre>{{ data }}</pre>
                    </v-card-text>
                </v-card>
            </v-sheet>
            <v-sheet rounded="lg">
                <v-card title="Schema" flat class="mt-10" rounded="lg">
                    <v-card-text>
                        <pre>{{ schema }}</pre>
                    </v-card-text>
                </v-card>
            </v-sheet>
        </template>
    </NuxtLayout>
</template>
  
<script setup>
import { ref } from 'vue'

const {
    public: { graphqlURL, restURL },
} = useRuntimeConfig();

const data = ref({});
const schema = ref({});
const session = useSession();
const route = useRoute()

onMounted(async () => {
    data.value = await getPosts()
    schema.value = await getSchema()
});

const getSchema = async (page) => {
    // post query with page and page size variables
    try {
        let { schema, errors } = await sendRestReq(`${restURL}/content-type-builder/content-types/api::frist.frist`);
        if (errors) throw Error(errors);
        return schema;
    } catch (error) {
        console.log({ error });
    }
};

const getPosts = async () => {
    let headersList = {
        Accept: "*/*",
        // set authorization token
        Authorization: `Bearer ${session.value.data.jwt}`, //
        "Content-Type": "application/json",
    };
    const postsQuery = {
        query: `query {
            frist(id: ${route.params.id}) {
                data {
                    id
                    attributes {
                        name
                        akte {
                            data {
                                id
                            }
                        }
                        akteId
                        falltyp
                        fristart
                        fristende
                        nr
                        motor
                        zugewiesenEmail
                        zugewiesenVorname
                        zugewiesenNachname
                        bearbeitungsstand
                        instanz
                        group
                        versand
                        erledigtuser
                        erledigungsdatum
                        users_permissions_user {
                            data {
                                id
                            }
                        }
                    }
                }
            }
        }
        `,
        variables: {
            page: parseInt(10),
            pageSize: 10,
        },
    };
    try {
        let result = await sendReq(graphqlURL, { body: JSON.stringify(postsQuery), headers: { "Content-Type": "application/json", Authorization: headersList.Authorization } });
        return result;
    } catch (error) {
        console.log({ error });
    }
};

</script>
  