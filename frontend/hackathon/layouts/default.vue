<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" permanent color="black">
      <v-list density="compact" nav>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="navigateTo(item.to)"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="white" prominent elevation="0">
      <v-app-bar-nav-icon
        v-if="!$vuetify.display.mobile"
        @click.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title>{{ name }}</v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="openCartDilog">
        <v-icon>mdi-cart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-face-recognition</v-icon>
      </v-btn>

      <v-btn icon @click="navigateTo('/profile')">
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </v-app-bar>

    <v-bottom-navigation
      v-model="value"
      color="teal"
      grow
      v-if="$vuetify.display.mobile"
    >
      <v-btn
        v-for="item in items"
        :key="item.title"
        @click="navigateTo(item.to)"
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-dialog v-model="cartDialog" max-width="35rem"
      ><v-card> hello world </v-card></v-dialog
    >
    <v-main>
      <slot></slot>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      cartDialog: false,
      name: "cherblood.",
      value: 1,
      items: [
        { title: "Home", icon: "mdi-home", to: "/" },
        { title: "News", icon: "mdi-newspaper", to: "/news" },
        { title: "Makeup", icon: "mdi-brush", to: "/makeup" },
        { title: "Lipstick", icon: "mdi-lipstick", to: "/lipstick" },
      ],
    };
  },
  methods: {
    navigateTo(page) {
      this.$router.push(page);
    },
    openCartDilog() {
      this.cartDialog = true;
    },
  },
};
</script>
