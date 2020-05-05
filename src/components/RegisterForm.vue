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
              prepend-icon="person"
              name="name"
              label="name"
              id="name"
              type="text"
              v-model="user.name"
              required
              :rules="nameRules"
              error-count="2"
            ></v-text-field>
            <v-text-field
              prepend-icon="email"
              name="email"
              label="Email"
              id="email"
              type="text"
              v-model="user.email"
              required
              :rules="emailRules"
              error-count="2"
            ></v-text-field>
            <v-text-field
              prepend-icon="date_range"
              name="startDate"
              label="Education Start Date"
              id="startDate"
              type="date"
              v-model="user.education_start_date"
              required
              :rules="startDateRules"
              error-count="1"
            ></v-text-field>
            <v-text-field
              prepend-icon="date_range"
              name="endDate"
              label="Education End Date"
              id="endDate"
              type="date"
              v-model="user.education_end_date"
              required
              :rules="endDateRules"
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
            <v-text-field
              prepend-icon="lock"
              name="password2"
              label="Confirm Password"
              id="password2"
              type="password"
              v-model="user.password_confirmation"
              required
              :rules="passwordRules2"
              error-count="2"
            ></v-text-field>
            <v-checkbox
              id="terms"
              v-model="user.terms"
              label="I agree with terms and conditions"
              :rules="[v => !!v || 'You must agree to continue!']"
            >
            </v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="purple"
            class="mr-4"
            @click="handleSubmit"
          >Register</v-btn>
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
            Successfully created a new user
          </v-alert>
        </v-card-text>
      </v-card>
      <v-card v-else-if="errors && errors.length">
        <v-card-text>
          <v-alert type="error">
            The new user registration failed
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
  import {httpService} from '../services/axiosRequests.js';
  import router from '../router/index.js';

  export default {
    name: 'RegisterForm',
    data() {
      return {
        valid: true,
        success: false,
        submitted: false,
        user: {
          name: null,
          email: null,
          education_start_date: null,
          education_end_date: null,
          password: null,
          password_confirmation: null,
          terms: false
        },
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length>=2) || 'Name must have 2+ characters'
        ],
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
        startDateRules: [
          v => !!v || 'Education start date is required'
        ],
        endDateRules: [
          v  => !!v || 'Education end date is required',
          v => (v && v  > this.user.education_start_date) || 'Education end date must be greater than education start date'
        ],
        passwordRules2: [
          v => !!v || 'Re-confirm password is required',
          v => (v && v==this.user.password) || "Passwords don't match"
        ],
        errors: []
      }
    },
    methods: {
      handleSubmit() {
        this.valid = this.$refs.form.validate();
        if(this.valid) {
          httpService.register(this.user)
            .then(response => {
              this.success=true; console.log(response.status);
              this.errors=[];
              router.push({path:'/'});
            })
            .catch(e => {
              this.success=false;
              if(e.response.status===422) {
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
