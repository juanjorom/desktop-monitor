const state ={
    carsSelected: [],
    arboles: [],
    carros: []
}


const getters = {
    getCarsSelected: state =>{
        return state.carsSelected
    },
    getCarById: state=> id => {
        return state.carros.find(el => el.deviceid==id)
    },
    getCarsbyArbol: state => id =>{
        return state.carros.filter(el => el.groupid==id)
    },
    getArbolById: state => id =>{
        let carro = state.carros.find(el => el.deviceid==id)
        return state.arboles.find(el => el.groupid==carro.groupid).groupname
    },
    getAllIds: state =>{
        return state.carros.map(x => x.deviceid)
    },
    getAllArboles: state =>{
        var ids= state.carros.map(x => x.groupid)
        return state.arboles.filter(x => ids.find(elem => elem == x.groupid))
    }
}

const mutations = {
    addCar(state, car){
        state.carsSelected.push(car)
        state.carsSelected.sort()
    },
    popCar(state, index){
        state.carsSelected.splice(index, 1)
    },
    setCarros(state, carros){
        state.carros = carros
    },
    setArboles(state, arboles){
        state.arboles = arboles
    }
}


const actions ={
    mutCarsSelected({state, commit}, car){
        var index = state.carsSelected.findIndex(item => item==car.deviceid)
        if(index>=0){
            commit('popCar',index)
        }
        else{
            commit('addCar', car.deviceid)
        }
        return state.carsSelected
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}