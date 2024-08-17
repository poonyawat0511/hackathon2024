<template>
    <v-container>
      <v-toolbar color="transparent">
        <v-toolbar-title style="font-weight: 800"> Recommended </v-toolbar-title>
        <!-- Search functionality can be added here -->
      </v-toolbar>
      <v-row dense>
        <v-col
          cols="12"
          md="3"
          sm="6"
          v-for="item in filteredItems"
          :key="item.id"
        >
          <item-card :item="item">
            <template #actions>
              <v-btn @click="addToCart(item)">Add Cart</v-btn>
              <v-btn @click="openDialog(item)">See More</v-btn>
            </template>
          </item-card>
        </v-col>
      </v-row>
      <div class="text-center">
        <v-btn variant="text">See more products</v-btn>
      </div>
      <!-- dialog -->
      <v-dialog v-model="dialog" max-width="30rem" elevation="">
        <v-card>
          <v-card-title>{{ selectedItem.name }}</v-card-title>
          <v-card-subtitle>{{ selectedItem.rating }}</v-card-subtitle>
          <v-card-text>
            <v-img
              :src="selectedItem.productImage"
              cover
              :aspect-ratio="1 / 1"
              class="mb-3"
            ></v-img>
            <span style="font-weight: 800; font-size: 24px">PRODUCT DETAILS</span><br /><br />
            <span>Description</span><br />
            {{ selectedItem.description }}
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-spacer />
            <v-btn color="primary" @click="addToCart(selectedItem)">Add to cart</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: [],
        search: "",
        dialog: false,
        selectedItem: null,
        cart: [], // Array to hold items added to the cart
      };
    },
    computed: {
      filteredItems() {
        const searchText = this.search.toLowerCase();
        return this.items.filter(
          (item) =>
            item.name.toLowerCase().includes(searchText) ||
            item.description.toLowerCase().includes(searchText)
        );
      },
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await fetch("http://localhost:8080/api/products/");
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          this.items = data.data;
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      },
      openDialog(item) {
        this.selectedItem = item;
        this.dialog = true;
      },
      addToCart(item) {
        if (!this.cart.find(cartItem => cartItem.id === item.id)) {
          this.cart.push(item);
          console.log("Item added to cart:", item);
        } else {
          console.log("Item is already in the cart");
        }
      },
    },
    created() {
      this.fetchProducts();
    },
  };
  </script>