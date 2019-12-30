import rutitas from '../../assets/docs/data'


const state = {
    info: [],
    prevdata: [],
    rutas: rutitas.rutas

}

const getters = {
    getInfo: state => {
        return state.info
    },
    getPrev: state =>{
        return state.prevdata
    },
    getDatos: state => {
        return state.datos
    },
    getRuta: state => ruta =>{
        return state.rutas.find(bus=> bus.name==ruta).paradas
    }
}

const mutations = {
    addInfo(state,data){
        state.info=data
    },
    addDatos(state, data){
        state.datos = data
    }
}

const actions = {
    //"A_SOCKET_SUB_ALARM"({commit},options){  
    //}

    actualizar({commit}, data){
        commit('addInfo',data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}