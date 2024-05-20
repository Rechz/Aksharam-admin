<template>

  <v-container class="py-8 px-0" fluid>
    <v-container class="py-0">
      <p class="text-danger text-caption mb-2"><i>*Enter time in 24 hour (hh:mm:ss) format. 5.30 pm should be entered as
          17:30:00.</i></p>
      <v-form class=" d-flex align-items-start bg-white p-0 pb-3 flex-wrap ms-0 gap-3">

        <v-text-field label="Start Time (hh:mm:ss) " prepend-inner-icon="mdi-clock-in" density="compact" class="emp ms-0"
          v-model="startTime" hide-details variant="outlined"></v-text-field>
        <v-text-field label="End Time (hh:mm:ss) " prepend-inner-icon="mdi-clock-out" density="compact" class="emp ms-0"
          v-model="startTime" hide-details variant="outlined"></v-text-field>
        <v-btn size="large"
          style="background-color: #2C7721 !important; color: white !important; text-transform: capitalize;"
          @click="addSlot" :disabled="loading" :loading="loading"> +
          Add Slot </v-btn>
      </v-form>
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
  </v-container>
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
:deep(.emp .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  width: 400px !important;
}
:deep(.emp .v-input--horizontal) {
  width: 400px !important;
}
</style>
style="background-color: #1B5E20; color:white"