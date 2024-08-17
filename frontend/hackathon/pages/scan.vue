<template>
    <v-app>
      <v-container fluid class="fill-height d-flex flex-column">
        <v-toolbar color="transparent">
          <v-toolbar-title style="font-weight: 800;"> Scan Your Face </v-toolbar-title>
        </v-toolbar>
        
        <!-- Your content here -->
  
        <v-spacer></v-spacer> <!-- This will push the footer to the bottom -->
      </v-container>
  
      <v-footer class="text-center d-flex flex-column" color="black">
        <div>
          <v-btn
            v-for="icon in icons"
            :key="icon"
            :icon="icon"
            class="mx-4"
            variant="text"
          ></v-btn>
        </div>
  
        <div class="pt-0">
          Group 4
        </div>
        <span>Someone</span><span>Someone</span>
  
        <v-divider></v-divider>
  
        <div>
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </div>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    data: () => ({
      items: [
        {
          title: "Skintific Niacinamide Bright Boost Clay Mask Stick 40 g.",
          author: "228.0 Bahts",
          description: "SKINTIFIC Niacinamide Bright Boost Clay Stick Mud Mask in the form of sticks that help to improve skin clarity with ingredients like Niacinamide, Himalayan salt and tranexamic acid to help improve skin clarity and evenness. In combination with products that brighten and restore evenness to the skin.",
          cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
        },
      ],
      search: "",
      dialog: false,
      selectedItem: null,
      icons: ["mdi-facebook", "mdi-twitter", "mdi-instagram"],
    }),
    computed: {
      filteredItems() {
        return this.items.filter((item) => {
          const searchText = this.search.toLowerCase();
          return (
            item.title.toLowerCase().includes(searchText) ||
            item.author.toLowerCase().includes(searchText)
          );
        });
      },
    },
    methods: {
      openDialog(item) {
        this.selectedItem = item;
        this.dialog = true;
      },
    },
  };
  </script>
  
  <style>
  .fill-height {
    min-height: 100vh;
  }
  </style>
  