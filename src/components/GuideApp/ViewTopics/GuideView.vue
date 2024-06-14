<template>

  <v-container class="py-8 px-0" fluid>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
      <v-card width="600" rounded="3">
        <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{ dialogHead }}</v-card-title>
        <v-card-text class="px-5 text-center">
          <v-icon size="88" :class="icon" :color="color"></v-icon>
          <h6>{{ message }}</h6>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="d-flex justify-content-end mb-4">
      <v-btn-toggle rounded="xl" color="green-lighten-5" v-model="lang" density="compact">
        <v-btn :value="'English'" @click="translate(2)" size="small">English</v-btn>
        <v-btn :value="'Malayalam'" @click="translate(1)" size="small">Malayalam</v-btn>
      </v-btn-toggle>
    </div>
    <v-data-table :headers="headers" :items="mainheadings" class="mt-3"
      :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }">
      <template v-slot:top>
        <v-dialog v-model="dialogDelete" width="500px">
          <v-card class="rounded-4 pb-4">
            <v-card-title class="mb-2 text-white ps-4 fs-4 text-center" style="background-color: #BA1A1A;">Delete
              Topic</v-card-title>
            <v-container class="px-4 d-flex flex-column align-items-center">
              <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
              <v-card-text class="mt-1 text-center fs-6">
                Are you sure you want to delete this topic and all details related to this topic?
              </v-card-text>
            </v-container>
            <v-card-actions class="mx-4 d-flex flex-column align-items-center">
              <v-btn block class="rounded-4 text-white mb-3" style="background-color: #BA1A1A;"
                @click="deleteItemConfirm" :loading="loading" :disabled="loading">Delete</v-btn>
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
              <div class="d-flex justify-content-end me-3">
                <v-btn class="text-capitalize fw-bolder" color="green-darken-4" width="170" variant="outlined" rounded
                  @click="downloadQRCode(editedItem.qrCodeUrl)">
                  <v-icon class="mdi mdi-content-save-outline" color="green-darken-4"></v-icon> download
                </v-btn>
                <!-- <v-btn class="text-none" color="green-darken-4" width="170" rounded>
                  <v-icon class="mdi mdi-printer"></v-icon> Print
                </v-btn> -->
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
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  export default {
    data: () => ({
      qrDialog: false,
      dialogDelete: false,
      message: '',
      loading: false,
      dialogTopic: false,
      color: '#E8F5E9',
      dialogHead: '',
      icon:'',
      subTopic:{},
      image: require('@/assets/acc.jpg'),
      headers: [
        { title: 'Sl.no', align: 'start', sortable: false },
        { title: 'Heading', align: 'start', key: 'heading', sortable: false },
        { title: 'QR Code', align: 'start', key: 'QR', sortable: false },
        { title: 'Details', align: 'center' },
        { title: 'Delete', align: 'center' },
      ],

    }),
    computed: {
      ...mapGetters('guide', ['getData','getLanguage']),
      mainheadings() {
        return this.getData;
      },
      language() {
        return this.getLanguage;
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
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },
    mounted() {
      this.getTopics();
      this.getType();
      this.getAllLanguages();
    },
    methods: {
      success(message) {
        this.icon = 'mdi mdi-check-circle-outline'
        this.message = message;
        this.dialogHead = 'Success'
        this.color = '#2E7D32'
        this.dialogTopic = true;
      },
      error(message) {
        this.color = '#BA1A1A';
        this.icon = 'mdi mdi-alert-outline'
        this.dialogHead = 'Error';
        this.message = message;
        this.dialogTopic = true;
      },
      async getTopics() {
        try {
          await this.$store.dispatch('guide/getTopics');
        }
        catch (error) {
          console.error(error);
        }
      },
      translate(language) {
        this.$store.commit('guide/setLanguage', language);
        this.getTopics()
      },
      async showDetails(item) {
        try {
          const response = await this.$store.dispatch('guide/showDetails', {
            language: this.language,
            commonId: item.commonId
          });
          if (response) {
            this.$router.push({name:'guide-edit'})
          }
        }
        catch (error) {
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
        this.loading = true;
        try {
          const id = this.editedItem.commonId;
          const success = await this.$store.dispatch('guide/deleteMain', id)
          if (success) {
            this.loading = false;
            let message = 'All details related to the topic deleted successfully !!';
            this.closeDelete();
            this.success(message);
            this.getTopics();
          }
        }
        catch (error) {
          let message = error.message + '!!';
          this.loading = false
          this.error(message);
        }
      },
      closeDelete() {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      async downloadQRCode(qr) {
        try {
          const response = await axios.get(qr, {
            responseType: 'blob', 
          });
          const blob = new Blob([response.data], { type: response.data.type });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = this.editedItem.title + '.jpeg'; 
          link.click();
          URL.revokeObjectURL(link.href); 
        } catch (error) {
          console.error('Failed to download QR code:', error);
        }
      },
      async getType() {
        try {
          await this.$store.dispatch('guide/getType');
        }
        catch (err) {
          console.log(err)
        }
      },
      async getAllLanguages() {
        try {
          await this.$store.dispatch('guide/getAllLanguages');
        }
        catch (error) {
          console.error(error)
        }
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
  .qr:hover {
    cursor: pointer;
  }
</style>

  
 