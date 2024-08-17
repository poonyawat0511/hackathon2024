<template>
    <v-container>
      <v-card>
        <v-card-title>{{ item.title }}</v-card-title>
        <v-card-subtitle>{{ item.author }}</v-card-subtitle>
        <v-card-text>
          <v-img
            :src="item.cover_image"
            cover
            :aspect-ratio="1 / 1"
            class="mb-3"
          ></v-img>
          <span style="font-weight: 800; font-size: 24px">PRODUCT DETAILS</span><br><br>
          <span>Description</span><br>
          {{ item.description }}
        </v-card-text>
        <v-divider/>
        <v-card-actions>
          <v-btn color="primary">Add to cart</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script>
  export default {
    data() {
      return {
        item: {},
      };
    },
    created() {
      const itemId = this.$route.params.id;
      // Assuming you have a method to fetch the item details by ID
      this.item = this.getItemById(itemId);
    },
    methods: {
      getItemById(id) {
        // This is just a placeholder. You should fetch the item details based on the ID.
        return {
          title: "Skintific Niacinamide Bright Boost Clay Mask Stick 40 g.",
          author: "228.0 Bahts",
          description: "SKINTIFIC Niacinamide Bright Boost Clay Stick Mud Mask...",
          cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        };
      },
    },
  };
  </script>
  