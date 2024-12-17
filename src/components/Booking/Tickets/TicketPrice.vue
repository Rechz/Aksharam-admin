<template>

  <v-container class="py-2 ps-0 pe-0" fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
      <div class="text-center">{{ message }}</div>
    </v-snackbar>
    <div class="d-flex justify-content-between ">
      <!-- <v-select v-model="sortColumn" :items="categoryItems" density="compact" item-title="category" item-value="id"
        prepend-inner-icon="mdi-sort-variant" label="Sort by" class="sort"></v-select> -->
      <v-btn class="text-capitalize" color="#2C7721" @click="dialogAdd = true;" variant="elevated" size="large" density="comfortable">
        + Add Price</v-btn>
    </div>
    <v-dialog width="400" max-width="800" v-model="dialogAdd">
      <v-card style="width: 400px; height:auto; border-radius: 15px;" class="pb-5">
        <v-card-title class="d-flex justify-content-between px-4 align-items-center" style="background-color: #216D17; color: #FFFFFF;">
          <h5 class="mt-2">Price Details</h5>
          <v-icon @click="closeDialogAdd" class="mdi mdi-window-close" size="24"></v-icon>
        </v-card-title>
        <v-card-text class="pb-3">
          <v-container class="pb-0">
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="editedItem.categoryId" :items="categoryItems" label="Category" class="price" density="comfortable"
                  :single-line="categoryName" item-title="category" item-value="id"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-select v-model="editedItem.typeId" :items="typeItems" label="Type" class="price" density="comfortable"
                  :single-line="typeName" item-title="type" item-value="id"></v-select>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field v-model="editedItem.price" label="Price" class="price" density="comfortable"
                  single-line></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions class="mx-4">
          <v-btn color="white" block style="background-color: #1B5E20; text-transform: capitalize" 
            elevation="4" size="45" @click="editedIndex === -1 ? addPrice() : update()" :loading="loadingAdd" :disabled="loadingAdd">{{editedIndex === -1?'Add':'Update'}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" width="400px">
            <v-card class="rounded-4 pb-4">
                <v-card-title class="mb-2 text-white ps-4 fs-5 text-center" style="background-color: #BA1A1A;">Delete
                    Price Details</v-card-title>
                <v-container class="px-4 d-flex flex-column align-items-center">
                    <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                    <v-card-text class="mt-1 text-center">Are you sure you want to delete?</v-card-text>
                </v-container>
                <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                    <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;"
                        @click="deleteItemConfirm">Delete</v-btn>
                    <v-btn block variant="text" class="mb-1" @click="closeDelete">Cancel</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>
    <v-data-table :headers="headers" :items="priceList" style="background-color: #f9faf1;" max-width="100%" class="mt-3"
    item-value="ticketId" :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }" items-per-page="10">
    <template v-slot:item='{ item, index }'>
        <tr style="background-color:#FCFDF6; color:black;">
          <td class="text-center">
            {{ index + 1 }}
          </td>
          <td>
            {{ item.categoryName }}
          </td>

          <td>
            {{ item.typeName }}
          </td>
          <td>
            {{ item.price }}
          </td>
          <td class="d-flex justify-content-around pt-3">
            <v-icon size="default" color="teal-darken-3" class="" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon size="default" color="danger" class="" @click="deleteItem(item)">
              mdi-trash-can
            </v-icon>
          </td>
        </tr>
      </template>
  </v-data-table>

    <!-- <PriceTable :items="priceList.public" head="PUBLIC" class="mb-4" />
    <PriceTable :items="priceList.institution" head="INSTITUTION" class="mb-4" />
    <PriceTable :items="priceList.foreigner" head="FOREIGNER" class="mb-4" /> -->
    <!-- <PriceTable :items="priceList.tax" head="TAX" /> -->
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';
// import PriceTable from './PriceTable.vue';
export default {
 // components: {
 //   PriceTable
 // },
  computed : {
    ...mapGetters('booking', ['getPrice','getCategory','getType']),
    formTitle() {
      return this.editedIndex === -1 ? 'Add Slot' : 'Edit Slot'
    },
    priceList() {
      return this.getPrice;
    },
    categoryItems() {
      return this.getCategory;
    },
    typeItems() {
      return this.getType;
    },
    
  },
  data() {
    return {
      dialogAdd: false,
      dialogDelete: false,
      categoryName: null,
      typeName: null,
      price: null,
      // categoryItems: ['public', 'foreigner', 'institution', 'tax'],
      // typeItems: [],
      message: '',
      loadingAdd: false,
      snackbar: false,
      color: '#E8F5E9',
      timeout: 3000,
      sortColumn:'',
      headers: [
        { title: 'Sl No.', sortable: false, align: 'center' },
        { title: 'Category Name ', align: 'start', sortable: false, key: 'categoryName' },
        { title: 'Type', sortable: true, key: 'typeName', align: 'start' },
        { title: 'Price', sortable: false, key: 'price', align: 'start' },
        { title: 'Action', sortable: false, align: 'center', key: 'action' },
      ],
      editedIndex: -1,
      editedItem: {},
      defaultItem: {}
    };
  },
  watch: {
    async 'editedItem.categoryId'(value) {
      console.log("watcher", value)
      if(value) {
        const payload = value;
      try {
        await this.$store.dispatch('booking/getTypeById', payload);
      }
      catch (error) {
        console.error(error.message);
      }
      }
    },
    // sortColumn(value) {
    //   console.log("watcher", value)
    //   if(value === 1) {
    //     return this.priceList.filter(item =>
    //     item.categoryId.includes(value)
    //   );
    //   }
    // }
    // category(newValue) {
    //   this.typeName = null;
    //   if (newValue === 'public') {
    //     this.typeItems = ['adult', 'child', 'senior'];
    //   } else if (newValue === 'institution') {
    //     this.typeItems = ['teacher', 'student'];
    //   // } else if (newValue === 'tax') {
    //   //   this.typeItems = ['IGST', 'GST', 'CESS', 'ENTERTAINMENT TAX'];
    //   } else if (newValue === 'foreigner') {
    //     this.typeItems = ['foreign_adult', 'foreign_child'];
    //   } else {
    //     this.typeItems = [];
    //   }
    // }
  },
  mounted() {
    this.loadPrice();
    this.fetchCategory();
},
  methods: {
    async addPrice() {
      // this.dialogAdd = true;
      this.loadingAdd = true;
      try {
        const payload = {
          "price": parseInt(this.editedItem.price),
          "typeId": this.editedItem.typeId,
          "categoryId": this.editedItem.categoryId
        }
        console.log("payload", payload)
        const res = await this.$store.dispatch("booking/addPrice", payload);
        if (res) {
          setTimeout(() => {
            this.dialogAdd = false;
            this.message = "Price added Successfully!"
            this.snackbar = true;
            this.loadingAdd = false;
            this.editedItem.categoryName = null;
            this.editedItem.typeName = null;
            this.editedItem.price = null;
          }, 2000)
          this.loadPrice();
        }
      }
      catch (error) {
        this.loadingAdd = false;
        if (error.response) {
          this.message = error.response.data.message;
        }
        else {this.message = error.message;}
        
        this.color = 'red';
        this.snackbar = true;
      }
    },
    async update() {
      // this.dialogAdd = true;
      this.loadingAdd = true;
      try {
        const payload = {
          id: this.editedItem.id, 
          data: {
          "price": parseInt(this.editedItem.price),
          "typeId": this.editedItem.typeId,
          "categoryId": this.editedItem.categoryId
          }
        }
        const res = await this.$store.dispatch("booking/updatePrice", payload);
        if (res) {
          setTimeout(() => {
            this.dialogAdd = false;
            this.message = "Price updated Successfully!"
            this.snackbar = true;
            this.loadingAdd = false;
            this.editedItem.categoryName = null;
            this.editedItem.typeName = null;
            this.editedItem.price = null;
          }, 2000)
          this.loadPrice();
        }
      }
      catch (error) {
        this.loadingAdd = false;
        if (error.response) {
          this.message = error.response.data.message;
        }
        else {this.message = error.message;}
        
        this.color = 'red';
        this.snackbar = true;
      }
    },
    closeDialogAdd() {
      // this.editedItem.categoryName = null;
      //       this.editedItem.typeName = null;
      //       this.editedItem.price = null;
      this.dialogAdd = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    async loadPrice() {
      try {
        await this.$store.dispatch('booking/fetchPrice')
        }
      catch (error) {
        console.error(error)
      }
    },
    async fetchCategory() {
      try {
        await this.$store.dispatch('booking/fetchCategory')
        }
      catch (error) {
        console.error(error)
      }
    },
    editItem(item) {
      this.editedIndex = this.priceList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogAdd = true
    },
    async deleteItemConfirm() {
            this.loading = !this.loading
            try {
                const payload = this.editedItem.id;
                const success = await this.$store.dispatch('booking/deletePrice', payload)
                if (success) {
                    this.loading = false
                    this.message = 'Price deleted successfully !!';
                    this.color = '#C8E6C9'
                    this.closeDelete();
                    this.snackbar = true;
                    setTimeout(() => { window.location.reload(); }, 2000)
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
                this.editingIndex = -1
            })
        },
        deleteItem(item) {
      this.editedIndex = this.priceList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
  },
  
};
</script>


<style scoped>
/* :deep(.v-table) {
  width: 76vw;
} */
:deep(.price .v-input__control) {
  border-bottom: 2px solid #216D17;
  background-color: #DFE4D7 !important;
  /* margin-bottom: 15px; */
}

:deep(.price .v-input__details) {
  display: none;
}
:deep(.sort.v-input) {
  display: flex;
  /* justify-content: end; */
}
:deep(.v-input__details) {
  display: none;
}
:deep(.search .v-input__control),
:deep(.sort .v-input__control) {
  width: 200px !important;
  height: 40px !important;
  background-color: #DFE4D7 !important;
  border-bottom: 2px solid #216D17;
}
</style>