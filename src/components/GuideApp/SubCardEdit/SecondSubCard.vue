<template>
    <div class="sub-card">
        <div class="text-card ps-5 pt-5">
            <div class="details-content">
                <div class="d-flex gap-3 align-items-center">
                    <h4 class="text-start title my-0">{{ title }}</h4>
                </div>
                <div class="desc">
                    <p class="text-wrap text-start ps-3 pre-text" v-html="description"></p>
                    <ul class="d-flex gap-5">
                        <li class="text-capitalize text-start" style="direction: ltr; font-size: 120%;"
                            v-for="topic in subtopic" :key="topic.uId">{{ topic.title }}
                        </li>
                    </ul>
                </div>


            </div>
            <div class="d-flex justify-content-center mt-5">
                <audio controls class="mt-3 mx-3 w-100" v-if="audio.length > 0" :src="audio[0].furl" type="audio/*">
                    Your browser does not support the audio element.
                </audio>
            </div>
            <div class="carousel-wrapper">
                <div class="d-flex gap-2 mb-3">
                    <v-btn prepend-icon="mdi-pencil" rounded="4" class=" text-success text-capitalize me-2 fw-bold"
                        size="small" @click="openEdit">Edit</v-btn>
                    <v-btn prepend-icon="mdi-trash-can" rounded="4" class=" text-danger text-capitalize fw-bold"
                        size="small" @click="deleteItem">Delete</v-btn>
                </div>
                <v-carousel class="sub-carousel" height="400" hide-delimiters cover :show-arrows="images.length > 1">
                    <v-carousel-item @click="openDialog(image.furl)" cover :src="image.furl"
                        v-for="(image, index) in images" :key="index" class="sub-carousel">
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
        <second-edit-form :head="head" :description="description" :images="images" :video="video" :url="url"
            :audio="audio" :commonId="commonId" @finish="editDialog = false" :uId="uId" @update="update" :main="main"
            :malId="malId" :engId="engId" :subtopic="subtopic"></second-edit-form>
    </v-dialog>
    <v-dialog v-model="dialogDelete" width="400px">
        <v-card class="rounded-4 pb-4">
            <v-card-title class="mb-2 text-white ps-4 fs-4" style="background-color: #BA1A1A;">Delete
                Topic</v-card-title>
            <v-container class="px-4 d-flex flex-column align-items-center">
                <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                <v-card-text class="mt-1 text-center fs-6">Are you sure you want to delete this topic and everything
                    related to
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
import SecondEditForm from './SecondEditForm.vue';

export default {
    emits: ['update'],
    components: { SecondEditForm },
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
        deleteItem() {
            this.dialogDelete = true
        },
        async deleteItemConfirm() {
            this.loading = true;
            try {
                let response;
                if (this.main == true) {
                    response = await this.$store.dispatch('guide/deleteSub', this.commonId)
                }
                if (this.main == false) {
                    response = await this.$store.dispatch('guide/deleteSub2', this.commonId)
                }
                if (response) {
                    this.loading = false
                    let message = 'Topic and details deleted successfully !!';
                    this.closeDelete();
                    this.success(message);
                    if (this.main == true) {
                        
                        this.$router.push({ name: 'guide-edit' })
                    } this.update();
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

    /* aspect-ratio: 541 / 200;  */

}

.text-card {
    width: 75%;
    aspect-ratio: 1107 / 600;
    /* height: 25rem; */
}

.carousel-wrapper {
    /* width: 100%; */
    aspect-ratio: 813/650;
    position: absolute;
    left: 80%;
    top: 8%;
    width: 50%;
    aspect-ratio: 271 / 200;
    /* Define aspect ratio for the wrapper */
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
.desc,
.details-content {
    width: 100%;
    font-size: 100%;
    line-height: 180%;
    height: 25rem;
    aspect-ratio: 1107 / 600;
}
.title {
    font-size: 110%;
    line-height: 180%;
}
/* .details-content {
    direction: ltr;
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
}
</style>