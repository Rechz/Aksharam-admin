<template>

  <v-container class="py-8 px-0" fluid>
    <div class="d-flex justify-content-end mb-4">
      <v-btn-toggle rounded="xl" color="green-lighten-5" v-model="lang" density="compact">
        <v-btn value="English" @click="translate(2)" size="small">English</v-btn>
        <v-btn value="Malayalam" @click="translate(1)" size="small">Malayalam</v-btn>

      </v-btn-toggle>
    </div>
    <v-data-table :headers="headers" :items="mainheadings" class="mt-3"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" width="400px">
          <v-card class="rounded-4 pb-4">
            <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
              Heading</v-card-title>
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

        <v-dialog v-model="qrDialog" width="400px">
          <v-card style="width: 400px; height:auto; border-radius: 15px;">
            <v-card-title class="d-flex justify-content-between px-4"
              style="background-color: #216D17; color: #FFFFFF;">
              <h4>Item Heading</h4>
              <v-icon @click="closeQR" class="mdi mdi-window-close"></v-icon>
            </v-card-title>
            <v-card-text class="mb-0 px-3 py-0">
              <v-container class="py-0">
                <v-img :src='editedItem.qrCodeUrl' alt="QR" style=" height: 400px; width: 400px;"></v-img>
              </v-container>
            </v-card-text>
            <v-card-text class="px-3 pt-0 mb-3">
              <div class="d-flex justify-content-between">
                <v-btn class="text-capitalize fw-bolder" color="green-darken-4" width="170" variant="outlined" rounded
                  @click="downloadQR(editedItem.qrCodeUrl)">
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
      <template v-slot:item="{ item,index }">
        <tr style="background-color:#FCFDF6; color:black;">
          <!-- <td class="text-center">{{ index + 1 }}</td> -->
          <td class="text-center">{{ index + 1 }}</td>
          <td class="">{{ item.title }}</td>
          <!-- <td class=""><v-img :src="@/assets/acc.jpg" alt="image"
              style="border-radius: 50%; height: 50px; width: 50px;"></v-img></td> -->
          <td class=""><v-img :src="item.qrCodeUrl" alt="QR" class="qr" style="height: 50px; width: 50px;"
              @click="showQR(item)"></v-img></td>
          <td class="text-center">
            <v-btn class="text-none" color="#48663f" min-width="100" rounded @click="showDetails(item)">View &
              Edit</v-btn>
          </td>
          <td class="text-center">
            <!-- <v-icon size="large" color="teal-darken-3" class="me-4 mdi mdi-pencil" @click="editItem(item)"></v-icon> -->
            <v-icon size="large" color="danger" class=" mdi mdi-trash-can" @click="deleteItem(item)"></v-icon>
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
  
  <script>
  // import DetailsView from './DetailsView.vue';
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {

    data: () => ({
      dialog: false,
      // overlay: true,
      // base_url: 'http://192.168.1.32:8081',
      base_url: 'http://localhost:8081',
      qrDialog: false,
      dialogDelete: false,
      isHovered: false,
      search: '',
      message: '',
      loading: false,
      snackbar: false,
      color: '#E8F5E9',
      timeout: 3000,
      subTopic:{},
      image: require('@/assets/acc.jpg'),
      headers: [
        { title: 'Sl.no', align: 'center', sortable: false },
        { title: 'Heading', align: 'start', key: 'heading', sortable: false },
        { title: 'QR Code', align: 'start', key: 'QR', sortable: false },
        { title: 'Details', align: 'center' },
        { title: 'Delete', align: 'center' },
      ],

    }),
  
    computed: {
      ...mapGetters(['getData']),
    mainheadings() {
      return this.getData;
    },
      language() {
        return this.$store.getters.getLanguage;
      },
      lang() {
        if (this.language === 2) {
          return 'English';
        }
        if (this.language === 1) {
          return 'Malayalam';
        }
        return '';
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

    mounted() {
      this.getTopics();
    },
    methods: {
      async getTopics() {
      try {
        const response = await axios.get(`${this.base_url}/DataEntry1/getMainComplete?dtId=${this.language}`);
        if (response.status === 200) {
          this.$store.commit('setAllTopics', response.data);
        }
      } catch (error) {
        console.error(error);
      }
    },

      translate(language) {
        this.$store.commit('setLanguage', language);
        // if (this.language === 1) {
        //   this.$store.commit('setLanguage', 2);
        // } else {
        //   this.$store.commit('setLanguage', 1);
        // }
        this.getTopics()
      },
      async showDetails(item) {
        try {
          const response = await axios.get(`${this.base_url}/qrcode/getScanDetails?dtId=${this.language}&commonId=${item.commonId}`);
        if (response.status === 200) {
          this.$store.commit('setDetails', response.data)
          this.$router.push({name:'guide-edit'})
        }
      } catch (error) {
        console.error(error);
      }
      },
      showQR(item) {
        this.editedItem = Object.assign({}, item);
        this.qrDialog = true;
      },
      closeQR() {
        this.qrDialog = false;
      },

      deleteItem(item) {
        this.editedIndex = this.mainheadings.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      async deleteItemConfirm() {
        this.loading = !this.loading
        try {
          const id = this.editedItem.commonId;
          const success = await axios.delete(`${this.base_url}/deleteMain/delete/${id}`)
          if ((success.status >= 200) || (success.status<300)) {
            // this.loading = false
            this.message = 'Heading deleted successfully !!';
            this.color = '#C8E6C9'
            this.closeDelete();
            this.snackbar = true;
            this.getTopics();
            // setInterval(() => { window.location.reload(); }, 2000)
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

      
      downloadQR(qrCodeUrl) {
        
        axios.get(qrCodeUrl, { responseType: 'blob' })
          .then(response => {
            const blob = new Blob([response.data], { type: 'application/pdf' })
            const link = document.createElement('a')
            link.href = URL.createObjectURL(blob)
            link.download = 'qr_code.png'
            link.click()
            URL.revokeObjectURL(link.href)
          }).catch(console.error)
      },

      //   const link = document.createElement('a');
      //   link.href = qrCodeUrl;
      //   link.download = 'qr_code.png';
      //   document.body.appendChild(link);
      //   link.click();
      //   document.body.removeChild(link);
      // },
      
      
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


  
 