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
            host: 'logdata/getHost',
            getRuta: 'sock/getRuta',
            getArbol: 'carros/getArbolById'
        }),

    },
    methods: {
        ...mapMutations({
            anadir: 'sock/addInfo',
            agregar: 'sock/addDatos',
        }),
        darData(data){
            this.agregar(data)
        },
        async pedir(){
            var carritos = []
            this.cars.forEach(it =>{
                carritos.push(it.deviceid)
            })
            this.anadir(await this.obtenerPrevio(this.host,this.key,this.cars, this.fechaIni))
            this.socket= io('http://'+this.host+':12056')
            
            this.socket.on('sub_alarm', (data)=>{
                this.darData(data)
            })
            this.socket.emit('sub_alarm',{
                key: this.key,
                didArray: carritos,
                alarmType: [18]
            })
        },
        async obtenerPrevio(host, key, cars, fechaIni){
            var fend = new Date()
            var fehcina= ''+fechaIni.getFullYear()+'-'+('0'+fechaIni.getMonth()+1).slice(-2)+'-'+('0'+fechaIni.getDate()).slice(-2)
            var fechafin= fehcina +' '+ ('0' + fend.getHours()).slice(-2) +':'+('0'+fend.getMinutes()).slice(-2)+':'+ ('0' + fend.getSeconds()).slice(-2)
            var carritos = []
            cars.forEach(it =>{
                carritos.push(it.deviceid)
            })

            var request= await axios.post('http://'+host+':12056/api/v1/basic/alarm/detail',{
                key: key,
                terid: carritos,
                type: [18],
                starttime: fehcina,
                endtime: fechafin
            })
            var respuest= []
            
            carritos.forEach( element => {
                var filtrado = request.data.data.filter(item => item.terid == element) 
                if(filtrado.length>0){
                    respuest.push(filtrado)
                }
            });
            var organizado = this.organizarRuta(respuest, cars)
            
            return organizado
        },

        organizarRuta(elementos, carros){
            var conjunt = []
            elementos.forEach(element => {
                element.reverse()
                var dat= {
                    device: element[0].terid,
                    vueltas: [],
                    times: []
                }
                var arbol= this.getArbol(dat.device)
                var paradas = []
                var tiempos = []
                var vuelt = 0
                var ruta =  this.getRuta(arbol)
                var llen = Array.from(ruta)
                llen.fill(null)
                element.forEach(item => {
                    if(item.content.includes("Enter")){
                        var lug= (item.content.substring(item.content.indexOf(':')+1,item.content.lastIndexOf(',')))
                        var time =(((item.gpstime.substring(item.gpstime.indexOf(' ')+1)).replace(':','')).replace(/(:\d{2})$/g,''))
                        
                        if(lug=="ATM"){
                            llen[ruta.length-1]=time
                            paradas.push(lug)
                            if(paradas.length>3){
                                vuelt = vuelt+1
                                tiempos.push('Vuelta '+vuelt)
                                paradas.unshift('paradas')
                                dat.vueltas.push(paradas)
                                dat.times.push(tiempos.concat(llen))
                                
                            }
                            llen.fill(null)
                            paradas= []
                            tiempos= []
                        }
                        if(llen[ruta.indexOf(lug)]==null){
                            llen[ruta.indexOf(lug)]=time
                            paradas.push(lug)
                        }
                        
                    }else if(item.content.includes("Exit") && item.content.includes("ATM")){
                        paradas.push(item.content.substring(item.content.indexOf(':')+1,item.content.lastIndexOf(',')))
                        llen[0] = (((item.gpstime.substring(item.gpstime.indexOf(' ')+1)).replace(':','')).replace(/(:\d{2})$/g,''))
                    }
                })
                if(dat.vueltas.length>0){
                    var buscado = carros.findIndex(busc=> busc.deviceid==dat.device)
                    dat.nombre= carros[buscado].carlicence
                    dat.ruta = ruta
                    conjunt.push(dat)
                }
            });
            return conjunt
        },
    },
    components:{
        graf
    }
}
</script>

<style>

</style>