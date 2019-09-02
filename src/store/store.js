import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export const store = new Vuex.Store({
    state:{
        aaa:''
    },
    mutations:{
        chage(state,aaa){
            state.aaa=aaa
        }
    },
    getters:{
        aaa:state=>state.aaa
    }


})