<template>


  <div class="d-flex bg-white">
    <v-text-field v-model="newSlot.in" label="Time In" prepend-inner-icon="mdi-clock-time-four" density="compact"
      class="me-2 slot"></v-text-field>
    <v-text-field v-model="newSlot.out" label="Time Out" prepend-inner-icon="mdi-clock-time-four" density="compact"
      class="me-2 slot"></v-text-field>
    <v-text-field v-model="newSlot.ticketno" label="Tickets per slot" prepend-inner-icon="mdi-ticket-confirmation"
      density="compact" class="me-2 slot"></v-text-field>
    <v-btn color="#205f23" class="mb-2 me-2" @click="addSlot" style="text-transform: capitalize;">
      <b>+ Add Slots</b>
    </v-btn>
  </div>
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
export default {
  data: () => ({
    newSlot: {
      in: '',
      out: '',
      ticketno: '',
    },
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
    editedItem: {

      in: 0,
      out: 0,
      ticketno: 0,


    },
    defaultItem: {

      in: 0,
      out: 0,
      ticketno: 0,

    },
  }),

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

  created() {
    this.initialize()
  },

  methods: {



    initialize() {
      this.desserts = [
        {

          in: 159,
          out: 6.0,
          ticketno: 24,

        },
        {

          in: 19,
          out: 6.05,
          ticketno: 2344,

        },
        {

          in: 179,
          out: 35,
          ticketno: 24,

        },
        {

          in: 190,
          out: 65,
          ticketno: 44,

        },
        {

          in: 79,
          out: 698,
          ticketno: 23,

        },
        {

          in: 89988,
          out: 85,
          ticketno: 4,

        },
        {

          in: 19,
          out: 905,
          ticketno: 2388944,

        },


      ]
    },

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

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem)
      } else {
        this.desserts.push(this.editedItem)
      }
      this.close()
    }, addSlot() {
      if (!this.newSlot.in || !this.newSlot.out || !this.newSlot.ticketno) {
        // Show an error message or handle it as needed
        return;
      }

      const newSlot = {
        // You may consider adding a unique key here
        in: this.newSlot.in,
        out: this.newSlot.out,
        ticketno: this.newSlot.ticketno,
      };

      this.desserts.push(newSlot);

      // Optionally, provide feedback for successful slot addition
      // this.$toast.success('Slot added successfully'); // Adjust this line based on your notification mechanism

      // Clear the input fields after adding the slot
      this.newSlot.in = '';
      this.newSlot.out = '';
      this.newSlot.ticketno = '';
    },
  },
}

</script>

<style>
.v-table {
  width: 73vw;
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