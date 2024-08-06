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
  <div class="d-flex justify-content-end">
    <div class="sub-card d-flex justify-content-end">
      <div class="text-card pe-5 pt-5 mb-5">
        <!-- <div class="details "> -->
        <div class="details-content">
          <div class="d-flex gap-3 align-items-center justify-content-start mb-3">
            <h4 class="text-start title my-0 ms-4 ps-2">{{ title }}</h4>
            <v-icon class="mdi mdi-arrow-right text-white" v-if="title && subtopic.length && subtopic.length > 0"
              @click="displaySub"></v-icon>
          </div>
          <div style="width: 95%; height:95%; overflow-x:hidden" class="ms-3">
            <p class="text-wrap text-start ps-3 text-justify description" v-html="formattedDescription"></p>
            <ul class="d-flex gap-5">
              <li class="text-capitalize text-start" style="direction: ltr; font-size: 100%;" v-for="topic in subtopic"
                :key="topic.uId">
                {{ topic.title }}</li>
            </ul>
          </div>
          <!-- </div> -->
        </div>
        <div class="d-flex gap-2 mb-3 button">
          <v-btn prepend-icon="mdi-pencil" class="text-success text-capitalize me-2" @click="openEdit" size="x-small"
            variant="elevated">Edit</v-btn>
          <v-btn prepend-icon="mdi-trash-can" class="text-danger text-capitalize" @click="deleteItem" size="x-small"
            variant="elevated">Delete</v-btn>
        </div>
        <div class="carousel-wrapper d-flex flex-column align-items-end">
          <v-carousel class="sub-carousel" height="400" hide-delimiters cover :show-arrows="images.length > 1">
            <v-carousel-item @click="openDialog(image.furl)" :src="image.furl" cover v-for="image in images"
              :key="image.furl" class="sub-carousel">
            </v-carousel-item>
          </v-carousel>
        </div>
      </div>
      <div class="d-flex video-btn">
        <v-btn prepend-icon="mdi mdi-volume-high" @click="audioDialog = true;" v-if="audio.length > 0" variant="tonal"
          class="border border-white me-3" size="small">Listen</v-btn>
        <v-btn @click="openVideoDialog" variant="tonal" v-if="video.length > 0" prepend-icon="mdi-video"
          class="border border-white" size="small">Watch</v-btn>
      </div>
      <v-dialog v-model="dialog" max-width="650">
        <v-img :src="selectedImage" contain></v-img>
      </v-dialog>
      <v-dialog v-model="videoDialog" width="800" scrim="#212121" style="background-color: #40463c;" persistent>
        <v-card width="800">
          <div class="d-flex justify-content-between align-items-center mx-3 pt-2">
            <h4 class="mt-2 ps-2">{{ head ?? title }}</h4>
            <v-btn dark @click="closeVideoDialog" icon="mdi-close" flat></v-btn>
          </div>
          <v-card-text class="pt-0">
            <video controls width="100%" v-if="video.length > 0" :src="video[0].furl" type="video/*" autoplay>
              Your browser does not support the video tag.
            </video>
          </v-card-text>
        </v-card>
      </v-dialog>
      <v-dialog v-model="audioDialog" width="800" scrim="#212121" class="bg-blue-grey-darken-4" persistent>
        <div class="d-flex justify-content-end">
          <v-icon class="mdi mdi-close" color="white" @click="audioDialog = false"></v-icon>
        </div>
        <h4 class="text-white">{{ head ?? title }}</h4>
        <div class="d-flex justify-content-center mx-3 mb-3">
          <audio controls class="w-100  mt-2" :src="audio[0].furl" type="audio/*" autoplay>
            Your browser does not support the audio element.
          </audio>
        </div>
        <div style="width: 100%; height:95%; overflow-x:hidden">
          <p class="text-wrap text-start" v-html="formattedDescription"></p>
        </div>
      </v-dialog>
    </div>
  </div>
  <v-dialog v-model="editDialog" width="1000" persistent>
    <edit-form :head="head" :description="description" :images="images" :video="video" :url="url" :audio="audio"
      @finish="editDialog = false" :commonId="commonId" :uId="uId" @update="update" :main="main" :malId="malId"
      :engId="engId" :subtopic="subtopic" @dialogClose="editDialog = false;" @exit="editDialog = false;"
      :bgImage="bgImage"></edit-form>
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
  emits: ['update'],
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
    'id',
    'bgImage'
  ],
  data() {
    return {
      dialog: false,
      dialogDelete: false,
      dialogTopic: false,
      dialogHead: '',
      icon: '',
      color: '',
      message: '',
      selectedImage: null,
      videoDialog: false,
      videoUrl: '',
      editDialog: false,
      loading: false,
      audioDialog: false
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
        fsEngId: this.engId,
        backgroundImgList: this.bgImage
      }
      console.log('props',props)
      this.$store.commit('display/setFirstSubData', props)
      this.$router.push({ name: 'display-sub-view' })
    },
    deleteItem() {
      this.dialogDelete = true
    },
    async deleteItemConfirm() {
      this.loading = true;
      try {
        let response;
        if (this.main == true) {
          response = await this.$store.dispatch('display/deleteMain', this.commonId)
        }
        if (this.main == false) {
          response = await this.$store.dispatch('display/deleteSub', this.commonId)
        }
        if (response) {
          this.loading = false
          let message = 'Topic and details deleted successfully !!';
          this.closeDelete();
          this.success(message);
          if (this.main == true) {
            this.$router.push({ name: 'display-view' })
          }
          this.update();
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
  computed: {
    formattedDescription() {
      if (this.description) {
        return this.description.replace(/\n/g, '<br>');
      }
      else return '';
    }
  },
};
</script>

<style scoped>
.sub-card {
  width: 75%;
  aspect-ratio: 1676 / 800;
  height: 40rem;
  background-color: #40463c;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
  color: #ffffff;
  border-radius: 60px 0 0 60px;
  position: relative;
}
.button {
  position: absolute;
  top: 3%;
  left: 3%;
}
.text-card {
  width: 75%;  
  aspect-ratio: 1107 / 600;
}
.carousel-wrapper {
  aspect-ratio: 813/650;
  position: absolute;
  right: 75%;
  top: 17%;
  width: 50%;
  aspect-ratio: 271 / 200; 
}
.sub-carousel {
  width: 100%;  
  height: 100%;
}
.desc,
.details-content {
  width: 100%;
  font-size: 100%;
  aspect-ratio: 1107 / 600;
  line-height: 180%;
  height: 24rem;
}
.title{
  font-size: 160%;
  line-height: 180%;
}
.video-btn {
  position: absolute;
  bottom: 12%;
  right: 6%;
}
/* :deep(.carousel-wrapper .v-btn) {
  background-color: transparent;
} */
::-webkit-scrollbar,
:deep(::-webkit-scrollbar) {
  width: 4px;
  height: auto;
}
::-webkit-scrollbar-track,
:deep(::-webkit-scrollbar-track) {
  background: #272B25;
}
::-webkit-scrollbar-thumb,
:deep(::-webkit-scrollbar-thumb) {
  background: #8D9387;
  border-radius: 30px;
}
::-webkit-scrollbar-thumb:hover,
:deep(::-webkit-scrollbar-thumb:hover) {
  background: #f5eded;
  cursor: pointer;
}
:deep(pre) {
  text-wrap: wrap;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: auto;
  max-height: 25rem;
  padding-right: 5px;
  font-family: Arial, Helvetica, sans-serif;
  text-align: justify;
  font-size: 20px;
  direction: ltr;
}
:deep(.description) {
  font-size: 110%;
  text-align: justify;
}
</style>