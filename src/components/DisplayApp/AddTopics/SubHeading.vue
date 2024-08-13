<template>
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
  <v-stepper v-model="step" :items="items" hide-actions elevation="0" flat>
    <template v-if="step === 1">
      <h6 class="text-center mt-3 fw-bolder">Add Sub Heading - {{ count }} ({{ engHeading }})</h6>
      <p class="text-danger fst-italic mt-1 mb-0" style="font-size: 14px;">
        **Please submit Malayalam & English data before proceeding to next page. Do not refresh the page to avoid data
        loss.</p>
      <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
        <div class="d-flex">
          <v-card flat :disabled="!QRLoad" class="p-3 pb-0">
            <v-select class="select mb-2" label='Select Language' density="comfortable" :items="languages"
              v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"
              variant="outlined"></v-select>
            <v-text-field v-model="title" :label="language == 1 ? 'തലക്കെട്ട്' : 'Sub Heading'" density="comfortable"
              class="select mb-2" variant="outlined"></v-text-field>
            <v-textarea :label="language == 1 ? 'വിവരണം' : 'Subheading Description'" class="desc mb-2" rows="8"
              v-model="description" variant="outlined" counter></v-textarea>
            <v-textarea :label="language == 1 ? 'റഫറൻസ്' : 'References'" density="comfortable" class="reference"
              rows="2" v-model="url" variant="outlined" counter></v-textarea>
          </v-card>
          <div class="d-flex flex-column ">
            <p class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malSubHeading }} (Malayalam) subtopic
              added.</p>
            <p class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engSubHeading }} (English) subtopic
              added.</p>
          </div>
        </div>
        <div class="d-flex justify-content-between  gap-2 px-3">
          <div class="d-flex gap-2">
            <v-btn v-if="QRLoad" color="#386568" class="text-capitalize" type="submit" :disabled="subload"
              variant="elevated" :loading="subload">Add {{ topic }} sub topic
            </v-btn>
            <v-btn v-else color="#386568" class="text-capitalize" variant="outlined" :disabled="QRLoad"
              :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
          </div>
          <div class="d-flex gap-2">
            <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="back">Back</v-btn>
            <v-btn color="#386568" class="text-capitalize" variant="outlined" v-if="!proceed && qrGenerated"
              @click="step++">Skip</v-btn>
          </div>
        </div>
      </v-form>
    </template>
    <template v-else-if="step === 2">
      <v-card flat class="mt-2" :disabled="bgLoad || bgSubmit">
        <v-card-title class="py-1 bg-blue-grey-lighten-5 mb-3 fs-5">Subheading Background Image</v-card-title>
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
        <v-card-title class="py-1 bg-blue-grey-lighten-5 mb-3">Subheading Images</v-card-title>
        <v-card flat class="ms-3">
          <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="d-none" accept="image/*">
          <v-btn @click="triggerImageInput" color="blue-grey-darken-4" variant="outlined" size="small"
            class="text-capitalize">Choose Images</v-btn>
          <template v-if="imgPreview.length === 0">
            <label for="imageBg" class="ms-2">No images chosen.</label>
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
      <v-card class="d-flex gap-2 justify-content-end" flat :disabled="imageLoad">
        <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step--">Back</v-btn>
        <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step++">Next</v-btn>
      </v-card>
    </template>
    <template v-else-if="step === 3">
      <h6 class="text-center mb-2 fw-bolder ">Subheading Audio/Video</h6>
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
                <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2 d-none" accept="video/*" multiple>
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
            <div class="d-flex gap-2" :disabled="audioLoad || videoLoad">
              <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step--">Back</v-btn>
              <v-btn color="#386568" class="text-capitalize" variant="outlined" @click="step++">Next</v-btn>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center"
        v-if="!subhead">
        <v-btn color="green" class="mb-3" @click="subhead = true; action = false" size="x-large" variant="outlined"
          append-icon="mdi-step-forward">Add Sub of Subheading</v-btn>
        <v-btn color="green" class="mb-3" @click="finish" prepend-icon="mdi-step-backward" variant="outlined">Add New
          Subheading</v-btn>
        <v-btn color="green" class="mb-3" @click="addNewTopic" prepend-icon="mdi-step-backward-2"
          variant="outlined">Finish & Add New Main Topic</v-btn>
      </div>
      <SubSubHeading v-else @add-new-sub="finish" @add-new-topic="backMain" @back="subhead = false; step = 4;"
        :idmal="subidmal" :ideng="subideng" :malHeading="malSubHeading" :engHeading="engSubHeading" />
    </template>
  </v-stepper>
</template>

<script>
import SubSubHeading from './SubSubHeading.vue'
import { mapGetters } from 'vuex';
export default {
    components: {SubSubHeading},
    emits: ['add-new-topic', 'back-main', 'back'],
    props: ['idmal','ideng', 'malHeading', 'engHeading'],
    data() {
      return {
        items: ['Subheading Topic','Upload Images','Upload Audio/Video','Sub of Subheadings'], 
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
        count:1,
        title: null,
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
        icon: '',
        dialogTopic: false,
        dialogHead: '',   
        qrGenerated: false,
        QRLoad: true,
        QRLoading: false,
        bgFile: [],
        imageBg: null,
        bgLoad: false,
        bgSubmit: false   
      };
    },
    computed: {
      ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia', 'getsubidmal', 'getsubideng', 'getmalSubHeading', 'getengSubHeading','getCommonIdSub']),
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
      subidmal() {
        return this.getsubidmal;
      },
      subideng() {
        return this.getsubideng;
      },
      commonId() {
        return this.getCommonIdSub;
      },
      malSubHeading() {
        return this.getmalSubHeading;
      },
      engSubHeading() {
        return this.getengSubHeading;
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
        this.subload = true;
        let uid = this.language == 1 ? this.idmal : this.ideng;
        const language = this.language;
        const data = {
          "title": this.title,
          "description": this.description,
          "referenceURL": this.url
        };
        const payload = {
          uid: uid,
          lang: language,
          data: data 
        }
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          try {
            const response = await this.$store.dispatch('display/submitSubHead',payload);
            if (response) {
              this.subload = false;
              let language = this.languages.find(lang => lang.dtId == this.language);
              let message;
              if (this.language == 1) {
                message = `${this.malSubHeading} (${language.talk}) subheading added successfully!`;
                this.success(message);
                this.malSubmit = true;
                this.$refs.form.reset();
                this.language = 2;
              }
              else {
                message = `${this.engSubHeading} (${language.talk}) subheading added successfully!`;
                this.success(message);
                this.engSubmit = true;
                this.$refs.form.reset();
                this.language = 1;
              }
            }
          }
          catch (err) {
            this.subload = false;
            let message = err.message;
            this.error(message);
            console.error(err);
          }
        }
      },
      async generateQR() {
        let message;
        this.QRLoading = true;
        const payload = {
          subideng: this.subideng,
          subidmal: this.subidmal
        }
        try {
          const response = await this.$store.dispatch('display/generateQRSub', payload);
          if (response) {
            this.QRLoading = false;
            message = 'Proceed to next steps.';
            this.qrGenerated = true;
            this.QRLoad = true;
            this.success(message);
            this.step++;
          }
        }
        catch (error) {
          this.QRLoad = false;
          this.QRLoading = false;
          this.bgSubmit = false;
          this.imageSubmit = false;
          message = 'Error uploading images:' + error.message;
          this.error(message);
        }
      },
      triggerFileInput() {
        this.$refs.imageBg.click();
      },
      handleBgImage(event) {
        const file = event.target.files[0];
        if (file) {
          this.bgFile = [file]; 
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
          let message;
          this.imageLoad = true;
          const formData = new FormData();
          this.images.forEach((image) => {
            formData.append("files", image);
          });
          const payload = {
            subideng: this.subideng,
            subidmal: this.subidmal,
            formData: formData
          }
          try {
            const response = await this.$store.dispatch('display/uploadSubImages',payload);
            if (response) {
              this.imageLoad = false;
              this.imageSubmit = true;
              message = 'Image uploaded successfully';
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
              message = 'Error uploading images:' + error.message;
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
        let message;
        let uid;
        if (this.languageAV == 1) {
          uid = this.subidmal
        } if (this.languageAV == 2) {
          uid = this.subideng;
        }
        const formData = new FormData();
        this.audioFiles.forEach((file) => { formData.append("files", file);});
        const payload = {
          uid: uid,
          id: id,
          formData: formData
        }  
        try {
          const response = await this.$store.dispatch('display/submitSubMedia',payload);
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
          message = 'Error uploading audio:' + err.message;
          this.error(message);
        }
      },
      triggerVideoInput() {
        this.$refs.fileVideo.click();
      },
      handleVideo(event) {
        const selectedFiles = event.target.files;
        for (let i = 0; i < selectedFiles.length; i++) {
          this.videoFiles.push(selectedFiles[i]);
        }
      },
      removeVideo(file) {
        const videoIndex = this.videoFiles.findIndex(vid => vid === file);
        this.videoFiles.splice(videoIndex, 1);
        this.$refs.fileVideo.value = '';
      },
      async submitVideo(id) {
        let message;
        this.videoLoad = true;
        let uid;
        uid = this.commonId;
        const formData = new FormData();
        this.videoFiles.forEach((file) => { formData.append("files", file);});
        const payload = {
          uid: uid,
          id: id,
          formData: formData
        }
        try {
          const response = await this.$store.dispatch('display/submitSubMedia', payload);
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
          message = 'Error uploading video:' + err.message;
          this.error(message);
        }
      },
      finish() {
        sessionStorage.clear();
        this.step = 1
        this.count++
        this.$store.commit('display/setMalSubHeading', '');
        this.$store.commit('display/setEngSubHeading', '');
        this.$store.commit('display/setSubidmal', '');
        this.$store.commit('display/setSubideng', '');
        this.subhead = false;
        this.malSubmit = false;
        this.engSubmit = false;
        this.audioEngSubmit = false;
        this.audioMalSubmit = false;
        this.videoSubmit = false;
        this.imageSubmit = false;
        this.bgSubmit = false;
        this.languageAV = null;
        this.qrGenerated = false;
        this.images = [];
        this.imgPreview = [];
        this.bgFile = [];
        this.videoFiles = [];
        this.audioFiles = [];
      },
      back() {
        this.$emit('back');  
      },
      addNewTopic() {
        this.finish();
        this.$emit('add-new-topic'); 
      },
      backMain() {
        this.finish();
        this.$emit('back-main'); 
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
:deep(.v-stepper-window) {
    margin: 0;
}
:deep(.v-stepper-item .v-stepper-item__avatar) {
  width: 20px !important;
  height: 20px !important;
}
:deep(.v-stepper-header) {
  box-shadow: none;
}
</style>