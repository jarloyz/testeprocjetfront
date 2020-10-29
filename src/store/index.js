import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex);
import  BaseService  from '../services/index'
export default new Vuex.Store({
    state: {
        users:{
            dataTable:{
                data:[],
                loading:false,
                serverItems:0,
            },
            options:{

            },
            details:{
                dialog:false,
                item:{}
            },
            create:{
                dialog:false,

            },

        },

    },
    getters: {
        createDialog: state => {
            return state.users.create.dialog;
        },
        detailsDialog: state => {
            return state.users.details.dialog;
        },
        options: state => {
            return state.users.options;
        },
        // createDialog: state => {
        //     return state.users.create.dialog;
        // },

    },
    mutations: {
        CLEAN_USERS: state => {
            Vue.set(state.users.dataTable, 'data', [])
        },
        SET_OPTIONS: (state, value) => {
            Vue.set(state.users, 'options', value)
        },
        START_LOADING_DATA: (state, value) => {
            Vue.set(state.users.dataTable, 'loading', value)
        },
        LOAD_DATA: (state, data) => {
            Vue.set(state.users, 'dataTable', data)
        },
        OPEN_CREATE_DIALOG: (state, value) => {
            Vue.set(state.users.create, 'dialog', value)
        },
        OPEN_DETAILS_DIALOG: (state, value) => {
            Vue.set(state.users.details, 'dialog', value)
        },
        SET_DETAILS_ITEM: (state, value) => {
            Vue.set(state.users.details, 'item', value)
        },
    },
    actions: {
        setOptions({ commit },value) {
            commit('SET_OPTIONS', value)
        },
        openCreateDialog({ commit },value) {
            commit('OPEN_CREATE_DIALOG', value)
        },
        openDetailsDialog({ commit },value) {
            commit('OPEN_DETAILS_DIALOG', value)
        },
        setDetailsItem({ commit },value){
            commit('SET_DETAILS_ITEM', value)
        },
        loadUsers({ state,commit }) {
            commit('CLEAN_USERS'),
            commit('START_LOADING_DATA', true)
            BaseService.getUsers(state.users.options).then(response => {
                commit('LOAD_DATA', {
                    data: response.data.data,
                    serverItems: response.data.total,
                    loading: false,
                })
            },
                error=>{

                    console.error(error)
                }).finally( ()=>{
                commit('START_LOADING_DATA', false)
            } )
        },
        saveUser({ dispatch },item){
            BaseService.createUser(item).then(resp=>{
                console.log(resp)
                dispatch('loadUsers')
            })
        }
    }
})