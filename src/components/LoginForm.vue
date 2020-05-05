<template>
<v-container>
  <v-layout align-center justify-center mt-5>
    <v-flex xs12 sm8 md4 mt-5>
      <v-card class="elevation-12">
        <v-toolbar dark color="purple">
          <v-toolbar-title>Login Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
        >
            <v-text-field
              prepend-icon="email"
              name="email"
              label="Email"
              id="email"
              type="text"
              v-model=" user.email"
              required
              :rules="emailRules"
              error-count="2"
            ></v-text-field>
            <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              id="password"
              type="password"
              v-model="user.password"
              required
              :rules="passwordRules"
              error-count="5"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="purple"
            class="mr-4"
            @click="handleLogin"
          >Login</v-btn>
          <v-btn dark color="purple"
            class="mr-4"
            @click="reset"
          >Reset form</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  <v-layout align-center justify-center mt-5>
    <v-flex xs12 sm8 md4 mt-5>
      <v-card v-if="success && errors.length==0">
        <v-card-text>
          <v-alert type="success">
            You are successfully logged in
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card v-else-if="errors && errors.length">
        <v-card-text>
          <v-alert type="error">
            The login failed
          </v-alert>
          <v-list disabled>
            <v-list-item-group color="red">
              <v-list-item
                v-for="error in errors"
                :key="error.message"
              >
                <v-list-item-content>
                  <v-list-item-title
                    v-text="error"
                  >
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
      </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
  </v-container>
</template>

<script>
  import {httpService} from '../services/axiosRequests.js'

  export default {
    name: 'LoginForm',
    data() {
      return {
        valid: true,
        success: false,
        user: {
          email: null,
          password: null
        },
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v) || 'E-mail must be valid'
        ],
        passwordRules: [
          v => !!v || 'Password is required',
          v => (v && v.length >= 6) || 'Password must have 6+ characters',
          v => /[A-Z]+/.test(v) || 'Must have one uppercase character',
          v => /[a-z]+/.test(v) || 'Must have one lowercase character',
          v => /(?=.*\d)/.test(v) || 'Must have one number'
        ],
        errors: []
      }
    },
    methods: {
      handleLogin() {
        this.valid = this.$refs.form.validate();
        if(this.valid) {
          httpService.login(this.user)
            .then(response => {
              this.success=true;
              let accessToken=response.data["accessToken"];
              localStorage.setItem('token',JSON.stringify(accessToken));
              this.errors=[];
            })
            .catch(e => {
              this.success=false;
              if(e.response.status===401) {
                this.errors.push("These credentials do not match our records.");
              }else if(e.response.status===422) {
                this.errors.push("The given data was invalid.");
              }
            })
        }
      },
      reset() {
        this.$refs.form.reset();
        this.errors=[];
      }
    }
  }
</script>
