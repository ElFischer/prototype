<template>
    <v-sheet min-height="80vh" rounded="lg" class="d-flex flex-column pa-10">
       <!--  <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" -->
       <!--      :items="data?.[Object.keys(data)[0]]?.data" @click:row="handleClick"></v-data-table> -->
        <ul>
            <li v-for="item in data?.[Object.keys(data)[0]].data" :key="item._id" style="cursor: pointer">
                <div @click="handleClick(item)">{{ item }}</div>
            </li>

        </ul>
    </v-sheet>

</template>

<script>
export default {
    props: ['data', 'type', 'headers'],
    data () {
        return {
            search: '',
            itemsPerPage: 5
        }
    },
    methods: {
        async handleClick (item) {
            /* this.$router.push(`./${this.type}/${item.item.value._id}`) */
            await navigateTo({ path: `./${this.type}/${item._id}` })
        },
    }
}
</script>
