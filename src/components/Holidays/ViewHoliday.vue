<template>
  <v-container class="py-8 px-0" fluid>
    <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
      <div class="text-center">{{ message }}</div>
    </v-snackbar>
    <div class="d-flex justify-content-between mb-4">
    </div>
    <v-data-table :headers="headers" :items="holidays" class="mt-3"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" width="400px">
          <v-card class="rounded-4 pb-4">
            <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
              Holiday</v-card-title>
            <v-container class="px-4 d-flex flex-column align-items-center">
              <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
              <v-card-text class="mt-1 text-center">Are you sure you want to delete?</v-card-text>
            </v-container>
            <v-card-actions class="mx-4 d-flex flex-column align-items-center">
              <v-btn block class="rounded-4 text-white mb-3" style="background-color: #BA1A1A;" :loading="loading"
                :disabled="loading" @click="deleteItemConfirm">Delete</v-btn>
              <v-btn block variant="text" class="rounded-4 mb-3" @click="closeDelete">Cancel</v-btn>

            </v-card-actions>

          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item="{ item,index }">
        <tr style="background-color:#FCFDF6; color:black;">
          <td class="">{{ index + 1 }}</td>
          <td class="">{{ item.date }}</td>
          <td class="">{{ item.name }}</td>
          <td class="text-center">
            <v-icon size="large" color="danger" class="mdi mdi-trash-can" @click="deleteItem(item)"></v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
    
    <script>
    export default {
      data: () => ({
        holidays: [],
        dialogDelete: false,
        message: '',
        loading: false,
        snackbar: false,
        color: '#E8F5E9',
        timeout: 2000,
        headers: [
          { title: 'Sl.no', align: 'start', sortable: false },
          { title: 'Date', align: 'start', key: 'date', sortable: false },
          { title: 'Holiday Reason', align: 'start', key: 'name', sortable: false },
          { title: 'Delete', align: 'center' },
        ],
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
      }),
      watch: {
        dialogDelete(val) {
          val || this.closeDelete()
        },
      },
      methods: {
        deleteItem(item) {
          this.editedIndex = this.holidays.indexOf(item)
          this.editedItem = Object.assign({}, item)
          console.log(this.editedItem.id)
          this.dialogDelete = true
        },
        async deleteItemConfirm() {
          this.loading = !this.loading
          try {
            const id = this.editedItem.id;
            const response = await this.$store.dispatch('deleteHoliday', id);
            if (response) {
              this.loading = false
              this.message = 'Holiday deleted successfully !!';
              this.color = '#C8E6C9'
              this.closeDelete();
              this.snackbar = true;
              this.getHoliday();
            }
          }
          catch (error) {
            console.error(error)
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
        async getHoliday() {
            try {
                const response = await this.$store.dispatch('getHoliday');
            if (response) {
              this.holidays = this.$store.getters.getHoliday;
            }
            }
            catch (error) {
        console.log(error)
      }
        },
      },
      mounted() {
        this.getHoliday();
      }
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
  
  
    
   