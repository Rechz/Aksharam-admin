<template>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
        <v-card width="600" rounded="3">
            <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{
                dialogHead }}</v-card-title>
            <v-card-text class="px-5 text-center">
                <v-icon size="88" :class="icon" :color="color"></v-icon>
                <h6>{{ message }}</h6>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-card flat :disabled="!proceed && qrGenerated">
        <v-card-text class="ps-0">
            <p class="text-danger fst-italic mt-1">**Please submit Malayalam & English data before proceeding to
                upload media. Do not refresh the page to avoid data loss.</p>
            <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                <div class="d-flex">
                    <div>
                        <v-select class="select mb-2" label='Select Language' density="comfortable" :items="languages"
                            v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"
                            variant="outlined"></v-select>
                        <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                            density="comfortable" class="select mb-2" variant="outlined"></v-text-field>
                        <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc mb-2" rows="6"
                            v-model="description" variant="outlined" counter></v-textarea>
                        <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                            class="reference desc" rows="2" v-model="url" variant="outlined" counter></v-textarea>
                    </div>
                    <div class="d-flex flex-column ">
                        <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malHeading }} (Malayalam)
                            added.</h6>
                        <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engHeading }} (English)
                            added.</h6>
                    </div>
                </div>
                <div class="d-flex justify-content-end">
                    <div class="d-flex gap-2">
                        <v-btn v-if="QRLoad" color="#386568" class="text-capitalize" type="submit" :disabled="subload"
                            variant="outlined" rounded :loading="subload" prepend-icon="mdi-plus">Add {{ topic
                            }}</v-btn>
                        <v-btn v-else color="#386568" class="text-capitalize" variant="elevated" rounded
                            :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit &
                            Proceed</v-btn>
                    </div>
                </div>
            </v-form>
        </v-card-text>
    </v-card>
    <v-divider class=""></v-divider>
    <v-card flat class="ps-0" :disabled="!qrGenerated">
        <v-card-title class="bg-blue-grey-lighten-5 mb-3">Images</v-card-title>
        <v-card flat class="ms-3">
            <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="d-none" accept="image/*">
            <v-btn @click="triggerImageInput" color="blue-grey-darken-4" variant="outlined" size="small"
                class="text-capitalize">Choose Images</v-btn>
            <template v-if="imgPreview.length === 0">
                <label for="imageFile" class="ms-2">No images chosen.</label>
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
            <div class="d-flex justify-content-start mt-3 ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully uploaded.</h6>
            </div>
        </v-card>
        <div class="d-flex justify-content-end gap-3 my-2 w-100">
            <v-btn @click="uploadImages" color="#386568" variant="outlined" rounded :disabled="imageLoad"
                :loading="imageLoad" prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
        </div>
    </v-card>
    <v-divider class=""></v-divider>
    <v-card flat class="ps-0" :disabled="!qrGenerated">
        <v-card-title class="bg-blue-grey-lighten-5 mb-3">Video</v-card-title>
        <v-card class="" flat :disabled="videoLoad || videoSubmit">
            <div class="mb-3">
                <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2 d-none" accept="video/*">
                <v-btn @click="triggerVideoInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">Choose Video</v-btn>
                <template v-if="videoFiles.length === 0">
                    <label for="fileVideo" class="ms-2">No video chosen.</label>
                </template>
                <template v-else>
                    <div class="mt-2">
                        <v-chip v-for="file in videoFiles" :key="file.name" closable @click:close="removeVideo(file)"
                            class="me-2 mb-1">{{ file.name }}</v-chip>
                    </div>
                </template>
            </div>
            <div class="d-flex justify-content-start mt-3 ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="videoSubmit">*Video successfully uploaded.</h6>
            </div>
            <div class="d-flex justify-content-end gap-3 my-2 w-100">
                <v-btn @click="submitVideo(fileType.video)" color="#386568" variant="outlined" prepend-icon="mdi-video"
                    class="text-capitalize rounded-5" :disabled="videoLoad" :loading="videoLoad">Submit Video</v-btn>
            </div>
        </v-card>
    </v-card>
    <v-divider></v-divider>
    <v-card flat :disabled="!qrGenerated">
        <v-card-title class="bg-blue-grey-lighten-5 mb-3">Audio</v-card-title>
        <v-card class="" flat :disabled="audioLoad || (audioEngSubmit && audioMalSubmit)">
            <v-select class="select mb-2" label="Select Language" density="comfortable" :items="languages"
                v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"
                variant="outlined"></v-select>
            <div class="mb-3">
                <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2 d-none" accept="audio/*">
                <v-btn @click="triggerAudioInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">Choose Audio</v-btn>
                <template v-if="audioFiles.length === 0">
                    <label for="fileAudio" class="ms-2">No audio chosen.</label>
                </template>
                <template v-else>
                    <div class="mt-2">
                        <v-chip v-for="file in audioFiles" :key="file.name" closable @click:close="removeAudio(file)"
                            class="me-2 mb-1">
                            {{ file.name }}
                        </v-chip>
                    </div>
                </template>
            </div>
            <div class="d-flex flex-column align-items-start justify-content-center mt-3 ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="audioMalSubmit">**Malayalam audio successfully
                    uploaded.</h6>
                <h6 class="text-success text-end fst-italic mb-0" v-if="audioEngSubmit">**English audio successfully
                    uploaded.</h6>
            </div>
            <div class="d-flex justify-content-end gap-3 my-2 w-100">
                <v-btn @click="submitAudio(fileType.audio)" color="#386568" variant="outlined" prepend-icon="mdi-music"
                    class="text-capitalize" :disabled="audioLoad" :loading="audioLoad" rounded>Submit Audio</v-btn>
            </div>
        </v-card>
    </v-card>
    <v-divider></v-divider>
    <v-card flat class="ps-0" :disabled="!qrGenerated">
        <v-card-title class="bg-blue-grey-lighten-5 mb-3">PDF File</v-card-title>
        <v-card class="" flat :disabled="pdfLoad || pdfSubmit">
            <div class="mb-3">
                <input type="file" ref="filepdf" @change="handlePdf" class="mb-2 d-none" accept="application/pdf">
                <v-btn @click="triggerPdfInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">Choose PDF</v-btn>
                <template v-if="pdfFile.length === 0">
                    <label for="filePdf" class="ms-2">No PDF uploaded.</label>
                </template>
                <template v-else>
                    <div class="mt-2">
                        <v-chip v-for="file in pdfFile" :key="file.name" closable @click:close="removePdf(file)"
                            class="me-2 mb-1">
                            {{ file.name }}
                        </v-chip>
                    </div>
                </template>
            </div>
            <div class="d-flex justify-content-start mt-3 ">
                <h6 class="text-success text-end fst-italic mb-0" v-if="pdfSubmit">*PDF successfully uploaded.</h6>
            </div>
            <div class="d-flex justify-content-end gap-3 my-2 w-100">
                <v-btn @click="submitPdf" color="#386568" variant="outlined" prepend-icon="mdi-file-pdf-box"
                    class="text-capitalize rounded-5" :disabled="pdfLoad" :loading="videoLoad">Submit PDF</v-btn>
            </div>
        </v-card>
    </v-card>
    <v-divider></v-divider>
    <v-card :disabled="!qrGenerated" flat>
        <v-card-title class="bg-blue-grey-lighten-5 mb-3">Paragraphs</v-card-title>
        <v-card-text>
            <div v-if="subHeads && subHeads.length > 0">
                <v-list lines="one">
                    <v-list-item v-for="(topic, index) in subHeads" :key="index" :title="topic.title"></v-list-item>
                </v-list>
            </div>
            <v-card-subtitle v-else class="mb-0 py-0">No paragraphs added.</v-card-subtitle>
            <div class="d-flex justify-content-end">
                <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus" class="text-capitalize"
                    @click="paraAdd = !paraAdd">Add Paragraph</v-btn>
            </div>
        </v-card-text>
    </v-card>
    <v-dialog v-model="paraAdd">
        <add-paragraph :idmal="idmal" :ideng="ideng" ></add-paragraph>
    </v-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import AddParagraph from './AddParagraph.vue';
export default {    
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
            pdfFile: [],
            pdfSubmit: false,
            pdfLoad: false,
            paraAdd: false
        };
    },
    components: { AddParagraph},
    computed: {
        ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia']),
        ...mapGetters('guide', ['getidmal','getideng','getCommonIdMain','getmalHeading','getengHeading']),
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
        idmal() {
            return this.getidmal;
        },
        ideng() {
            return this.getideng;
        },
        commonId() {
            return this.getCommonIdMain;
        },
        malHeading() {
            return this.getmalHeading;
        },
        engHeading() {
            return this.getengHeading;
        }
    },
    methods: {
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
            this.subload = true;
            let uid = this.language == 1 ? this.idmal : this.ideng;
            const language = this.language;
            const data = {
                "topic": this.title,
                "description": this.description,
                "refURL": this.url
            };
            const payload = {
                uid: uid,
                lang: language,
                data: data
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                try {
                    const response = await this.$store.dispatch('guide/submitHeading', payload);
                    if (response) {
                        this.subload = false;
                        let language = this.languages.find(lang => lang.dtId == this.language);
                        let message;
                        if (this.language == 1) {
                            message = `${this.malHeading} (${language.talk}) added successfully!`;
                            this.success(message);
                            this.malSubmit = true;
                            this.$refs.form.reset();
                            this.language = 2;
                        }
                        else {
                            message = `${this.engHeading} (${language.talk}) added successfully!`;
                            this.success(message);
                            this.engSubmit = true;
                            this.$refs.form.reset();
                            this.language = 1;
                        }
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
        async generateQR() {
            let message;
            this.QRLoading = true;
            const payload = {
                ideng: this.ideng,
                idmal: this.idmal
            }
            try {
                const response = await this.$store.dispatch('guide/generateCommonId', payload);
                if (response) {
                    this.QRLoading = false;
                    message = 'Qr generated successfully. Proceed to next steps.';
                    this.qrGenerated = true;
                    this.QRLoad = true;
                    this.success(message);
                    this.$emit('update');
                }
            }
            catch (error) {
                this.QRLoad = false;
                this.QRLoading = false;
                message = 'Error generating QR: ' + error.message;
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
                    this.imgPreview.push({ url: reader.result, file });
                };
                reader.readAsDataURL(file);
            }
        },
        removeImage(image) {
            const imgIndex = this.images.findIndex(img => img === image);
            if (imgIndex !== -1) {
                this.imgPreview.splice(imgIndex, 1);
                this.images.splice(imgIndex, 1);
            }
        },
        async uploadImages() {
            let message;
            this.imageLoad = true;
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
                const response = await this.$store.dispatch('display/uploadSubImages', payload);
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
            } catch (error) {
                this.imageLoad = false;
                this.imageSubmit = false;
                message = 'Error uploading images:' + error.message;
                this.error(message);
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
            let uid = this.languageAV == 1 ? this.idmal : this.ideng;
            const formData = new FormData();
            this.audioFiles.forEach((file) => { formData.append("file", file); });
            const payload = {
                id: uid,
                type: id,
                formData: formData
            }
            try {
                const response = await this.$store.dispatch('guide/submitMedia', payload);
                if (response) {
                    this.audioLoad = false;
                    if (this.languageAV == 1) {
                        message = 'Malayalam audio uploaded successfully';
                        this.audioMalSubmit = true;
                        this.languageAV == 2;
                    }
                    else {
                        message = 'English audio uploaded successfully';
                        this.audioEngSubmit = true;
                        this.languageAV == 1
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
            const selectedFiles = event.target.files[0];
            this.videoFiles.push(selectedFiles);
        },
        removeVideo(file) {
            const videoIndex = this.videoFiles.findIndex(vid => vid === file);
            this.videoFiles.splice(videoIndex, 1);
            this.$refs.fileVideo.value = '';
        },
        async submitVideo(id) {
            let message;
            this.videoLoad = true;
            let uid = this.commonId;
            const formData = new FormData();
            this.videoFiles.forEach((file) => { formData.append("file", file); });
            const payload = {
                id: uid,
                type: id,
                formData: formData
            }
            try {
                const response = await this.$store.dispatch('guide/submitMedia', payload);
                if (response) {
                    this.videoLoad = false;
                    message = 'Video uploaded successfully';
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
        triggerPdfInput() {
            this.$refs.filepdf.click();
        },
        handlePdf(event) {
            const selectedFiles = event.target.files;
            if (selectedFiles.length > 0) {
                this.pdfFile = Array.from(selectedFiles); 
            }
        },
        removePdf(file) {
            const index = this.pdfFile.findIndex(f => f.name === file.name);
            if (index !== -1) {
                this.pdfFile.splice(index, 1); 
            }
        },
        async submitPdf() {
            if (this.pdfFile.length === 0) return;
            this.pdfLoad = true;
            const formData = new FormData();
            this.pdfFile.forEach((file) => {
                formData.append('file', file);
            });

            try {
                // Make the API request to submit the PDF
                const response = await ('/api/upload-pdf', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response) {
                    this.pdfSubmit = true;
                    this.pdfFile = []; 
                    this.pdfLoad = false;
                }
            } catch (error) {
                console.error('PDF upload failed:', error);
                this.pdfLoad = false;
            }
        },
        finish() {
            this.$store.commit('display/setMalSubHeading', '');
            this.$store.commit('display/setEngSubHeading', '');
            this.$store.commit('display/setSubidmal', '');
            this.$store.commit('display/setSubideng', '');
            this.subhead = false;
            this.malSubmit = false;
            this.engSubmit = false;
            this.audioEngSubmit = false;
            this.audioMalSubmit = false;
            this.videoEngSubmit = false;
            this.videoMalSubmit = false;
            this.imageSubmit = false;
            this.languageAV = null;
            this.qrGenerated = false;
        },
        async getType() {
            try {
                await this.$store.dispatch('display/getType');
            }
            catch (err) {
                console.log(err)
            }
        },
        async getAllLanguages() {
            try {
                await this.$store.dispatch('display/getAllLanguages');
            }
            catch (error) {
                console.error(error)
            }
        },
    },
    created() {
        this.getAllLanguages();
        this.getType();
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