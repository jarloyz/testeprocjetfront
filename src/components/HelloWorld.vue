<template>
  <v-container>
    <v-data-table
            :headers="headers"
            :items="users"
            :options.sync="options"
            :loading="loading"
            :server-items-length="serverItems"
            class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar
                flat
        >
          <v-toolbar-title>Usuarios</v-toolbar-title>
          <v-divider
                  class="mx-4"
                  inset
                  vertical
          ></v-divider>
          <v-spacer></v-spacer>
          <v-tooltip top>
            <template #activator="{ on }">
              <v-btn
                      color="primary"
                      v-on="on"
                      @click.stop="createItem()"
              >
                <v-icon dark>
                  mdi-plus
                </v-icon>
              </v-btn>
            </template>
            <span>Crear</span>
          </v-tooltip>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-tooltip top>
          <template #activator="{ on }">
            <v-icon
                    color="green"
                    @click="showItem(item)"
                    v-on="on"
            >
              mdi-eye-circle-outline
            </v-icon>
          </template>
          <span>Detalles</span>
        </v-tooltip>

      </template>


    </v-data-table>
    <create-item-dialog/>
    <details-dialog/>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import CreateItemDialog from "./CreateItemDialog";
  import DetailsDialog from "./detailsDialog";

  export default {
    name: 'HelloWorld',
    components: {DetailsDialog, CreateItemDialog},
    computed:{
      options: {
        get () {
          return this.$store.getters['options']
        },
        set (value) {
          this.$store.dispatch('setOptions', value)
        },
      },
      ...mapState({
        users: (state) => state.users.dataTable.data,
        serverItems: (state) => state.users.dataTable.serverItems,
        loading: (state) => state.users.dataTable.loading,
      }),
    },
    watch: {
      options () {
        this.loadData()
      },
    },
    methods:{
      showItem(item){
        this.$store.dispatch('setDetailsItem',item)
        this.$store.dispatch('openDetailsDialog',true)
      },
      loadData () {
        this.$store.dispatch('loadUsers',{
          'options':this.options
        })
      },
      createItem(){
        this.$store.dispatch('openCreateDialog',true)
      }
    },
    data: () => ({
      headers: [
        {
          text: 'Nombre',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Email', value: 'email' },
        { text: 'Puesto', value: 'position' },
        { text: 'Nacimiento', value: 'birthdate' },
        { text: 'Direccion', value: 'address' },
        { text: 'Acciones', value: 'actions' },
      ],
    }),
  }
</script>
