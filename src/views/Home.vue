<template>
    <md-app md-mode="reveal">
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
                    <md-tab id="geocercas" md-label="Geocercas">
                        <tabla></tabla>
                    </md-tab>
                    <md-tab id="conteo" md-label="Conteo"></md-tab>
                </md-tabs>
        </md-app-content>
    </md-app>
</template>

<script>
import arbolitem from '@/components/Arbolitem'
import reportRecorrido from '@/components/ReportRecorrido'
import tabla from '@/components/Tabla'
import { mapGetters } from 'vuex'
export default {
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
        reportRecorrido,
        tabla
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