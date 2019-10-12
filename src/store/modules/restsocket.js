const state = {
    info: [],
    prevdata: []
}

const getters = {
    getInfo: state => {
        return state.info
    },
    getPrev: state =>{
        return state.prevdata
    }
}

const mutations = {
    addInfo(state,data){
        state.info=data
    },
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