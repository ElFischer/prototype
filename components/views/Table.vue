<template>
    <v-sheet min-height="80vh" rounded="lg" class="d-flex flex-column ">
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">
                        ID
                    </th>
                    <th class="text-left">
                        Name
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data" :key="item.id" @click="$router.push(`./${type}/${item.id}`)"
                    style="cursor: pointer">
                    <td>{{ item.id }}</td>
                    <td>{{ (item.attributes.name || item.attributes.username) }}</td>
                </tr>
            </tbody>
        </v-table>
        <div v-if="meta" class="mt-auto mb-5">
            <ElementsPagination :pagination="meta?.pagination" @pageChange="pageChange" />
        </div>
    </v-sheet>

</template>

<script>
export default {
    props: ['data', 'type', 'meta'],
    data () {
        return {
            search: '',
        }
    },
    methods: {
        pageChange (value) {
            console.log(value) // someValue
        }
    }
}
</script>
