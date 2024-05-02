<template>
  <v-app>

    <div class="d-flex justify-content-between mb-4">
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
              <v-btn block variant="text" class="rounded-4 mb-3" @click="closeDelete">Cancel</v-btn>

            </v-card-actions>

          </v-card>
        </v-dialog>
        <!-- Add new dialog for displaying details -->
        <v-dialog v-model="detailsDialog" width="600px">
          <v-card style="width: 880px; height:650px; border-radius: 15px;">
            <v-card-title class="d-flex justify-content-between px-4"
              style="background-color: #216D17; color: #FFFFFF;">
              <h4>Item Heading</h4>
              <v-icon @click="closeDetails" class="mdi mdi-window-close"></v-icon>
            </v-card-title>
            <v-card-text class="mb-0  ms-1 py-4 px-4">
              <v-container class="py-0 d-flex flex-column">
                <div class="row emp-details">
                  <div class="d-flex">
                    <v-sheet :elevation="2" :height="540" :width="256" border color="#FCFDF6" class="me-2 px-2 py-2">
                      <div class="d-flex justify-content-center align-items-center flex-wrap">
                        <v-img src='@/assets/acc.jpg' alt="employee" class="mb-3"
                          style=" height: 150px; width: 150px;"></v-img>
                        <v-img src='@/assets/Qr.png' alt="employee" style=" height: 150px; width: 150px;"></v-img>
                        <div class="d-flex justify-content-between">
                          <v-btn class="text-none me-5" min-width="50" variant="outlined" rounded>
                            <v-icon class="mdi mdi-content-save-outline" color="green-darken-4"></v-icon>
                          </v-btn>
                          <v-btn class="text-none" color="green-darken-4" min-width="50" rounded>
                            <v-icon class="mdi mdi-printer"></v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-sheet>
                    <v-sheet :elevation="2" :height="540" :width="528" border color="#FCFDF6">
                      <div class="d-flex justify-content-between align-items-center mt-3 mx-3">
                        <h3>Heading</h3>
                        <v-btn class="text-none" color="#546E7A" min-width="100" rounded> Translate </v-btn>
                      </div>
                      <div class="d-flex justify-content-center">
                        <audio controls class="mt-3 mx-3 w-100 ">
                          <source src="horse.ogg" type="audio/ogg">
                          <source src="horse.mp3" type="audio/mpeg">
                          Your browser does not support the audio element.
                        </audio>
                      </div>

                      <p class="desc mt-4 custom-scroll mx-3 text-justify">Lorem ipsum dolor sit, amet consectetur
                        adipisicing elit. Reprehenderit iusto, tenetur qui quaerat vero laboriosam suscipit atque fuga
                        doloribus error magnam deleniti repudiandae iure assumenda itaque a ab expedita pariatur
                        aspernatur quam necessitatibus eveniet id! Ex libero alias non dicta ut voluptate saepe
                        praesentium, quod natus magnam soluta obcaecati inventore error nobis. Totam eligendi voluptatum
                        quae, doloremque aperiam soluta non nisi vitae, distinctio autem dolore vero aspernatur
                        consequuntur consequatur? Totam maiores dicta officia accusantium voluptate eaque ipsum, a sed,
                        numquam neque incidunt ut nulla dolores eligendi perferendis. Facere, delectus commodi quia
                        dicta aspernatur ullam sapiente vitae deserunt perferendis itaque. Illo molestiae dolores
                        deserunt! Incidunt a temporibus explicabo quaerat doloremque molestiae accusamus magni corporis
                        quod nisi provident veritatis, adipisci mollitia fuga doloribus, sint neque asperiores pariatur
                        quia porro quam? Nemo eos voluptatum quibusdam, dolorum, quidem alias accusamus aut illum veniam
                        aliquam eligendi architecto sit odit dignissimos! Alias nesciunt ducimus delectus obcaecati
                        fugit sit accusantium nostrum beatae dignissimos rem, repudiandae culpa perferendis, ipsa
                        mollitia amet maxime, temporibus adipisci! Temporibus reiciendis recusandae eius optio sit
                        animi, amet quasi fuga pariatur, quod fugiat delectus omnis. Impedit architecto harum
                        accusantium rem quos, quisquam aliquam quae ratione hic libero sapiente facere nobis voluptas
                        eveniet beatae error ipsum voluptates ullam vero. Omnis dolore a tempore libero, facilis unde.
                        Recusandae mollitia, dolor tenetur quam iusto maxime amet quis eligendi necessitatibus earum
                        ipsa optio quia corrupti deserunt consequatur nisi, animi quod magnam iure dignissimos
                        repudiandae illo ab odit beatae? Aliquam sit, ducimus eos mollitia assumenda non distinctio nisi
                        suscipit! Sunt optio nesciunt quo, quas delectus sit dolore dicta natus, ad suscipit saepe
                        beatae, voluptatem ipsa tempore provident magnam nobis. Architecto voluptates dolorem vel
                        accusamus est labore minima alias atque. Natus, reiciendis quas. Labore necessitatibus similique
                        eum, quibusdam officia fuga molestias eos cum dolore, ut mollitia fugit, odio veritatis possimus
                        sequi! Quidem nulla tenetur, quos eius expedita, temporibus sit consectetur fugiat minus iure
                        unde dolore architecto at aliquam maiores similique quae ratione. Eveniet perferendis eos
                        commodi autem possimus numquam neque voluptate expedita, beatae assumenda quis ipsum, dolore
                        necessitatibus. Eligendi repellat dolores consequuntur, quibusdam exercitationem tempora dolorem
                        dolorum, minus id expedita porro. Labore molestiae sequi vero! Veritatis corrupti ut maxime,
                        vero ad exercitationem porro, vel, impedit sunt tempore doloribus. Eum eaque ipsam illum quam ad
                        culpa, commodi dolorum nam fuga minus repellendus, quo assumenda, hic quis amet explicabo.
                        Doloremque obcaecati, ad mollitia voluptate adipisci quo nisi reiciendis ipsum, non commodi
                        voluptatem est odio neque dignissimos fugiat eos dolor! Ducimus natus culpa officia cumque magni
                        consequuntur, sunt molestias a illum ab ipsam excepturi, dolorum laudantium impedit eveniet,
                        porro sapiente eaque rem! Saepe facere totam molestiae unde ea qui magnam expedita officiis ut
                        sequi, esse consequuntur amet commodi officia dolorum modi sit voluptatem reprehenderit quis
                        dignissimos labore magni. Odit debitis magnam assumenda est porro consequatur fugit consequuntur
                        quisquam tenetur quas, fuga rem doloremque, recusandae quibusdam minima quam dignissimos quod
                        ratione, voluptas perspiciatis maxime temporibus a! Modi illum ut delectus officia consectetur
                        nam ex nobis, vel maiores neque explicabo! Ipsam odio ad eveniet consequatur?</p>

                    </v-sheet>
                  </div>
                </div>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
        <!-- QrDialog -->
        <v-dialog v-model="qrDialog" width="400px">
          <v-card style="width: 400px; height:auto; border-radius: 15px;">
            <v-card-title class="d-flex justify-content-between px-4"
              style="background-color: #216D17; color: #FFFFFF;">
              <h4>Item Heading</h4>
              <v-icon @click="closeQR" class="mdi mdi-window-close"></v-icon>
            </v-card-title>
            <v-card-text class="mb-0 px-3 py-0">
              <v-container class="py-0">
                <v-img src='@/assets/Qr.png' alt="employee" style=" height: 400px; width: 400px;"></v-img>
              </v-container>
            </v-card-text>
            <v-card-text class="px-3 pt-0 mb-3">
              <div class="d-flex justify-content-between">
                <v-btn class="text-capitalize fw-bolder" color="green-darken-4" width="170" variant="outlined" rounded>
                  <v-icon class="mdi mdi-content-save-outline" color="green-darken-4"></v-icon> Save
                </v-btn>
                <v-btn class="text-none" color="green-darken-4" width="170" rounded>
                  <v-icon class="mdi mdi-printer"></v-icon> Print
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-dialog>
      </template>
      <!-- <template v-slot:item="{ item, index }"> -->
      <template v-slot:item="{ item }">
        <tr style="background-color:#FCFDF6; color:black;">
          <!-- <td class="text-center">{{ index + 1 }}</td> -->
          <td class="">{{ item.employeeId }}</td>
          <td class="">{{ item.phoneNo }}
          </td>
          <td class=""><v-img src="@/assets/acc.jpg" alt="employee"
              style="border-radius: 50%; height: 50px; width: 50px;"></v-img></td>
          <td class=""><v-img src="@/assets/Qr.png" alt="employee" class="qr" style="height: 50px; width: 50px;"
              @click="showQR(item)"></v-img></td>
          <td class="text-center">
            <v-btn class="text-none" color="#48663f" min-width="100" rounded @click="showDetails(item)">View</v-btn>
          </td>
          <td class="text-center">
            <v-icon size="large" color="teal-darken-3" class="me-4 mdi mdi-pencil" @click="editItem(item)"></v-icon>
            <v-icon size="large" color="danger" class="ms-4 mdi mdi-trash-can" @click="deleteItem(item)"></v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-app>
