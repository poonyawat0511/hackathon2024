<template>
  <v-dialog v-model:model-value="internalDialog" max-width="500px">
    <v-card rounded="xl">
      <v-card-title class="text-h5">
        Are you sure you want to delete this item?
      </v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue-darken-1" variant="text" @click="close()"
          >Cancel</v-btn
        >
        <v-btn color="blue-darken-1" variant="text" @click="deleteItem()"
          >OK</v-btn
        >
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    modelValue: {
      type: Boolean,
      required: true,
    },
    editedItem: {
      type: Object,
      required: true,
    },
  },
  emits: ["update:model-value", "close", "delete"],
  computed: {
    internalDialog: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:model-value", value);
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
    deleteItem() {
      this.$emit("delete");
    },
  },
};
</script>
