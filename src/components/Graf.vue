<template>
  <md-card>
      <md-card-content>
          <vue-c3 :handler="handler"></vue-c3>
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
        const options = ({
            data: {
                columns: [
                    ['leyenda 1',100,200,120],
                    ['leyenda 2', 50, 176,139]
                    ]//this.datos.times
            }
        })
        this.handler.$emit('init',options)
    },
    components: {
        Vuec3
    }
}
</script>

<style>

</style>