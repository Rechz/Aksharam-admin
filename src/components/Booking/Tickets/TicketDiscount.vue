<template>
    <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
    <v-container v-else class="pb-8 px-0" fluid>
  <div class="d-flex justify-space-between">
      <v-dialog v-model="dialog" max-width="500px">
        <!-- <template v-slot:activator="{ props }">
          <div class="d-flex justify-content-start">
            <v-btn color="#2C7721" size="large" v-bind="props" class="text-capitalize mb-3"> + Add Discout count</v-btn>
          </div>
        </template> -->
        <v-card style="width: 500px; height:auto; border-radius: 15px;">
          <v-card-title class="d-flex justify-content-between px-4 mb-3 align-items-center"
            style="background-color: #216D17; color: #FFFFFF;">
            <h5 class="mt-2">{{formTitle}}</h5>
            <v-icon @click="close" class="mdi mdi-window-close" size="24"></v-icon>
          </v-card-title>
          <v-card-text class="py-0">
            <v-container class="pb-1">
              <v-row>
                <v-col cols="12" sm="12" md="12" class="py-0">
                  <v-text-field v-model="editedItem.userType" label="UserType" density="comfortable" disabled
                    class="slot" variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="py-0">
                  <v-text-field v-model="editedItem.disCount" label="Discount Count" density="comfortable"
                    class="slot" variant="outlined"></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="12" md="12" class="py-0">
                  <v-text-field v-model="editedItem.totalCapacity" label="Capacity" density="comfortable" class="slot"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12" class="py-0" v-if="editedIndex !== -1">
                  <div class="d-flex gap-2">
                    <label class="my-3">Slot Status</label>
                    <v-switch v-model="editedItem.status" color="primary" hide-details
                      :label="editedItem.status ? 'Active' : 'Inactive'"></v-switch>
                  </div>
                </v-col> -->
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="mb-4 mx-4">
            <v-btn color="#546E7A" variant="elevated" block style="text-transform: capitalize" elevation="4" size="large"
              @click="editedIndex === -1 ? add() : update()" :disabled="loading" :loading="loading" class="mb-2">
              {{editedIndex === -1?'Add':'Update'}}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
      <!-- <v-dialog v-model="dialogDelete" width="420px" height="300px">
        <v-card class="rounded-4 pb-3">
          <v-card-title style="background-color: #BA1A1A;" class="mb-2 text-white text-center fs-5">Delete
            Slot?</v-card-title>
          <v-icon color="red-accent-4" size="24" class="align-self-center mt-2">mdi-trash-can</v-icon>
          <v-card-text lass="text-center">Are you sure you want to delete this slot?</v-card-text>
          <v-card-actions style="display: block;">
  
            <v-btn color="black" block class="text-white" style="background-color: #BA1A1A; "
              @click="deleteItemConfirm">Delete</v-btn>
            <v-btn color="black" block variant="text" @click="closeDelete">Cancel</v-btn>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
  
      <v-data-table :headers="headers" :items="discounts"
        :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
        <template v-slot:item='{ item, index }'>
          <tr style="background-color:#FCFDF6; color:black; ">
            <td class="text-center">{{ index + 1 }}</td>
            <td class="text-center">{{ item.userType }}</td>
            <td class="text-center">{{ item.disCount }}</td>
            <!-- <td class="text-center">{{ item.totalCapacity }}</td>
            <td class="text-center"><v-chip :color="item.status ? 'green' : 'red'">{{
                item.status?'Active':'Inactive' }}</v-chip></td> -->
            <td class="text-center">
              <v-icon size="default" color="teal-darken-3" class="" @click="editItem(item)">
                mdi-pencil
              </v-icon> 
              <!-- <v-icon size="large" color="danger" class="ms-4" @click="deleteItem(item)">
                mdi-trash-can
              </v-icon>  -->
            </td> 
          </tr>
        </template>
      </v-data-table>
    </v-container>
  </template>
  <script>
  import { mapGetters } from 'vuex';
  
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
        skeleton : true,
        dialogDelete: false,
        capDialog:false,
        id:0,
        slotStartTime: "",
        slotEndTime: "",
        totalCapacity: "",
        status: false,
        headers: [
          { title: 'Slot No', sortable: false, align: 'center' },
          { title: 'User Type', key: 'userType', sortable: false, align: 'center' },
          { title: 'Discount Count', key: 'disCount', sortable: false, align: 'center' },
          // { title: 'No.of Tickets', key: 'totalCapacity', sortable: false, align: 'center' },
          // { title: 'Status', key: 'status', sortable: false, align: 'center' },
          { title: 'Edit', key: 'actions', sortable: false, align: 'center' },
        ],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {}
      };
    },
  
    computed: {
      ...mapGetters('booking', ['getAllDiscount']),
      formTitle() {
        return this.editedIndex === -1 ? 'Add Discount Count' : 'Edit Discount Count'
      },
      discounts() {
        return this.getAllDiscount;
      }
    },
  
    watch: {
      dialog(val) {
        val || this.close()
      },
      id(newValue) {
        const selectedSlot = this.slots.find((slot) => slot.id === newValue);
        if (selectedSlot) {
          this.slotStartTime = selectedSlot.slotStartTime;
          this.slotEndTime = selectedSlot.slotEndTime;
          this.totalCapacity = selectedSlot.totalCapacity;
          this.status = selectedSlot.status;
        } else {
          // Reset fields if no matching ID is found
          this.slotStartTime = "";
          this.slotEndTime = "";
          this.totalCapacity = "";
          this.status = false;
        }
      },
      // dialogDelete(val) {
      //   val || this.closeDelete()
      // },
    },
  
    methods: {
      editItem(item) {
        this.editedIndex = this.discounts.indexOf(item)
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
  
      closeCapacity() {
        this.capDialog = false
        // this.$nextTick(() => {
        //   this.editedItem = Object.assign({}, this.defaultItem)
        //   this.editedIndex = -1
        // })
      },
      async getDiscount() {
        try {
          const res = await this.$store.dispatch('booking/fetchAllDiscount');
          if (res) {
            this.skeleton = false;
          }
        }
        catch (error) {
          console.log(error)
        }
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
          const success = await this.$store.dispatch('booking/addDiscountCount', {
            "userType": this.editedItem.userType,
            // "spotCapacity": this.editedItem.totalCapacity,
            // "status": true,
            // "totalCapacity": this.editedItem.totalCapacity,
            "disCount": this.editedItem.disCount,
            // "capacity": this.editedItem.totalCapacity
          });
          if (success) {
            this.loading = false;
            this.close();
            this.message = 'Discount count added successfully !!';
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
        const payload = { id: this.editedItem.id, data: {
           "userType": this.editedItem.userType,
            // "spotCapacity": this.editedItem.totalCapacity,
            // "status": true,
            // "totalCapacity": this.editedItem.totalCapacity,
            "disCount": this.editedItem.disCount,
          }};
        try {
          const success = await this.$store.dispatch('booking/editDiscount',payload);
          if (success) {
            this.loading = false;
            this.close();
            this.message = 'Discount count updated !!';
            this.color = '#C8E6C9'
            this.snackbar = true;
            this.getDiscount();
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
      this.getDiscount();
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
  