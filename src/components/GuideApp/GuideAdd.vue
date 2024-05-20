<template>
    <v-stepper v-model="step" :items="items" :hide-actions="true" elevation="0" alt-labels color="#2C7721" flat>
        <v-dialog width="400" max-width="600" v-model="dialogTopic">
            <v-card width="400" rounded="3">
                <v-card-title class="text-center text-white" :style="{backgroundColor: color}">{{ dialogHead }}</v-card-title>
                <v-card-text class="px-2 text-center">{{ message }}</v-card-text>
                <v-card-actions>
                    <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <template v-if="step === 1">
            <v-card flat :disabled="!proceed">
                <div class="">
                    <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                        <v-select class="select" label='Select Language' density="comfortable" :items="languages"
                            v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"
                            single-line></v-select>
                        <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                            density="comfortable" class="select" :rules="titleRules" single-line></v-text-field>
                        <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc" rows="6"
                            v-model="description" :rules="descriptionRules" single-line></v-textarea>
                        <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                            class="reference" rows="2" v-model="url" single-line></v-textarea>
                        <div>
                            <v-btn color="#386568" size="large" class="text-capitalize" type="submit"
                                :disabled="subload" variant="elevated" rounded :loading="subload">Add {{ topic }}
                                topic</v-btn>
                        </div>
                    </v-form>
                    <div class="w-100 d-flex flex-column align-items-end justify-content-center ">
                        <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malHeading }} topic
                            added.
                        </h6>
                        <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engHeading }} topic
                            added.
                        </h6>
                    </div>
                </div>
            </v-card>
            <v-divider></v-divider>
            <v-btn @click="expand = !expand" color="#386568" size="large" variant="outlined" v-if="!proceed"
                class="text-capitalize">+ Add Images</v-btn>
            <v-expand-transition>
                <v-card flat v-show="expand">
                    <div class="mt-4">
                        <input type="file" multiple @change="handleFileUpload" class="mb-1">
                        <div class="d-flex gap-4 flex-wrap ">
                            <div v-for="(image, index) in imgPreview" :key="index" elevation="4"
                                style="position: relative;">
                                <v-card height="100" width="200">
                                    <img :src="image.url" alt="Uploaded Image"
                                        style="max-width: 200px; background-size: cover;">
                                </v-card>
                                <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)" size="32"
                                    style="position:absolute; top: -16%; right:-6%" color="green-lighten-1"></v-icon>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start gap-3 my-2">
                            <v-btn @click="uploadImages" color="#386568" size="large" variant="elevated" rounded
                                prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
                        </div>
                    </div>
                </v-card>
            </v-expand-transition>
            <v-divider></v-divider>
            <v-btn @click="expand2 = !expand2" color="#386568" size="large" variant="outlined" v-if="!proceed"
                class="text-capitalize">+ Add Audio/Video</v-btn>
            <v-expand-transition>
                <v-card flat v-show="expand2">
                    <div class="my-3">
                        <v-select class="select" label="Select Language" density="comfortable" :items="languages"
                            v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"
                            single-line></v-select>
                        <v-select class="select" label="Select Audio/Video" density="comfortable" :items="fileTypes"
                            v-model="fileType" :rules="languageRules" item-title="fileType" item-value="id"
                            single-line></v-select>

                        <v-card flat v-if="fileType === 1">
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
                        <v-card flat v-if="fileType === 2">
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

                        <v-btn @click="submitVideo(fileType)" color="#386568" size="large" variant="elevated" rounded
                            prepend-icon="mdi-video" class="text-capitalize" :disabled="videoLoad" :loading="videoLoad"
                            v-if="fileType === 2">Submit
                            Video</v-btn>
                        <v-btn @click="submitAudio(fileType)" color="#386568" size="large" variant="elevated" rounded
                            prepend-icon="mdi-music" class="text-capitalize" :disabled="audioLoad" :loading="audioLoad"
                            v-if="fileType === 1">Submit
                            Audio</v-btn>
                    </div>
                </v-card>
            </v-expand-transition>
            <v-divider></v-divider>
            <v-btn color="#386568" size="large" variant="outlined" v-if="!proceed" class="text-capitalize"
                @click="addSub">+ Add
                Subheading</v-btn>
            <div class="d-flex justify-content-end ">
                <v-btn color="#386568" size="large" variant="elevated" v-if="!proceed" @click="finish">Finish</v-btn>
            </div>
        </template>
        <template v-if="step === 2">
            <SubHeading @add-new-topic="step = 1; action = true; subhead = false;"
                @back-main="step = 1; action = true; subhead = false;" :idmal="idmal" :ideng="ideng"
                :head="engHeading" />
        </template>
        <template v-if="step === 3">
            <SubSubHeading @add-new-sub="step = 1; action = true; subhead = false;" @add-new-topic="backMain"
                :idmal="subidmal" :ideng="subideng" />
        </template>

    </v-stepper>

</template>

