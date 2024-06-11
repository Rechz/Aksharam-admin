<template>
  <v-container class="pb-0 pt-0 px-0" fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
      <h6 class="text-center">{{ message }}</h6>
    </v-snackbar>
    <v-container class=" d-flex align-items-start bg-white p-0 pb-3 flex-wrap ms-0">
      <v-select label="Select Employee" :items="employees" prepend-inner-icon="mdi-briefcase-account" density="compact"
        class="emp ms-0" v-model="id" single-line hide-details></v-select>
      <v-text-field label="Password" prepend-inner-icon="mdi-eye" density="compact" class="emp" v-model="scanPassword"
        single-line hide-details></v-text-field>
      <v-btn size="large"
        style="background-color: #2C7721 !important; color: white !important; text-transform: capitalize;"
        @click="addScanner" :disabled="loading" :loading="loading"> +
        Add as Scanner </v-btn>
    </v-container>
    <div class="d-flex justify-content-end">
      <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" class="search" single-line
        density="compact" hide-details></v-text-field>
    </div>
    <v-data-table :headers="headers" :items="filteredScanner" style="background-color: #f9faf1; color:black; "
      item-value="id" class="mt-3" :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
      <template v-slot:top>
        <v-dialog v-model="dialog" max-width="600px">
          <v-card style="width: 400px; height:auto; border-radius: 15px;" class="pb-5">
            <v-card-title class="d-flex justify-content-between px-4"
              style="background-color: #216D17; color: #FFFFFF;">
              <h4>Employee Details</h4>
              <v-icon @click="close" class="mdi mdi-window-close"></v-icon>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="12" md="12" class="p-0">
                    <v-text-field v-model="editedItem.employeeId" label="Employee ID" disabled class="scanner"
                      single-line density="comfortable"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="p-0">
                    <v-text-field v-model="editedItem.name" label="Employee Name" disabled class="scanner" single-line
                      density="comfortable"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="p-0">
                    <v-text-field v-model="password" label="New Password" class="scanner" density="comfortable"
                      single-line type="password" :rules="[v => !!v || 'Password is required']"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" class="p-0">
                    <v-text-field v-model="newPassword" label="Confirm Password" class="scanner" single-line
                      density="comfortable"
                      :rules="[v => !!v || 'Confirm Password is required', v => newPassword === password || 'Passwords do not match']"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions class="mx-4">
              <v-btn color="white" block style="background-color: #546E7A; text-transform: capitalize" class="rounded-5"
                elevation="4" size="large" @click="update()">Update</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
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
      </template>
      <template v-slot:item='{ item,index}'>
        <tr style="background-color: #FCFDF6; color:black;">
          <td class="text-center">{{ index + 1 }}</td>
          <td>{{ item.employeeId }}</td>
          <td><img :src='item.image' @error="setFallbackImage" alt="employee"
              style="border-radius: 50%; height: 50px;" />
          </td>
          <td>{{ item.name }}</td>
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
    dialogDelete: false,
    search: '',
    loading: false,
    scanPassword: '',
    id: 'Select Employee',
    visible: false,
    password: '',
    newPassword: '',
    message: '',
    color:'',
    snackbar: false,
    timeout: 3000,
    image: require('@/assets/acc.jpg'),
    headers: [
      { title: 'Sl No.', align: 'center', sortable: false },
      { title: 'Emp Id', sortable: false, align: 'start', key: 'employeeId' },
      { title: 'Image', key: 'image',sortable: false,align:'start' },
      { title: 'Name ', key: 'name', sortable: false, align: 'start' },
      { title: 'Edit / Delete', key: 'actions', align: 'center', sortable: false },
    ],
    editedIndex: -1,
    editedItem: {},
    defaultItem: {},
  }),

  computed: {
    filteredScanner() {
      if (this.search !== '') {
        return this.scanner.filter((item) =>
          item.name.toLowerCase().includes(this.search.toLowerCase()) || item.employeeId.toLowerCase().includes(this.search.toLowerCase())
        );
      }
      else {
        return this.scanner;
      }
    },
    employees() {
      return this.$store.getters.getEmployeeId;
    },
    scanner() {
      return this.$store.getters.getScannerList;
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
  created() {
    this.getScanner();
  },
  methods: {
    setFallbackImage(event) {
      event.target.src = this.image;
    },
    async getScanner() {
      try {
        await this.$store.dispatch('fetchScannerList');
        }
      catch (error) {
        console.error(error.message);
      }
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    editItem(item) {
      this.editedIndex = this.scanner.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    async addScanner() {
      this.loading = true
      try {
        const res = await this.$store.dispatch('addScanner', {
          id: this.id,
          password: this.scanPassword
        });
        if (res) {
          this.message = 'Scanner added successfully !!';
          this.color = '#C8E6C9'
          this.snackbar = true;
          this.loading = false;
          setTimeout(() => { this.getScanner(); }, 1000)
        }
      }
      catch (err) {
        this.message = err.message + '!';
        this.color = '#C62828'
        this.loading = false;
        this.snackbar = true;
      }
    },
    async update() {
      this.loading = true;
      try {
        const success = await this.$store.dispatch('updateScannerPassword', {
          id: this.editedItem.employeeId,
          name: this.editedItem.name,
          password : this.password,
          confirmPassword: this.newPassword
        });
        if (success) {
          this.dialog = false;
          this.loading = false;
          this.message = 'Password updated!!';
          this.color = '#C8E6C9'
          this.snackbar = true;
          setTimeout(() => { this.getScanner(); }, 1000)
        }
      }
      catch (error) {
        this.message = error.message + '!';
        this.color = '#C62828'
        this.loading = false;
        this.snackbar = true;
      }
    },
    deleteItem(item) {
      this.editedIndex = this.scanner.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      try {
        const id = this.editedItem.employeeId;
        const success = await this.$store.dispatch('deleteScanner', id);
        if (success) {
          this.closeDelete();
          this.message = 'Scanner deleted successfully !!';
          this.color = '#C8E6C9'
          this.snackbar = true;
          setTimeout(() => {this.getScanner(); }, 1000)
        }
      }    
      catch (error) {
        this.message = error.message+'!';
        this.color = '#C62828'
        this.snackbar = true;
      }
      this.closeDelete()
    },
    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
  },
}
</script>

<style scoped>
/* .v-table{
    width : 70vw;
} */
:deep(.search.v-input) {
  display: flex;
  justify-content: end;
}
:deep(.search .v-input__control) {
  border-bottom: 2px solid #216D17;
  width: 200px !important;
  height: 40px !important;
  background-color: #DFE4D7 !important;
}
:deep(.emp .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  width: 400px !important;
}
:deep(.scanner .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  /* margin-bottom: 15px; */
}
.emp.v-input--horizontal{
  width: 400px !important;
}
:deep(.v-pagination__list .v-btn--variant-plain) {
  opacity: 1;
  background-color: #216D17;
  color: #FCFDF6;
}
:deep(.v-pagination__list .v-btn--disabled) {
  opacity: 0.4;
}
</style>