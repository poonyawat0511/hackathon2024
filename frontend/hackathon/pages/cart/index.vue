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
    snackbar: {
      show: false,
      message: '',
      color: ''
    }
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
    showSnackbar(message, color) {
      this.snackbar.message = message;
      this.snackbar.color = color;
      this.snackbar.show = true;
    },
    handleCheckout() {
      this.showSnackbar('Ordered successfully!', 'green');
      this.dialog = false;
    },
    handleDelete() {
      this.showSnackbar('Deleted successfully!', 'red');
      this.dialog = false;
    }
  }
};
</script>
<template>
    <v-app>
      <v-container fill-height>
        <v-row
          class="fill-height"
          align="center"
          justify="center"
          no-gutters
        >
          <v-col
            cols="12"
            class="d-flex flex-column fill-height"
          >
            <v-toolbar color="transparent">
              <v-toolbar-title style="font-weight: 800;"> My Cart </v-toolbar-title>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                density="compact"
                label="search"
                variant="outlined"
                rounded
                hide-details
                single-line
              />
            </v-toolbar>
            <v-row dense>
              <v-col
                cols="12"
                md="12"
                sm="6"
                v-for="item in filteredItems"
                :key="item.title"
              >
                <item-card :item="item" @click="openDialog(item)" />
              </v-col>
            </v-row>
            <v-dialog v-model="dialog" max-width="30rem" elevation="">
              <v-card>
                <v-card-title>{{ selectedItem.title }}</v-card-title>
                <v-card-subtitle>{{ selectedItem.author }}</v-card-subtitle>
                <v-card-text>
                  <v-img
                    :src="selectedItem.cover_image"
                    cover
                    :aspect-ratio="1 / 1"
                    class="mb-3"
                  ></v-img>
                  <span style="font-weight: 800; font-size: 24px">PRODUCT DETAILS</span><br><br>
                  <span>Description</span><br>
                  {{ selectedItem.description }}
                </v-card-text>
                <v-divider/>
                <v-card-actions>
                  <v-spacer/>
                  <v-btn color="primary" @click="handleCheckout">Checkout</v-btn>
                  <v-btn color="red" @click="handleDelete">Delete</v-btn>
                  <v-spacer/>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
      <v-footer
        class="text-center d-flex flex-column" color="black"
        app
      >
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
  
      <!-- Snackbar -->
      <v-snackbar v-model="snackbar.show" :color="snackbar.color" timeout="3000">
        {{ snackbar.message }}
        <v-btn
          text
          @click="snackbar.show = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </v-app>
  </template>
  