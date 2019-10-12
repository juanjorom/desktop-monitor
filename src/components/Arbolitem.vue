<template>
    <md-list-item md-expand :class="clase">
        <md-checkbox v-model="selected" disabled>
            <span class="md-list-item-text">{{arbol.name}}</span>
        </md-checkbox>
        <md-list slot="md-expand">
            <arbolitem v-bind:key="key.id" v-for="key in arbol.hijos" :arbol="key" clase="md-inset" :clear="clear" @select="getCarros"></arbolitem>
            <md-list-item class="md-inset" v-bind:key="car.deviceid" v-for="car in arbol.carros" >
                <md-checkbox v-model="carros" :value="car.deviceid">
                    <span class="md-list-item-text" >{{car.carlicence}}</span>
                </md-checkbox>
            </md-list-item>
        </md-list>
    </md-list-item>
</template>

<script>
import { mapState } from 'vuex'
export default {
    
    name: 'arbolitem',
    props: {
        clase: String,
        arbol: Object,
        clear: Boolean,
    },
    computed:{
        ...mapState({
            carros: state => state.carros.carsSelected
        })
    },
    data: () => ({
        clicked: false,
        selected: false,
    }),

    components: {
        arbolitem: 'arbolitem'
    },
    methods: {
        getCarros(carros){
            this.childCars=carros
        }
    }
}
</script>

<style lang="scss" scoped>
</style>