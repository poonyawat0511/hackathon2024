<script>
export default {
  data: () => ({
    drawer: false,
    name: "cherblood.",
    items: [
      {
        title: "Home",
        icon: "mdi-home",
        to: "/",
      },
      {
        title: "News",
        icon: "mdi-newspaper",
        to: "/data-management",
      },
      {
        title: "Makeup",
        icon: "mdi-brush",
        to: "/makeup",
      },
      {
        title: "Lipstick",
        icon: "mdi-lipstick",
        to: "/lipstick",
      },
    ],
  }),
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },

  },
};
</script>
<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent color="black">
      <v-list density="compact" nav>
        <v-list-item v-for="item in items" :key="item.title" @click="navigateTo(item.to)" :prepend-icon="item.icon"
          :title="item.title" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="white" prominent elevation="0">
      <v-app-bar-nav-icon v-if="!$vuetify.display.mobile" variant="text"
        @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>{{ name }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="navigateTo('/cart')">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-face-recognition</v-icon>
      </v-btn>

      <v-btn icon @click="navigateTo('/profile')">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>