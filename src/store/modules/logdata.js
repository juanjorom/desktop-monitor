import axios from 'axios'
//import servers from '../../assets/docs/servers'
//import idb from '@/api/idb'
//import jdb from '@/api/jsondb'

const state = {
    key: null,
    user: null,
    host: null,
    sending: false,
    sucess: false,
    arbol: null,
    password: null,
    hostList: [],
    usersList:[],
}

const getters = {
    getKey: state => {
        return  state.key
    },
    getUser: state => {
        return state.user
    },
    getHost: state => {
        return state.host
    },
    getSending: state =>{
        return state.sending
    },
    getArbol: state =>{
        return state.arbol
    },
    getSucess: state => {
        return state.sucess
    },
    getUsersList(){
        /*let us = await idb.getUsers()
        console.log(us)
        return us.map(el => {return el.user})*/
        return []
    },

    getHostList(){
        /*var aux = Object.keys(servers)
        var result = []
        aux.forEach(ele => {
            result.push(servers[ele])
        })
        return result*/
        return []
    },
    /*getCarsRuta: state => unidad =>{
        if(state.carsRuta.hasOwnProperty(unidad)){
            return state.carsRuta[unidad]
        }else{
            datos.unidades[unidad]= "SIN RUTA"
            return state.carsRuta[unidad]
        }
    }*/
}

const mutations = {
    setKey(state, key){
        state.key = key
    },
    setUser(state, ojet){
        //await idb.addUser({user:ojet})
        //jdb.writeUser(ojet)
        state.user=ojet.user
    },
    setHost(state, host){
        /*var aux = Object.keys(servers)
        var exist = false
        for (const key in aux) {
            if(servers[key]==host){
                exist=true
                break
            }
        }
        if(!exist){

        }*/
        state.host=host
    },
    setSending(state, sending){
        state.sending= sending
    },
    setSucess(state, sucess){
        state.sucess = sucess
    },
    setArbol(state, arbol){
        state.arbol= arbol
    }
}

const actions = {
    async log({commit, dispatch, rootState},form){
        commit('setSending', true)
        var verificado = await dispatch('verify',form)
        if(!verificado){
            alert('Error al logear')
        }else{
            commit('setUser', form.user)
            commit('setHost', form.server)
            var grupos = await dispatch('pedirDatos','groups')
            var cars = await dispatch('pedirDatos','devices')
            rootState.carros.carros = cars.data.data
            rootState.carros.arboles = grupos.data.data
            if(grupos!=undefined & cars!=undefined){
                commit('setArbol', await dispatch('obtenerArbol',{
                     raiz:grupos.data.data[0].groupid, 
                     grup: grupos.data.data, 
                     cars: cars.data.data}))
                commit('setSucess', true)
            }
        }
        commit('setSending', false)
        
    },
    async genArbol({dispatch}, variables){
        var result = []
        var hijos = variables.grup.filter(item => item.groupfatherid==variables.padre)
        for (var key in hijos) {
            var ob={
                name: hijos[key].groupname,
                id: hijos[key].groupid,
                hijos: await dispatch('genArbol',{padre: hijos[key].groupid, grup: variables.grup, cars: variables.cars}),
                carros: variables.cars.filter(car => car.groupid==hijos[key].groupid)
            }
            result.push(ob)
        }
        return result
    },

    async obtenerArbol({dispatch}, variables){
        var arbolito = {}
        Object.defineProperties(arbolito,{
            id:{
                value: variables.grup[0].groupid,
                writable: true
            },
            name: {
                value: variables.grup[0].groupname,
                writable: true
            },
            hijos: {
                value: await dispatch('genArbol',{padre: variables.grup[0].groupid, grup: variables.grup, cars: variables.cars}),
                writable: true
            },
            carros: {
                value: variables.cars.filter(item => item.groupid==variables.grup[0].groupid),
                writable: true
            },
        })
        return arbolito
    },

    async pedirDatos({state},arbol){
        try {
            const response = await axios.get('http://'+state.host+':12056/api/v1/basic/'+arbol+'?key='+state.key)
            return response
        } catch (error) {
            alert(error)
        }
    },
    async verify({commit},form ){
        var exito
        try {
            const response =await axios.get('http://'+form.server+':12056/api/v1/basic/key?username='+form.user+'&password='+form.password)
            
            commit('setKey', response.data.data.key)
            exito= true
        } catch (error) {
            exito = false
        }
        return exito
    },

}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}