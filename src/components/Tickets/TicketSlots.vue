<template>

  <v-container class="pb-8 px-0" fluid>

    <!-- <v-container class="py-0">
      <p class="text-danger text-caption mb-2"><i>*Enter time in 24 hour format (hh:mm:ss) format. eg:-5.30 pm should be
          entered as
          17:30:00.</i></p>
      <v-form class=" d-flex align-items-start bg-white p-0 pb-3 flex-wrap ms-0 gap-3">
        <v-text-field label="Start Time (hh:mm:ss) " prepend-inner-icon="mdi-clock-in" density="compact"
          class="slot ms-0" v-model="startTime" hide-details variant="outlined"></v-text-field>
        <v-text-field label="End Time (hh:mm:ss) " prepend-inner-icon="mdi-clock-out" density="compact"
          class="slot ms-0" v-model="startTime" hide-details variant="outlined"></v-text-field>
        <v-text-field label="Capacity" prepend-inner-icon="mdi-clock-out" density="compact" class="slot ms-0"
          v-model="startTime" hide-details variant="outlined"></v-text-field>
        <v-btn size="large"
          style="background-color: #2C7721 !important; color: white !important; text-transform: capitalize;"
          @click="addSlot" :disabled="loading" :loading="loading"> +
          Add Slot </v-btn>
      </v-form>
    </v-container> -->
    <v-dialog v-model="dialog" max-width="500px">
      <template v-slot:activator="{ props }">
        <div class="d-flex justify-content-end">
          <v-btn color="#2C7721" size="large" v-bind="props" class="text-capitalize mb-3"
          style="font-size: 16px; font-weight: 600;"> + Add
          Slot
        </v-btn>
        </div>

      </template>
      <v-card style="width: 500px; height:auto; border-radius: 15px;">
        <v-card-title class="d-flex justify-content-between px-4" style="background-color: #216D17; color: #FFFFFF;">
          <h4>{{formTitle}}</h4>
          <v-icon @click="close" class="mdi mdi-window-close"></v-icon>
        </v-card-title>
        <v-card-subtitle class="text-danger text-center my-1" v-if="editedIndex === -1">
          <i>*Enter time in 24 hour format (hh:mm:ss) format.</i>
        </v-card-subtitle>
        <v-card-text class="py-0">
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-text-field v-model="editedItem.startTime" label="Time IN (hh:mm:ss)" density="comfortable"
                  class="slot" variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-text-field v-model="editedItem.endTime" label="Time OUT (hh:mm:ss)" density="comfortable"
                  class="slot" variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="py-0">
                <v-text-field v-model="editedItem.capacity" label="Capacity" density="comfortable" class="slot"
                  variant="outlined"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12" class="py-0" v-if="editedIndex !== -1">
                <div class="d-flex gap-2">
                  <label class="my-3">Slot Status</label>
                  <v-switch v-model="editedItem.status" color="primary" hide-details
                    :label="editedItem.status ? 'Active' : 'Inactive'"></v-switch>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mb-4 mx-4">
          <v-btn color="#546E7A" variant="elevated" block rounded="5" style="text-transform: capitalize" elevation="4"
            size="large" @click="editedIndex === -1 ? add() : update()" :disabled="loading" :loading="loading">
            {{editedIndex === -1?'Add':'Update'}}
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

    <v-data-table :headers="headers" :items="slots"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
      <template v-slot:item='{ item, index }'>
        <tr style="background-color:#FCFDF6; color:black; ">
          <td class="text-center">{{ index + 1 }}</td>
          <td class="text-center">{{ formatTime(item.startTime) }}</td>
          <td class="text-center">{{ formatTime(item.endTime) }}</td>
          <td class="text-center">{{ item.capacity }}</td>
          <td class="text-center"><v-chip :color="item.status ? 'green' : 'red'">{{
              item.status?'Active':'Inactive' }}</v-chip></td>
          <td class="text-center">
            <v-icon size="large" color="teal-darken-3" class="me-4" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <!-- <v-icon size="large" color="danger" class="ms-4" @click="deleteItem(item)">
              mdi-trash-can
            </v-icon> -->
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
// import axios from 'axios'
export default {
  data() {

    return {
      message: '',
      loading: false,
      snackbar: false,
      color: '#E8F5E9',
      timeout: 3000,
      dialog: false,
      dialogDelete: false,
      headers: [
        { title: 'Slot No', sortable: false, align: 'center' },
        { title: 'Time In', key: 'startTime', sortable: false, align: 'center' },
        { title: 'Time Out', key: 'endTime', sortable: false, align: 'center' },
        { title: 'No.of Tickets', key: 'capacity', sortable: false, align: 'center' },
        { title: 'Status', key: 'status', sortable: false, align: 'center' },
        { title: 'Edit', key: 'actions', sortable: false, align: 'center' },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Slot' : 'Edit Slot'
    },
    slots() {
      return this.$store.getters.getSlots;
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    // dialogDelete(val) {
    //   val || this.closeDelete()
    // },
  },

  methods: {
    editItem(item) {
      this.editedIndex = this.slots.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    // deleteItem(item) {
    //   this.editedIndex = this.slots.indexOf(item)
    //   this.editedItem = Object.assign({}, item)
    //   this.dialogDelete = true
    // },

    // deleteItemConfirm() {
    //   this.slots.splice(this.editedIndex, 1)
    //   this.closeDelete()
    // },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    // closeDelete() {
    //   this.dialogDelete = false
    //   this.$nextTick(() => {
    //     this.editedItem = Object.assign({}, this.defaultItem)
    //     this.editedIndex = -1
    //   })
    // },
    async getSlot() {
      await this.$store.dispatch('getSlots')
    },
    formatTime(timeString) {
      const [hours, minutes] = timeString.split(':');
      let hoursInt = parseInt(hours, 10);
      const ampm = hoursInt >= 12 ? 'pm' : 'am';
      hoursInt = hoursInt % 12;
      hoursInt = hoursInt ? hoursInt : 12; // Handle midnight (0 hours)
      return `${hoursInt}:${minutes} ${ampm}`;
    },
    async add() {
      this.loading = true;
      try {
        const success = await this.$store.dispatch('addSlot', {
          "startTime": this.editedItem.startTime,
          "spotCapacity": this.editedItem.capacity,
          "status": true,
          "totalCapacity": this.editedItem.capacity,
          "endTime": this.editedItem.endTime,
          "capacity": this.editedItem.capacity
        });
        if (success) {
          this.loading = false;
          this.close();
          this.message = 'Slot added successfully !!';
          this.color = '#C8E6C9'
          this.snackbar = true;
          this.getSlot();
        }
      }
      catch (error) {
        this.loading = false
        this.message = error.message + '!!';
        this.color = '#C62828';
        this.snackbar = true;
      }
    },
    async update() {
      this.loading = true;
      try {
        const success = await this.$store.dispatch('editSlot', { id: this.editedItem.id, data: {
          "startTime": this.editedItem.startTime,
          "spotCapacity": this.editedItem.capacity,
          "status": this.editedItem.status,
          "totalCapacity": this.editedItem.capacity,
          "endTime": this.editedItem.endTime,
          "capacity": this.editedItem.capacity
        }});
        if (success) {
          this.loading = false;
          this.close();
          this.message = 'Slot details updated !!';
          this.color = '#C8E6C9'
          this.snackbar = true;
          this.getSlot();
        }
      }
      catch (error) {
        this.loading = false
        this.message = error.message + '!!';
        this.color = '#C62828';
        this.snackbar = true;
      }
    },
  },
  mounted() {
    this.getSlot();
  }
};
</script>

<style>

/* .slot .v-input__control {
  background-color: #DFE4D7 !important;
} */

.v-table__wrapper>table>thead {
  /* background-color: #236726; */
  color: white;
}
:deep(.slot .v-input__control) {
  /* border-bottom: 2px solid #216D17; */
  /* background-color: #DFE4D7 !important; */
  width: 400px !important;
}
:deep(.slot .v-input--horizontal) {
  width: 400px !important;
}
</style>
