<template>
  <div class="d-flex justify-content-between">
    <v-dialog v-model="dialog" width="650px">
      <template v-slot:activator="{ props }">
        <v-btn color="#2C7721" size="large" v-bind="props" class="mb-4 text-capitalize"
          style="font-size: 16px; font-weight: 600;"> + Add
          Employee
        </v-btn>
      </template>
      <v-card class="pb-3" style="border-radius: 16px;">
        <v-card-title class="d-flex justify-content-between px-4" style="background-color: #216D17; color: white ;">
          <span class="text-h5 ms-4">{{ formTitle }}</span>
          <v-icon @click="close" size="24" class="mdi mdi-window-close"></v-icon>
        </v-card-title>
        <v-card-text>
          <v-container class="d-flex gap-2">
            <div style="height: 300px; width: 300px;">
              <v-hover v-slot="{ isHovering, props }">
                <v-icon v-if="editedIndex === -1" size="240" color="#DFE4D7" class="mdi mdi-account-box" v-bind="props">
                  <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#616161" contained>
                    <v-btn class="overlay" flat>
                      <v-icon size="32" class="mdi mdi-camera-plus"></v-icon>
                    </v-btn>
                  </v-overlay>
                </v-icon>
                <v-img v-if="editedIndex !== -1" :src="editedItem.image" alt="Upload Image" style="height: 200px;"
                  class="mb-3" v-bind="props">
                  <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#616161" contained>
                    <v-btn class="overlay" flat>
                      <v-icon size="32" class="mdi mdi-pencil" color="white"></v-icon>
                    </v-btn>
                  </v-overlay>
                </v-img>
              </v-hover>
            </div>
            <div class="d-flex flex-column w-100 emp-add">
              <div>
                <v-text-field v-model="editedItem.name" label="Name" prepend-inner-icon="mdi-account-outline"
                  density="comfortable"></v-text-field>
                <v-text-field v-model="editedItem.phoneNo" label="Phone No" prepend-inner-icon="mdi-phone-outline"
                  density="comfortable"></v-text-field>
                <v-text-field v-model="editedItem.email" label="Email ID" prepend-inner-icon="mdi-email-outline"
                  density="comfortable"></v-text-field>
                <v-text-field v-model="editedItem.tempAddress" label="Temporary Address"
                  prepend-inner-icon="mdi-map-marker-outline" density="comfortable"></v-text-field>
                <v-text-field v-model="editedItem.permAddress" label="Permanent Address"
                  prepend-inner-icon="mdi-home-map-marker" density="comfortable"></v-text-field>
              </div>
              <v-card-actions>
                <v-btn color="white" block :style="{ backgroundColor: editedIndex === -1 ? '#1B5E20' : '#546E7A' }"
                  style="text-transform: capitalize" class="rounded-5" elevation="4"
                  @click="editedIndex === -1? add(): update()">{{ formButton }}</v-btn>
              </v-card-actions>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-text-field label="Search" v-model="search" prepend-inner-icon="mdi-magnify" class="search mt-5"
      density="compact"></v-text-field>
  </div>
  <v-data-table :headers="headers" :items="filteredEmployees" class="mt-3"
    :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
    <template v-slot:top>
      <v-dialog v-model="dialogDelete" width="400px">
        <v-card class="rounded-4 pb-4">
          <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
            Employee</v-card-title>
          <v-container class="px-4 d-flex flex-column align-items-center">
            <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
            <v-card-text class="mt-1 text-center">Are you sure you want to delete?</v-card-text>
          </v-container>
          <v-card-actions class="mx-4 d-flex flex-column align-items-center">
            <v-btn block class="rounded-4 text-white mb-3" style="background-color: #BA1A1A;"
              @click="deleteItemConfirm">Delete</v-btn>
            <v-btn block variant="text" class="rounded-4 mb-3" @click=" closeDelete">Cancel</v-btn>

          </v-card-actions>

        </v-card>
      </v-dialog>
      <!-- Add new dialog for displaying details -->
      <v-dialog v-model="detailsDialog" width="400px">
        <v-card style="width: 680px; height:auto; border-radius: 15px;">
          <v-card-title class="d-flex justify-content-between px-4" style="background-color: #216D17; color: #FFFFFF;">
            <h4>Employee Details</h4>
            <v-icon @click="closeDetails" class="mdi mdi-window-close"></v-icon>
          </v-card-title>
          <v-card-text class="mb-0  ms-1 pt-2 pb-4">
            <v-container class="py-0 d-flex flex-column">
              <div class="row emp-details">
                <div class="col-8">
                  <v-row class="mb-2 mt-2">
                    <div class="col-4">Emp ID</div>
                    <div class="col-8">: {{ editedItem.employeeId }}</div>
                  </v-row>
                  <v-row class="mb-2">
                    <div class="col-4">Name</div>
                    <div class="col-8">: {{ editedItem.name }}</div>
                  </v-row>
                  <v-row class="mb-2">
                    <div class="col-4">Contact</div>
                    <div class="col-8">: {{ editedItem.phoneNo }}</div>
                  </v-row>
                  <v-row class="mb-2 mt-2">
                    <div class="col-4">Temporary Address</div>
                    <div class="col-8 d-flex">: <div class="ms-1">{{ editedItem.tempAddress }}</div>
                    </div>
                  </v-row>
                  <v-row class="mb-2 mt-2">
                    <div class="col-4">Permanent Address</div>
                    <div class="col-8 d-flex">: <div class="ms-1">{{ editedItem.permAddress }}</div>
                    </div>
                  </v-row>
                  <v-row class="mb-2">
                    <div class="col-4">Email</div>
                    <div class="col-8">: {{ editedItem.email }}</div>
                  </v-row>
                </div>
                <div class="col-4 d-flex justify-content-center align-items-center">
                  <img :src='editedItem.image' @error="setFallbackImage" alt="employee" style="height: 184px;" />
                </div>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </template>
    <!-- <template v-slot:item="{ item, index }"> -->
    <template v-slot:item="{ item }">
      <tr style="background-color:#FCFDF6; color:black;">
        <!-- <td class="text-center">{{ index + 1 }}</td> -->
        <td class="">{{ item.employeeId }}</td>
        <td class=""><img :src="item.image" @error="setFallbackImage" alt="employee"
            style="border-radius: 50%; height: 50px;" />
        </td>
        <td class="">{{ item.name }}</td>
        <td class="">{{ item.phoneNo }}</td>
        <td class="text-center"><v-icon size="large" class="mdi mdi-eye" color="blue-grey-darken-3"
            @click="showDetails(item)"></v-icon></td>
        <td class="text-center">
          <v-icon size="large" color="teal-darken-3" class="me-4 mdi mdi-pencil" @click="editItem(item)"></v-icon>
          <v-icon size="large" color="danger" class="ms-4 mdi mdi-trash-can" @click="deleteItem(item)"></v-icon>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    overlay: true,
    dates: [],
    detailsDialog: false,
    dialogDelete: false,
    isHovered: false,
    search: '',
    image: require('@/assets/acc.jpg'),
    headers: [
      { title: 'Emp Id', align: 'start', key: 'employeeId', sortable: false },
      { title: 'Image', align: 'start', key: 'image', sortable: false },
      { title: 'Name', align: 'start', key: 'name', sortable: false },
      { title: 'Phone No.', align: 'start', key: 'phoneNo', sortable: false },
      { title: 'Details', align: 'center' },
      { title: 'Edit / Delete', align: 'center'},
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Employee' : 'Edit Employee'
    },
    formButton() {
      return this.editedIndex === -1 ? 'Add' : 'Update'
    },
    filteredEmployees() {
      if (this.search !== '') {
        return this.employees.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) || item.employeeId.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      else { return this.employees; }
    },
    employees() {
      return this.$store.getters.getAllEmployees;
    }
  },
  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },
    created () {
  this.getDetails();
    },
  methods: {
    setFallbackImage(event) {
      event.target.src = this.image;
    },
    async getDetails() {
      try {
        await this.$store.dispatch('fetchAllEmployees');
      }
      catch (error) {  
        console.error(error.message)
      }
    },
    editItem(item) {
      this.editedIndex = this.employees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.employees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    async deleteItemConfirm() {
      // this.employees.splice(this.editedIndex, 1)
      try {
        const id = this.editedItem.employeeId;
        const success= await this.$store.dispatch('deleteEmployee', id)
        if (success) {
          this.closeDelete();
          window.location.reload();
        } 
      }
      catch (error) {
        console.error(error.message)
      }
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
   
    async add() {
      try {
        const success = await this.$store.dispatch('addEmployees', {
          email: this.editedItem.email,
          name: this.editedItem.name,
          mobile: this.editedItem.phoneNo,
          temporary: this.editedItem.tempAddress,
          permanent: this.editedItem.permAddress,
          photo: "photo"
        });
        if (success) {
          this.close();
          window.location.reload();
        }
      }
      catch (error) {
        console.error(error);
      }
    },
    async update() {
      try {
        const success = await this.$store.dispatch('editEmployees', {
          email: this.editedItem.email,
          name: this.editedItem.name,
          mobile: this.editedItem.phoneNo,
          temporary: this.editedItem.tempAddress,
          permanent: this.editedItem.permAddress,
          photo: "photo"
        });
        if (success) {
          this.close();
          window.location.reload();
        }
      }
      catch (error) {
        console.error(error);
      }
      // if (this.editedIndex > -1) {
      //   Object.assign(this.employees[this.editedIndex], this.editedItem)
      // } 
      // this.close()
    },

    showDetails(item) {
      this.editedItem = Object.assign({}, item);
      this.detailsDialog = true;
    },
    closeDetails() {
      this.detailsDialog = false;
    },
  },
}
</script>

<style scoped>
.v-table {
  width: 76vw;
}

:deep(.search .v-input__details) {
  display: none;
}

:deep(.search .v-input__control) {
  border-bottom: 2px solid #216D17;
  width: 200px !important;
  height: 40px !important;
  background-color: #DFE4D7 !important;
}
:deep(.emp-add .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  /* margin-bottom: 15px; */
}
:deep(.v-btn--variant-elevated){
  background: none;
}
:deep(.v-pagination__list .v-btn--variant-plain) {
  opacity: 1;
  background-color: #216D17;
  color: #FCFDF6;
}

:deep(.v-pagination__list .v-btn--disabled) {
  opacity: 0.4;
}
.emp-details div{
  font-size: 14px;
}


:deep(.v-input__prepend,
.v-input__append) {
  display: none;
}


:deep(.search.v-input) {
  display: flex;
  justify-content: end;
}


</style>