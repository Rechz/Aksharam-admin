<template>
  <v-card v-if="!subheading">
    <v-card-title class="text-center text-white d-flex justify-content-between px-4 fixed-top"
      style="background-color: #2C7721;">
      <h5>{{ main? 'Edit Topic': 'Edit Subheading'}}</h5>
      <v-icon color="white" size="24" @click="dialogClose">mdi-close</v-icon>
    </v-card-title>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
      <v-card width="600" rounded="3">
        <v-card-title class="text-center text-white" :style="{backgroundColor: color}">{{ dialogHead}}</v-card-title>
        <v-card-text class="px-5 text-center">
          <v-icon size="88" :class="icon" :color="color"></v-icon>
          <h6>{{ message }}</h6>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-card-text class="px-5 pb-5 pt-4 mt-5">
      <div>
        <v-form class="pt-0" ref="form" @submit.prevent="editTopic">
          <v-text-field v-model="editTitle" label='Heading' variant="outlined" density="comfortable" class="select"></v-text-field>
          <v-textarea label='Description' class="desc" rows="10" v-model="editDescription" variant="outlined" counter></v-textarea>
          <v-textarea label='References' density="comfortable" class="reference" rows="2" v-model="editUrl" variant="outlined" counter></v-textarea>
          <div class="d-flex justify-content-end">
            <v-btn color="#386568" class="text-capitalize" type="submit" :disabled="subload" variant="outlined" rounded
              :loading="subload">Update topic</v-btn>
          </div>
        </v-form>
      </div>

      <v-card v-if="!topicAddBtn" flat>
        <v-divider></v-divider>
      </v-card>

      <div v-if="commonId">
        <v-divider></v-divider>
        <v-card :disabled="!commonId">
          <v-card-title class="bg-blue-grey-lighten-5 mb-3">Background Image</v-card-title>
          <v-card-text>
            <div class="d-flex gap-3 flex-wrap" v-if="editBg && editBg.length > 0">
              <div v-for="image in editBg" :key="image.bgName">
                <v-card>
                  <v-img :src="image.bgUrl" height="150" width="200" cover class="mx-auto"></v-img>
                  <v-card-actions class="py-0 d-flex justify-content-end ">
                    <v-btn icon="mdi-pencil" size="small" color="success" @click="editBgImage(image.commonId, image.id)"
                      v-if="!image.isEdit"></v-btn>
                    <v-progress-circular :width="1" color="success" indeterminate size="x-small"
                      v-else></v-progress-circular>
                    <v-btn icon="mdi-delete" size="small" color="error"
                      @click="bgId = image.commonId; bgIndex = image.id; deleteDialogBg = true"></v-btn>
                  </v-card-actions>
                </v-card>
                <v-dialog v-model="deleteDialogBg" width="400px">
                  <v-card class="rounded-4 pb-4">
                    <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
                      Background Image</v-card-title>
                    <v-container class="px-4 d-flex flex-column align-items-center">
                      <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                      <v-card-text class="mt-1 text-center">Are you sure you want to delete this image?</v-card-text>
                    </v-container>
                    <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                      <v-btn block class=" text-white mb-3" style="background-color: #BA1A1A;" :disabled="bgDelete"
                        :loading="bgDelete" @click="deleteBgImage()">Delete</v-btn>
                      <v-btn block variant="text" class=" mb-3"
                        @click="deleteDialogBg = false; bgId = null; bgIndex = null;">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <input type="file" ref="bgImage" @change="handleBgImage" class="d-none" accept="image/*">
            </div>
            <v-card-subtitle v-else class="mb-0 py-0">No background image uploaded.</v-card-subtitle>
            <div class="d-flex justify-content-end" v-if="editBg && editBg.length === 0">
              <input type="file" ref="addBg" @change="addBgImage" class="d-none" accept="image/*">
              <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                @click="addBg" :disabled="bgLoad" :loading="bgLoad">Add Background</v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card :disabled="!commonId">
          <v-card-title class="bg-blue-grey-lighten-5 mb-3">Images</v-card-title>
          <v-card-text>
            <div class="d-flex gap-3 flex-wrap" v-if="editImages.length > 0">
              <div v-for="(image,index) in editImages" :key="image.imgID">
                <v-card>
                  <v-img :src="image.furl" height="150" width="200" cover class="mx-auto"></v-img>
                  <v-card-actions class="py-0 d-flex justify-content-end ">
                    <v-btn icon="mdi-pencil" size="small" color="success" @click="edit(image.imgID, index)"
                      v-if="!image.isEdit"></v-btn>
                    <v-progress-circular :width="1" color="success" indeterminate size="x-small"
                      v-else></v-progress-circular>
                    <v-btn icon="mdi-delete" size="small" color="error"
                      @click="imageId = image.imgID; deleteDialogImage = true"></v-btn>
                  </v-card-actions>
                </v-card>
                <v-dialog v-model="deleteDialogImage" width="400px">
                  <v-card class="rounded-4 pb-4">
                    <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
                      Image</v-card-title>
                    <v-container class="px-4 d-flex flex-column align-items-center">
                      <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                      <v-card-text class="mt-1 text-center">Are you sure you want to delete this image?</v-card-text>
                    </v-container>
                    <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                      <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;" :disabled="imageDelete"
                        :loading="imageDelete" @click="deleteImage()">Delete</v-btn>
                      <v-btn block variant="text" class="mb-3" @click="deleteDialogImage = false">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <input type="file" ref="selectImage" @change="handleImage" class="d-none" accept="image/*">
            </div>
            <v-card-subtitle v-else class="mb-0 py-0">No images uploaded.</v-card-subtitle>
            <div class="d-flex justify-content-end">
              <input type="file" ref="addImage" @change="addImage" class="d-none" accept="image/*" multiple>
              <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                @click="add" :disabled="imageLoad" :loading="imageLoad">Add Image</v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card :disabled="!commonId">
          <v-card-title class="bg-blue-grey-lighten-5 mb-3">Video</v-card-title>
          <v-card-text>
            <v-card class="py-0" v-if="editVideo.length > 0" width="200">
              <video controls width="200" :src="editVideo[0].furl" type="video/*" cover>
                Your browser does not support the video tag.
              </video>
              <v-card-actions class="py-0 d-flex justify-content-end " min-height="0">
                <v-btn icon="mdi-pencil" size="small" color="success" @click="updateVideo"
                  v-if="!editVideo[0].isEdit"></v-btn>
                <v-progress-circular :width="1" color="success" indeterminate size="x-small"
                  v-else></v-progress-circular>
                <v-btn icon="mdi-delete" size="small" color="error" @click="deleteDialogVideo = true;"></v-btn>
              </v-card-actions>
              <input type="file" ref="selectVideo" @change="handleVideo" class="d-none" accept="video/*">
              <v-dialog v-model="deleteDialogVideo" width="400px">
                <v-card class="rounded-4 pb-4">
                  <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
                    Video</v-card-title>
                  <v-container class="px-4 d-flex flex-column align-items-center">
                    <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                    <v-card-text class="mt-1 text-center">Are you sure you want to delete this video?</v-card-text>
                  </v-container>
                  <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                    <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;" :disabled="videoDelete"
                      :loading="videoDelete" @click="deleteVideo">Delete</v-btn>
                    <v-btn block variant="text" class="mb-3" @click="deleteDialogVideo = false">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            <v-card-subtitle v-else class="mb-0 py-0">No video uploaded.</v-card-subtitle>
            <div class="d-flex justify-content-end">
              <input type="file" ref="addVideo" @change="addVideo" class="d-none" accept="video/*">
              <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                @click="addVid" v-if="editVideo.length === 0" :disabled="videoLoad" :loading="videoLoad">Add
                Video</v-btn>
            </div>
          </v-card-text>
        </v-card>
        <v-divider></v-divider>
        <v-card :disabled="!commonId">
          <v-card-title class="bg-blue-grey-lighten-5 mb-3">Audio</v-card-title>
          <v-card-text>
            <v-card v-if="editAudio.length > 0" width="320" class="pt-2 px-2">
              <audio controls :src="editAudio[0].furl" type="audio/*" width="200">
                Your browser does not support the audio element.
              </audio>
              <v-card-actions class="py-0 d-flex justify-content-end ">
                <v-btn icon="mdi-pencil" size="small" color="success" @click="updateAudio"
                  v-if="!editAudio[0].isEdit"></v-btn>
                <v-progress-circular :width="1" color="success" indeterminate size="x-small"
                  v-else></v-progress-circular>
                <v-btn icon="mdi-delete" size="small" color="error" @click="deleteDialogAudio = true;"></v-btn>
              </v-card-actions>
              <input type="file" ref="selectAudio" @change="handleAudio" class="d-none" accept="audio/*">
              <v-dialog v-model="deleteDialogAudio" width="400px">
                <v-card class="rounded-4 pb-4">
                  <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
                    Audio</v-card-title>
                  <v-container class="px-4 d-flex flex-column align-items-center">
                    <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                    <v-card-text class="mt-1 text-center">Are you sure you want to delete this audio?</v-card-text>
                  </v-container>
                  <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                    <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;" :disabled="audioDelete"
                      :loading="audioDelete" @click="deleteAudio">Delete</v-btn>
                    <v-btn block variant="text" class="mb-3" @click="deleteDialogAudio = false;">Cancel</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card>
            <v-card-subtitle v-else class="mb-0 py-0">No audio uploaded.</v-card-subtitle>
            <div class="d-flex justify-content-end">
              <input type="file" ref="addAudio" @change="addAudio" class="d-none" accept="audio/*">
              <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                @click="addAud" :disabled="audioLoad" :loading="audioLoad" v-if="editAudio.length === 0">Add
                Audio</v-btn>
            </div>
          </v-card-text>
          <v-divider></v-divider>
          <v-card :disabled="!commonId">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">SubHeadings</v-card-title>
            <v-card-text>
              <div v-if="subHeads && subHeads.length > 0">
                <v-list lines="one">
                  <v-list-item v-for="(topic, index) in subHeads" :key="index"
                    :title="index+1 + '.' + topic.title"></v-list-item>
                </v-list>
              </div>
              <v-card-subtitle v-else class="mb-0 py-0">No Subheadings added.</v-card-subtitle>
              <div class="d-flex justify-content-end">
                <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                  @click="subheading = !subheading">Add Subheading</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-card>
      </div>
      <div class="d-flex justify-content-end mt-3">
        <v-btn prepend-icon="mdi-plus" class="text-capitalize" color="#2C7721" size="large" variant="elevated"
          v-if="!commonId" @click="addTranslation">Add Translation</v-btn>
        <v-btn color="#2C7721" variant="elevated" @click="finish" v-else>Finish</v-btn>
      </div>
    </v-card-text>
  </v-card>
  <v-card v-else>
    <EditSub @back="subheading = !subheading" :idmal="malId" :ideng="engId" @update="update" v-if="main == true"
      @close="subheading = false;" @exit="exit" />
    <EditSecondSub @back="subheading = !subheading" :idmal="malId" :ideng="engId" @update="update"
      @close="subheading = false;" @exit="exit" v-else />
  </v-card>
