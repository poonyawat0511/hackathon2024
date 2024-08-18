<template>
  <div>
    <v-card
      class="mb-2 border"
      density="compact"
      :title="article.name"
      :subtitle="article.detail"
      variant="flat"
    >
      <v-img :src="article.articleImage" cover :aspect-ratio="1 / 1"></v-img>
      <v-card-text class="truncate-text">
        {{ article.like }}
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
    article: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
