<template>
  <md-card>
      <md-card-content class="unico">
          <span>{{datos.nombre}}</span>
          <vuec3 :handler="handler"></vuec3>
      </md-card-content>
  </md-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Vue from 'vue'
import Vuec3 from 'vue-c3'
export default {
    name: 'graf',
    props: {
        datos: Object
    },
    computed: {
        options(){
            return {
                data: {
                    labels: true,
                    columns: this.datos.times,
                    type: 'line'
                },
                axis: {
                    x: {
                        type: "category",
                        categories: this.datos.ruta
                    }
                },
                line: {
                    connectNull: true
                }
            }
        }
    },
    data() {
        return {
            handler: new Vue()
        }
    },
    methods: {
        ...mapActions('sock',{
            addInfo: 'actualizar'
        })
    },
    mounted(){
        //this.socket.on('sub_alarm', data => this.addInfo(data))
        //this.datos.times
        this.handler.$emit('init',this.options)
    },
    components: {
        Vuec3
    }
}
</script>

<style>

</style>