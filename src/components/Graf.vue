<template>
  <md-card>
      <md-card-content>
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
            console.log(this.datos.times)
            return {
                data: {
                    columns: this.datos.times,
                    type: 'line'
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