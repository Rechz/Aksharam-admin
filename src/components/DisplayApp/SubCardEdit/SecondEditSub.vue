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
    <v-sheet>
        <v-card-title class="text-center text-white d-flex justify-content-between px-4 fixed-top"
            style="background-color: #2C7721;">
            <v-icon size="24" color="white" @click="back">mdi-arrow-left</v-icon>
            <h5>Add Sub Heading</h5>
            <v-icon size="24" color="white" @click="close">mdi-close</v-icon>
        </v-card-title>
        <div ref="dialogContent"></div>
        <v-card flat :disabled="!proceed && qrGenerated">
            <v-card-text class="px-5 pt-5 mt-4">
                <p class="text-danger fst-italic mt-1">
                    **Please submit Malayalam & English data before proceeding to upload media. Do not refresh the page
                    to avoid data loss.</p>
                <v-form class="pt-0 " ref="form" @submit.prevent="submitHeading">
                    <div class="d-flex">
                        <v-card flat :disabled="!QRLoad">
                            <v-select class="select mb-2" label='Select Language' density="comfortable"
                                :items="languages" v-model="language" :rules="languageRules" item-title="talk"
                                item-value="dtId" variant="outlined" :disabled="malSubmit || engSubmit"></v-select>
                            <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Sub Heading'"
                                density="comfortable" class="select mb-2" variant="outlined"></v-text-field>
                            <v-textarea :label="language === 1 ? 'വിവരണം' : 'Subheading Description'" class="desc mb-2"
                                rows="6" v-model="description" variant="outlined" counter></v-textarea>
                            <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                class="reference desc" rows="2" v-model="url" variant="outlined" counter></v-textarea>
                        </v-card>
                        <div class="d-flex flex-column ">
                            <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malSubHeading }}
                                (Malayalam) subtopic added.</h6>
                            <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engSubHeading }}
                                (English) subtopic added.</h6>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div class="d-flex gap-2">
                            <v-btn v-if="QRLoad" color="#386568" size="large" class="text-capitalize" type="submit"
                                :disabled="subload" variant="elevated" rounded :loading="subload">Add {{ topic }} sub
                                topic</v-btn>
                            <v-btn v-else color="#386568" size="large" class="text-capitalize" variant="outlined"
                                rounded :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit &
                                Proceed</v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="px-5" :disabled="!qrGenerated">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">Subheading Background image</v-card-title>
            <v-card flat class="ms-3 my-3" :disabled="bgSubmit">
                <input type="file" ref="imageBg" @change="handleBgImage" class="d-none" accept="image/*">
                <v-btn @click="triggerFileInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">
                    Choose Background
                </v-btn>
                <template v-if="bgFile.length === 0">
                    <label for="imageBg" class="ms-2">No background image chosen.</label>
                </template>
                <template v-else>
                    <v-chip v-for="(file, index) in bgFile" :key="index" closable @click:close="removeBg(index)"
                        class="ms-2">
                        {{ file.name }}
                    </v-chip>
                </template>
                <v-img v-if="imageBg" :src="imageBg" width="200" height="100" class="mt-3" cover
                    style="background-position: center; max-width: 200px;"></v-img>
                <div class="mt-3 d-flex justify-content-end">
                    <v-btn @click="uploadBg" color="#386568" variant="outlined" :disabled="bgLoad" :loading="bgLoad"
                        prepend-icon="mdi-upload" class="text-capitalize" rounded>Upload Background</v-btn>
                </div>
            </v-card>
            <div class="d-flex gap-3 mt-3">
                <div class="d-flex flex-column align-items-end justify-content-center ">
                    <h6 class="text-success text-end fst-italic mb-0" v-if="bgSubmit">*Background image successfully
                        uploaded.</h6>
                </div>
            </div>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="px-5" :disabled="!qrGenerated">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">Subheading Images</v-card-title>
            <v-card-text class="">
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
            </v-card-text>
            <div class="d-flex justify-content-end gap-3 my-2 w-100">
                <v-btn @click="uploadImages" color="#386568" variant="outlined" rounded :disabled="imageLoad"
                    :loading="imageLoad" prepend-icon="mdi-upload" class="text-capitalize">Upload
                    Images</v-btn>
            </div>
            <div>
                <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully
                    uploaded.
                </h6>
            </div>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="px-5" :disabled="!qrGenerated">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">SubHeading Audio</v-card-title>
            <v-sheet class="p-3" flat :disabled="audioMalSubmit && audioEngSubmit">
                <div class="d-flex flex-column gap-2">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"
                        variant="outlined" :disabled="audioMalSubmit || audioEngSubmit"></v-select>
                    <div>
                        <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2 d-none" accept="audio/*">
                        <v-btn @click="triggerAudioInput" color="blue-grey-darken-4" variant="outlined" size="small"
                            class="text-capitalize">Choose Audio</v-btn>
                        <template v-if="audioFiles.length === 0">
                            <label for="fileAudio" class="ms-2">No audio chosen.</label>
                        </template>
                        <template v-else>
                            <div class="mt-2">
                                <v-chip v-for="file in audioFiles" :key="file.name" closable
                                    @click:close="removeAudio(file)" class="me-2 mb-1">
                                    {{ file.name }}
                                </v-chip>
                            </div>
                        </template>
                    </div>
                    <div class="d-flex flex-column align-items-end justify-content-center ">
                        <h6 class="text-success text-end fst-italic mb-0" v-if="audioMalSubmit">**Malayalam audio
                            successfully uploaded.</h6>
                        <h6 class="text-success text-end fst-italic mb-0" v-if="audioEngSubmit">**English audio
                            successfully uploaded.</h6>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <v-btn @click="submitAudio(fileType.audio)" color="#386568" variant="outlined" rounded
                        prepend-icon="mdi-music" class="text-capitalize" :disabled="audioLoad"
                        :loading="audioLoad">Submit Audio</v-btn>
                </div>
            </v-sheet>
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">SubHeading Video</v-card-title>
            <v-sheet class="p-3" flat :disabled="videoSubmit">
                <div class="d-flex flex-column gap-2">
                    <div>
                        <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2 d-none" accept="video/*" multiple>
                        <v-btn @click="triggerVideoInput" color="blue-grey-darken-4" variant="outlined" size="small"
                            class="text-capitalize">Choose Video</v-btn>
                        <template v-if="videoFiles.length === 0">
                            <label for="fileVideo" class="ms-2">No video chosen.</label>
                        </template>
                        <template v-else>
                            <div class="mt-2">
                                <v-chip v-for="file in videoFiles" :key="file.name" closable
                                    @click:close="removeVideo(file)" class="me-2 mb-1">{{ file.name }}</v-chip>
                            </div>
                        </template>
                    </div>
                    <div class="d-flex flex-column align-items-end justify-content-center ">
                        <h6 class="text-success text-end fst-italic mb-0" v-if="videoSubmit">*Video successfully
                            uploaded.</h6>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <v-btn @click="submitVideo(fileType.video)" color="#386568" variant="outlined" rounded
                        prepend-icon="mdi-video" class="text-capitalize" :disabled="videoLoad"
                        :loading="videoLoad">Submit Video</v-btn>
                </div>
            </v-sheet>
        </v-card>
        <div class="my-5 d-flex justify-content-end align-items-center gap-2 px-5">
            <!-- <v-btn color="#2C7721" size="large" variant="elevated" prepend-icon="mdi-step-backward" @click="back">Finish
                & Return</v-btn> -->
            <v-btn color="#2C7721" size="large" variant="elevated" append-icon="mdi-step-forward" @click="finish">Add
                New Subheading</v-btn>
        </div>
    </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    emits: ['back', 'update','close'],
    props: ['idmal', 'ideng', 'main'],
    data() {
        return {
            qrGenerated: false,
            QRLoad: true,
            QRLoading: false,
            malSubmit: false,
            engSubmit: false,
            imageSubmit: false,
            videoSubmit: false,
            audioEngSubmit: false,
            audioMalSubmit: false,
            subload: false,
            imageLoad: false,
            videoLoad: false,
            audioLoad: false,
            images: [],
            imgPreview: [],
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
            bgFile: [],
            imageBg: null,
            bgLoad: false,
            bgSubmit: false
        };
    },
    computed: {
        ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia', 'getsub2idmal', 'getsub2ideng', 'getmalSub2Heading', 'getengSub2Heading','getCommonIdSub2']),
        proceed() {
            if ((this.malSubmit) && (this.engSubmit)) {
                return false;
            } else return true;
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
        },
        commonId() {
            return this.getCommonIdSub2;
        },
    },
    methods: {
        finish() {
            this.$store.commit('display/setMalSub2Heading', '');
            this.$store.commit('display/setEngSub2Heading', '');
            this.$store.commit('display/setSub2idmal', '');
            this.$store.commit('display/setSub2ideng', '');
            this.subhead = false;
            this.malSubmit = false;
            this.engSubmit = false;
            this.audioEngSubmit = false;
            this.audioMalSubmit = false;
            this.videoSubmit = false;
            this.imageSubmit = false;
            this.languageAV = null;
            this.$refs.dialogContent.scrollIntoView({ behavior: 'smooth' });
        },
        close() {
            this.$emit('close'); 
        },
        back() {
            this.$emit('back');
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
            let uid = this.language == 1 ? this.idmal : this.ideng;
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
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
                    const response = await this.$store.dispatch('display/submitSub2Head', payload);
                    if (response) {
                        this.subload = false;
                        if (this.language == 1) {
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
                        this.$emit('update');
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
                const response = await this.$store.dispatch('display/generateQRSub2', payload);
                if (response) {
                    this.QRLoading = false;
                    message = 'Proceed to next steps.';
                    this.success(message);
                    this.qrGenerated = true;
                    this.QRLoad = true;
                    this.$emit('update');
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
        triggerFileInput() {
            this.$refs.imageBg.click();
        },
        handleBgImage(event) {
            const file = event.target.files[0];
            if (file) {
                this.bgFile = [file]; // Only handle one file
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
                const response = await this.$store.dispatch('display/uploadSub2Images', payload);
                if (response) {
                    this.imageLoad = false;
                    this.imageSubmit = true;
                    message = 'Image uploaded successfully';
                    this.success(message);
                    this.images = [];
                    this.imgPreview = [];
                    this.$refs.imageFile.value = '';
                    this.$emit('update');
                }
            }
            catch (error) {
                this.imageLoad = false;
                this.imageSubmit = false;
                message = 'Error uploading images:' + error.message;
                this.error(message);
            }
        },
        removeImage(image) {
            const imgIndex = this.images.findIndex(img => img === image);
            if (imgIndex !== -1) {
                this.imgPreview.splice(imgIndex, 1);
                this.images.splice(imgIndex, 1);
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
            let uid = this.languageAV == 1 ? this.subidmal : this.subideng;
            const formData = new FormData();
            this.audioFiles.forEach((file) => { formData.append("files", file); });
            const payload = {
                uid: uid,
                formData: formData,
                id: id
            }
            try {
                const response = await this.$store.dispatch('display/submitSub2Media', payload);
                if (response) {
                    this.audioLoad = false;
                    if (this.languageAV == 1) {
                        message = 'Malayalam audio uploaded successfully';
                        this.audioMalSubmit = true;
                        this.languageAV = 2
                    }
                    else {
                        message = 'English audio uploaded successfully';
                        this.audioEngSubmit = true;
                        this.languageAV = 1
                    }
                    this.success(message);
                    this.audioFiles = [];
                    this.$refs.fileAudio.value = '';
                    this.$emit('update');
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
            this.videoLoad = true;
            let message;
            let uid = this.commonId;
            const formData = new FormData();
            this.videoFiles.forEach((file) => { formData.append("files", file); });
            const payload = {
                uid: uid,
                formData: formData,
                id: id
            }
            try {
                const response = await this.$store.dispatch('display/submitSub2Media', payload);
                if (response) {
                    this.videoLoad = false;
                    message = 'Malayalam video uploaded successfully';
                    this.videoSubmit = true;
                    this.success(message);
                    this.videoFiles = [];
                    this.$refs.fileVideo.value = '';
                    this.$emit('update');
                }
            }
            catch (err) {
                this.videoLoad = false;
                message = 'Error uploading video:' + err.message;
                this.error(message);
            }
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