<template>
  <v-container>
    <v-card class="border" varaint="flat" rounded="lg" elevation="0">
      <v-card-title class="d-flex">
        Manage data
        <v-spacer />
        <v-btn
          prepend-icon="mdi-pencil"
          class="mb-2"
          color="primary"
          elevation="0"
          dark
          @click="openDialog()"
        >
          New Item
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-data-table :headers="headers" :items="items" :loading="!loading">
        <template v-slot:item.productImage="{ item }">
          <v-img :src="item.productImage" cover height="125px" width="125px" />
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            class="me-2"
            color="warning"
            size="small"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon size="small" color="error" @click="deleteItem(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card>
    <delete-dialog
      v-model="dialogDelete"
      :editedItem="editedItem"
      @close="closeDelete"
      @delete="deleteItemConfirm"
    />
    <ProductDialog
      v-model="dialog"
      :editedItem="editedItem"
      :formTitle="formTitle"
      @close="close"
      @save="save"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    items: [],
    headers: [
      { title: "Name", key: "name" },
      { title: "Description", key: "description" },
      { title: "Price", key: "price" },
      { title: "Image", key: "productImage" },
      { title: "Rating", key: "rating" },
      { title: "Type", key: "type" },

      { title: "Actions", key: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      description: "",
      price: "",
      productImage: "",
      rating: "",
      type: "",
    },
    defaultItem: {
      name: "",
      description: "",
      price: "",
      productImage: "",
      rating: "",
      type: "",
    },
    loading: true,
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  created() {
    this.fetchItems();
  },

  methods: {
    async fetchItems() {
      try {
        const response = await fetch("http://localhost:8080/api/products/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        this.items = data.data;
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },

    openDialog() {
      this.dialog = true;
    },

    editItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm() {
      const item = this.editedItem;
      try {
        const response = await fetch(
          `http://localhost:8080/api/products/${item.id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        await this.fetchItems();
        this.closeDelete();
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
    },

    async save() {
      const formData = new FormData();

      // Append item data
      formData.append("name", this.editedItem.name);
      formData.append("description", this.editedItem.description);
      formData.append("price", this.editedItem.price);
      formData.append("rating", this.editedItem.rating);
      formData.append("type", this.editedItem.type);

      // Append image if it exists
      if (this.editedItem.image) {
        try {
          const response = await fetch(this.editedItem.image);
          const blob = await response.blob();
          formData.append("productImage", blob, "image.jpg");
        } catch (error) {
          console.error("Error converting base64 to blob:", error);
        }
      }

      try {
        let response;
        if (this.editedIndex === -1) {
          response = await fetch("http://localhost:8080/api/products/", {
            method: "POST",
            body: formData,
          });
        } else {
          // Use PATCH for updates
          response = await fetch(
            `http://localhost:8080/api/products/${this.editedItem.id}`,
            {
              method: "PATCH",
              body: formData,
            }
          );
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
        }
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        });
        await this.fetchItems();
        this.dialog = false;
      } catch (error) {
        console.error("Error saving item:", error);
      }
    },
  },
};
</script>
