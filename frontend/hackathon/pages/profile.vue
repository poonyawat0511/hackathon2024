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

<template>
  <v-app>
    <v-container fill-height fluid class="d-flex flex-column">
      <!-- Main Content -->
      <v-main class="flex-grow-1">
        <!-- Your content goes here -->
      </v-main>
      
      <!-- Footer -->
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
    </v-container>
  </v-app>
</template>
