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
  <div class="sub-card">
    <div class="text-card ps-5 pt-5">
      <div class="details-content">
        <div class="d-flex gap-3 align-items-center">
          <h4 class="text-start title my-0">{{ title }}</h4>
          <v-icon class="mdi mdi-arrow-right text-white" v-if="title && subtopic.length && subtopic.length>0"
            @click="displaySub"></v-icon>
        </div>
        <p class="desc">
        <pre class="text-wrap desc text-start  ps-3" >
            {{ description }}
            <ul v-for="topic in subtopic" :key="topic.uId">
            <li class="text-capitalize text-start" style="direction: ltr;">{{ topic.title }}</li>
          </ul>
          </pre>

        </p>

      </div>
      <div class="d-flex justify-content-center mt-5">
        <audio controls class="mt-3 mx-3 w-100" v-if="audio.length > 0" :src="audio[0].furl" type="audio/*">
          Your browser does not support the audio element.
        </audio>
      </div>
      <div class="carousel-wrapper">
        <div class="d-flex gap-2 mb-3">
          <v-btn prepend-icon="mdi-pencil" rounded="4" class=" text-success text-capitalize me-2 fw-bold" size="small"
            @click="openEdit">Edit</v-btn>
          <v-btn prepend-icon="mdi-trash-can" rounded="4" class=" text-danger text-capitalize fw-bold"
            @click="deleteItem" size="small">Delete</v-btn>
        </div>
        <v-carousel class="sub-carousel" height="400" hide-delimiters cover :show-arrows="images.length > 1">
          <v-carousel-item @click="openDialog(image.furl)" cover :src="image.furl" v-for="(image, index) in images"
            :key="index" class="sub-carousel">
          </v-carousel-item>
        </v-carousel>
        <v-btn class="video-btn  mt-3" rounded="3" @click="openVideoDialog" variant="elevated"
          v-if="video.length > 0"><v-icon class="mdi mdi-video"></v-icon>Watch
          Video</v-btn>
      </div>
    </div>
    <v-dialog v-model="dialog" max-width="650">
      <v-img :src="selectedImage" contain></v-img>
    </v-dialog>
    <v-dialog v-model="videoDialog" max-width="800px">
      <v-card>
        <v-toolbar dense>
          <v-btn icon dark @click="closeVideoDialog">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <video controls width="100%" v-if="video.length > 0" :src="video[0].furl" type="video/*">
            Your browser does not support the video tag.
          </video>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <v-dialog v-model="editDialog" width="1000" persistent>
    <edit-form :head="head" :description="description" :images="images" :video="video" :url="url" :audio="audio"
      :commonId="commonId" @finish="editDialog = false" :uId="uId" @update="update" :main="main" :malId="malId"
      :engId="engId" :subtopic="subtopic"></edit-form>
  </v-dialog>
  <v-dialog v-model="dialogDelete" width="400px">
    <v-card class="rounded-4 pb-4">
      <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
        Topic</v-card-title>
      <v-container class="px-4 d-flex flex-column align-items-center">
        <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
        <v-card-text class="mt-1 text-center fs-6">Are you sure you want to delete this topic and everything related to
          this topic?</v-card-text>
      </v-container>
      <v-card-actions class="mx-4 d-flex flex-column align-items-center">
        <v-btn block class="rounded-4 text-white mb-3" style="background-color: #BA1A1A;" :loading="loading"
          :disabled="loading" @click="deleteItemConfirm">Delete</v-btn>
        <v-btn block variant="text" class="rounded-4 mb-3" @click="closeDelete">Cancel</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import EditForm from '../MainTopicEdit/EditForm.vue';
export default {
  emits:['update'],
  components: { EditForm },
  props: [
    "title",
    "head",
    "description",
    "images",
    'video',
    'url',
    'commonId',
    'audio',
    'uId',
    'main',
    'subtopic',
    'malId',
    'engId',
    
  ],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogTopic: false,
      dialogHead: '',
      icon: '',
      color: '',
      message:'',
      selectedImage: null,
      videoDialog: false,
      videoUrl: '',
      editDialog: false,
      loading: false,
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
    update() {
      this.$emit('update');
    },
    openEdit() { 
      this.editDialog = true;
    },
    openDialog(imageSrc) {
      this.selectedImage = imageSrc;
      this.dialog = true;
    },
    openVideoDialog() {
      this.videoDialog = true; 
    },
    closeVideoDialog() {
      this.videoDialog = false; 
      const videoElement = this.$refs.videoPlayer;
      if (videoElement) {
        videoElement.pause();
      }
    },
    displaySub() {
      const props = {
        title: this.title,
        head: this.title,
        description: this.description,
        imgDataList: this.images,
        mp4DataList: this.video,
        referenceUrl: this.url,
        fsCommonId: this.commonId,
        mp3DataList: this.audio,
        uId: this.uId,
        combinedDataSubSubList: this.subtopic,
        fsMalId: this.malId,
        fsEngId: this.engId
      }
      this.$store.commit('guide/setFirstSubData',props)
      this.$router.push({ name: 'guide-sub-view' })
    },
    deleteItem() {
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.loading = true;
      try {
        let response;
        if (this.main == true) {
          response = await this.$store.dispatch('guide/deleteMain', this.commonId)
        }
        if (this.main == false) {
          response = await this.$store.dispatch('guide/deleteSub', this.commonId)
        }
        if (response) {
          this.loading = false
          let message = 'Topic and details deleted successfully !!';
          this.closeDelete();
          this.success(message);
          if (this.main == true) {
            this.$router.push({ name: 'guide-view' })
          }
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
  },
};
</script>

<style scoped>
.sub-card {
  width: 75%; 
  aspect-ratio: 1676 / 800;
  height: 40rem;
  background-color: #363A33;
  color: #ffffff;
  border-radius: 0 60px 60px 0;
  position: relative;
}
.text-card {   
  width: 75%;  
  aspect-ratio: 1107 / 600;  
}
.carousel-wrapper {
  aspect-ratio: 813/650;
  position: absolute;
  left: 80%;
  top: 8%;
  width: 50%;
  aspect-ratio: 271 / 200; 
}
.sub-carousel {
  width: 100%;  
  height: 100%;
}
.desc,.details-content {
  width: 100%;
  font-size: 110%;
  line-height: 180% ;
  height: 25rem;
  direction: rtl;
  aspect-ratio: 1107 / 600;
}
.title{
  font-size: 140%;
    line-height: 180%;
}
.details-content{
  direction: ltr;
}
::-webkit-scrollbar {
  width: 4px;
  height: auto;
}
::-webkit-scrollbar-track {
  background: #272B25;
}
::-webkit-scrollbar-thumb {
background: #8D9387;
  border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover {
  background: #f5eded;
  cursor: pointer;
}
</style>