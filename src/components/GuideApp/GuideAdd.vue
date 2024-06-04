<template>
    <v-container class="py-8 px-0" fluid>
        <v-dialog width="600" max-width="600" v-model="dialogTopic">
            <v-card width="600" rounded="3">
                <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{
                    dialogHead }}</v-card-title>
                <v-card-text class="px-5 text-center">
                    <v-icon size="88" :class="icon" color="success"></v-icon>
                    <h6>{{ message }}</h6>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-stepper v-model="step" :items="items" hide-actions elevation="0" alt-labels flat>
            <template v-if="step === 1">
                <h5 class="text-center mt-4 fw-bolder ">Add Main Heading</h5>
                <p class="text-danger fst-italic mt-1">**Please submit Malayalam & English data before proceeding to
                    next page. Do not refresh the page to avoid data loss.</p>
                <v-card flat>

                    <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                        <div class="d-flex gap-4">
                            <div>
                                <v-select class="select" label='Select Language' density="comfortable"
                                    :items="languages" v-model="language" :rules="languageRules" item-title="talk"
                                    item-value="dtId" single-line></v-select>
                                <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                                    density="comfortable" class="select" :rules="titleRules" single-line></v-text-field>
                                <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc" rows="6"
                                    v-model="description" :rules="descriptionRules" single-line></v-textarea>
                                <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                    class="reference" rows="2" v-model="url" single-line></v-textarea>

                            </div>
                            <div class="d-flex flex-column ">
                                <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malHeading }}
                                    (Malayalam) topic
                                    added.
                                </h6>
                                <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engHeading }}
                                    (English) topic
                                    added.
                                </h6>
                            </div>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div class="d-flex gap-2">
                                <v-btn color="#386568" size="large" class="text-capitalize" type="submit"
                                    :disabled="subload" variant="elevated" rounded :loading="subload" v-if="QRLoad">Add
                                    {{ topic
                                    }}
                                    topic</v-btn>
                                <v-btn v-else color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                    :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
                            </div>
                            <div>
                                <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                    @click="step++" v-if="!proceed && qrGenerated">Skip</v-btn>
                            </div>

                        </div>
                    </v-form>


                </v-card>
            </template>
            <template v-else-if="step === 2">
                <h5 class="text-center mt-4 fw-bolder ">Main Heading Image</h5>
                <v-card flat>
                    <div class="d-flex gap-3">
                        <v-card flat class="mt-4" :disabled="imageLoad">
                            <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="mb-1"
                                accept="image/*">
                            <div class="d-flex gap-4 flex-wrap ">
                                <div v-for="(image, index) in imgPreview" :key="index" elevation="4"
                                    style="position: relative;">
                                    <v-card height="100" width="200">
                                        <img :src="image.url" alt="Uploaded Image"
                                            style="max-width: 200px; background-size: cover;">
                                    </v-card>
                                    <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)" size="32"
                                        style="position:absolute; top: -16%; right:-6%"
                                        color="green-lighten-1"></v-icon>
                                </div>
                            </div>

                        </v-card>
                        <div class="d-flex flex-column align-items-end justify-content-center ">
                            <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully
                                uploaded.
                            </h6>
                        </div>
                    </div>
                    <div class="d-flex justify-content-between gap-3 my-2 w-100">
                        <v-btn @click="uploadImages" color="#386568" size="large" variant="elevated" rounded
                            :disabled="imageLoad" :loading="imageLoad" prepend-icon="mdi-upload"
                            class="text-capitalize">Upload Images</v-btn>
                        <div class="d-flex gap-2">
                            <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                @click="step--">Back</v-btn>
                            <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                @click="step++">Next</v-btn>
                        </div>
                    </div>
                </v-card>
            </template>
            <template v-else-if="step === 3">
                <h5 class="text-center mt-4 fw-bolder ">Main Heading Audio/Video</h5>

                <div class="my-3">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
                    <div class="d-flex flex-column gap-2">
                        <v-card class="p-3 d-flex gap-2" flat :disabled="audioMalSubmit && audioEngSubmit">
                            <div>
                                <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2" accept="audio/*">
                                <ul>
                                    <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;"
                                        class="my-1">
                                        <v-chip closable>
                                            {{ file.name }}
                                        </v-chip>
                                    </li>
                                </ul>
                                <v-btn @click="submitAudio(fileType.audio)" color="#386568" size="large"
                                    variant="elevated" rounded prepend-icon="mdi-music" class="text-capitalize"
                                    :disabled="audioLoad" :loading="audioLoad">Submit Audio</v-btn>
                            </div>
                            <div class="d-flex flex-column align-items-end justify-content-center ">
                                <h6 class="text-success text-end fst-italic mb-0" v-if="audioMalSubmit">**Malayalam
                                    audio
                                    successfully
                                    uploaded.
                                </h6>
                                <h6 class="text-success text-end fst-italic mb-0" v-if="audioEngSubmit">**English audio
                                    successfully
                                    uploaded.
                                </h6>
                            </div>
                        </v-card>
                        <v-card class="p-3 d-flex gap-2" flat :disabled="videoMalSubmit && videoEngSubmit">
                            <div>
                                <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2" accept="video/*">
                                <ul>
                                    <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;"
                                        class="my-1">
                                        <v-chip closable>
                                            {{ file.name }}
                                        </v-chip>
                                    </li>
                                </ul>
                                <v-btn @click="submitVideo(fileType.video)" color="#386568" size="large"
                                    variant="elevated" rounded prepend-icon="mdi-video" class="text-capitalize"
                                    :disabled="videoLoad" :loading="videoLoad">Submit
                                    Video</v-btn>
                            </div>
                            <div class="d-flex flex-column align-items-end justify-content-center ">
                                <h6 class="text-success text-end fst-italic mb-0" v-if="videoMalSubmit">*Malayalam video
                                    successfully
                                    uploaded.
                                </h6>
                                <h6 class="text-success text-end fst-italic mb-0" v-if="videoEngSubmit">*English video
                                    successfully
                                    uploaded.
                                </h6>
                            </div>
                        </v-card>
                        <div class="d-flex justify-content-end">
                            <div class="d-flex gap-2">
                                <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                    @click="step--">Back</v-btn>
                                <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                    @click="step++">Next</v-btn>
                            </div>
                        </div>

                    </div>

                </div>
                <!-- <v-card flat>
                    <div class="d-flex gap-3">
                        <v-card flat :disabled="audioLoad || videoLoad" class="my-3">
                            <v-select class="select" label="Select Language" density="comfortable" :items="languages"
                                v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"
                                single-line></v-select>
                            <v-select class="select" label="Select Audio/Video" density="comfortable" :items="fileTypes"
                                v-model="fileType" :rules="languageRules" item-title="fileType" item-value="id"
                                single-line></v-select>

                            <v-card flat v-if="fileType === 1" :disabled="audioLoad">
                                <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2">
                                <ul>
                                    <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;"
                                        class="my-1">
                                        <v-chip closable @click:close="removeAudio(index)">
                                            {{ file.name }}
                                        </v-chip>
                                    </li>
                                </ul>
                            </v-card>
                            <v-card flat v-if="fileType === 2" :disabled="videoLoad">
                                <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2">
                                <ul>
                                    <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;"
                                        class="my-1">
                                        <v-chip closable>
                                            {{ file.name }}
                                        </v-chip>
                                    </li>
                                </ul>
                            </v-card>


                        </v-card>
                        <div class="d-flex flex-column align-items-end justify-content-center ">
                            <h6 class="text-success text-end fst-italic mb-0" v-if="audioMalSubmit">*Malayalam audio
                                successfully
                                uploaded.
                            </h6>
                            <h6 class="text-success text-end fst-italic mb-0" v-if="audioEngSubmit">*English audio
                                successfully
                                uploaded.
                            </h6>
                            <h6 class="text-success text-end fst-italic mb-0" v-if="videoMalSubmit">*Malayalam video
                                successfully
                                uploaded.
                            </h6>
                            <h6 class="text-success text-end fst-italic mb-0" v-if="videoEngSubmit">*English video
                                successfully
                                uploaded.
                            </h6>
                        </div>
                    </div>
                    <div class="d-flex gap-2 justify-content-between ">
                        <div>
                            <v-btn @click="submitVideo(fileType)" color="#386568" size="large" variant="elevated"
                                rounded prepend-icon="mdi-video" class="text-capitalize" :disabled="videoLoad"
                                :loading="videoLoad" v-if="fileType === 2">Submit
                                Video</v-btn>
                            <v-btn @click="submitAudio(fileType)" color="#386568" size="large" variant="elevated"
                                rounded prepend-icon="mdi-music" class="text-capitalize" :disabled="audioLoad"
                                :loading="audioLoad" v-if="fileType === 1">Submit
                                Audio</v-btn>
                        </div>
                        <div class="d-flex gap-2">
                            <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                @click="step--">Back</v-btn>
                            <v-btn color="#386568" size="large" class="text-capitalize" variant="outlined" rounded
                                @click="step++">Next</v-btn>
                        </div>
                    </div>
                </v-card> -->
            </template>
            <template v-else>
                <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center"
                    v-if="!subhead">
                    <v-btn color="green" class="mb-3" @click="subhead = true; action= false" size="x-large"
                        variant="outlined" append-icon="mdi-step-forward">Add
                        Subheading</v-btn>
                    <v-btn color="green" class="mb-3" @click="finish" variant="outlined"
                        prepend-icon="mdi-step-backward">Finish & Add New Topic</v-btn>
                </div>
                <SubHeading v-else @add-new-topic="finish" :malHeading="malHeading" :engHeading="engHeading"
                    @back-main="finish" :idmal="idmal" :ideng="ideng" @back="step = 1; subhead = false;" />
            </template>
        </v-stepper>
    </v-container>
</template>

<script>
import SubHeading from './SubHeading.vue'
import axios from 'axios';
export default {
    
    components: 
    {
        SubHeading
    },
    data() {
        return {
            items: [
                'Main Topic',
                'Upload Images',
                'Upload Audio/Video',
                'Subheadings'
            ],
            action: true,
            QRLoad: true,
            QRLoading: false,
            malSubmit: false,
            engSubmit: false,
            imageSubmit: false,
            videoEngSubmit: false,
            videoMalSubmit: false,
            audioEngSubmit: false,
            audioMalSubmit: false,
            subhead: false,
            subload: false,
            imageLoad: false,
            videoLoad: false,
            audioLoad: false,
            images: [],
            imgPreview: [],
            fileTypes: [],
            fileType: {},
            step: 1,
            idmal: this.$store.getters.idmal,
            ideng: this.$store.getters.ideng,
            videomal: '',
            audiomal: '',
            videoeng: '',
            audioeng: '',
            malHeading: this.$store.getters.malHeading,
            engHeading: this.$store.getters.engHeading,
            languages: [],
            title: null,
            titleRules: [v => !!v || '*Title is required'],
            description: null,
            descriptionRules: [v => !!v || '*Description is required'],
            language: null,
            languageAV: null,
            languageRules: [v => !!v || '*Language is required'],
            url: null,
            urlRules: [v => !!v || '*URL is required'],
            audioFiles: [],
            videoFiles: [],
            // base_url: 'http://localhost:8086',
            base_url: 'http://localhost:8081',
            message: '',
            loading: false,
            color: '',
            icon:'',
            dialogTopic: false,
            dialogHead: '',  
            qrGenerated: false 
            
        };
    },
    computed: {
        proceed() {
            if ((this.malSubmit) && (this.engSubmit)) {
                return false;
            } else return true;
        },
        topic() {
            if (this.language === 1) return 'Malayalam'
            else if (this.language === 2) return 'English'
            else return '';
        }
    },
   
    methods: {
        async generateQR() {
            // this.QRLoad = true;
            this.QRLoading = true;
            try {
                const response = await axios.get(`${this.base_url}/qrcode/generate?mMalUid=${this.idmal}&mEngUid=${this.ideng}`);
                if (response.status >= 200 && response.status < 300) {
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.QRLoading = false;
                    this.message = 'QR code generated successfully. Proceed to next steps.';
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.qrGenerated = true;
                    this.QRLoad = true;
                    this.step++;
                }
            } 
            catch (error) {
                this.QRLoad = false;
                this.QRLoading = false;
                this.icon = 'mdi mdi-alert-outline'
                this.imageSubmit = false;
                this.color = '#BA1A1A';
                this.dialogHead = 'Error';
                this.message = 'Error uploading images:' + error.message;
                this.dialogTopic = true;
          } 
        },
        finish() {
            sessionStorage.clear();
            this.step = 1
            this.malHeading=''
            this.engHeading=''
            this.action = true;
            this.subhead = false;
            this.malSubmit = false;
            this.engSubmit = false;
            this.audioEngSubmit = false;
            this.audioMalSubmit = false;
            this.videoEngSubmit = false;
            this.videoMalSubmit = false;
            this.imageSubmit = false;
            this.languageAV = null;
        },
        
        handleAudio(event) {
            const selectedFiles = event.target.files[0];
            this.audioFiles.push(selectedFiles)
            // for (let i = 0; i < selectedFiles.length; i++) {
            //     this.audioFiles.push(selectedFiles[i]);
            // }
        },
        removeAudio(index) {
            this.audioFiles.splice(index, 1);
            this.$refs.fileAudio.value = '';
        },
        handleVideo(event) {
            const selectedFiles = event.target.files[0];
            this.videoFiles.push(selectedFiles);
            // for (let i = 0; i < selectedFiles.length; i++) {
            //     this.videoFiles.push(selectedFiles[i]);
            // }
        },
        removeVideo(index) {
            this.videoFiles.splice(index, 1);
            this.$refs.fileVideo.value = '';
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
        removeImage(index) {
            this.imgPreview.splice(index, 1);
            this.images.splice(index, 1);
        },
        async uploadImages() {
            this.imageLoad = true;
            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append("file", image);
            });
            try {
                const response = await axios.post(`${this.base_url}/imgData/uploadImg?englishUId=${this.ideng}&malUid=${this.idmal}`, formData);
                if (response.status === 200) {
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.imageLoad = false;
                    this.imageSubmit = true;
                    this.message = 'Image uploaded successfully';
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.images = [];
                    this.imgPreview = [];
                    this.$refs.imageFile.value = '';
                }
            } catch (error) {
                this.imageLoad = false;
                this.icon = 'mdi mdi-alert-outline'
                this.imageSubmit = false;
                this.color = '#BA1A1A';
                this.dialogHead = 'Error';
                this.message = 'Error uploading images:' + error.message;
                this.dialogTopic = true;
            }
        },
        async getType() {
            try {
                const response = await axios.get(`${this.base_url}/fileType/getFileType`);
                if (response.status >= 200 && response.status < 300) {
                    // this.fileTypes = response.data;
                    response.data.forEach(item => {
                        this.fileType[item.fileType.toLowerCase()] = item.id;
                    });  
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        async getAllLanguages() {
            try {
                const response = await axios.get(`${this.base_url}/dataType1/getTalk`)
                if (response.status === 200) {
                    this.languages = response.data;
                }
            }
            catch (error) {
                console.error(error)
            }
        },

        async submitHeading() {
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
                try {
                    const response = await axios.post(`${this.base_url}/DataEntry1/mainT?dId=${this.language}`, {
                        "title": this.title,
                        "description": this.description,
                        "referenceURL": this.url
                    });
                    if (response.status >= 200 && response.status < 300) {
                        this.icon = 'mdi mdi-check-circle-outline'
                        this.subload = false;
                        if (this.language === 1) {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.malHeading = response.data.title
                            this.$store.commit('setMalHeading', response.data.title);
                            this.idmal = response.data.mmalUid
                            this.$store.commit('setIdmal', response.data.mmalUid)
                            this.message = `${this.malHeading} (${language.talk}) added successfully!`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.malSubmit = true;
                            this.$refs.form.reset();
                            this.language = 2;
                        }
                        else {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.$store.commit('setEngHeading', response.data.title)
                            this.engHeading = response.data.title
                            this.ideng = response.data.mengUid
                            this.$store.commit('setIdeng', response.data.mengUid)
                            this.message = `${response.data.title} (${language.talk}) added successfully!`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.engSubmit = true;
                            this.$refs.form.reset();
                            this.engSubmit = true;
                            this.language = 1;
                        }
                    }
                }
                catch (err) {
                    this.subload = false;
                    this.color = '#BA1A1A';
                    this.icon = 'mdi mdi-alert-outline'
                    this.dialogHead = 'Error';
                    this.message = err.message;
                    this.dialogTopic = true;
                    console.error(err);
                }
            }
        },
        async submitAudio(id) {
            console.log(this.fileType)
            console.log('id',id)
            this.audioLoad = true;
            let uid = ''
            if (this.languageAV === 1) {
                uid = this.idmal;
            }
            else {
                uid = this.ideng
            }
            const formData = new FormData();
            this.audioFiles.forEach((file) => {
                formData.append("files", file);
            });
            try {
                const response = await axios.post(`${this.base_url}/mediaData/mpData?uId=${uid}&mtId=${id}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.audioLoad = false;
                    if (this.languageAV === 1) {
                        this.message = 'Malayalam audio uploaded successfully';
                        this.audioMalSubmit = true;   
                    }
                    else {
                        this.message = 'English audio uploaded successfully';
                        this.audioEngSubmit = true;   
                    }
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.audioFiles = [];
                    this.$refs.fileAudio.value = '';
                }
            }
            catch (err) {
                this.audioLoad = false;
                this.color = '#BA1A1A';
                this.icon = 'mdi mdi-alert-outline'
                this.dialogHead = 'Error';
                this.message = 'Error uploading audio:' + err.message;
                this.dialogTopic = true;
            }
        },
        async submitVideo(id) {
            this.videoLoad = true;
            let uid = ''
            if (this.languageAV === 1) {
                uid = this.idmal;
            }
            else {
                uid = this.ideng
            }
            const formData = new FormData();
            this.videoFiles.forEach((file) => {
                formData.append("files", file);
            });
            try {
                const response = await axios.post(`${this.base_url}/mediaData/mpData?uId=${uid}&mtId=${id}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.videoLoad = false;
                    if (this.languageAV === 1) {
                        this.message = 'Malayalam video uploaded successfully';
                        this.videoMalSubmit = true;
                        
                    }
                    else {
                        this.message = 'English video uploaded successfully';
                        this.videoEngSubmit = true;
                        
                    }
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.videoFiles = [];
                    this.$refs.fileVideo.value = '';
                }
            }
            catch (err) {
                this.videoLoad = false;
                this.color = '#BA1A1A';
                this.icon = 'mdi mdi-alert-outline'
                this.dialogHead = 'Error';
                this.message = 'Error uploading video:' + err.message;
                this.dialogTopic = true;
            }
        },
    },
    // created() {
    //     this.fileType = this.fileTypes.forEach(item => {
    //         this.fileTypes[item.fileType.toLowerCase()] = item.id;
    //     });
    // },
    watch: {
        proceed(newValue) {
            if (!newValue) {
                this.language = null;
                this.QRLoad = false
            }
            // if (newValue) {
            //     this.QRLoad = false
            // }
        }
    },
    mounted() {
        this.getAllLanguages();
        this.getType();
    },
};
</script>
<style scoped>
.label-btn {
    background-color: #546E7A;
    color: white;
    /* padding: 0.5rem; */
    font-family: sans-serif;
    border-radius: 0.3rem;
    cursor: pointer;
    /* margin-top: 1rem; */
    height: 40px;
    width: 190px;
    border-radius: 20px;
    padding: 12px 24px 12px 16px;
    font-size: 16px;
}

#file-chosen {
    margin-left: 0.3rem;
    font-family: sans-serif;
}

.error-message,
.success-message {
    color: #b40606;
    /* font-style: italic; */
    font-size: 12px;
}

.success-message {
    color: green;
}

:deep(.select .v-input__control) {
    border-bottom: 2px solid #216D17;
    /* background-color: #DFE4D7 !important; */
    width: 400px !important;
}

:deep(.desc .v-input__control) {
    border-bottom: 2px solid #216D17;
    /* background-color: #DFE4D7 !important; */
    width: 700px !important;
}

:deep(.guide .v-input__control) {
    width: 250px !important;
    /* height: 45px !important; */
}

:deep(.v-input__details) {
    padding-top: 1px;
}

:deep(.v-input--outlined .v-input__control .guide .desc) {
    border-bottom: 1px solid #48663f;
    /* Default border color */
    border-top: none;
    border-left: none;
    border-right: none;
    transition: border-color 0.2s ease-in-out;
    /* Transition for border color change */
}

/* When focused, change the bottom border color */
:deep(.v-input--outlined.v-input--is-focused .v-input__control .guide .desc) {
    border-bottom-color: #48663f;
    /* Focus border color */
}
:deep(.v-stepper-window){
    margin: 0;
}
</style>