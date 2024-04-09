<template>
  <v-container class="w-100 d-flex align-items-start justify- content-between gap-4 bg-white p-0 pb-3">

    <!-- <v-text-field label="Select Employee" prepend-inner-icon="mdi-briefcase-account" density="compact" class="emp"
      v-model="id"></v-text-field> -->
    <v-select label="Select Employee" :items="employees" prepend-inner-icon="mdi-briefcase-account" density="compact"
      class="emp" v-model="id"></v-select>
    <v-text-field label="Password" prepend-inner-icon="mdi-eye" density="compact" class="emp"
      v-model="scanPassword"></v-text-field>
    <v-btn size="large"
      style="background-color: #2C7721 !important; color: white !important; text-transform: capitalize;"
      @click="addScanner"> +
      Add as Scanner </v-btn>
  </v-container>
  <v-spacer></v-spacer>
  <v-spacer></v-spacer>
  <div class="d-flex justify-content-end ">

    <v-text-field v-model="search" label="Search" prepend-inner-icon="mdi-magnify" class="search"
      density="compact"></v-text-field>
  </div>
  <v-data-table :headers="headers" :items="filteredScanner" style="background-color: #f9faf1; color:black; "
    class="mt-3" :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
    <template v-slot:top>
      <v-dialog v-model="dialog" max-width="600px">
        <v-card style="width: 400px; height:auto; border-radius: 15px;" class="pb-5">
          <v-card-title class="d-flex justify-content-between px-4" style="background-color: #216D17; color: #FFFFFF;">
            <h4>Employee Details</h4>
            <v-icon @click="close" class="mdi mdi-window-close"></v-icon>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedItem.employeeId" label="Employee ID" disabled class="scanner"
                    density="comfortable"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="editedItem.name" label="Employee Name" disabled class="scanner"
                    density="comfortable"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="password" label="New Password" class="scanner"
                    density="comfortable" type="password"></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field v-model="newPassword" label="Confirm Password" class="scanner"
                    density="comfortable"></v-text-field>
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
      <!-- </v-toolbar> -->
    </template>
    <template v-slot:item='{ item}'>
      <tr style="background-color: #FCFDF6; color:black;">
        <td>{{ item.employeeId }}</td>
        <td><img :src='item.image' @error="setFallbackImage" alt="employee" style="border-radius: 50%; height: 50px;" />
        </td>
        <td>{{ item.name }}</td>
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
    dialogDelete: false,
    search: '',
    scanPassword: '',
    id: '',
    visible: false,
    password: '',
    newPassword: '',
    image: require('@/assets/acc.jpg'),
    headers: [
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
      else { return this.scanner; }
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
    async getScanner() {
      try {
        await this.$store.dispatch('fetchScannerList');
        }
      catch (error) {
        console.error(error.message);
      }
    },
    async addScanner() {
      try {
        await this.$store.dispatch('addScanner', {
          id: this.id,
          password: this.scanPassword
        })
      }
      catch (err) {
        console.error(err.message);
      }
    },
    editItem(item) {
      this.editedIndex = this.scanner.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem(item) {
      this.editedIndex = this.scanner.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.scanner.splice(this.editedIndex, 1)
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
    setFallbackImage(event) {
      event.target.src = this.image;
    },
  },
}
</script>

<style scoped>
.v-table{
    width : 60vw;
}
:deep(.search.v-input) {
  display: flex;
  justify-content: end;
}
:deep(.search .v-input__details, .v-input__details) {
  display: none;
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
}
:deep(.scanner .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  /* margin-bottom: 15px; */
}
:deep(.scanner .v-input__details){
display: none;
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