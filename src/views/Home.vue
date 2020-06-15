<template>
    <md-app md-waterfall md-mode="fixed-last">
        <md-app-toolbar class="md-large md-dense md-primary">
            <div class="md-toolbar-row">
                <md-button class="md-icon-button" @click="menuVisible=!menuVisible">
                    <md-icon>menu</md-icon>
                </md-button>
                <span class="md-title">Bienvenido {{getUser}}</span>
            </div>
            <div class="md-toolbar-row">
                <md-tabs class="md-primary" md-async-route>
                    <md-tab id="home" md-label="Inicio" to="real"></md-tab>
                    <md-tab id="detail" md-label="Detalles" to="detail"></md-tab>
                    <md-tab id="list" md-label="Lista"></md-tab>
                </md-tabs>
            </div>
        </md-app-toolbar>
        <md-app-drawer :md-active.sync="menuVisible">
            <md-toolbar class="md-trasnparent" md-elevation="0">
                Arboles
            </md-toolbar>
            <div class="list">
                <md-list>
                    <arbolitem :arbol="arbol" @select="showData"></arbolitem>
                </md-list>
            </div>

        </md-app-drawer>
        <md-app-content class="contenedor-app">
            <router-view></router-view>
        </md-app-content>
    </md-app>
</template>

<script>
import arbolitem from '@/components/Arbolitem'
import { mapGetters, mapMutations } from 'vuex'
import io from 'socket.io-client'
export default {
    data: ()=>({
        loading: false,
        menuVisible: false,
        socket: null
    }),
    
    created(){
        this.iniciar()
    },
    computed: {
        ...mapGetters({
            cars: 'carros/getAllIds',
            key: 'logdata/getKey',
            host: 'logdata/getHost',
            getRuta: 'sock/getRuta',
            getArbol: 'carros/getArbolById',
            arbol: 'logdata/getArbol',
            getUser: 'logdata/getUser',
            getPosition: 'sock/getPosition'
        })
    },
    methods: {
        ...mapMutations({
            llenar: 'sock/addCarPosition',
            actualizar: 'sock/actualizarPosition'
        }),
       iniciar(){
            //console.log(this.getPosition)
            this.socket= io('http://'+this.host+':12056')
            this.socket.emit('sub_alarm',{
                key: this.key,
                didArray: this.cars,
                alarmType: [18]
            })
            this.socket.on('sub_alarm', (data)=>{
                console.log(data)
                this.actualizar(data)
            })
       }
    },
    components: {
        arbolitem,
    }

}
</script>

<style>
    .md-app {
        max-height: 99vh;
        border: 1px solid rgba(#000, .12);
        max-width: 100vw;
        margin-right: 2vw;
        margin-left: 2vw;
    }

    .contenedor-app {
        height: 90vh;
        max-height: 100%;
    }

    .md-drawer {
        width: 350px;
        max-width: calc(100vw - 200px);
    }
</style>