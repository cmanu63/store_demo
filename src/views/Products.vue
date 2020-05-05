<template>
  <v-container grid-list-xl text-xs-center mt-5>
    <v-layout row wrap>
    <v-flex v-for="product of products" :key="product.id" xs3>
      <v-card class="mx-auto" height="450">
        <v-img
          :src="product.picture"
          >
        </v-img>
        <v-card-title class="pb-0">{{product.name}}</v-card-title>
        <v-card-actions>
          <v-card-text class="text--primary">
            ${{product.price}}
          </v-card-text>
          <v-spacer></v-spacer>
          <v-btn
            dark color="purple"
            d-inline
          > Details </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {httpService} from '../services/axiosRequests.js';

  export default {
    name: 'ListProducts',
    data() {
      return {
        product : {
          id: null,
          name: null,
          description: null,
          picture: null,
          price: null,
          dialog: false
        },
        products: [],
        errors: [],
      }
    },
    created() {
      httpService.getProducts()
        .then(response => {
          this.products = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
  }

</script>

<style scoped>
  img {
    height:20%;
    width: 20%;
  }
</style>
