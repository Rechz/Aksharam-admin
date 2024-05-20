<template>
  <div class="d-flex justify-content-end">


    <div class="sub-card d-flex justify-content-end ">
      <div class="text-card pe-5 py-5">
        <div class="details ">
          <div class="details-content">
            <h4 class="text-start title">{{ title }}</h4>
            <p class="desc text-start">>
              {{ description }}</p>
          </div>
        </div>
        <div class="carousel-wrapper d-flex flex-column align-items-end">
          <v-carousel class="sub-carousel" height="100%" hide-delimiters cover :show-arrows="!images.length === 1">

            <v-carousel-item @click="openDialog(image.furl)" :src="image.furl" cover v-for="(image, index) in images"
              :key="index">
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
            <video controls width="100%" v-if="video.length > 0">
              <source :src="video[0].furl" type="video/mp4">
              Your browser does not support the video tag.
            </video>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
  </div>
  <!-- </div> -->
</template>

<script>

export default {
  data() {
    return {
      dialog: false,
      selectedImage: null,
      videoDialog: false,
      videoUrl: '',
    };
  },
  props: ['title', 'description', 'images', 'video'],
  methods: {
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
    /* aspect-ratio: 1676 / 800; */
    background-color: #363A33;
    color: #ffffff;
    border-radius: 60px 0 0 60px;
    position: relative;
}
.text-card {
  width: 75%;  
  aspect-ratio: 1107 / 688;
}
.carousel-wrapper {
  width: 100%;
  aspect-ratio: 813/600;
  position: absolute;
  right: 80%;
  top: 15%;
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
.details-content .title {
  /* padding-right: 25%; */
  padding-right: 5%;
  font-size: 130%;
  line-height: 180%;

}

.details{
width: 100%;
  aspect-ratio: 1107 / 688;
   /* padding-top: 5%; */
  overflow-y: scroll;
  direction: ltr;
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