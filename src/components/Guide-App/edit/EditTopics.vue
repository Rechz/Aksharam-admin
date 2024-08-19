<template>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
        <v-card width="600" rounded="3">
            <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{ dialogHead
                }}</v-card-title>
            <v-card-text class="px-5 text-center">
                <v-icon size="88" :class="icon" :color="color"></v-icon>
                <h6>{{ message }}</h6>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-sheet class="pb-5">
        <v-card-title class="text-center text-white d-flex justify-content-between px-4 fixed-top"
            style="background-color: #2C7721;">
            <h5>Edit {{ title }} Details</h5>
            <v-icon size="24" color="white" @click="exit">mdi-close</v-icon>
        </v-card-title>
        <div ref="dialogContent"></div>
        <v-card flat>
            <v-card-text class="px-5 pt-5 mt-4">
                <v-form class="pt-0 " ref="form" @submit.prevent="submitHeading">
                    <div class="d-flex">
                        <v-card flat class="pt-2">
                            <v-text-field v-model="editTitle" :label="language == 1 ? 'തലക്കെട്ട്' : 'Paragraph title'"
                                density="comfortable" class="select mb-2" variant="outlined"></v-text-field>
                            <v-textarea :label="language == 1 ? 'വിവരണം' : 'Paragraph Description'" class="desc mb-2"
                                rows="6" v-model="editDescription" variant="outlined" counter></v-textarea>
                            <v-textarea :label="language == 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                class="reference desc" rows="2" v-model="editUrl" variant="outlined"
                                counter></v-textarea>
                        </v-card>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div class="d-flex gap-2">
                            <v-btn color="#386568" class="text-capitalize" type="submit" :disabled="subload"
                                variant="outlined" rounded :loading="subload">Update Topic</v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="mx-5">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">Images</v-card-title>
            <v-card-text>
                <div class="d-flex gap-3 flex-wrap" v-if="editImages.length > 0">
                    <div v-for="(image, index) in editImages" :key="image.imgID">
                        <v-card>
                            <v-img :src="image.furl" height="150" width="200" cover class="mx-auto"></v-img>
                            <v-card-actions class="py-0 d-flex justify-content-end ">
                                <v-btn icon="mdi-pencil" size="small" color="success" @click="edit(image.id, index)"
                                    v-if="!image.isEdit"></v-btn>
                                <v-progress-circular :width="1" color="success" indeterminate size="x-small"
                                    v-else></v-progress-circular>
                                <v-btn icon="mdi-delete" size="small" color="error"
                                    @click="imageId = image.id; deleteDialogImage = true"></v-btn>
                            </v-card-actions>
                        </v-card>
                        <v-dialog v-model="deleteDialogImage" width="400px">
                            <v-card class="rounded-4 pb-4">
                                <v-card-title class="mb-2 text-white ps-4 fs-4"
                                    style="background-color: #BA1A1A;">Delete Image</v-card-title>
                                <v-container class="px-4 d-flex flex-column align-items-center">
                                    <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                                    <v-card-text class="mt-1 text-center">Are you sure you want to delete this image?</v-card-text>
                                </v-container>
                                <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                                    <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;"
                                        :disabled="imageDelete" :loading="imageDelete" @click="deleteImage()">Delete</v-btn>
                                    <v-btn block variant="text" class="mb-3"
                                        @click="deleteDialogImage = false">Cancel</v-btn>
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
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="mx-5">
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
                                <v-card-text class="mt-1 text-center">Are you sure you want to delete this
                                    video?</v-card-text>
                            </v-container>
                            <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                                <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;"
                                    :disabled="videoDelete" :loading="videoDelete" @click="deleteVideo">Delete</v-btn>
                                <v-btn block variant="text" class="mb-3"
                                    @click="deleteDialogVideo = false">Cancel</v-btn>
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
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="mx-5">
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
                                <v-card-text class="mt-1 text-center">Are you sure you want to delete this
                                    audio?</v-card-text>
                            </v-container>
                            <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                                <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;"
                                    :disabled="audioDelete" :loading="audioDelete" @click="deleteAudio">Delete</v-btn>
                                <v-btn block variant="text" class="mb-3"
                                    @click="deleteDialogAudio = false;">Cancel</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-card>
                <v-card-subtitle v-else class="mb-0 py-0">No audio uploaded.</v-card-subtitle>
                <div class="d-flex justify-content-end">
                    <input type="file" ref="addAudio" @change="addAudio" class="d-none" accept="audio/*">
                    <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                        :disabled="audioLoad" :loading="audioLoad" v-if="editAudio.length === 0">Add
                        Audio</v-btn>
                </div>
            </v-card-text>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <div class="d-flex justify-content-end gap-3 mx-5">
            <v-btn color="#2C7721" variant="outlined" prepend-icon="mdi-plus" class="text-capitalize"
                @click="paraAdd = !paraAdd">Add Paragraph</v-btn>
            <v-btn color="#2C7721" variant="elevated" prepend-icon="mdi-check" class="text-capitalize"
                @click="finish">Finish</v-btn>
        </div>


    </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    emits: ['exit'],
    props: ['main','title', 'description','reference','topicImage','topicVideo','topicAudio','topicPdf','paragraphs','commonId'],
    data() {
        return {
            qrGenerated: false,
            QRLoad: true,
            QRLoading: false,
            subload:false,
            imageLoad: false,
            videoLoad: false,
            audioLoad: false,
            editTitle: this.title,
            editDescription: this.description,
            editUrl: this.reference,
            images:[],
            audioFiles: [],
            videoFiles: [],
            message: '',
            loading: false,
            color: '',
            icon: '',
            dialogTopic: false,
            dialogHead: '',
            imageId: null,
            imageIndex: null,
            imageDelete: false,
            videoDelete: false,
            audioDelete: false,
            newImage: null,
            imagesAdd: [],
            videoAdd: null,
            audioAdd: null,
            deleteDialogImage: false,
            deleteDialogVideo: false,
            deleteDialogAudio: false,
        };
    },
    computed: {
        ...mapGetters('display', ['getFileTypes', 'getMedia','getLanguage']),
        language() {
            return this.getLanguage;
        },
        fileTypes() {
            return this.getFileTypes;
        },
        fileType() {
            return this.getMedia;
        },
        editImages() {
            return this.topicImage || [];
        },
        editVideo() {
            return this.topicVideo || [];
        },
        editAudio() {
            return this.topicAudio || [];
        },
        // editPdf() {
        //     return this.topicPdf;
        // },
        subHeads() {
            if (this.paragraphs && this.paragraphs.length > 0) {
                return this.paragraphs;
            } else return [];
        } 
    },
    created() {
        this.editImages.forEach(image => image.isEdit = false);
        this.editAudio.forEach(audio => audio.isEdit = false);
        this.editVideo.forEach(video => video.isEdit = false);
    },
    methods: {
        exit() {
            this.$emit('exit');
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
            let uid = this.commonId;
            const language = this.language;
            const data = {
                "topic": this.editTitle,
                "description": this.editDescription,
                "refURL": this.editUrl
            };
            const payload = {
                id: uid,
                lang: language,
                data: data
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
                try {
                    const response = await this.$store.dispatch('guide/updateTopic', payload);
                    if (response) {
                        this.subload = false;
                        let message = 'Updated successfully!';
                        this.success(message);
                        this.$emit('update');
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
        edit(id, index) {
            this.imageIndex = index
            this.imageId = id;
            this.$refs.selectImage.click();
        },
        async handleImage(event) {
            const files = event.target.files[0];
            this.newImage = files;
            this.editImages[this.imageIndex].isEdit = true;
            const formData = new FormData();
            formData.append('files', this.newImage);
            // formData.append('imgIds', this.imageId);
            // formData.append('commonId', this.editImages[this.imageIndex].commonId);
            try {
                let response = await this.$store.dispatch('guide/updateImage',
                    {
                      commonId: this.commonId,
                      data: formData,
                      id: this.imageId
                    });
                if (response) {
                    this.editImages[this.imageIndex].isEdit = false;
                    let message = `Image updated successfully!`;
                    this.success(message);
                    this.$emit('update');
                    this.imageId = null
                    this.imageIndex = null
                }
            }
            catch (error) {
                this.editImages[this.imageIndex].isEdit = false;
                let message = error.message;
                this.error(message);
            }
        },
        add() {
            this.$refs.addImage.click();
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
                this.imagesAdd.forEach((image) => { formData.append("files", image); });
                payload = {
                    commonId: this.commonId,
                    formData: formData
                };
                response = await this.$store.dispatch('guide/submitImage', payload);
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
            formData.append("file", this.videoAdd);
            const payload = {
                id: this.commonId,
                type: this.media.video,
                formData: formData
            }
            try {
                this.videoLoad = true;
                let response = await this.$store.dispatch('guide/submitMedia', payload);
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
                    response = await this.$store.dispatch('display/updateMedia', formData);
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
    },
};
</script>
<style scoped>
:deep(.select .v-input__details, .desc .v-input__details) {
    min-height: 10px;
}

:deep(.select .v-input__control) {
    width: 400px !important;
}

:deep(.desc .v-input__control) {
    width: 700px !important;
}

:deep(.guide .v-input__control) {
    width: 250px !important;
}

:deep(.v-input__details) {
    padding-top: 1px;
}

:deep(.v-input--outlined .v-input__control .guide .desc) {
    border-top: none;
    border-left: none;
    border-right: none;
    transition: border-color 0.2s ease-in-out;
}

:deep(.v-input--outlined.v-input--is-focused .v-input__control .guide .desc) {
    border-bottom-color: #48663f;
}
</style>