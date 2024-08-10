<template>
  <v-container class="py-2 px-0" fluid>
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
        <h6 class="text-center fw-bolder mb-2">Add Main Heading</h6>
        <p class="text-danger fst-italic my-0 ps-3" style="font-size: 14px;">
          **Please submit Malayalam & English data before proceeding to next page. Do not refresh the page to avoid data
          loss.
        </p>
        <v-card flat class="pt-2">
          <v-form ref="form" @submit.prevent="submitHeading">
            <div class="d-flex gap-4">
              <v-card flat :disabled="!QRLoad" class="p-3 pb-0">
                <v-select class="select mb-2" label='Select Language' density="comfortable" :items="languages"
                  v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"
                  variant="outlined"></v-select>
                <v-text-field v-model="title" :label="language == 1 ? 'തലക്കെട്ട്' : 'Heading'" density="comfortable"
                  class="select mb-2" :rules="titleRules" variant="outlined"></v-text-field>
                <v-textarea :label="language == 1 ? 'വിവരണം' : 'Description'" class="desc mb-2" rows="8"
                  v-model="description" variant="outlined" counter></v-textarea>
                <v-textarea :label="language == 1 ? 'റഫറൻസ്' : 'References'" density="comfortable" class="reference "
                  rows="2" v-model="url" variant="outlined" counter></v-textarea>
              </v-card>
              <div class="d-flex flex-column ">
                <p class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malHeading }} (Malayalam) topic
                  added.</p>
                <p class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engHeading }} (English) topic
                  added.
                </p>
              </div>
            </div>
            <div class="d-flex justify-content-between px-3">
              <div class="d-flex gap-2">
                <v-btn color="#386568" class="text-capitalize" type="submit" :disabled="subload" variant="elevated"
                  :loading="subload" v-if="QRLoad">Add {{ topic }} topic</v-btn>
                <v-btn v-else color="#386568" class="text-capitalize" variant="outlined" :disabled="QRLoad"
                  :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
              </div>
              <div>
                <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step++"
                  v-if="!proceed && qrGenerated">Skip</v-btn>
              </div>
            </div>
          </v-form>
        </v-card>
      </template>
      <template v-else-if="step === 2">
        <v-card flat class="mt-2" :disabled="bgLoad">
          <v-card-title class="py-1 bg-blue-grey-lighten-5 mb-3 fs-5">Main Topic Background Image</v-card-title>
          <v-card flat class="ms-3 my-3">
            <input type="file" ref="imageBg" @change="handleBgImage" class="d-none" accept="image/*">
            <v-btn @click="triggerFileInput" color="blue-grey-darken-4" variant="outlined" size="small"
              class="text-capitalize">
              Choose Background
            </v-btn>
            <template v-if="bgFile.length === 0">
              <label for="imageBg" class="ms-2">No background image chosen.</label>
            </template>
            <template v-else>
              <v-chip v-for="(file, index) in bgFile" :key="index" closable @click:close="removeBg(index)" class="ms-2">
                {{ file.name }}
              </v-chip>
            </template>
            <v-img v-if="imageBg" :src="imageBg" width="200" height="100" class="mt-3" cover
              style="background-position: center; max-width: 200px;"></v-img>
            <div class="mt-3">
              <v-btn @click="uploadBg" color="#386568" variant="elevated" :disabled="bgLoad" :loading="bgLoad"
                prepend-icon="mdi-upload" class="text-capitalize">Upload Background</v-btn>
            </div>
          </v-card>
          <div class="d-flex gap-3 mt-3">
            <div class="d-flex flex-column align-items-end justify-content-center ">
              <h6 class="text-success text-end fst-italic mb-0" v-if="bgSubmit">*Background image successfully uploaded.
              </h6>
            </div>
          </div>
        </v-card>
        <v-card flat class="mt-2" :disabled="imageLoad">
          <v-card-title class="py-1 bg-blue-grey-lighten-5 mb-3">Main Topic Images</v-card-title>
          <v-card flat class="ms-3">
            <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="d-none" accept="image/*">
            <v-btn @click="triggerImageInput" color="blue-grey-darken-4" variant="outlined" size="small"
              class="text-capitalize">Choose Images</v-btn>
            <template v-if="imgPreview.length === 0">
              <label for="imageFile" class="ms-2">No images chosen.</label>
            </template>
            <template v-else>
              <div class="mt-2">
                <v-chip v-for="file in images" :key="file.name" closable @click:close="removeImage(file)"
                  class="me-2 mb-1">
                  {{ file.name }}
                </v-chip>
              </div>
            </template>
            <div class="d-flex gap-2 flex-wrap mt-3" v-if="imgPreview.length > 0">
              <div v-for="image in imgPreview" :key="image.url" elevation="4" style="position: relative;">
                <v-img :src="image.url" alt="Uploaded Image" style="max-width: 200px;" width="200" height="100"
                  cover></v-img>
              </div>
            </div>
            <div class="mt-3">
              <v-btn @click="uploadImages" color="#386568" variant="elevated" :disabled="imageLoad" :loading="imageLoad"
                prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
            </div>
          </v-card>
          <div class="d-flex gap-3 mt-3">
            <div class="d-flex flex-column align-items-end justify-content-center ">
              <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Images successfully uploaded.</h6>
            </div>
          </div>
        </v-card>
        <!-- <div class="d-flex justify-content-between gap-3 mt-3 w-100"> -->

        <v-card class="d-flex gap-2 justify-content-end" flat :disabled="imageLoad">
          <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step--">Back</v-btn>
          <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step++">Next</v-btn>
        </v-card>
        <!-- </div> -->
      </template>
      <template v-else-if="step === 3">
        <h6 class="text-center mb-2 fw-bolder ">Main Heading Audio/Video</h6>
        <div class="my-3">
          <div class="d-flex flex-column gap-2">
            <v-card-title class="py-1 bg-blue-grey-lighten-5">Audio</v-card-title>
            <v-card class="p-3 d-flex gap-2" flat :disabled="audioMalSubmit && audioEngSubmit">
              <div>
                <v-select class="select mb-2" label="Select Language" density="comfortable" :items="languages"
                  v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"
                  variant="outlined"></v-select>
                <div class="mb-3">
                  <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2 d-none" accept="audio/*">
                  <v-btn @click="triggerAudioInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">Choose Audio</v-btn>
                  <template v-if="audioFiles.length === 0">
                    <label for="fileAudio" class="ms-2">No audio chosen.</label>
                  </template>
                  <template v-else>
                    <div class="mt-2">
                      <v-chip v-for="file in audioFiles" :key="file.name" closable @click:close="removeAudio(file)"
                        class="me-2 mb-1">
                        {{ file.name }}
                      </v-chip>
                    </div>
                  </template>
                </div>
                <v-btn @click="submitAudio(fileType.audio)" color="#386568" variant="elevated" prepend-icon="mdi-music"
                  class="text-capitalize" :disabled="audioLoad" :loading="audioLoad">Submit Audio</v-btn>
              </div>
              <div class="d-flex flex-column align-items-end justify-content-center ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="audioMalSubmit">**Malayalam audio successfully
                  uploaded.</h6>
                <h6 class="text-success text-end fst-italic mb-0" v-if="audioEngSubmit">**English audio successfully
                  uploaded.</h6>
              </div>
            </v-card>
            <v-card-title class="py-1 bg-blue-grey-lighten-5">Video</v-card-title>
            <v-card class="p-3 d-flex gap-2" flat :disabled="videoSubmit">
              <div>
                <div class="mb-3">
                  <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2 d-none" accept="video/*">
                  <v-btn @click="triggerVideoInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">Choose Video</v-btn>
                  <template v-if="videoFiles.length === 0">
                    <label for="fileVideo" class="ms-2">No video chosen.</label>
                  </template>
                  <template v-else>
                    <div class="mt-2">
                      <v-chip v-for="file in videoFiles" :key="file.name" closable @click:close="removeVideo(file)"
                        class="me-2 mb-1">
                        {{ file.name }}
                      </v-chip>
                    </div>
                  </template>
                </div>
                <v-btn @click="submitVideo(fileType.video)" color="#386568" variant="elevated" prepend-icon="mdi-video"
                  class="text-capitalize" :disabled="videoLoad" :loading="videoLoad">Submit Video</v-btn>
              </div>
              <div class="d-flex flex-column align-items-end justify-content-center ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="videoSubmit">*Video successfully uploaded.</h6>
              </div>
            </v-card>
            <div class="d-flex justify-content-end">
              <v-card class="d-flex gap-2" flat :disabled="audioLoad || videoLoad">
                <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step--">Back</v-btn>
                <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step++">Next</v-btn>
              </v-card>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center"
          v-if="!subhead">
          <v-btn color="green" class="mb-3" @click="subhead = true; " size="x-large" variant="outlined"
            append-icon="mdi-step-forward">Add Subheading</v-btn>
          <v-btn color="green" class="mb-3" @click="finish" variant="outlined" prepend-icon="mdi-step-backward">Finish &
            Add New Topic</v-btn>
        </div>
        <SubHeading v-else @add-new-topic="finish" :malHeading="malHeading" :engHeading="engHeading" @back-main="finish"
          :idmal="idmal" :ideng="ideng" @back="step = 4; subhead = false;" />
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
        videoSubmit: false,
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
        language: null,
        languageAV: null,
        languageRules: [v => !!v || '*Language is required'],
        url: null,
        audioFiles: [],
        videoFiles: [],
        message: '',
        loading: false,
        color: '',
        icon:'',
        dialogTopic: false,
        dialogHead: '',  
        qrGenerated: false,
        bgFile: [],
        imageBg: null,
        files: [],
        bgLoad: false,
        bgSubmit: false 
      };
    },
    computed: {
      ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia', 'getidmal', 'getideng', 'getmalHeading', 'getengHeading', 'getCommonIdMain']),
      proceed() {
        if ((this.malSubmit) && (this.engSubmit)) {
          return false;
        } else return true;
      },
      audioCheck() {
        return this.audioEngSubmit && this.audioMalSubmit;
      },
      topic() {
        if (this.language == 1) return 'Malayalam'
        else if (this.language == 2) return 'English'
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
      commonId() {
        return this.getCommonIdMain;
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
            "description": this.description,
            "referenceURL": this.url
          }
          try {
            const response = await this.$store.dispatch('display/submitHeading', {
              language: language,
              data: data
            });
            if (response) {
              this.subload = false;
              if (this.language == 1) {
                this.malSubmit = true;
                const lang = this.languages.find(lang => lang.dtId == this.language);
                const message = `${this.malHeading} (${lang.talk}) added successfully!`;
                this.success(message);
                this.$refs.form.reset();
                this.language = 2;
              }
              else {
                this.engSubmit = true;
                const lang = this.languages.find(lang => lang.dtId == this.language);
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
          const response = await this.$store.dispatch('display/generateQR', {
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
          this.bgSubmit = false;
          const message = error.message;
          this.error(message);     
        } 
      },
      triggerFileInput() {
        this.$refs.imageBg.click();
      },
      handleBgImage(event) {
        const file = event.target.files[0];
        if (file) {
          this.bgFile = [file]; // Only handle one file
          this.updateImageUrl(file);
        }
      },
      removeBg(index) {
        this.bgFile.splice(index, 1);
        this.imageBg = null;
      },
      updateImageUrl(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageBg = e.target.result;
        };
        reader.readAsDataURL(file);
      },
      triggerImageInput() {
        this.$refs.imageFile.click();
      },
      handleFileUpload(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const reader = new FileReader();
          reader.onload = () => {
            this.images.push(file);
            this.imgPreview.push({ url: reader.result, file });
          };
          reader.readAsDataURL(file);
        }
      },
      removeImage(image) {
        const imgIndex = this.images.findIndex(img => img === image);
        if (imgIndex !== -1) {
          this.imgPreview.splice(imgIndex, 1);
          this.images.splice(imgIndex, 1);
        }
      },
      // removeImageIndex(index) {
      //   this.imgPreview.splice(index, 1);
      //   this.images.splice(index, 1);
      // },
      async uploadBg() {
        this.bgLoad = true;
        const formData = new FormData();
        formData.append("bgFile", this.bgFile[0])
        const payload = {
          commonId: this.commonId,
          formData: formData
        }
        try {
          const response = await this.$store.dispatch('display/uploadBackgroundImage', payload);
          if (response) {
            this.bgLoad = false;
            this.bgSubmit = true;
            const message = 'Image uploaded successfully';
            this.success(message);
            this.bgFile = [];
            this.imageBg = null;
          }
        } catch (error) {
          this.bgLoad = false;
          this.bgSubmit = false;
          const message = 'Error uploading images:' + error.message;
          this.error(message);
        }
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
          const response = await this.$store.dispatch('display/uploadImages',payload);
          if (response) {
            this.imageLoad = false;
            this.imageSubmit = true;
            const message = 'Image uploaded successfully';
            this.success(message);
            this.images = [];
            this.imgPreview = [];
            this.bgFile = [];
              this.imageBg = null;
            this.$refs.imageFile.value = '';
          }
        } catch (error) {
          this.imageLoad = false;
          this.imageSubmit = false;
          const message = 'Error uploading images:' + error.message;
          this.error(message);
        }
      },
      triggerAudioInput() {
        this.$refs.fileAudio.click();
      },
      handleAudio(event) {
        const selectedFiles = event.target.files[0];
        this.audioFiles.push(selectedFiles)
      },
      removeAudio(file) {
        const audioIndex = this.audioFiles.findIndex(aud => aud === file);
        this.audioFiles.splice(audioIndex, 1);
        this.$refs.fileAudio.value = '';
      },
      async submitAudio(id) {
        this.audioLoad = true;
        let uid;
        if (this.languageAV == 1) {
          uid = this.idmal
        } else if (this.languageAV == 2) {
          uid = this.ideng;
        }
        const formData = new FormData();
        this.audioFiles.forEach((file) => {
          formData.append("files", file);
        });
        try {
          const response = await this.$store.dispatch('display/submitMedia', {
            uid: uid,
            formData: formData,
            id: id
          });
          let message;
          if (response) {
            this.audioLoad = false;
            if (this.languageAV == 1) {
              message = 'Malayalam audio uploaded successfully';
              this.audioMalSubmit = true;
              this.languageAV = 2;
            }
            else {
              message = 'English audio uploaded successfully';
              this.audioEngSubmit = true;
              this.languageAV = 1;
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
      triggerVideoInput() {
        this.$refs.fileVideo.click();
      },
      handleVideo(event) {
        const selectedFiles = event.target.files[0];
        this.videoFiles.push(selectedFiles);
      },
      removeVideo(file) {
        const videoIndex = this.videoFiles.findIndex(vid => vid === file);
        this.videoFiles.splice(videoIndex, 1);
        this.$refs.fileVideo.value = '';
      },
      async submitVideo(id) {
        this.videoLoad = true;
        let uid;
        uid = this.commonId;
        const formData = new FormData();
        this.videoFiles.forEach((file) => {
            formData.append("files", file);
        });
        try {
          const response = await this.$store.dispatch('display/submitMedia', {
            uid: uid,
            formData: formData,
            id: id
          });
          let message;
          if (response) {
            this.videoLoad = false;
            message = 'Video uploaded successfully';
            this.videoSubmit = true;
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
        this.$store.commit('display/setMalHeading', '');
        this.$store.commit('display/setEngHeading', '');
        this.$store.commit('display/setIdmal', '');
        this.$store.commit('display/setIdeng', '');
        this.subhead = false;
        this.malSubmit = false;
        this.engSubmit = false;
        this.audioEngSubmit = false;
        this.audioMalSubmit = false;
        this.videoSubmit = false;
        this.imageSubmit = false;
        this.bgSubmit = false;
        this.languageAV = null;
      },
      async getType() {
        try {
          await this.$store.dispatch('display/getType');
        }
        catch (err) {
          console.log(err)
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
    watch: {
      proceed(newValue) {
        if (!newValue) {
          this.language = null;
          this.QRLoad = false
        }
      },
      audioCheck(newValue) {
        if (newValue) {
          this.languageAV = null;
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