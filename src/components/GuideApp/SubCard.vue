<template>
  <div class="sub-card">
    <div class="text-card ps-5 py-5">
      <div class="details">
        <div class="details-content">
          <h4 class="text-start title">{{ title }}</h4>
          <p class="desc ">
            {{ description }}</p>
        </div>
      </div>
      <div class="carousel-wrapper">
        <v-btn prepend-icon="mdi-pencil" rounded="4" class="mb-3 text-success text-capitalize me-2" size="small" @click="openEdit">Edit</v-btn>
        <v-btn prepend-icon="mdi-trash-can" rounded="4" class="mb-3 text-danger text-capitalize" size="small">Delete</v-btn>
        <v-carousel class="sub-carousel" height="100%" hide-delimiters cover :show-arrows="!images.length === 1">

          <v-carousel-item @click="openDialog(image.furl)" cover :src="image.furl" v-for="(image, index) in images"
            :key="index">
          </v-carousel-item>


        </v-carousel>
        <v-btn class="video-btn  mt-3" rounded="3" @click="openVideoDialog" variant="elevated"><v-icon
            class="mdi mdi-video" v-if="video.length > 0"></v-icon>Watch
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
          <video controls width="100%" v-if="video.length > 0">
            <source :src="video[0].furl" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
  <v-dialog v-model="editDialog" width="950" >
    <edit-form></edit-form>
  </v-dialog>
</template>

<script>
import EditForm from './EditForm.vue';

export default {
  components: { EditForm },
  props: ['title', 'description','images','video'],
  data() {
    return {
      dialog: false,
      selectedImage: null,
      videoDialog: false,
      videoUrl: '',
      editDialog: false,
    };
  },
  
  methods: {
    openEdit() {
      this.editDialog = true;
    },
    openDialog(imageSrc) {
      this.selectedImage = imageSrc;
      this.dialog = true;
    },
    openVideoDialog() {
      // Set the video URL to the one you want to display
      this.videoUrl = 'https://my-new-aks.s3.ap-south-1.amazonaws.com/1715602317290_talking_juracik_park_seed5948811234009426.mp4';
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
  background-color: #363A33;
    color: #ffffff;
    border-radius: 0 60px 60px 0;
    position: relative;
   
  /* aspect-ratio: 541 / 200;  */

}
.text-card {   
  width: 75%;  
  aspect-ratio: 1107 / 688;  
}
.carousel-wrapper {
  width: 100%;
  aspect-ratio: 813/600;
  position: absolute;
  left: 80%;
  top: 8%;
  width: 50%;
  aspect-ratio: 271 / 200; /* Define aspect ratio for the wrapper */
}

.sub-carousel {
  width: 100%;  
  height: 100%;
}
/* .sub-image {
  width: 50%;  
  aspect-ratio: 271 / 200; 
  position: absolute;
  left: 75%;
  top: 12%;
} */
.desc,.details-content .title{
  /* padding-right: 25%; */
  padding-left: 5%;
  font-size: 130%;
  line-height: 180% ;
}

.details{

  width:100%;
    aspect-ratio: 1107 / 688;
   /* padding-top: 5%; */
  overflow-y: scroll;
  direction: rtl;
}
.details-content{
  direction: ltr;
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