<script>
import SubHeading from './SubHeading.vue'
import SubSubHeading from './SubSubHeading.vue'
import axios from 'axios';
export default {
    components:
    {
        SubHeading, SubSubHeading
    },
    data() {
        return {
            expand: false,
            expand2: false,
            malSubmit: false,
            engSubmit: false,
            step: 1,
            subhead: false,
            items: ['Main Topic', 'SubHeadings', 'Sub of Subheadings'],
            action: false,
            subload: false,
            images: [],
            imgPreview: [],
            fileTypes: [],
            fileType: null,
            idmal: '',
            ideng: '',
            heading: null,
            languages: [],
            title: null,
            description: null,
            language: null,
            titleRules: [v => !!v || '*Title is required'],
            descriptionRules: [v => !!v || '*Description is required'],
            languageRules: [v => !!v || '*Language is required'],
            url: null,
            urlRules: [v => !!v || '*URL is required'],
            audioFiles: [],
            videoFiles: [],
            audioId: null,
            videoId: null,
            base_url: 'http://localhost:8086',
            message: '',
            loading: false,
            color: '',
    
            qrgenerated: false,
            malHeading: '',
            engHeading: '',
            dialogTopic: false,
            dialogHead: '',
            
        };
    },
    computed: {
        proceed() {
            if ((this.malSubmit) && (this.engSubmit)) {
                return false;
            } else return true;
        },
        disable() {
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
                        this.subload = false;
                        if (this.language === 1) {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.malHeading = response.data.title
                            this.message = `${this.malHeading} (${language.talk}) added successfully`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.malSubmit = true;
                            this.$refs.form.reset();
                            sessionStorage.setItem('idmal', response.data.mmalUid)
                            this.idmal = response.data.mmalUid;
                            this.language = 2;
                        }
                        else {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.engHeading = response.data.title
                            this.message = `${response.data.title} (${language.talk}) added successfully`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.engSubmit = true;
                            this.$refs.form.reset(); 
                            sessionStorage.setItem('ideng', response.data.mengUid)
                            this.ideng = response.data.mengUid;                           
                            this.engSubmit = true;
                            this.language = 1;
                        }
                    }
                }
                catch (err) {
                    this.subload = false;
                    this.color = '#BA1A1A';
                    this.dialogHead = 'Error';
                    this.message = err.message;
                    this.dialogTopic = true;
                    console.error(err);
                }
            }
        },
        handleAudio(event) {
            const selectedFiles = event.target.files;
            this.audioFiles = selectedFiles
            // for (let i = 0; i < selectedFiles.length; i++) {
            //     this.audioFiles.push(selectedFiles[i]);
            // }
        },
        removeAudio(index) {
            this.audioFiles.splice(index, 1);
            this.$refs.fileAudio.value = '';
        },
        handleVideo(event) {
            const selectedFiles = event.target.files;
            this.videoFiles = selectedFiles;
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
        async uploadImages() {
            this.loading = true;
            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append("file", image);
            });
            try {
                const response = await axios.post(`${this.base_url}/imgData/uploadImg?englishUId=${this.ideng}&malUid=${this.idmal}`, formData);
                if (response.status === 200) {
                    this.message = 'Image uploaded successfully';
                    this.dialogTopic = true;
                    this.images = [];
                }
            } catch (error) {
                this.message = 'Error uploading images:' + error.message;
                this.snackbar = true;
            }
        },
        reset() {
            this.$refs.form.reset();
            this.malSubmit = false;
            this.engSubmit = false;
            this.qrgenerated = false;
        },
        finish() {
            
        },
        async getType() {
            try {
                const response = await axios.get(`${this.base_url}/fileType/getFileType`);
                if (response.status >= 200 && response.status < 300) {
                    this.fileTypes = response.data;
                    console.log(response.data)
                    console.log(this.fileTypes)
                    // response.data.forEach(item => {
                    //     this.fileType[item.fileType.toLowerCase()] = item.id;
                    // });     
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        removeImage(index) {
            this.imgPreview.splice(index, 1);
            this.images.splice(index, 1);
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
        
        addSub() {
            alert('clicked')
            const response = window.confirm(`Are you sure you want to add subheading for ${this.engHeading}/${this.malHeading}`)  
            if (response) {
                this.step++;
          }
        },
        async submitAudio(id) {
            let uid = ''
            if (this.language === 1) {
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
                    alert('success');
                }
            }
            catch (err) {
                console.error(err);
            }
        },
        async submitVideo(id) {
            let uid = ''
            if (this.language === 1) {
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
                    alert('success');
                }
            }
            catch (err) {
                console.error(err);
            }
        },
        generateQR() {
            this.$refs.form.reset();
            this.loading = true
            this.QRload = true;

            setTimeout(() => {
                this.qrgenerated = true;
                // this.malSubmit = false;
                // this.engSubmit = false;
                this.action = true;
                this.QRload = false;
                this.loading = false;
                this.proceed = true;
                this.message = 'QR generated successfully';
                this.snackbar = true;
                this.$refs.form.reset();

            }, 5000);
        }
    },
    watch: {
        proceed(newValue) {
            if (!newValue) {
                this.language = null;
            }
        }
    },

    mounted() {
        this.getAllLanguages();
        this.getType();
    },
};
</script>
<style scoped>
/*  */

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
    background-color: #DFE4D7 !important;
    width: 400px !important;
    height: 50px !important;
}

:deep(.reference .v-input__control) {
    border-bottom: 2px solid #216D17;
    background-color: #DFE4D7 !important;
    width: 400px !important;
    /* height: 60px !important; */
}

:deep(.desc .v-input__control) {
    border-bottom: 2px solid #216D17;
    background-color: #DFE4D7 !important;
    width: 800px !important;
    height: 160px;
}

:deep(.guide .v-input__control) {
    width: 250px !important;
    /* height: 45px !important; */
}

:deep(.v-input__details) {
    padding-top: 1px;
}
</style>
