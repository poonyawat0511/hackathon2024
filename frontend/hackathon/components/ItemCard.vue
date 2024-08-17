<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => [],
    },
  },
};
</script>
<template>
  <div>
    <v-card
      class="mb-2 border"
      density="compact"
      :prepend-avatar="item.cover_image"
      :title="item.title"
      :subtitle="item.author"
      variant="flat"
    >
      <v-img height="128" :src="item.cover_image" cover></v-img>
      <v-card-text class="truncate-text">
        {{ item.description }}
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" variant="text">View More</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
