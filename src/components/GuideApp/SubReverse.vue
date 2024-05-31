<template>
  <div class="d-flex justify-content-end">
    <div class="sub-card d-flex justify-content-end">
      <div class="text-card pe-5 pt-5 mb-5">
        <!-- <div class="details "> -->
        <div class="details-content">
          <h4 class="text-start title">{{ title }}</h4>
          <div class="desc text-start">
            <pre class="text-wrap desc text-justify pe-2">
            {{ description }}
            <ul v-for="topic in subtopic" :key="topic.uId">
            <li class="text-capitalize text-start" style="direction: ltr;">{{ topic.title }}</li>
          </ul>
          </pre>
          </div>
          <!-- </div> -->
        </div>
        <!-- <v-btn @click="console.log(audio[0].furl)">click</v-btn> -->
        <div class="d-flex justify-content-center mt-5 pt-3">

          <audio controls class="mt-3 mx-3 w-100" v-if="audio.length > 0" :src="audio[0].furl" type="audio/*">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div class="carousel-wrapper d-flex flex-column align-items-end">
          <div class="d-flex gap-2">
            <v-btn prepend-icon="mdi-pencil" rounded="4" class="mb-3 text-success text-capitalize me-2 fw-bold"
              size="small" @click="openEdit">Edit</v-btn>
            <v-btn prepend-icon="mdi-trash-can" rounded="4" class="mb-3 text-danger text-capitalize fw-bold"
              size="small">Delete</v-btn>
          </div>
          <v-carousel class="sub-carousel" height="400" hide-delimiters cover :show-arrows="images.length > 1">
            <v-carousel-item @click="openDialog(image.furl)" :src="image.furl" cover v-for="(image, index) in images"
              :key="index" class="sub-carousel">
            </v-carousel-item>
          </v-carousel>
          <v-btn class="video-btn mt-3" rounded="3" variant="elevated" v-if="video.length>0" @click="openVideoDialog">
            <v-icon class="mdi mdi-video"></v-icon>Watch Video</v-btn>
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
            <!-- <v-toolbar-title class="white--text">Video Player</v-toolbar-title>color="rgb(1, 39, 3)" -->
          </v-toolbar>
          <v-card-text>
            <video controls width="100%" v-if="video.length > 0" :src="video[0].furl" type="video/*">
              Your browser does not support the video tag.
            </video>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <v-dialog v-model="editDialog" width="1000">
    <edit-form :head="head" :description="description" :images="images" :video="video" :url="url" :audio="audio"
      @finish="editDialog = false" :commonId="commonId" :uId="uId" @update="update" :main="main" :malId="malId"
      :engId="engId" :subtopic="subtopic"></edit-form>
  </v-dialog>
</template>

<script>
import EditForm from './EditForm.vue';
export default {
  components: { EditForm },
  data() {
    return {
      dialog: false,
      selectedImage: null,
      videoDialog: false,
      videoUrl: '',
      editDialog: false,
    };
  },
  emits: ['update'],
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
    'engId'
  ],
  methods: {
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
      // Set the video URL to the one you want to display
      // this.videoUrl = 'https://my-new-aks.s3.ap-south-1.amazonaws.com/1715602317290_talking_juracik_park_seed5948811234009426.mp4';
      this.videoDialog = true; // Open the dialog
    },
    closeVideoDialog() {
      this.videoDialog = false; // Close the dialog
      // Optionally, pause the video when dialog closes
      const videoElement = this.$refs.videoPlayer;
      if (videoElement) {
        videoElement.pause();
      }
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
    border-radius: 60px 0 0 60px;
    position: relative;
}
.text-card {
  width: 75%;  
  aspect-ratio: 1107 / 600;
}
.carousel-wrapper {
  /* width: 100%; */
  aspect-ratio: 813/650;
  position: absolute;
  right: 80%;
  top: 8%;
  width: 50%;
  aspect-ratio: 271 / 200; 
}
.sub-carousel {
  width: 100%;  
  height: 100%;
}
/* .sub-image {
    width: 50%;  
  aspect-ratio: 271 / 200; 
  position: absolute;
  right: 75%;
  top: 12%;
} */
.desc,
.details-content {
  /* padding-right: 25%; */
  width: 100%;
  font-size: 110%;
  aspect-ratio: 1107 / 600;
    line-height: 180%;
    height: 24rem;
direction: ltr;
}
.title{
  font-size: 140%;
    line-height: 180%;
}

.details-content{
  direction: rtl;
}
::-webkit-scrollbar {
  width: 4px;
  height: auto;
  
}
/* Track style */
::-webkit-scrollbar-track {
background: #272B25;

}

/* Handle style */
::-webkit-scrollbar-thumb {
background: #8D9387;
  border-radius: 30px;
}

/* Handle hover style */
::-webkit-scrollbar-thumb:hover {
  background: #f5eded;
  cursor: pointer;
}
</style>