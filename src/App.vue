<template>
  <div id="app">
    <div class="page-container md-alignment-center">
      <login v-if="!success"></login>
      <index v-else></index>
    </div>
  </div>
</template>

<script>
import Login from './components/Login'
import Index from './components/Index'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  data: ()=>({
    token: null,
    user: null,
    server: null,
    arbol: null,
  }),

  computed: {
    ...mapGetters('logdata',{
      success: 'getSucess'
    })
  },

  components: {
    Login,
    Index
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
  
}
</style>
