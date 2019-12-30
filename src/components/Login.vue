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
                          <md-field :class="getValidationClass('server')" >
                              <label for="server">Servidor</label>
                              <md-input name="server" id="server" autocomplete="given-server" v-model="form.server" :disabled="sending" />
                              <span class="md-error" v-if="!$v.form.server.required">Por favor ingrese el servidor</span>
                          </md-field>
                          <md-field :class="getValidationClass('user')" >
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
                  <md-checkbox v-model="form.guardar">Guardar Contraseña</md-checkbox>
                  <md-button type="submit" class="md-primary" :disabled="sending">Entrar</md-button>
              </md-card-actions>
          </md-card>
      </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { validationMixin } from 'vuelidate'
  import {
    required
  } from 'vuelidate/lib/validators'

export default {
    name: 'login',
    mixins: [validationMixin],
    data: () =>({
        form: {
            server: null,
            user: null,
            password: null,
            guardar: false
        }
    }),

    computed: {
        ...mapGetters('logdata',{
            sending: 'getSending'
            //serverlist: 'getHostList',
            //userlist: 'getUsersList'
        })
    },
    validations:{
        form:{
            server: {
                required
            },
            user: {
                required,
            },
            password: {
                required,
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
        }
    }
}
</script>

<style>

</style>