
    <template>
      <v-container class="py-2 px-0" fluid>
        <v-dialog width="600" max-width="600" v-model="dialogTopic">
          <v-card width="600" rounded="3">
            <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{ dialogHead
              }}</v-card-title>
            <v-card-text class="px-5 text-center">
              <v-icon size="88" :class="icon" :color="color"></v-icon>
              <h6>{{ message }}</h6>
            </v-card-text>
            <v-card-actions>
              <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogGenerate" width="800" max-width="800" persistent>
          <v-card rounded="3" v-if="!addTopic">
            <v-card-title class="text-center text-white fs-6 d-flex justify-content-between"
              style="background-color: #2E7D32;">
              <h5>Generate QR</h5>
              <v-icon class="mdi mdi-close" @click="closeGenQR"></v-icon>
            </v-card-title>
            <v-card-text class="px-5 text-justify pb-0">
              Select topic to be linked with the selected topic '{{ selectedTopic }}'.
              <v-select v-model="selectedItem" :items="topics" item-text="title" item-value="id" label="Select topic"
                append-outer-icon="mdi-menu-down" clearable variant="outlined" density="compact" width="400"
                class="mt-3">
                <template v-slot:append-item>
                  <v-divider class="my-0 py-0"></v-divider>
                  <v-list-item class="py-0">
                    <v-btn @click="handleButtonClick" class="ps-0 text-capitalize" variant="text"
                      prepend-icon="mdi-plus" color="success">Add Topic</v-btn>
                  </v-list-item>
                </template>
              </v-select>
            </v-card-text>
            <v-card-actions>
              <v-btn color="#2E7D32" :disabled="!selectedItem || buttonClicked" variant="elevated" class="mb-3 me-3"
                @click="generateQR">Generate</v-btn>
            </v-card-actions>
          </v-card>
          <v-card v-else>
            <add-new :languageId="language" :id="topicId" @back="addTopic = false"
              @exit="addTopic = false; dialogGenerate = false" @update="getTopics"></add-new>
          </v-card>
        </v-dialog>
        <div class="d-flex justify-content-end mb-4">
          <v-btn-toggle color="green-lighten-5" v-model="lang" density="compact">
            <v-btn :value="'English'" @click="translate(2)" size="small">English</v-btn>
            <v-btn :value="'Malayalam'" @click="translate(1)" size="small">Malayalam</v-btn>
          </v-btn-toggle>
        </div>
        <v-skeleton-loader v-if="skeleton" type="table"></v-skeleton-loader>
        <v-data-table :headers="headers" :items="mainheadings" class="mt-3"
          :header-props="{ style: 'background-color: #216D17; color: #FFFFFF;' }" v-else>
          <template v-slot:top>
            <v-dialog v-model="dialogDelete" width="500px">
              <v-card class="rounded-2 pb-4">
                <v-card-title class="mb-2 text-white ps-4 fs-4 text-center" style="background-color: #BA1A1A;">Delete
                  Topic</v-card-title>
                <v-container class="px-4 d-flex flex-column align-items-center">
                  <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                  <v-card-text class="mt-1 text-center fs-6">
                    Are you sure you want to delete this topic and all details related to this topic?
                  </v-card-text>
                </v-container>
                <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                  <v-btn block class="rounded-0 text-white mb-3" style="background-color: #BA1A1A;"
                    @click="deleteItemConfirm" :loading="loading" :disabled="loading">Delete</v-btn>
                  <v-btn block variant="text" class="rounded-0 mb-3" @click="closeDelete">Cancel</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="qrDialog" width="400px">
              <v-card style="width: 400px; height:auto; border-radius: 15px;">
                <v-card-title class="d-flex justify-content-between  align-items-center px-4"
                  style="background-color: #216D17; color: #FFFFFF;">
                  <h5 class="mt-2">QR Code</h5>
                  <v-icon @click="closeQR" class="mdi mdi-window-close" size="20"></v-icon>
                </v-card-title>
                <v-card-text class="mb-0 px-3 py-0">
                  <v-container class="py-0">
                    <v-img :src='editedItem.qrCodeUrl' alt="QR" style=" height: 400px; width: 400px;"></v-img>
                  </v-container>
                </v-card-text>
                <v-card-text class="px-3 pt-0 mb-3">
                  <div class="d-flex justify-content-end me-3">
                    <v-btn class="text-capitalize fw-bolder" color="green-darken-4" width="170" variant="outlined"
                      rounded @click="downloadQRCodeImage(editedItem.qrCodeImage, editedItem.topic)">
                      <v-icon class="mdi mdi-content-save-outline" color="green-darken-4"></v-icon>
                      download
                    </v-btn>
                  </div>
                </v-card-text>
              </v-card>
            </v-dialog>
          </template>
          <template v-slot:item="{ item, index }">
            <tr style="background-color:#FCFDF6; color:black;">
              <td class="text-center">{{ index + 1 }}</td>
              <td class="text-center">{{ item.topic }}</td>
              <td class="text-center d-flex justify-content-center align-items-center"><v-img :src="item.qrCodeUrl"
                  :lazy-src="item.qrCodeUrl" alt="QR" class="qr" style="height: 50px; width: 50px;" v-if="item.mainCommonId"
                  @click="showQR(item)"></v-img>
                <v-btn variant="text" class="text-capitalize text-decoration-underline" color="#2E7D32" v-else
                  @click="generate(item)" :loading="item.qrLoad" :disabled="item.qrLoad">Generate QR</v-btn>
              </td>
              <td class="text-center">
                <v-btn class="text-none" color="#48663f" min-width="100" size="small" @click="showDetails(item)"
                  :disabled="!item.mainCommonId">View & Edit</v-btn>
              </td>
              <td class="text-center">
                <v-icon size="default" color="danger" class=" mdi mdi-trash-can" @click="deleteItem(item)"></v-icon>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-container>
    </template>

    <script>
  import axios from 'axios';
  import AddNew from './AddNew.vue';
  import { mapGetters } from 'vuex';
  export default {
    components: {
      AddNew
    },
    data: () => ({
      qrDialog: false,
      dialogDelete: false,
      message: '',
      loading: false,
      dialogTopic: false,
      color: '#E8F5E9',
      dialogHead: '',
      skeleton: true,
      icon: '',
      selectedTopic: '',
      topicId: '',
      // qrLoad: false,
      dialogGenerate: false,
      subTopic: {},
      topics: [],
      buttonClicked: false,
      selectedItem: null,
      addTopic: false,
      image: require('@/assets/acc.jpg'),
      headers: [
        { title: 'Sl.no', align: 'center', sortable: false },
        { title: 'Topics', align: 'center', key: 'topic', sortable: false },
        { title: 'QR Code', align: 'center', key: 'QR', sortable: false },
        { title: 'Details', align: 'center' },
        { title: 'Delete', align: 'center' },
      ],

    }),
    computed: {
      ...mapGetters('display', ['getLanguage','getData']),
      ...mapGetters('guide', ['getMainTopics']),
      mainheadings() {
        return this.getMainTopics;
      },
      language() {
        return this.getLanguage;
      },
      lang() {
        if (this.language == 2) {
          return 'English';
        }
        else {
          return 'Malayalam';
        }
      }
    },
    watch: {
      dialogDelete(val) {
        val || this.closeDelete()
      },
    },
      mounted() {
      // console.log('get',this.mainheadings)
      this.getTopics();
      this.getType();
      this.getAllLanguages();
    },
      methods: {
        closeGenQR() {
          this.dialogGenerate = false;
          this.selectedTopic = '';
          this.topicId = '';
          this.topics = [];
          this.buttonClicked = false;
          this.selectedItem = null;
      },
      async generateQR() {
        if (this.selectedItem && !this.buttonClicked) {
          var idmal, ideng;
          if (this.language == 1) {
            idmal = this.topicId;
            ideng = this.selectedItem;
          } else {
            idmal = this.selectedItem;
            ideng = this.topicId;
          }

          // Find the corresponding item
          const item = this.mainheadings.find((topic) => topic.mainUniqueId === this.topicId);
          if (item) {
            // Directly set qrLoad property dynamically
            item.qrLoad = true;
          }

          try {
            const response = await this.$store.dispatch('guide/generateCommonId', { idmal, ideng });
            if (response) {
              item.qrLoad = false;  // Set to false after generating QR
              let message = 'Successfully generated QR';
              this.dialogGenerate = false;
              this.selectedItem = null;
              this.success(message);
              this.getTopics();
            }
          } catch (error) {
            let message = error.message + '!!';
            item.qrLoad = false;  // Set to false in case of error
            this.error(message);
          }
        }
      },

      async generate(topic) {
        this.selectedTopic = topic.topic;
        this.topicId = topic.mainUniqueId;

        // Reset qrLoad for all topics to avoid conflicts
        this.mainheadings.forEach((item) => {
          item.qrLoad = false;
        });

        try {
          let language = this.language == 1 ? 2 : 1;
          // console.log('lang',language)
          const response = await axios.get(`${this.$store.getters.getUrl}/api/guideAppQR/getAllDetailsByDataType?dtId=${language}`, {
            headers: {
              Authorization: `Bearer ${this.$store.getters.getToken}`
            }
          });

          if (response.status >= 200 && response.status < 300) {
            let filteredResponse = response.data.filter(item => !item.mainCommonId);
            this.topics = filteredResponse.map((topic) => {
              if (!topic.mainCommonId) {
                return {
                  title: topic.topic,
                  id: topic.mainUniqueId,
                };
              }
            });
          }
        } catch (error) {
          console.error(error);
        }

        this.dialogGenerate = true;
      },
      handleButtonClick() {
        this.buttonClicked = true;
        this.addTopic = true;
      },
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
        this.skeleton = true;
        try {
          const res = await this.$store.dispatch('guide/getGuideData',{lang:this.language});
          if (res) {
            this.skeleton = false;
          }
        }
        catch (error) {
          this.skeleton = false;
          console.error(error);
        }
      },
      translate(language) {
        this.$store.commit('display/setLanguage', language);
        this.getTopics()
      },
      async showDetails(item) {
        try {
          const response = await this.$store.dispatch('guide/getGuideTopic', {
            lang: this.language,
            id: item.mainCommonId
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
        console.log(this.editedItem)
        this.dialogDelete = true
      },
      async deleteItemConfirm() {
        this.loading = true;
        let success;
        try {
          if (this.editedItem.mainCommonId) {
            let id = this.editedItem.mainCommonId;
            success = await this.$store.dispatch('guide/deleteGuideTopic', { id: id })
          }
          else {
            let id = this.editedItem.mainUniqueId;
            success = await this.$store.dispatch('guide/deleteGuideTopicUid', { lang:this.language, id: id })
          }
          
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
        downloadQRCodeImage(qr, name) {
            const link = document.createElement('a');
            link.href = `data:image/png;base64,${qr}`;
            link.download = `${name}.png`;
            link.click();
        },
      async getType() {
        try {
          await this.$store.dispatch('display/getType');
        }
        catch (err) {
          console.error(err)
        }
      },
      async getAllLanguages() {
        try {
          await this.$store.dispatch('display/getAllLanguages');
        }
        catch (error) {
          console.error(error)
        }
      }, 
    },
  };
</script>
    <style scoped>
        :deep(.v-btn--variant-elevated) {
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

        /* .qr:hover {
    cursor: pointer;
  } */
    </style>
