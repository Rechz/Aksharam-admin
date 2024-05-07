<template>
  <v-container>
    <v-row align="center">
      <v-col cols="3">
        <v-select v-model="selectedHour" :items="hours" label="Hour" outlined></v-select>
      </v-col>
      <v-col cols="1" class="text-center">
        <span>:</span>
      </v-col>
      <v-col cols="3">
        <v-select v-model="selectedMinute" :items="minutes" label="Minute" outlined></v-select>
      </v-col>
    </v-row>
  </v-container>
  
  <v-data-table :headers="headers" :items="desserts" :sort-by="[{ key: 'calories', order: 'asc' }]"
    style="background-color:#f9faf1;">
    <template v-slot:top>
      <v-toolbar flat style="background-color: white; height: 20px;">


        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.in" label="Time IN"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.out" label="Time OUT"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field v-model="editedItem.ticketno" label="No. of Tickets"></v-text-field>
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
        <v-dialog v-model="dialogDelete" width="420px" height="300px">
          <v-card class="rounded-4 pb-4">
            <v-card-title style="background-color: #BA1A1A;" class="mb-2 text-white text-center">Delete
              Slot?</v-card-title>
            <v-icon color="red-accent-4" size="54" class="align-self-center mt-2">mdi-trash-can</v-icon>
            <v-card-text lass="text-center">Are you sure you want to delete this slot?</v-card-text>
            <v-card-actions style="display: block;">

              <v-btn color="black" block class=" rounded-4 text-white" style="background-color: #BA1A1A; "
                @click="deleteItemConfirm">Delete</v-btn>
              <v-btn color="black" block variant="text rounded-4" @click="closeDelete">Cancel</v-btn>
              <v-spacer></v-spacer>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </v-toolbar>
    </template>
    <template v-slot:item='{ item, index }'>
      <tr style="background-color:#f9faf1; color:black; ">
        <td class="text-center">{{ index + 1 }}</td>

        <td class="text-center">{{ item.in }}</td>
        <td class="text-center">{{ item.out }}</td>
        <td class="text-center">{{ item.ticketno }}</td>

        <td class="text-center">
          <v-icon size="large" color="teal-darken-3" class="me-4" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon size="large" color="danger" class="ms-4" @click="deleteItem(item)">
            mdi-trash-can
          </v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>
<script>
import axios from 'axios'
export default {
  data() {

    return {
      selectedHour: null,
      selectedMinute: null,
      hours: Array.from({ length: 24 }, (_, i) => `${i}`.padStart(2, '0')),
      minutes: ['00', '15', '30', '45'],
      dialog: false,
      dialogDelete: false,
      isHovered: false,
      headers: [
        { title: 'Slot No', key: 'serial no', sortable: false, align: 'center' },
        { title: 'Time In', key: 'in', sortable: false, align: 'center' },
        { title: 'Time Out', key: 'out', sortable: false, align: 'center' },
        { title: 'No.of Tickets', key: 'ticketno', sortable: false, align: 'center' },

        { title: 'Edit / Delete', key: 'actions', sortable: false, align: 'center' },
      ],
      desserts: [],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },



  methods: {
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async getSlot() {
      const response = await axios.get(`this.$store.getters.getUrl/api/stime/getSlot`)
      if (response.status === 200) {
        console.log(response.data)
      }
    }
  }
};
</script>

<style>
.v-table {
  width: 76vw;
}

.hover-red:hover {
  background-color: #b71c1c !important;
  /* Change this to the desired hover color */
  color: white !important;
  /* Change this to the desired text color */
}

.slot .v-input__control {
  background-color: #DFE4D7 !important;
}

/* .v-data-table-footer{
    background-color: white !important;
  } */
.v-table__wrapper>table>thead {
  background-color: #236726;
  color: white;
}
</style>
style="background-color: #1B5E20; color:white"