</template>
  
  <script>
  
  export default {
    data: () => ({
      dialog: false,
      // overlay: true,
      detailsDialog: false,
      qrDialog: false,
      dialogDelete: false,
      isHovered: false,
      search: '',
      message: '',
      loading: false,
      snackbar: false,
      color: '#E8F5E9',
      timeout: 3000,
      image: require('@/assets/acc.jpg'),
      headers: [
        { title: 'Sl.no', align: 'start', key: 'employeeId', sortable: false },
        { title: 'Heading', align: 'start', key: 'image', sortable: false },
        { title: 'Image', align: 'start', key: 'name', sortable: false },
        { title: 'QR Code', align: 'start', key: 'phoneNo', sortable: false },
        { title: 'Details', align: 'center' },
        { title: 'Edit / Delete', align: 'center' },
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
    created() {
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
      showDetails(item) {
        this.editedItem = Object.assign({}, item);
        this.detailsDialog = true;
      },
      showQR(item) {
        this.editedItem = Object.assign({}, item);
        this.qrDialog = true;
      },
      closeQR() {
        this.qrDialog = false;
      },
      closeDetails() {
        this.detailsDialog = false;
      },
      deleteItem(item) {
        this.editedIndex = this.employees.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      async deleteItemConfirm() {
        this.loading = !this.loading
        try {
          const id = this.editedItem.employeeId;
          const success = await this.$store.dispatch('deleteEmployee', id)
          if (success) {
            // this.loading = false
            this.message = 'Employee deleted successfully !!';
            this.color = '#C8E6C9'
            this.closeDelete();
            this.snackbar = true;
            setInterval(() => { window.location.reload(); }, 2000)
          }
        }
        catch (error) {
          
          this.message = error.message + '!!';
          this.color = '#C62828';
          this.loading = false
          this.snackbar = true;
        }
      },
      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      editItem(item) {
        this.editedIndex = this.employees.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      async add() {
        this.loading = !this.loading
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
            this.message = 'Employee added successfully !!';
            this.color = '#C8E6C9'
            this.snackbar = true;
            setInterval(()=>{window.location.reload();}, 2000)
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
        this.loading = !this.loading
        try {
          const success = await this.$store.dispatch('editEmployees', {
            id: this.editedItem.employeeId,
            email: this.editedItem.email,
            name: this.editedItem.name,
            mobile: this.editedItem.phoneNo,
            temporary: this.editedItem.tempAddress,
            permanent: this.editedItem.permAddress,
            photo: "photo"
          });
          if (success) {
            this.close();
            this.message = 'Employee details updated !!';
            this.color = '#C8E6C9'
            this.snackbar = true;
            setInterval(() => { window.location.reload(); }, 2000)
          }
        }
        catch (error) {
          this.loading = false
          this.message = error.message + '!!';
          this.color = '#C62828';
          this.snackbar = true;
        }
      },
      close() {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    },
  };
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
  
  .desc{
    height: 360px; 
    overflow: auto;
  }

  /* Define scrollbar styles */
::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar */
}

/* Handle */
::-webkit-scrollbar-thumb {
    background-color: darkgrey; /* Color of the scrollbar handle */
    border-radius: 10px; /* Rounded corners of the handle */
}

/* Track */
::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the scrollbar track */
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #555; /* Color of the handle when hovered */
}


    /* Scrollbar styles */
    .custom-scroll {
        overflow-y: scroll; /* Enable vertical scrollbar */
        max-height: 380px; /* Max height to enable scrolling */
        padding-right: 16px; 
    }

    /* Define scrollbar styles */
    .custom-scroll::-webkit-scrollbar {
        width: 8px; /* Width of the scrollbar */
    }

    /* Handle */
    .custom-scroll::-webkit-scrollbar-thumb {
        background-color: darkgrey; /* Color of the scrollbar handle */
        border-radius: 10px; /* Rounded corners of the handle */
    }

    /* Track */
    .custom-scroll::-webkit-scrollbar-track {
        background: #f1f1f1; /* Color of the scrollbar track */
    }

    /* Handle on hover */
    .custom-scroll::-webkit-scrollbar-thumb:hover {
        background: #555; /* Color of the handle when hovered */
    }
    .qr:hover {
        cursor: pointer;
    }
</style>


  
 