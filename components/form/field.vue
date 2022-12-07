<template>
    <div>
        <v-text-field v-if="field?.type === 'string'" :label="field?.label" v-model="value"
            @change="emitChangedVal"></v-text-field>
        <v-combobox v-model="select" :items="items" v-if="field?.type === 'relation'" :label="field?.label"
            :multiple="field?.relation === 'oneToMany'" chips @click="getValues()" item-title="attributes.username"
            item-value="id" @update:menu="emitChangedVal"></v-combobox>
    </div>
</template>

<script>
export default {
    props: ['field'],
    data: () => ({
        menu: false,
        value: '',
        select: [],
        items: [],
    }),
    computed: {
        getRelationData () {
            return this.items
        }
    },
    methods: {
        async getValues (page) {
            const {
                public: { graphqlURL },
            } = useRuntimeConfig();
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
                this.items = usersPermissionsUsers.data
            } catch (error) {
                console.log({ error });
            }

        },
        emitChangedVal () {
            if (this.field?.type === 'relation') {
                this.field.value = this.select
            } else {
                this.field.value = this.value
            }
            this.$emit('valueChanged', this.field)
        }
    }
}
</script>