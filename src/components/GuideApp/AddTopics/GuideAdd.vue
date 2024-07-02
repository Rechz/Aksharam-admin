<template>
  <v-container class="py-8 px-0" fluid>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
      <v-card width="600" rounded="3">
        <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{ dialogHead }}</v-card-title>
        <v-card-text class="px-5 text-center">
          <v-icon size="88" :class="icon" :color="color"></v-icon>
          <h5>{{ message }}</h5>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-stepper v-model="step" :items="items" hide-actions elevation="0" flat>
      <template v-if="step === 1">
        <h6 class="text-center mt-4 fw-bolder">Add Main Heading</h6>
        <p class="text-danger fst-italic" style="font-size: 14px;">
            **Please submit Malayalam & English data before proceeding to next page. Do not refresh the page to avoid data loss.
        </p>
        <v-card flat class="py-2">
          <v-form ref="form" @submit.prevent="submitHeading">
            <div class="d-flex gap-4">
              <div>
                <v-select class="select mb-2" label='Select Language' density="comfortable" 
                  :items="languages" v-model="language" :rules="languageRules" item-title="talk"
                  item-value="dtId" variant="outlined"></v-select>
                <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                  density="comfortable" class="select mb-2" :rules="titleRules"
                  variant="outlined"></v-text-field>
                <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc mb-2" rows="8"
                  v-model="description" :rules="descriptionRules" variant="outlined" counter></v-textarea>
                <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                  class="reference mb-2" rows="2" v-model="url" variant="outlined"></v-textarea>
              </div>
              <div class="d-flex flex-column ">
                <p class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malHeading }} (Malayalam) topic added.</p>
                <p class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engHeading }} (English) topic added.</p>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <div class="d-flex gap-2">
                <v-btn color="#386568" size="large" class="text-capitalize" type="submit"
                  :disabled="subload" variant="elevated" rounded :loading="subload" v-if="QRLoad">Add {{ topic }} topic</v-btn>
                <v-btn v-else color="#386568" size="large" class="text-capitalize" variant="outlined"
                  rounded :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
              </div>
              <div>
                <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                  @click="step++" v-if="!proceed && qrGenerated">Skip</v-btn>
              </div>
            </div>
          </v-form>
        </v-card>
      </template>
      <template v-else-if="step === 2">
        <h6 class="text-center mt-4 fw-bolder ">Main Heading Image</h6>
        <v-card flat>
          <div class="d-flex gap-3">
            <v-card flat class="mt-4" :disabled="imageLoad">
              <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="mb-1" accept="image/*">
              <div class="d-flex gap-4 flex-wrap ">
                <div v-for="(image, index) in imgPreview" :key="index" elevation="4" style="position: relative;">
                  <v-card height="100" width="200">
                    <img :src="image.url" alt="Uploaded Image" style="max-width: 200px; background-size: cover;">
                  </v-card>
                  <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)" size="32"
                    style="position:absolute; top: -16%; right:-6%" color="green-lighten-1"></v-icon>
                </div>
              </div>
            </v-card>
            <div class="d-flex flex-column align-items-end justify-content-center ">
              <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully uploaded.</h6>
            </div>
          </div>
          <div class="d-flex justify-content-between gap-3 my-2 w-100">
            <v-btn @click="uploadImages" color="#386568" size="large" variant="elevated" rounded
              :disabled="imageLoad" :loading="imageLoad" prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
            <div class="d-flex gap-2">
              <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                @click="step--">Back</v-btn>
              <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                @click="step++">Next</v-btn>
            </div>
          </div>
        </v-card>
      </template>
      <template v-else-if="step === 3">
        <h6 class="text-center mt-4 fw-bolder ">Main Heading Audio/Video</h6>
        <div class="my-3">
          <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
            v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId" variant="outlined"></v-select>
          <div class="d-flex flex-column gap-2">
            <v-card class="p-3 d-flex gap-2" flat :disabled="audioMalSubmit && audioEngSubmit">
              <div>
                <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2" accept="audio/*">
                <ul>
                  <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;" class="my-1">
                    <v-chip closable> {{ file.name }} </v-chip>
                  </li>
                </ul>
                <v-btn @click="submitAudio(fileType.audio)" color="#386568" size="large" variant="elevated" rounded prepend-icon="mdi-music"
                 class="text-capitalize" :disabled="audioLoad" :loading="audioLoad">Submit Audio</v-btn>
              </div>
              <div class="d-flex flex-column align-items-end justify-content-center ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="audioMalSubmit">**Malayalam audio successfully uploaded.</h6>
                <h6 class="text-success text-end fst-italic mb-0" v-if="audioEngSubmit">**English audio successfully uploaded.</h6>
              </div>
            </v-card>
            <v-card class="p-3 d-flex gap-2" flat :disabled="videoMalSubmit && videoEngSubmit">
              <div>
                <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2" accept="video/*">
                <ul>
                  <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;" class="my-1">
                    <v-chip closable> {{ file.name }} </v-chip>
                  </li>
                </ul>
                <v-btn @click="submitVideo(fileType.video)" color="#386568" size="large" variant="elevated" rounded prepend-icon="mdi-video" class="text-capitalize"
                  :disabled="videoLoad" :loading="videoLoad">Submit Video</v-btn>
              </div>
              <div class="d-flex flex-column align-items-end justify-content-center ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="videoMalSubmit">*Malayalam video successfully uploaded.</h6>
                <h6 class="text-success text-end fst-italic mb-0" v-if="videoEngSubmit">*English video successfully uploaded.</h6>
              </div>
            </v-card>
            <div class="d-flex justify-content-end">
                <div class="d-flex gap-2">
                  <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                    @click="step--">Back</v-btn>
                  <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                    @click="step++">Next</v-btn>
                </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center" v-if="!subhead">
          <v-btn color="green" class="mb-3" @click="subhead = true; " size="x-large" variant="outlined"
            append-icon="mdi-step-forward">Add Subheading</v-btn>
          <v-btn color="green" class="mb-3" @click="finish" variant="outlined"
            prepend-icon="mdi-step-backward">Finish & Add New Topic</v-btn>
        </div>
        <SubHeading v-else @add-new-topic="finish" :malHeading="malHeading" :engHeading="engHeading"
            @back-main="finish" :idmal="idmal" :ideng="ideng" @back="step = 4; subhead = false;" />
      </template>
    </v-stepper>
  </v-container>
</template>

<script>
import SubHeading from './SubHeading.vue';
import { mapGetters} from 'vuex';
export default {
    components: {SubHeading},
    data() {
      return {
        items: ['Main Topic','Upload Images','Upload Audio/Video','Subheadings'],
        QRLoad: true,
        QRLoading: false,
        malSubmit: false,
        engSubmit: false,
        imageSubmit: false,
        videoEngSubmit: false,
        videoMalSubmit: false,
        audioEngSubmit: false,
        audioMalSubmit: false,
        subhead: false,
        subload: false,
        imageLoad: false,
        videoLoad: false,
        audioLoad: false,
        images: [],
        imgPreview: [],
        step: 1,
        title: null,
        titleRules: [v => !!v || '*Title is required'],
        description: null,
        descriptionRules: [v => !!v || '*Description is required'],
        language: null,
        languageAV: null,
        languageRules: [v => !!v || '*Language is required'],
        url: null,
        urlRules: [v => !!v || '*URL is required'],
        audioFiles: [],
        videoFiles: [],
        message: '',
        loading: false,
        color: '',
        icon:'',
        dialogTopic: false,
        dialogHead: '',  
        qrGenerated: false   
      };
    },
    computed: {
      ...mapGetters('guide', ['getLanguageList', 'getFileTypes', 'getMedia', 'getidmal', 'getideng', 'getmalHeading','getengHeading']),
      proceed() {
        if ((this.malSubmit) && (this.engSubmit)) {
          return false;
        } else return true;
      },
      topic() {
        if (this.language === 1) return 'Malayalam'
        else if (this.language === 2) return 'English'
        else return '';
      },
      languages() {
        return this.getLanguageList;
      },
      fileTypes() {
        return this.getFileTypes;
      },
      fileType() {
        return this.getMedia;
      },
      idmal() {
        return this.getidmal;
      },
      ideng() {
        return this.getideng;
      },
      malHeading() {
        return this.getmalHeading;
      },
      engHeading() {
        return this.getengHeading;
      }  
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
      async submitHeading() {
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          this.subload = true;
          const language = this.language;
          const data = {
            "title": this.title,
            "description": '<pre>' + this.description + '</pre>',
            "referenceURL": this.url
          }
          try {
            const response = await this.$store.dispatch('guide/submitHeading', {
              language: language,
              data: data
            });
            if (response) {
              this.subload = false;
              if (this.language === 1) {
                this.malSubmit = true;
                const lang = this.languages.find(lang => lang.dtId === this.language);
                const message = `${this.malHeading} (${lang.talk}) added successfully!`;
                this.success(message);
                this.$refs.form.reset();
                this.language = 2;
              }
              else {
                this.engSubmit = true;
                const lang = this.languages.find(lang => lang.dtId === this.language);
                const message = `${this.engHeading} (${lang.talk}) added successfully!`;
                this.success(message);
                this.$refs.form.reset();
                this.language = 1;
              }
            }
          }
          catch (err) {
            this.subload = false;
            const message = err.message;
            this.error(message);
            console.error(err);
          }
        }
      },
      async generateQR() {
        this.QRLoading = true;
        try {
          const response = await this.$store.dispatch('guide/generateQR', {
            idmal: this.idmal,
            ideng: this.ideng
          });
          if (response) {
            this.QRLoading = false;
            this.qrGenerated = true;
            this.QRLoad = true;
            const message = 'QR code generated successfully. Proceed to next steps.';
            this.success(message);
            this.step++;
          }
        } 
        catch (error) {
          this.QRLoad = false;
          this.QRLoading = false;
          this.imageSubmit = false;
          const message = 'Error uploading images:' + error.message;
          this.error(message);     
        } 
      },
      handleFileUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = () => {
            this.images.push(file);
            this.imgPreview.push({ url: reader.result })
          };
          reader.readAsDataURL(file);
        }
      },
      removeImage(index) {
        this.imgPreview.splice(index, 1);
        this.images.splice(index, 1);
      },
      async uploadImages() {
        this.imageLoad = true;
        const formData = new FormData();
        this.images.forEach((image) => {
            formData.append("file", image);
        });
        const payload = {
          idmal: this.idmal,
          ideng: this.ideng,
          formData: formData
        }
        try {
          const response = await this.$store.dispatch('guide/uploadImages',payload);
          if (response) {
            this.imageLoad = false;
            this.imageSubmit = true;
            const message = 'Image uploaded successfully';
            this.success(message);
            this.images = [];
            this.imgPreview = [];
            this.$refs.imageFile.value = '';
          }
        } catch (error) {
          this.imageLoad = false;
          this.imageSubmit = false;
          const message = 'Error uploading images:' + error.message;
          this.error(message);
        }
      },
      handleAudio(event) {
        const selectedFiles = event.target.files[0];
        this.audioFiles.push(selectedFiles)
      },
      removeAudio(index) {
        this.audioFiles.splice(index, 1);
        this.$refs.fileAudio.value = '';
      },
      async submitAudio(id) {
        this.audioLoad = true;
        let uid = this.languageAV === 1 ? this.idmal : this.ideng;
        const formData = new FormData();
        this.audioFiles.forEach((file) => {
          formData.append("files", file);
        });
        try {
          const response = await this.$store.dispatch('guide/submitMedia', {
            uid: uid,
            formData: formData,
            id: id
          });
          let message;
          if (response) {
            this.audioLoad = false;
            if (this.languageAV === 1) {
              message = 'Malayalam audio uploaded successfully';
              this.audioMalSubmit = true;
            }
            else {
              message = 'English audio uploaded successfully';
              this.audioEngSubmit = true;
            }
            this.success(message);
            this.audioFiles = [];
            this.$refs.fileAudio.value = '';
          }
        }
        catch (err) {
          this.audioLoad = false;
          const message = 'Error uploading audio:' + err.message;
          this.error(message);
        }
      },
      handleVideo(event) {
        const selectedFiles = event.target.files[0];
        this.videoFiles.push(selectedFiles);
      },
      removeVideo(index) {
        this.videoFiles.splice(index, 1);
        this.$refs.fileVideo.value = '';
      },
      async submitVideo(id) {
        this.videoLoad = true;
        let uid = this.languageAV === 1 ? this.idmal : this.ideng;
        const formData = new FormData();
        this.videoFiles.forEach((file) => {
            formData.append("files", file);
        });
        try {
          const response = await this.$store.dispatch('guide/submitMedia', {
            uid: uid,
            formData: formData,
            id: id
          });
          let message;
          if (response) {
            this.videoLoad = false;
            if (this.languageAV === 1) {
              message = 'Malayalam video uploaded successfully';
              this.videoMalSubmit = true;
            }
            else {
              message = 'English video uploaded successfully';
              this.videoEngSubmit = true;
            }
            this.success(message);
            this.videoFiles = [];
            this.$refs.fileVideo.value = '';
          }
        }
        catch (err) {
          this.videoLoad = false;
          const message = 'Error uploading video:' + err.message;
          this.error(message);
        }
      },
      finish() {
        sessionStorage.clear();
        this.step = 1;
        this.$store.commit('guide/setMalHeading', '');
        this.$store.commit('guide/setEngHeading', '');
        this.$store.commit('guide/setIdmal', '');
        this.$store.commit('guide/setIdeng', '');
        this.subhead = false;
        this.malSubmit = false;
        this.engSubmit = false;
        this.audioEngSubmit = false;
        this.audioMalSubmit = false;
        this.videoEngSubmit = false;
        this.videoMalSubmit = false;
        this.imageSubmit = false;
        this.languageAV = null;
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
    },
    watch: {
      proceed(newValue) {
        if (!newValue) {
          this.language = null;
          this.QRLoad = false
        }
      }
    },
    created() {
      this.getAllLanguages();
      this.getType();
    },
};
</script>
<style scoped>
:deep(.select .v-input__control) {
    width: 500px !important;
}
:deep(.desc .v-input__control) {
    width: 800px !important;
}
:deep(.guide .v-input__control) {
    width: 250px !important;
}
:deep(.v-input__details) {
    padding-top: 1px;
}
:deep(.v-stepper-window){
    margin: 0;
}
:deep(.v-stepper-item__title){
  font-size: 12px;
}
:deep(.v-stepper-item .v-stepper-item__avatar){
  width: 20px !important;
  height: 20px !important;
}
:deep(.v-stepper-header) {
  box-shadow: none;
}
</style>