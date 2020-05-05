<template>
  <v-app>
    <nav>
      <v-app-bar app dark color="purple">
        <v-toolbar-title class="headline text-uppercase"
          >Store Demo</v-toolbar-title
        >
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text to="/" exact>Login</v-btn>
          <v-btn text to="/register">Register</v-btn>
          <v-btn text to="/products">Products</v-btn>
          <v-btn text @click="handleLogout">Logout</v-btn>
        </v-toolbar-items>
      </v-app-bar>
    </nav>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
  import router from './router/index.js';
  import axios from 'axios';
  export default {
    name: "App",
    data() {
      return {
      };
    },
    methods: {
      handleLogout() {
        const url ='https://test-api.updivision.work/api/logout';
        let token = JSON.parse(localStorage.getItem('token'));
        const AuthStr = `Bearer ${token}`;
        axios.post(url, { headers: { 'Accept': 'application/json', 'Authorization': AuthStr } });
        localStorage.removeItem('token');
        router.push({path:'/'});
      }
    }
  }
</script>
