<template>
    <v-dialog
            v-model="dialog"
            max-width="800px"
    >
        <v-card md>
            <v-toolbar
                    flat
                    dark
                    color="#475D97"
                    max-height="60px"
            >
                <v-btn
                        icon
                        dark
                        @click="dialog = false"
                >
                    <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title >
                    Detalles
                </v-toolbar-title>
                <v-spacer />
            </v-toolbar>
            <!-- <v-card-title>Detalles</v-card-title> -->
            <v-card-text>
                <v-spacer />
                <v-row>
                    <v-col>
                        <v-row>
                            <v-col> Nombre </v-col>
                            <v-col>
                                {{item.name}}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col> Email </v-col>
                            <v-col>
                                {{item.email}}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col> Cumpleaños </v-col>
                            <v-col>
                                {{item.birthdate}}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col> Direccion </v-col>
                            <v-col>
                                {{item.address}}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col> Puesto </v-col>
                            <v-col>
                                {{item.position}}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col> Habilidades </v-col>
                            <v-col>
                                <span >{{skills}}</span>

                            </v-col>
                        </v-row>
                        </v-col>
                </v-row>
            </v-card-text>

        </v-card>

    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex'
    export default {
        name: "detailsDialog",
        data: () => ({

        }),
        computed: {
            skills(){
                let text=''
                this.item.skills.forEach(item=>{
                    text+=text+' '+item.name
                } )
                return text;
            },
            ...mapState({
                item: (state) => state.users.details.item,
            }),
            dialog: {
                get() {
                    return this.$store.getters['detailsDialog']
                },
                set(value) {
                    this.$store.dispatch('openDetailsDialog', value)
                },
            },
        },
    }
</script>

<style scoped>

</style>