<template>
  <div>
    <v-card
      class="mb-2 border"
      density="compact"
      :title="item.name"
      :subtitle="item.description"
      variant="flat"
    >
      <v-img :src="item.productImage" cover :aspect-ratio="1 / 1"></v-img>
      <v-card-text class="truncate-text">
        Price: {{ item.price }} Bath
      </v-card-text>
      <v-card-actions>
        <slot name="actions" />
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
