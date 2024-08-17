<!-- <script>
export default {
  data: () => ({
    items: [
      {
        title: "Skintific Niacinamide Bright Boost Clay Mask Stick 40 g.",
        author: "228.0 Bahts",
        description: "SKINTIFIC Niacinamide Bright Boost Clay Stick Mud Mask in the form of sticks that help to improve skin clarity with ingredients like Niacinamide, Himalayan salt and tranexamic acid to help improve skin clarity and evenness. In combination with products that brighten and restore evenness to the skin.",
        cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      {
        title: "Title 2",
        author: "author 2",
        description: "Description 2",
        cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      {
        title: "Title 3",
        author: "author 3",
        description: "Description 3",
        cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      {
        title: "Title 4",
        author: "author 4",
        description: "Description 4",
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
  <v-container>
    <v-toolbar color="transparent">
      <v-toolbar-title style="font-weight: 800;"> Recommended </v-toolbar-title>
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
        md="4"
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
        <span >Description</span><br>
        {{ selectedItem.description }}
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="dialog = false">Add to cart</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
  <v-footer
    class="text-center d-flex flex-column" color="black"
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
</template> -->
<template>
  <v-toolbar color="transparent">
  <v-toolbar-title style="font-weight: 800;"> Recommended For You</v-toolbar-title>
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
<v-carousel
    height="300"
    show-arrows="hover"
    cycle
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <div class="d-flex fill-height justify-center align-center">
          <div class="text-h2">
            {{ slide }} Slide
          </div>
        </div>
      </v-sheet>
    </v-carousel-item>
</v-carousel>

<v-app>
<v-container fill-height fluid class="d-flex flex-column">
  <!-- Main Content -->
  <v-main class="flex-grow-1">
    <h1>Article</h1><br>
    <v-row dense>
      <v-col
        cols="12"
        md="4"
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
        <span >Description</span><br>
        {{ selectedItem.description }}
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-spacer/>
        <v-btn color="primary" @click="dialog = false">Add to cart</v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-main>
  
  <!-- Footer -->
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
</v-container>
</v-app>
</template>

<script setup>
  const colors = [
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
  ]
  const slides = [
    'First',
    'Second',
    'Third',
    'Fourth',
    'Fifth',
  ]
</script>

<script>
  export default {
    data () {
      return {
        colors: [
          'indigo',
          'warning',
          'pink darken-2',
          'red lighten-1',
          'deep-purple accent-4',
        ],
        slides: [
          'First',
          'Second',
          'Third',
          'Fourth',
          'Fifth',
        ],
      }
    },
    data: () => ({
    items: [
      {
        title: "Skintific Niacinamide Bright Boost Clay Mask Stick 40 g.",
        author: "228.0 Bahts",
        description: "SKINTIFIC Niacinamide Bright Boost Clay Stick Mud Mask in the form of sticks that help to improve skin clarity with ingredients like Niacinamide, Himalayan salt and tranexamic acid to help improve skin clarity and evenness. In combination with products that brighten and restore evenness to the skin.",
        cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      {
        title: "Title 2",
        author: "author 2",
        description: "Description 2",
        cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      {
        title: "Title 3",
        author: "author 3",
        description: "Description 3",
        cover_image: "https://cdn.vuetifyjs.com/images/cards/sunshine.jpg",
      },
      {
        title: "Title 4",
        author: "author 4",
        description: "Description 4",
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
  }
</script>



