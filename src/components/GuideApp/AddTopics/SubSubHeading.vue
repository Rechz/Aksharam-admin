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
      <h6 class="text-center mt-4 fw-bolder ">Add Sub of Subheading -{{ count }} ({{ engHeading }})</h6>
      <p class="text-danger fst-italic mt-1" style="font-size: 14px;">
        **Please submit Malayalam & English data before proceeding to next page. Do not refresh the page to avoid data loss.
      </p>
      <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
        <div class="d-flex">
          <div>
            <v-select class="select mb-2" label='Select Language' density="comfortable" :items="languages" variant="outlined"
                v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
            <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Sub Heading'"
                density="comfortable" class="select mb-2" :rules="titleRules" variant="outlined"></v-text-field>
            <v-textarea :label="language === 1 ? 'വിവരണം' : 'Subheading Description'" class="desc mb-2" rows="8"
                v-model="description" :rules="descriptionRules" variant="outlined"></v-textarea>
            <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                class="reference" rows="2" v-model="url" variant="outlined"></v-textarea>
          </div>
          <div class="d-flex flex-column ">
            <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malSubHeading }} (Malayalam) subtopic added.</h6>
            <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engSubHeading }} (English) subtopic added.</h6>
          </div>
        </div>
        <div class="d-flex justify-content-between  gap-2">
          <div class="d-flex gap-2">
            <v-btn v-if="QRLoad" color="#386568" size="large" class="text-capitalize" type="submit"
                :disabled="subload" variant="elevated" rounded :loading="subload">Add {{ topic }} sub topic</v-btn>
            <v-btn v-else color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
          </div>
          <div class="d-flex gap-2">
            <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                @click="back">Back</v-btn>
            <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                v-if="!proceed && qrGenerated" @click="step++">Skip</v-btn>
          </div>
        </div>
      </v-form>
    </template>
    <template v-else-if="step === 2">
      <h5 class="text-center mt-4 fw-bolder ">Sub of subheading Images</h5>
      <v-card flat>
        <div class="d-flex gap-3">
          <v-card flat class="mt-4" :disabled="imageLoad">
              <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="mb-1" accept="image/*">
              <div class="d-flex gap-4 flex-wrap ">
                <div v-for="(image, index) in imgPreview" :key="index" elevation="4" style="position: relative;">
                   <v-card height="100" width="200">
                    <img :src="image.url" alt="Uploaded Image" style="max-width: 200px; background-size: cover;">
                   </v-card>
                   <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)" size="32" style="position:absolute; top: -16%; right:-6%" color="green-lighten-1"></v-icon>
                </div>
              </div>
          </v-card>
          <div class="d-flex flex-column align-items-end justify-content-center ">
            <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully uploaded.</h6>
          </div>
        </div>
        <div class="d-flex justify-content-between gap-3 my-2 w-100">
            <v-btn @click="uploadImages" color="#386568" size="large" variant="elevated" rounded :disabled="imageLoad" 
            :loading="imageLoad" prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
            <div class="d-flex gap-2">
              <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded  @click="step--">Back</v-btn>
              <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded  @click="step++">Next</v-btn>
            </div>
        </div>
      </v-card>
    </template>
    <template v-else-if="step === 3">
      <h5 class="text-center mt-4 fw-bolder ">Sub of subheading Audio/Video</h5>
      <div class="my-3">
        <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages" variant="outlined"
            v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
          <div class="d-flex flex-column gap-2">
            <v-card class="p-3 d-flex gap-2" flat :disabled="audioMalSubmit && audioEngSubmit">
              <div>
                <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2" accept="audio/*">
                <ul>
                  <li v-for=" (file, index) in audioFiles" :key="index" style="list-style: none;" class="my-1">
                    <v-chip closable>{{ file.name }}</v-chip>
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
                  <li v-for=" (file, index) in videoFiles" :key="index" style="list-style: none;" class="my-1">
                    <v-chip closable>{{ file.name }}</v-chip>
                  </li>
                </ul>
                <v-btn @click="submitVideo(fileType.video)" color="#386568" size="large" variant="elevated"
                    rounded prepend-icon="mdi-video" class="text-capitalize" :disabled="videoLoad" :loading="videoLoad">Submit Video</v-btn>
              </div>
              <div class="d-flex flex-column align-items-end justify-content-center ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="videoMalSubmit">*Malayalam video successfully uploaded.</h6>
                <h6 class="text-success text-end fst-italic mb-0" v-if="videoEngSubmit">*English video successfully uploaded.</h6>
              </div>
            </v-card>
            <div class="d-flex justify-content-end">
              <div class="d-flex gap-2">
                <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded @click="step--">Back</v-btn>
                <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded @click="step++">Next</v-btn>
              </div>
            </div>
          </div>
      </div>
    </template>
    <template v-else>
      <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center">
        <v-btn color="green" class="mb-3" @click="finish" size="x-large" append-icon="mdi-step-forward"
          variant="outlined">Add another sub of Subheadings</v-btn>
        <v-btn color="green" class="mb-3" @click="addNewSub" prepend-icon="mdi-step-backward"
          variant="outlined">Back to add new main Subheadings</v-btn>
        <v-btn color="green" class="mb-3" @click="addNewTopic" prepend-icon="mdi-step-backward-2"
          variant="outlined">Finish & add new main topic</v-btn>
      </div>
    </template>
  </v-stepper>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    emits: ['add-new-sub', 'add-new-topic', 'back'],
    props: ['idmal', 'ideng', 'malHeading', 'engHeading'],
    data() {
      return {
        items: ['Sub of Subheading Topic', 'Upload Images', 'Upload Audio/Video', 'Actions'],
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
        count: 1,
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
        icon: '',
        dialogTopic: false,
        dialogHead: '',
        qrGenerated: false,
        QRLoad: true,
        QRLoading: false,
      };
    },
  computed: {
    ...mapGetters('guide', ['getLanguageList', 'getFileTypes', 'getMedia', 'getsub2idmal', 'getsub2ideng', 'getmalSub2Heading', 'getengSub2Heading']),
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
        subidmal() {
          return this.getsub2idmal;
        },
        subideng() {
          return this.getsub2ideng;
        },
        malSubHeading() {
          return this.getmalSub2Heading;
        },
        engSubHeading() {
          return this.getengSub2Heading;
        }  
    },
    methods: {
      back() {
        this.$emit('back');
      },
      addNewTopic() {
        this.$emit('add-new-topic');
      },
      addNewSub() {
        this.$emit('add-new-sub');
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
      async submitHeading() {
        let message;
        let language = this.languages.find(lang => lang.dtId === this.language);
        this.subload = true;
        let uid = this.language === 1? this.idmal : this.ideng;
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          try {
            const payload = {
              data: {
                "title": this.title,
                "description": this.description,
                "referenceURL": this.url
              },
              uid: uid,
              lang: this.language
            };
            const response = await this.$store.dispatch('guide/submitSub2Head', payload);
            if (response) {
              this.subload = false;
              if (this.language === 1) {
                message = `${this.malSubHeading} (${language.talk}) subheading added successfully!`;
                this.success(message);
                this.malSubmit = true;
                this.$refs.form.reset();
                this.language = 2;
              }
              else {
                message = `${this.engSubHeading} (${language.talk}) subheading added successfully!`;
                this.success(message)
                this.engSubmit = true;
                this.$refs.form.reset();
                this.language = 1;
              }
            }
          }
          catch (err) {
            this.subload = false;
            message = err.message;
            this.error(message);
          }
        }
      },
      async generateQR() {
        this.QRLoading = true;
        let message;
        const payload = {
          subideng: this.subideng,
          subidmal: this.subidmal
        }
        try {
          const response = await this.$store.dispatch('guide/generateQRSub2', payload);
          if (response) { 
            this.QRLoading = false;
            message = 'Proceed to next steps.';
            this.success(message);
            this.qrGenerated = true;
            this.QRLoad = true;
            this.step++;
          }
        }
        catch (error) {
          this.QRLoad = false;
          this.QRLoading = false;
          this.imageSubmit = false;
          message = 'Error uploading images:' + error.message;
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
      async uploadImages() {
        this.imageLoad = true;
        let message;
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
          const response = await this.$store.dispatch('guide/uploadSub2Images',payload);
          if (response) {
            this.imageLoad = false;
            this.imageSubmit = true;
            message = 'Image uploaded successfully';
            this.success(message);
            this.images = [];
            this.imgPreview = [];
            this.$refs.imageFile.value = '';
          }
        }
        catch(error) {
          this.imageLoad = false;
          this.imageSubmit = false;
          message = 'Error uploading images:' + error.message;
          this.error(message);
        }
      },
      removeImage(index) {
        this.imgPreview.splice(index, 1);
        this.images.splice(index, 1);
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
        let message;
        let uid = this.languageAV === 1 ? this.subidmal: this.subideng;
        const formData = new FormData();
        this.audioFiles.forEach((file) => {formData.append("files", file);});
        const payload={
          uid: uid,
          formData: formData,
          id:id
        }
        try {
          const response = await this.$store.dispatch('guide/submitSub2Media',payload);
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
          message = 'Error uploading audio:' + err.message;
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
        let message;
        let uid = this.languageAV === 1 ? this.subidmal : this.subideng;
        const formData = new FormData();
        this.videoFiles.forEach((file) => { formData.append("files", file); });
        const payload={
          uid: uid,
          formData: formData,
          id:id
        }
        try {
          const response = await this.$store.dispatch('guide/submitSub2Media', payload);
          if (response.status >= 200 && response.status < 300) {
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
          message = 'Error uploading video:' + err.message;
          this.error(message);
        }
      },
      finish() {
        sessionStorage.clear();
        this.step = 1
        this.count++;
        this.$store.commit('guide/setMalSub2Heading', '');
        this.$store.commit('guide/setEngSub2Heading', '');
        this.$store.commit('guide/setSubid2mal', '');
        this.$store.commit('guide/setSubid2eng', '');
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
    },
    watch: {
      proceed(newValue) {
        if (!newValue) {
          this.language = null;
          this.QRLoad = false;
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