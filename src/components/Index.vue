<template>
    <div class="page-container">
        <md-app md-mopde="reveal">
            <md-app-toolbar class="md-primary">
                <div class="md-toolbar-row">
                        <md-button class="md-icon-button" @click="menuVisible=!menuVisible">
                            <md-icon>menu</md-icon>
                        </md-button>
                        <span class="md-title">Bienvenido {{getUser}}</span>
                </div>
            </md-app-toolbar>
            <md-app-drawer :md-active.sync="menuVisible">
                <md-toolbar class="md-trasnparent" md-elevation="0">
                    Arboles
                </md-toolbar>
                <div class="list">
                    <md-list>
                        <arbolitem :arbol="getArbol" @select="showData"></arbolitem>
                    </md-list>
                </div>

            </md-app-drawer>
            <md-app-content class="contenedor-app">
                <md-tabs class="md-primary">
                        <md-tab id="recorrido" md-label="Recorrido">
                            <md-progress-spinner v-if="loading" md-mode="indeterminate" :md-size="400" :md-stroke="15"></md-progress-spinner>
                            <div v-else>
                                <report-recorrido >
                                </report-recorrido>
                            </div>
                        </md-tab>
                        <md-tab id="geocercas" md-label="Geocercas"></md-tab>
                        <md-tab id="conteo" md-label="Conteo"></md-tab>
                    </md-tabs>
            </md-app-content>
        </md-app>
    </div>
</template>

<script>
import arbolitem from './Arbolitem';
import reportRecorrido from './ReportRecorrido'
import { mapGetters } from 'vuex';

export default {
    name: 'index',
    data: ()=>({
        cars: [],
        loading: false,
        menuVisible: false
    }),
    
    computed: {
        ...mapGetters('logdata',[
            'getArbol',
            'getHost',
            'getKey',
            'getUser'
        ])
    },
    components: {
        arbolitem,
        reportRecorrido
    },
    methods:{
        /*async postToLast(key, cars, host){
            var ids = []
            for (const i in cars) {
                ids.push(cars[i].deviceid)
            }
            var respond=null
            if(cars.length>0){
                var llave = await axios.get('http://'+host+':12056/api/v1/basic/key?username=SOPORTE&password=admin1')
                
                respond = await axios.post('http://'+host+':12056/api/v1/basic/gps/last',{
                    key: key,
                    terid: ids,
                })
            }
            return respond.data
        },

        async showData(cars){
            this.loading=true
            
            this.cars= cars
            var datos = await this.postToLast(this.tok, this.cars, this.host)
            console.log(datos);
            this.loading=false
        }*/
    }
}
</script>

<style lang="scss" scoped>
    .md-app {
        max-height: 100%;
        border: 1px solid rgba(#000, .12);
    }

    .contenedor-app {
        height: 500px;
        max-height: 100%;
    }

    .md-drawer {
        width: 350px;
        max-width: calc(100vw - 200px);
    }
    
</style>