</template>

<script>
import EditSub from './EditSub.vue';
import EditSecondSub from './EditSecondSub.vue';
export default {
    props: ["head", "description", "images", 'video', 'url', 'audio', 'commonId', 'uId', 'main', 'subtopic', 'malId','engId','bgImage'],
    emits: ['finish', 'update','dialogClose','exit'],
    components: { EditSub, EditSecondSub },
    created() {
      this.editImages.forEach(image => image.isEdit = false);
      this.editAudio.forEach(audio => audio.isEdit = false);
      this.editVideo.forEach(video => video.isEdit = false);
      this.editBg.forEach(bg => bg.isEdit = false);
    },
    data() {
      return {
        subheading: false,
        subload: false,
        imageLoad: false,
        videoLoad: false,
        audioLoad: false,
        imageId: null,
        imageIndex: null,
        imageDelete: false,
        videoDelete: false,
        audioDelete: false,
        newImage: null,
        newBgImage: null,
        imagesAdd: [],
        videoAdd: null,
        audioAdd: null,
        deleteDialogImage: false,
        deleteDialogVideo: false,
        deleteDialogAudio:false,
        editTitle: this.head,
        // titleRules: [v => !!v || '*Title is required'],
        editDescription: this.description,
        // descriptionRules: [v => !!v || '*Description is required'],
        editUrl: this.url,
        // urlRules: [v => !!v || '*URL is required'],
        audioFiles: [],
        videoFiles: [],
        message: '',
        loading: false,
        color: '',
        dialogTopic: false,
        dialogHead: '', 
        deleteDialogBg: false,
        bgId: null, 
        bgIndex: null,
        bgDelete: false,
        bgLoad: false,
        topicAddBtn: false
          
      };  
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
      exit() {
        this.$emit('exit');
      },
      finish() {
        this.$emit('finish');
      },
      update() {
        this.$emit('update'); 
      },
      dialogClose() {
        this.$emit('dialogClose');
      },
      async addTranslation() {
        this.topicAddBtn = true;
        // try {
        //   if (this.main == true) {
        //     this.$store.dispatch('display/generateQR', {

        //     })
        //   }
        // }
        // catch (error) {
        
        // } 
      },
      async editTopic() {
        const { valid } = await this.$refs.form.validate()
        if (valid) {
          this.subload = true;
          try {
            let response;
            const payload = {
              uId:this.uId,
              data:{
                "title": this.editTitle,
                "description": this.editDescription,
                "referenceURL": this.editUrl
              }   
            };
            if (this.main == true) {
              response = await this.$store.dispatch('display/updateTopic', payload)
            }
            if (this.main == false) {
              response = await this.$store.dispatch('display/updateSubTopic', payload)
            }
            if (response) {
              this.subload = false;
              let message = `Topic updated successfully!`;
              this.success(message);
              this.$emit('update');
            }
          }
          catch (err) {
            this.subload = false;
            let message = err.message;
            this.error(message);
          }
        }
      },
      edit(id, index) {
        this.imageIndex = index
        this.imageId = id;
        this.$refs.selectImage.click(); 
      },
      editBgImage(id, index) {
        console.log(index)
        this.bgId = id;
        this.bgIndex = index
        this.$refs.bgImage.click();
      },
      async handleBgImage(event) {
        const files = event.target.files[0];
        this.newBgImage = files;
        this.editBg[0].isEdit = true;
        const formData = new FormData();
        formData.append("bgFile", this.newBgImage)
        const payload = {
          commonId: this.bgId,
          formData: formData,
          id: this.bgIndex
        }
        try {
          let response;
          response = await this.$store.dispatch('display/updateBackgroundImage', payload);
          if (response) {
            this.editBg[0].isEdit = false;
            let message = `Background image updated successfully!`;
            this.success(message);
            this.$emit('update');
            this.bgId = null
          }
        }
        catch (error) {
          this.editBg[0].isEdit = false;
          let message = error.message;
          this.error(message);
        }
      },
      async handleImage(event) {
        const files = event.target.files[0];
        this.newImage = files;
        this.editImages[this.imageIndex].isEdit = true;
        const formData = new FormData();
        formData.append('files', this.newImage); 
        formData.append('imgIds', this.imageId); 
        formData.append('commonId', this.editImages[this.imageIndex].commonId);
        try {
          let response;
          if (this.main == true) {
            response = await this.$store.dispatch('display/updateMainImage', formData);
          }
          if (this.main == false) {
            response = await this.$store.dispatch('display/updateSubImage', formData);
          }
          if (response) {
            this.editImages[this.imageIndex].isEdit = false;
            let message = `Image updated successfully!`;
            this.success(message);
            this.$emit('update');
            this.imageId = null
            this.imageIndex = null
          }  
        }
        catch(error) {
          this.editImages[this.imageIndex].isEdit = false;
          let message = error.message;
          this.error(message);    
        }
      },
      add() {      
        this.$refs.addImage.click();
      },
      addBg() {
        this.$refs.addBg.click()
      },
      async addBgImage(event) {
        const files = event.target.files[0];
        this.newBgImage = files;
        let formData = new FormData();
        formData.append("bgFile", this.newBgImage)
        const payload = {
          formData: formData,
          commonId: this.commonId
        }
        try {
          let response;
          this.bgLoad = true;
          response = await this.$store.dispatch('display/uploadBackgroundImage', payload);
          if (response) {
            this.bgLoad = false;
            this.newBgImage = null;
            let message = `Background image added successfully!`;
            this.success(message);
            this.$emit('update');
          }
        }
        catch (error) {
          this.bgLoad = false;
          let message = error.message;
          this.error(message);
        }
      },
      async addImage(event) {
        const files = event.target.files;
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          this.imagesAdd.push(file);    
        }
        let formData = new FormData();
        try {
          let response;
          let payload;
          this.imageLoad = true;
          if (this.main == true) {
            this.imagesAdd.forEach((image) => { formData.append("file", image); }); 
            payload = {
              ideng: this.engId,
              idmal: this.malId,
              formData: formData
            };
            response = await this.$store.dispatch('display/uploadImages', payload);
          }
          if (this.main == false) {
            this.imagesAdd.forEach((image) => { formData.append("files", image); });
            payload = {
              subideng: this.engId,
              subidmal: this.malId,
              formData: formData
            }; 
            response = await this.$store.dispatch('display/uploadSubImages', payload);
          }
          if (response) {
            this.imageLoad = false;
            this.imagesAdd = [];
            let message = `Image added successfully!`;
            this.success(message);
            this.$emit('update');
          }
        }
        catch (error) {
          this.imageLoad = false;
          let message = error.message;
          this.error(message);
        }
      },
      addVid() {
        this.$refs.addVideo.click();
      },
      async addVideo(event) {
        const files = event.target.files[0];
        this.videoAdd = files;
        const formData = new FormData();
        formData.append("files", this.videoAdd);
        const payload = {
          uid: this.commonId,
          id: this.media.video,
          formData: formData
        }
        try {
          this.videoLoad = true;
          let response;
          if (this.main == true) {
            response = await this.$store.dispatch('display/submitMedia',payload); 
          }
          if (this.main == false) {
            response = await this.$store.dispatch('display/submitSubMedia', payload);
          }
          if (response) {
            this.videoLoad = false;
            let message = `Video added successfully!`;
            this.success(message);
            this.$emit('update');
            this.videoAdd = null
          }
        }
        catch (err) {
          this.videoLoad = false;
          let message = err.message;
          this.error(message);
        }
      },
      updateVideo() {
        this.$refs.selectVideo.click(); 
      },
      async handleVideo(event) {
        const files = event.target.files[0];
        this.editVideo[0].isEdit = true;
        this.videoAdd = files;
        let response;
        let payload;
        let formData = new FormData();
        try {
          if (this.main == true) {
            formData.append("uId", this.commonId);
            formData.append("mtId", this.media.video);
            formData.append("files", this.videoAdd);
            response = await this.$store.dispatch('display/updateMedia',formData);
          } 
          if (this.main == false) {
            formData.append("files", this.videoAdd);
            payload = {
                data: formData,
                id: this.media.video,
                uId: this.uId
            }
            response = await this.$store.dispatch('display/updateSubMedia', payload);
          }
          if (response) {
            this.editVideo[0].isEdit = false;
            let message = `Video updated successfully!`;
            this.success(message);
            this.$emit('update');
            // this.videoLoad = null
          }
        }
        catch (err) {
          this.editVideo[0].isEdit = false;
          let message = err.message;
          this.error(message);
        }
      },
      addAud() {
        this.$refs.addAudio.click();
      },
      async addAudio(event) {
        const files = event.target.files[0];
        this.audioAdd = files;
        const formData = new FormData();
        formData.append("files", this.audioAdd);
        try {
          const payload = {
            uid: this.uId,
            id: this.media.audio,
            formData: formData
          }
          this.audioLoad = true;
          let response;
          if (this.main == true) {
            response = await this.$store.dispatch('display/submitMedia', payload);
          }
          else if (this.main == false) {
            response = await this.$store.dispatch('display/submitSubMedia', payload);
          }
          if (response) {
            this.audioLoad = false;
            let message = `Audio added successfully!`;
            this.success(message);
            this.$emit('update');
          }
        }
        catch (err) {
          this.audioLoad = false;
          let message = err.message;
          this.error(message);
        }
      },
      updateAudio() {
        this.$refs.selectAudio.click(); 
      },
      async handleAudio(event) {
        const files = event.target.files[0];
        this.editAudio[0].isEdit = true;
        this.audioAdd = files;
        let payload;
        let formData = new FormData();
        try {
          this.editaudioLoad = true;
          let response;
          if (this.main == true) {
            formData.append("uId", this.uId);
            formData.append("mtId", this.media.audio);
            formData.append("files", this.audioAdd);
            response = await this.$store.dispatch('display/updateMedia', formData);
          }
          if (this.main == false) {
            formData.append("files", this.audioAdd);
            payload = {
              data: formData,
              id: this.media.audio,
              uId: this.uId
            }
            response = await this.$store.dispatch('display/updateSubMedia', payload);
          }
          if (response) {
            this.editAudio[0].isEdit = false;
            this.editaudioLoad = false;
            let message = `Audio updated successfully!`;
            this.success(message);
            this.$emit('update');
            this.audioAdd = null
          }
        }
        catch (err) {
          this.editAudio[0].isEdit = false;
          this.editaudioLoad = false;
          let message = err.message;
          this.error(message);
        }
      },
      async deleteImage() {
        this.imageDelete = true;
        let response;
        let message;
        try {
          if (this.main == true) {
            response = await this.$store.dispatch('display/deleteImage', {
              commonId: this.editImages[0].commonId,
              id: this.imageId
            });
          }
          if (this.main == false) {
            response = await this.$store.dispatch('display/deleteSubImage', {
              commonId: this.editImages[0].commonId,
              id: this.imageId
            });
          }
          if ((response)) {
            this.imageDelete = false;
            this.deleteDialogImage = false;
            message = `Image deleted successfully!`;
            this.success(message);
            this.$emit('update');
            this.imageId = null
            this.imageIndex = null
          }
        }
        catch (err) {
          this.imageDelete = false;
          message = err.message;
          this.error(message);
        }
      },
      async deleteBgImage() {
        try {
          const response = await this.$store.dispatch('display/deleteBackgroundImage', {
            commonId: this.bgId,
            id: this.bgIndex
          });
          if (response) {
            this.bgDelete = false;
            this.deleteDialogBg = false;
            let message = `Image deleted successfully!`;
            this.success(message);
            this.$emit('update');
            this.bgId = null
            this.bgIndex = null
          }
        }
        catch (err) {
          this.bgDelete = false;
          let message = err.message;
          this.error(message);
        }
      },
      async deleteAudio() {
        this.audioDelete = true;
        let response;
        let message;
        try {
          if (this.main == true) {
            response = await this.$store.dispatch('display/deleteAudio', this.editAudio[0].dtId);    
          }
          if (this.main == false) {
            response = await this.$store.dispatch('display/deleteSubAudio', this.editAudio[0].dtId);    
          }
          if ((response)) {
            this.audioDelete = false;
            this.deleteDialogAudio = false;
            message = `Audio deleted successfully!`;
            this.success(message);
            this.$emit('update')
          }
        }
        catch (error) {
          this.audioDelete = false;
          message = error.message;
          this.error(message);
        }
      },
      async deleteVideo() {
        this.videoDelete = true;
        let message;
        let response;
        try {
          if (this.main == true) {
            response = await this.$store.dispatch('display/deleteVideo', this.editVideo[0].dtId);
          }
          if (this.main == false) {
            response = await this.$store.dispatch('display/deleteSubVideo', this.editVideo[0].dtId);
          }
          if ((response)) {
            this.videoDelete = false;
            this.deleteDialogVideo = false;
            message = `Video deleted successfully!`;
            this.success(message);
            this.$emit('update')
          }
        }
        catch (error) {
          this.videoDelete = false;
          message = error.message;
          this.error(message);
        }
      },   
    },
    computed: {
      media() {
        return this.$store.getters['display/getMedia'];
      },
      editImages() {
        return this.images;
      },
      editVideo() {
        return this.video;
      },
      editAudio() {
        return this.audio;
      },
      editBg() {
        return this.bgImage || [];
      },
      subHeads() {
        if (this.subtopic && this.subtopic.length > 0) {
          return this.subtopic;
        } else return [];
      } 
    },
};
</script>

