<template>
    <div>
        <md-drawer>
            <md-toolbar md-elevation="0">
                <span class="md-tittle">UNIDADES</span>
            </md-toolbar>
        </md-drawer>
        <md-content>
            <md-datepicker v-model="fechaIni">
            </md-datepicker>
            <md-button @click="pedir">
                Crear
            </md-button>
            <div v-for="elemento in info" :key="elemento">
                <graf :datos="elemento"></graf>
            </div>
        </md-content>
    </div>
</template>

<script>
import { mapGetters, mapMutations, } from 'vuex';
import io from 'socket.io-client'
import graf from './Graf'
import axios from 'axios'

export default {
    name: 'report-recorrido',
    data: () =>{
        return {
            socket: null,
            prevdata: [],
            fechaIni: new Date(),
        }
    },

    computed: {
        ...mapGetters({
            info: 'sock/getInfo',
            cars: 'carros/getCarsSelected',
            key: 'logdata/getKey',
            host: 'logdata/getHost'
        }),

    },
    methods: {
        ...mapMutations({
            anadir: 'sock/addInfo'
        }),
        async pedir(){
            this.anadir(await this.obtenerPrevio(this.host,this.key,this.cars, this.fechaIni))
            this.socket= io('http://'+this.host+':12056')
            console.log(this.info);
            
            this.socket.emit('sub_alarm',{
                key: this.key,
                didArray: this.cars,
                alarmType: [18]
            })
        },
        async obtenerPrevio(host, key, cars, fechaIni){
            var fend = new Date()
            var fehcina= ''+fechaIni.getFullYear()+'-'+(fechaIni.getMonth()+1)+'-'+fechaIni.getDate()
            var fechafin= fehcina +' '+ ('0' + fend.getHours()).slice(-2) +':'+('0'+fend.getMinutes()).slice(-2)+':'+ ('0' + fend.getSeconds()).slice(-2)

            console.log(fechafin);
            
            var request= await axios.post('http://'+host+':12056/api/v1/basic/alarm/detail',{
                key: key,
                terid: cars,
                type: [18],
                starttime: fehcina,
                endtime: fechafin
            })
            var respuest= []
            cars.forEach( element => {
                var filtrado = request.data.data.filter(item => item.terid == element) 
                if(filtrado.length>0){
                    respuest.push(filtrado)
                }
            });
            var organizado = this.organizarRuta(respuest)
            return organizado
        },

        organizarRuta(elementos){
            var conjunt = []
            elementos.forEach(element => {
                var dat= {
                    device: element[0].terid,
                    vueltas: [],
                    times: []
                }
                var paradas = []
                var tiempos = []
                var vuelt = 0
                element.forEach(item => {
                    if(item.content.includes("Enter")){
                        paradas.push(item.content.substring(item.content.indexOf(':')+1,item.content.lastIndexOf(',')))
                        tiempos.push(((item.gpstime.substring(item.gpstime.indexOf(' ')+1)).replace(':','')).replace(/(:\d{2})$/g,''))
                        if(item.content.includes("TERMINAL ATM")){
                            if(tiempos.length>1){
                                vuelt = vuelt+1
                                tiempos.reverse()
                                paradas.reverse()
                                tiempos.unshift('Vuelta '+vuelt)
                                paradas.unshift('paradas')
                                dat.vueltas.push(paradas)
                                dat.times.push(tiempos)
                                paradas= []
                                tiempos= []
                            }
                        }
                    }
                })
                conjunt.push(dat)
            });
            return conjunt
        }
    },
    components:{
        graf
    }
}
</script>

<style>

</style>