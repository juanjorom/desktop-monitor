const state ={
    carsSelected: []
}


const getters = {
    getCarsSelected: state =>{
        return state.carsSelected
    }

}

const mutations = {
    addCar(state, car){
        state.carsSelected.push(car)
        state.carsSelected.sort()
    },
    popCar(state, index){
        state.carsSelected.splice(index, 1)
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