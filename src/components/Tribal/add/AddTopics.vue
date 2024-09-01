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
                            variant="outlined" :disabled="malSubmit || engSubmit"></v-select>
                        <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                            density="comfortable" class="select mb-2" variant="outlined"></v-text-field>
                        <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc mb-2" rows="6"
                            v-model="description" variant="outlined" counter></v-textarea>
                        <!-- <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                            class="reference desc" rows="2" v-model="url" variant="outlined" counter></v-textarea> -->
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
                            :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
                    </div>
                    <div ref="proceed"></div>
                </div>
            </v-form>
        </v-card-text>
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

    <v-card :disabled="!qrGenerated" flat>
        <v-card-text>
            <div class="d-flex justify-content-end gap-3">
                <v-btn color="#2C7721" variant="elevated" prepend-icon="mdi-check" class="text-capitalize"
                    @click="finish">Finish</v-btn>
            </div>
        </v-card-text>
    </v-card>
    
</template>

<script>
import { mapGetters } from 'vuex';
export default {    
    data() {
        return {
            qrGenerated: false,
            QRLoad: true,
            QRLoading: false,
            malSubmit: false,
            engSubmit: false,
            // imageSubmit: false,
            videoSubmit: false,
            // audioEngSubmit: false,
            // audioMalSubmit: false,
            // pdfMalSubmit: false,
            // pdfEngSubmit:false,
            subload: false,
            // imageLoad: false,
            videoLoad: false,
            // audioLoad: false,
            // images: [],
            // imgPreview: [],
            title: null,
            description: null,
            language: null,
            languageAV: null,
            languageRules: [v => !!v || '*Language is required'],
            url: null,
            // audioFiles: [],
            videoFiles: [],
            message: '',
            loading: false,
            color: '',
            icon: '',
            dialogTopic: false,
            dialogHead: '',
            // languagePdf: null,                         
            // pdfFile: [],
            // pdfSubmit: false,
            // pdfLoad: false,
            // paraAdd: false
        };
    },
    computed: {
        ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia']),
        ...mapGetters('tribal', ['getidmal','getideng','getCommonId','getmalHeading','getengHeading']),
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
            return this.getCommonId;
        },
        malHeading() {
            return this.getmalHeading;
        },
        engHeading() {
            return this.getengHeading;
        }
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
        
        async submitHeading() {
            this.subload = true;
            // let uid = this.language == 1 ? this.idmal : this.ideng;
            const language = this.language;
            const data = {
                "title": this.title,
                "description": this.description,
            };
            const payload = {
                // uid: uid,
                lang: language,
                data: data
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                try {
                    console.log('entered tribal');
                    const response = await this.$store.dispatch('tribal/submitTribalData', payload);
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
                idmal: this.idmal,
                ideng: this.ideng,
            }
            try {
                const response = await this.$store.dispatch('tribal/generateTribalCommonId', payload);
                if (response) {
                    this.QRLoading = false;
                    message = 'Qr generated successfully. Proceed to next steps.';
                    this.qrGenerated = true;
                    this.QRLoad = true;
                    this.success(message);
                }
            }
            catch (error) {
                this.QRLoad = false;
                this.QRLoading = false;
                message = 'Error generating QR: ' + error.message;
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
        async submitVideo() {
            let message;
            this.videoLoad = true;
            let uid = this.commonId;
            const formData = new FormData();
            this.videoFiles.forEach((file) => { formData.append("file", file); });
            const payload = {
                id: uid,
                // type: id,
                formData: formData
            }
            try {
                const response = await this.$store.dispatch('tribal/submitVideo', payload);
                if (response) {
                    this.videoLoad = false;
                    message = 'Video uploaded successfully';
                    this.videoSubmit = true;
                    this.success(message);
                    this.videoFiles = [];
                    this.$refs.fileVideo.value = '';
                }
            }
            catch (err) {
                this.videoLoad = false;
                message = 'Error uploading video:' + err.message;
                this.error(message);
            }
        },
        finish() {
            this.$store.commit('tribal/setMalHeading', '');
            this.$store.commit('tribal/setEngHeading', '');
            this.$store.commit('tribal/setIdmal', '');
            this.$store.commit('tribal/setIdeng', '');
            // this.subhead = false;
            this.malSubmit = false;
            this.engSubmit = false;
            // this.audioEngSubmit = false;
            // this.audioMalSubmit = false;
            this.videoSubmit = false;
            // this.imageSubmit = false;
            this.languageAV = null;
            // this.images = [];
            // this.imgPreview = [];
            // this.pdfFile = [];
            // this.audioFiles = [];
            this.videoFiles = [];
            this.qrGenerated = false;
            this.$router.push({ name: 'tribal-add' })
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
        },
        qrGenerated(newValue) {
            if (newValue) {
                this.$refs.proceed.scrollIntoView({ behavior: 'smooth' });
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