<template>
    <div>
        <div v-for="arbol in cuadros" :key="arbol.groupid" >
            <mapa :datos="arbol" :paradas="paradas(arbol.groupname)"></mapa>
        </div>
    </div>
</template>

<script>
import Mapa from "../components/Mapa";
import { mapGetters } from 'vuex'

export default {
    computed: {
        ...mapGetters({
            cuadros: 'carros/getAllArboles',
            paradas: 'sock/getRuta'
        })
    },
    created(){
        console.log(this.cuadros)

    },
    components: {
        Mapa
    }
}
</script>

<style>

</style>