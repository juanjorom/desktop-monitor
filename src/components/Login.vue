<template>
    <div class="md-layout md-alignment-center">
      <form novalidate class="md-layout-item md-gutter" @submit.prevent="validateUser">
          <md-card class="md-layout-item md-size-50 md-small-size-100">
              <md-card-header>
                  <div class="md-title">Bienvenido</div>
              </md-card-header>

              <md-card-content>
                  <div class="md-layout md-glutter">
                      <div class="md-layout-item md-small-size-100">
                          <md-field :class="getValidationClass('server')">
                              <label for="server">Servidor</label>
                              <md-input name="server" id="server" autocomplete="given-server" v-model="form.server" :disabled="sending" />
                              <span class="md-error" v-if="!$v.form.server.required">Por favor ingrese el servidor</span>
                          </md-field>
                          <md-field :class="getValidationClass('user')">
                              <label for="user">Usuario</label>
                              <md-input name="user" id="user" autocomplete="given-user" v-model="form.user" :disabled="sending" />
                              <span class="md-error" v-if="!$v.form.user.required">Por favor ingrese el Usuario</span>
                          </md-field>
                          <md-field :md-toggle-password="false" :class="getValidationClass('password')">
                              <label for="password">Contraseña</label>
                              <md-input name="password" id="password" type="password" v-model="form.password" :disabled="sending" />
                              <span class="md-error" v-if="!$v.form.password.required">Ingresa la contraseña</span>
                          </md-field>
                      </div>
                  </div>
              </md-card-content>

              <md-progress-bar md-mode="indeterminate" v-if="sending" />

              <md-card-actions>
                  <md-button type="submit" class="md-primary" :disabled="sending">Entrar</md-button>
              </md-card-actions>
          </md-card>
      </form>
    </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex'
import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength,
  } from 'vuelidate/lib/validators'

export default {
    name: 'login',
    mixins: [validationMixin],
    data: () =>({
        form: {
            server: null,
            user: null,
            password: null
        },
    }),

    computed: {
        ...mapGetters('logdata',{
            sending: 'getSending'
        })
    },
    validations:{
        form: {
            server: {
                required
            },
            user: {
                required,
                minLength: minLength(4)
            },
            password: {
                required,
                minLength: minLength(5)
            }
        }
    },
    methods: {
        ...mapActions('logdata', [
            'log',
        ]),
        getValidationClass (fieldName){
            const field = this.$v.form[fieldName]

            if (field) {
                return {
                    'md-invalid': field.$invalid && field.$dirty
                }
            }
        },
        validateUser () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                this.log(this.form)
            }
        },

        /*async logUser(){
            this.sending= true
            var logeado = await this.verify(this.form.server, this.form.user, this.form.password)
            if(logeado!=null){
                var grupos= await this.pedirDatos(logeado.data.data.key, this.form.server, "groups")
                var carros= await this.pedirDatos(logeado.data.data.key, this.form.server, "devices")
                this.arbol= await this.obtenerArbol(0, grupos.data.data, carros.data.data)
                if(this.arbol!=null){
                    await this.$emit('logeado', this.arbol, this.key, this.form.user, this.form.server, true)
                    this.sending=false
                }
            }
        },

        async verify(host, user, password){
            try {
                const response =  await axios.get('http://'+host+':12056/api/v1/basic/key?username='+user+'&password='+password)
                this.key = await response.data.data.key
                return response
            } catch (error) {
                alert(error)
            }
        },
        async pedirDatos(llave, host, arbol){
            try {
                const response = await axios.get('http://'+host+':12056/api/v1/basic/'+arbol+'?key='+llave)
                return response
            } catch (error) {
                alert(error)
            }
        },
        organizarHijos(padre, grup, carros){
            var result = []
            var hijos = grup.filter(item => item.groupfatherid==padre)
            for (var key in hijos) {
                var ob={
                    name: hijos[key].groupname,
                    id: hijos[key].groupid,
                    hijos: this.organizarHijos(hijos[key].groupid, grup, carros),
                    carros: carros.filter(car => car.groupid==hijos[key].groupid)
                }
                result.push(ob)
            }
            return result
        },
        obtenerArbol(raiz, grup, carros){
            var arbolito = {}
            for (var key in grup) {
                if(raiz==grup[key].groupfatherid){
                    Object.defineProperties(arbolito,{
                        id:{
                            value: grup[key].groupid,
                            writable: true
                        },
                        name: {
                            value: grup[key].groupname,
                            writable: true
                        },
                        hijos: {
                            value: this.organizarHijos(grup[key].groupid, grup, carros),
                            writable: true
                        },
                        carros: {
                            value: carros.filter(item => item.groupid==grup[key].groupid),
                            writable: true
                        },
                    })
                }
            }
            return arbolito
        }*/
    }
}
</script>

<style>

</style>