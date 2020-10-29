<template>
    <v-dialog
            v-model="dialog"
            max-width="500px"
    >
        <v-card>
            <v-card-title>
                <span class="headline">Crear Usuario</span>
            </v-card-title>

            <v-card-text>
                <v-container>
                    <v-form ref="form"
                            v-model="isvalid"
                            :lazy-validation="lazy">


                        <v-row>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        v-model="editedItem.name"
                                        label="Nombre"
                                        :rules="rules.name"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        v-model="editedItem.email"
                                        label="Email"
                                        :rules="rules.email"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        v-model="editedItem.position"
                                        label="Puesto"
                                        :rules="rules.position"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-text-field
                                        v-model="editedItem.address"
                                        label="Dirección"
                                        :rules="rules.address"
                                ></v-text-field>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            ><v-combobox
                                    v-model="editedItem.skills"
                                    :rules="rules.skills"
                                    label="Habilidades"
                                    multiple
                                    chips
                            ></v-combobox>
                            </v-col>
                            <v-col
                                    cols="12"
                                    sm="6"
                                    md="4"
                            >
                                <v-menu
                                        ref="menu"
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :return-value.sync="editedItem.birthdate"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                                v-model="editedItem.birthdate"
                                                label="Fecha de nacimiento"
                                                :rules="rules.birthdate"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                        ></v-text-field>
                                    </template>
                                    <v-date-picker
                                            v-model="editedItem.birthdate"
                                            no-title
                                            scrollable
                                    >
                                        <v-spacer></v-spacer>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="menu = false"
                                        >
                                            Cancel
                                        </v-btn>
                                        <v-btn
                                                text
                                                color="primary"
                                                @click="$refs.menu.save(editedItem.birthdate)"
                                        >
                                            OK
                                        </v-btn>
                                    </v-date-picker>
                                </v-menu>
                            </v-col>


                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="close"
                >
                    Cancelar
                </v-btn>
                <v-btn
                        color="blue darken-1"
                        text
                        @click="save"
                        :disabled="!isvalid"
                        :loading="loading"
                >
                    Guardar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    import valid from '../util/validations'
    export default {
        name: "CreateItemDialog",
        computed: {
            dialog: {
                get() {
                    return this.$store.getters['createDialog']
                },
                set(value) {
                    this.$store.dispatch('openCreateDialog', value)
                },
            },
        },
        methods: {
            save() {
                this.loading=true;
                this.$store.dispatch('saveUser', this.editedItem).then(()=>{
                    this.loading=false
                    this.close()
                } )
            },
            close() {
                this.editedItem=this.defaultItem
                this.dialog = false
            }
        },
        data: () => ({
            lazy:false,
            rules:{
                name:[valid.required('nombre')],
                email:[valid.required('email'),valid.email()],
                birthdate:[valid.required('fecha de nacimiento')],
                position:[valid.required('puesto')],
                address:[valid.required('direccion')],
                skills:[valid.required('habilidades')],


            },
            isvalid:false,
            menu: false,
            loading:false,
            editedItem: {
                'name': '',
                'email': '',
                'position': '',
                'birthdate': '',
                'address': '',
                'skills': [],
            },
            defaultItem: {
                'name': '',
                'email': '',
                'position': '',
                'birthdate': '',
                'address': '',
                'skills': [],
            }
        })
    }
</script>

<style scoped>

</style>