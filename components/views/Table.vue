<template>
    <main class="site-main home-main">
        <div class="wrapper">
            <!-- <header>
                <h1 class="text-4xl font-bold">Hey, {{ user?.username }}</h1>
            </header> -->
            <div class="content-wrapper">
                <section class="akten-section">
                    <v-table>
                        <thead>
                            <tr>
                                <th class="text-left">
                                    ID
                                </th>
                                <!--  <th class="text-left">
                                    Aktenzeichen
                                </th> -->
                                <th class="text-left">
                                    Name
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in data" :key="item.id" @click="$router.push(`./${type}/${item.id}`)"
                                style="cursor: pointer">
                                <td>{{ item.id }} {{ type }}</td>
                                <td>{{ (item.attributes.name || item.attributes.username) }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                    <div v-if="meta" class="mt-10">
                        <ElementsPagination :pagination="meta?.pagination" @pageChange="pageChange" />
                    </div>
                </section>
            </div>
        </div>
    </main>
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
