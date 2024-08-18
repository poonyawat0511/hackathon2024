<template>
  <v-container>
    <h1>News Articles</h1>

    <!-- Button to create a new article -->
    <v-btn color="primary" @click="openCreateDialog">Create New Article</v-btn>

    <v-row>
      <v-col v-for="article in articles" :key="article.id" cols="12" md="4">
        <v-card>
          <v-img
            :src="article.articleImage"
            height="200px"
            alt="Article Image"
          ></v-img>
          <v-card-title>{{ article.name }}</v-card-title>
          <v-card-subtitle>Likes: {{ article.like }}</v-card-subtitle>
          <v-card-text>{{ article.detail }}</v-card-text>
          <v-card-actions>
            <v-btn color="warning" @click="openEditDialog(article)">Edit</v-btn>
            <v-btn color="error" @click="deleteArticle(article.id)"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Create/Edit Article Dialog -->
    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="isEditMode">Edit Article</span>
          <span v-else>Create New Article</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <!-- User Field for Manual Entry -->
            <v-text-field
              v-model="form.user"
              label="User"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.name"
              label="Title"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.detail"
              label="Detail"
              required
            ></v-text-field>
            <v-file-input
              v-model="form.articleImage"
              label="Article Image"
              accept="image/*"
            ></v-file-input>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="saveArticle">Save</v-btn>
          <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const articles = ref([]);
const dialog = ref(false);
const isEditMode = ref(false);
const form = ref({
  id: "",
  user: "",
  name: "",
  detail: "",
  articleImage: null,
});

const fetchArticles = async () => {
  try {
    const response = await axios.get("http://localhost:8080/api/articles/");
    articles.value = response.data.data;
  } catch (error) {
    console.error("Error fetching articles:", error);
  }
};

const openCreateDialog = () => {
  isEditMode.value = false;
  form.value = { id: "", user: "", name: "", detail: "", articleImage: null };
  dialog.value = true;
};

const openEditDialog = (article) => {
  isEditMode.value = true;
  form.value = { ...article, articleImage: null };
  dialog.value = true;
};

const closeDialog = () => {
  dialog.value = false;
};

const saveArticle = async () => {
  const formData = new FormData();
  formData.append("user", form.value.user);
  formData.append("name", form.value.name);
  formData.append("detail", form.value.detail);
  if (form.value.articleImage) {
    formData.append("articleImage", form.value.articleImage);
  }

  try {
    if (isEditMode.value) {
      await axios.patch(
        `http://localhost:8080/api/articles/${form.value.id}`,
        formData
      );
    } else {
      await axios.post("http://localhost:8080/api/articles/", formData);
    }
    fetchArticles();
    closeDialog();
  } catch (error) {
    console.error("Error saving article:", error);
  }
};

const deleteArticle = async (id) => {
  try {
    await axios.delete(`http://localhost:8080/api/articles/${id}`);
    fetchArticles();
  } catch (error) {
    console.error("Error deleting article:", error);
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<style scoped>
.v-card {
  margin-bottom: 20px;
}
</style>
