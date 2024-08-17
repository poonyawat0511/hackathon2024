<script>
import {
    getPeople,
    createPerson,
    updatePerson,
    deletePerson,
} from "../services/people";
export default {
    data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        title: "ID",
        align: "start",
        sortable: false,
        key: "id",
      },
      { title: "Name", key: "name", align: "start" },
      { title: "Job", key: "job", align: "start" },
      { title: "Description", key: "description", align: "start" },
      { title: "Actions", key: "actions", sortable: false },
    ],
    search: "",
    people: [],
    person: {},
    loading: true,
    totalPeople: 0,
    editedIndex: -1,
    defaultPerson: {
      name: "",
      job: "",
      description: "",
      profile: "",
    },
  }),
  watch: {
  dialog(val) {
    val || this.close();
  },
  dialogDelete(val) {
    val || this.closeDelete();
  },
},
computed: {
  formTitle() {
    return this.editedIndex === -1 ? "New Person" : "Update Person";
  },
},

methods: {
    loadPeople (){
      this.loading = true
      getPeople().then((result) => {
        this.people = result;
        this.totalPeople = this.people.length;
        this.loading = false;
      });
    },
    create() {
      const data = this.person;
      console.log(this.person)
      createPerson(data).then(() => {
        this.loadPeople();
      });
    },
    update() {
      const data = this.person;
      updatePerson(data).then(() => {
        this.loadPeople();
      });
    },

    delete() {
      const data = this.person;
      deletePerson(data).then(() => {
        this.loadPeople();
      });
    },
    editPerson(person) {
      this.editedIndex = this.people.indexOf(person);
      this.person = Object.assign({}, person);
      this.dialog = true;
    },
    deletePerson(person) {
      this.editedIndex = this.people.indexOf(person);
      this.person = Object.assign({}, person);
      this.dialogDelete = true;
    },
    deletePersonConfirm() {
      this.delete();
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.person = Object.assign({}, this.defaultPerson);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.person = Object.assign({}, this.defaultPerson);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        this.update();
      } else {
        this.create();
      }
      this.close();
    }
}
}


</script>

<template>
    <v-container fluid>
      <v-card class="border" variant="flat" rounded="l">
      <v-card-title class="d-flex">
        MY CRUD
        <v-spacer />
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
               New Person
             </v-btn>
           
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="person.name"
                      label="Name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="person.job"
                      label="Job"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4" sm="6">
                    <v-text-field
                      v-model="person.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="close">
                Cancel
              </v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="save">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-p"
              >Are you sure you want to delete this person?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn
                color="blue-darken-1"
                variant="text"
                @click="deletePersonConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="people"
        :items-length="totalPeople"
        :loading="loading"
        :search="search"
        item-value="name"
        @update:options="loadPeople"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon class="me-2" size="small" @click="editPerson(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="small" @click="deletePerson(item)"> mdi-delete   </v-icon>
        </template>
  </v-data-table>
      </v-card>
    </v-container>
  </template>
  