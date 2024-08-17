<template>
  <v-dialog v-model:model-value="internalDialog" max-width="500px">
    <v-card class="border" varaint="flat" rounded="xl">
      <v-card-title>
        <span class="text-h5">{{ formTitle }}</span>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.name"
              variant="outlined"
              density="compact"
              rounded
              hide-details
              single-line
              label="Name"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.description"
              label="Description"
              variant="outlined"
              density="compact"
              rounded
              hide-details
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.price"
              label="Price"
              variant="outlined"
              density="compact"
              rounded
              hide-details
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12" v-if="editedItem.productImage">
            <v-img
              :src="editedItem.productImage"
              v-if="editedItem.productImage"
              cover
              height="125px"
              width="100%"
              class="mx-auto rounded-lg"
            />
          </v-col>
          <v-col cols="12">
            <v-file-input
              label="Upload Image"
              variant="outlined"
              density="compact"
              rounded
              :model-value="null"
              prepend-icon="mdi-camera"
              accept="image/*"
              hide-details
              @change="onFileSelected"
            ></v-file-input>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.rating"
              label="Rating"
              variant="outlined"
              density="compact"
              rounded
              hide-details
              single-line
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="editedItem.type"
              label="Type"
              variant="outlined"
              density="compact"
              rounded
              hide-details
              single-line
            ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider class="mt-n2" />
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue-darken-1" variant="text" @click="close">
          Cancel
        </v-btn>
        <v-btn color="blue-darken-1" variant="text" @click="save"> Save </v-btn>
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
    formTitle: {
      type: String,
      required: true,
    },
  },
  emits: ["update:model-value", "close", "save"],
  data: () => ({
    selectedItem: null,
  }),
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
    save() {
      this.$emit("save");
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.convertFileToBase64(file);
      } else {
        this.editedItem.image = null;
      }
    },
    convertFileToBase64(file) {
      const reader = new FileReader();
      reader.onloadend = (ev) => {
        this.resizeImage(ev.target.result, file.type, (resizedImage) => {
          this.editedItem.image = resizedImage;
        });
      };
      reader.readAsDataURL(file);
    },
    resizeImage(dataUrl, fileType, callback) {
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxWidth = 800;
        const maxHeight = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        const resizedDataUrl = canvas.toDataURL(fileType, 0.7);
        callback(resizedDataUrl);
      };
    },
  },
};
</script>
