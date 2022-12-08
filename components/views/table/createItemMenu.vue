<template>
    <div class="text-center">
        <v-menu v-model="menu" :close-on-content-click="false" location="end">
            <template v-slot:activator="{ props }">
                <v-btn icon v-bind="props" variant="flat" color="white" rounded="lg">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-card min-width="300">
                <v-list>
                    <v-list-item title="Neuer Eintrag" subtitle="Akte">
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>
                <v-list>
                    <v-list-item v-for="(item) in requiredFields">
                        <FormField :field="item" @valueChanged="showVal" />
                    </v-list-item>
                </v-list>
                <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn variant="text" @click="menu = false">
                        Cancel
                    </v-btn>
                    <v-btn color="primary" variant="text" @click="save">
                        Save
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    props: ['requiredFields'],
    data: () => ({
        menu: false
    }),
    methods: {
        showVal (val) {
            /* const property = Object.keys(this.requiredFields).find(key => this.requiredFields['name'] === 'name') */
            /* console.log(val.name, val.value[0].id) */
            console.log(this.requiredFields['name'].value = val.value)
        },
        save () {
            console.log(this.requiredFields)
        }
    }
}
</script>