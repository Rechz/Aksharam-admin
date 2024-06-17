<template>
  <v-container class="pb-0 pt-0 px-0" fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
      <div class="text-center">{{ message }}</div>
    </v-snackbar>
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
                  <v-icon v-if="editedIndex === -1" size="240" color="#DFE4D7" class="mdi mdi-account-box"
                    v-bind="props">
                    <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#616161" contained>
                      <v-btn class="overlay" flat>
                        <v-icon size="32" class="mdi mdi-camera-plus"></v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-icon>
                  <v-icon v-if="editedIndex !== -1" size="240" color="#DFE4D7" class="mdi mdi-account-box"
                    v-bind="props">
                    <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#616161" contained>
                      <v-btn class="overlay" flat>
                        <v-icon size="32" class="mdi mdi-pencil" color="white"></v-icon>
                      </v-btn>
                    </v-overlay>
                  </v-icon>
                </v-hover>
              </div>
              <div class="d-flex flex-column w-100 emp-add">
                <v-form ref="form">
                  <div>
                    <v-text-field v-model="editedItem.name" label="Name" :rules="nameRules"
                      prepend-inner-icon="mdi-account-outline" single-line density="comfortable"></v-text-field>
                    <v-text-field v-model="editedItem.phoneNo" label="Phone No" :rules="mobRules"
                      prepend-inner-icon="mdi-phone-outline" density="comfortable" single-line></v-text-field>
                    <v-text-field v-model="editedItem.email" label="Email ID" :rules="emailRules"
                      prepend-inner-icon="mdi-email-outline" density="comfortable" single-line></v-text-field>
                    <v-textarea v-model="editedItem.tempAddress" label="Temporary Address" :rules="addressRules"
                      prepend-inner-icon="mdi-map-marker-outline" density="comfortable" single-line></v-textarea>
                    <v-textarea v-model="editedItem.permAddress" label="Permanent Address" :rules="addressRules"
                      prepend-inner-icon="mdi-home-map-marker" density="comfortable" single-line></v-textarea>
                  </div>
                  <v-card-actions>
                    <v-btn color="white" block :style="{ backgroundColor: editedIndex === -1 ? '#1B5E20' : '#546E7A' }"
                      style="text-transform: capitalize" class="rounded-5" elevation="4"
                      @click="editedIndex === -1 ? add() : update()" :disabled="loading" :loading="loading">{{
                      formButton
                      }}</v-btn>
                  </v-card-actions>
                </v-form>
              </div>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-text-field label="Search" v-model="search" prepend-inner-icon="mdi-magnify" class="search mt-5"
        density="compact" single-line></v-text-field>
    </div>
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
          <v-btn block variant="text" class="rounded-4 mb-3" @click="closeDelete">Cancel</v-btn>
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
                  <div class="col-8 d-flex">: <div class="ms-1">
                      <pre style="font-family: 'Arial', sans-serif; font-size: 14px;"
                        class="mb-0">{{ editedItem.tempAddress }}</pre>
                    </div>
                  </div>
                </v-row>
                <v-row class="mb-2 mt-2">
                  <div class="col-4">Permanent Address</div>
                  <div class="col-8 d-flex">: <div class="ms-1">
                      <pre style="font-family: 'Arial', sans-serif; font-size: 14px;"
                        class="mb-0">{{ editedItem.permAddress }}</pre>
                    </div>
                  </div>
                </v-row>
                <v-row class="mb-2">
                  <div class="col-4">Email</div>
                  <div class="col-8">: {{ editedItem.email }}</div>
                </v-row>
              </div>
              <div class="col-4 d-flex justify-content-center align-items-center">
                <v-img src='@/assets/acc.jpg' alt="employee" style="height: 184px;"></v-img>
              </div>
            </div>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
    <v-data-table :headers="headers" :items="filteredEmployees" class="mt-3" item-value="id"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }" v-else>
      <template v-slot:item="{ item, index }">
        <tr style="background-color:#FCFDF6; color:black;">
          <!-- <td class="text-center">{{ index + 1 }}</td> -->
          <td class="text-center">{{ index + 1 }}</td>
          <td class="">{{ item.employeeId }}</td>
          <td class=""><v-img src="@/assets/acc.jpg" alt="employee"
              style="border-radius: 50%; height: 50px; width: 50px;"></v-img>
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
  </v-container>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    detailsDialog: false,
    dialogDelete: false,
    isHovered: false,
    search: '',
    message: '',
    loading: false,
    snackbar: false,
    skeleton: true,
    color: '#E8F5E9',
    timeout: 3000,
    image: require('@/assets/acc.jpg'),
    nameRules: [
      value => !!value || 'Name is required.',
      value => /^[^\s\W]/.test(value) || 'Name should not start with a special character.',
      value => /^\D+$/.test(value) || 'Name should not contain digits.',
      value => (value?.length >= 3) || 'Name must contain at least 3 characters.',
      value => !/[^a-zA-Z\s.]/g.test(value) || 'Name should not contain special characters',
    ],
    mobRules: [
      value => !!value || 'Mobile is required.',
      value => /^\d+$/.test(value) || 'Only digits allowed.',
      value => (value?.length === 10) || 'Enter a valid number.',
    ],
    emailRules: [
      value => !!value || 'E-mail is required.',
      value => /.+@.+\..+/.test(value) || 'E-mail must be valid.',
    ],
    addressRules: [
      value => !!value || 'Address is required.',
      value => (value?.length >= 3) || 'Address must contain at least 3 characters.',
    ],
    headers: [
      { title: 'Sl No.', align: 'center', sortable: false },
      { title: 'Emp Id', align: 'start', key: 'employeeId', sortable: false },
      { title: 'Image', align: 'start', key: 'image', sortable: false },
      { title: 'Name', align: 'start', key: 'name', sortable: false },
      { title: 'Phone No.', align: 'start', key: 'phoneNo', sortable: false },
      { title: 'Details', align: 'center' },
      { title: 'Edit / Delete', align: 'center' },
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Employee' : 'Edit Employee';
    },
    formButton() {
      return this.editedIndex === -1 ? 'Add' : 'Update';
    },
    filteredEmployees() {
      if (this.search !== '') {
        return this.employees.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) || 
          item.employeeId.toLowerCase().includes(this.search.toLowerCase())
        );
      } else {
        return this.employees;
      }
    },
    employees() {
      return this.$store.getters.getAllEmployees;
    }
  },
  
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.getDetails();
    this.getAllDetails();
  },

  methods: {
    setFallbackImage(event) {
      event.target.src = this.image;
    },
    async getAllDetails() {
      try {
        const res = await this.$store.dispatch('fetchAllEmployees');
        if (res) {
          this.skeleton = false;
        }
      } catch (error) {
        console.error(error.message);
      }
    },
    async getDetails() {
      try {
        await this.$store.dispatch('fetchEmployees');
      } catch (error) {
        console.error(error.message);
      }
    },
    showDetails(item) {
      this.editedItem = Object.assign({}, item);
      this.detailsDialog = true;
    },
    closeDetails() {
      this.detailsDialog = false;
    },
    deleteItem(item) {
      this.editedIndex = this.employees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },
    async deleteItemConfirm() {
      this.loading = true;
      try {
        const id = this.editedItem.employeeId;
        const success = await this.$store.dispatch('deleteEmployee', id);
        if (success) {
          this.loading = false;
          this.message = 'Employee deleted successfully !!';
          this.color = '#C8E6C9';
          this.closeDelete();
          this.snackbar = true;
          setTimeout(() => { 
            this.getAllDetails(); 
            this.getDetails(); 
          }, 1000);
        }
      } catch (error) {
        this.message = error.message + '!!';
        this.color = '#C62828';
        this.loading = false;
        this.snackbar = true;
      }
    },
    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
    editItem(item) {
      this.editedIndex = this.employees.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    async add() {
      if (this.$refs.form && typeof this.$refs.form.validate === 'function') {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
      this.loading = true;
      try {
        const success = await this.$store.dispatch('addEmployees', {
          email: this.editedItem.email,
          name: this.editedItem.name,
          mobile: this.editedItem.phoneNo,
          temporary: this.editedItem.tempAddress,
          permanent: this.editedItem.permAddress,
          photo: "photo",
        });
        if (success) {
          this.loading = false;
          this.close();
          this.message = 'Employee added successfully !!';
          this.color = '#C8E6C9';
          this.snackbar = true;
          setTimeout(() => { 
            this.getAllDetails(); 
            this.getDetails(); 
          }, 1000);
        }
      } catch (error) {
        this.loading = false;
        this.message = error.message + '!!';
        this.color = '#C62828';
        this.snackbar = true;
      }
    }
  }
    },
    async update() {
      if (this.$refs.form && typeof this.$refs.form.validate === 'function') {
        const { valid } = await this.$refs.form.validate();
        if (valid) {
          this.loading = true;
          try {
            const success = await this.$store.dispatch('editEmployees', {
              id: this.editedItem.employeeId,
              email: this.editedItem.email,
              name: this.editedItem.name,
              mobile: this.editedItem.phoneNo,
              temporary: this.editedItem.tempAddress,
              permanent: this.editedItem.permAddress,
              photo: "photo",
            });
            if (success) {
              this.loading = false;
              this.close();
              this.message = 'Employee details updated !!';
              this.color = '#C8E6C9';
              this.snackbar = true;
              setTimeout(() => { 
                this.getAllDetails(); 
                this.getDetails(); 
              }, 1000);
            }
          } catch (error) {
            this.loading = false;
            this.message = error.message + '!!';
            this.color = '#C62828';
            this.snackbar = true;
          }
        }
      } else {
        console.error('Form is not defined or validate method is missing');
      }
    },
    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>




<style scoped>
/* .v-table {
  width: 76vw;
} */
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