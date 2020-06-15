import rutitas from '@/assets/docs/data'
import io from 'socket.io-client'
import axios from 'axios'

const state = {
    info: [],
    prevdata: [],
    rutas: rutitas.rutas,
    position: [],
    socket: null
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
    },
    getPosition: state =>{
        return state.position
    },
    getGeocercasOcupadas: state => carros =>{
        var result= []
        carros.forEach(el =>{
            var bus =state.position.find(ele => ele.deviceid==el.deviceid)
            if(bus!=null){
                bus.devicename = el.carlicence
                result.push(bus)
            }else{
                result.push({deviceid: el.deviceid, devicename:el.carlicence, fence: "ATM", hora:"0000-00-00 00:00:00"})
            }
        })
        return result
    }
}

const mutations = {
    iniciarSocket(state,host){
        state.socket= io('http://'+host+':12056')
    },
    pedirEstado(state,rootstate, host){

    },
    addInfo(state,data){
        state.info=data
    },
    addDatos(state, data){
        state.datos = data
    },
    addCarPosition(state, car){
        state.position.push(car)
    },
    actualizarPosition(state, pos){
        var index =state.position.findIndex(x => x.deviceid==pos.deviceno)
        console.log(index)
        if(index<0){
            state.position.push({deviceid: pos.deviceno, fence: "ATM", hora:"0000-00-00 00:00:00"})
            index = state.position.findIndex(x => x.deviceid==pos.deviceno)
        }
        state.position[index].fence = pos.content.substring(pos.content.indexOf(':')+1,pos.content.lastIndexOf(','))
        state.position[index].hora = pos.dateTime
        console.log(state.position)
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