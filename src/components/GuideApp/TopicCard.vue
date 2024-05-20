<template>
    <v-container class="py-8 px-0" fluid>
        <v-snackbar v-model="snackbar" :color="color" :timeout="timeout" location="top">
            <div class="text-center">{{ message }}</div>
        </v-snackbar>
        <v-dialog v-model="dialogTopic" max-width="600" width="400">
            <v-card width="400">
                <v-card-title class="bg-green text-center">Success</v-card-title>
                <v-card-text class="px-3">{{ message }}</v-card-text>
                <v-card-actions><v-btn @click="dialogTopic = !dialogTopic">Okay</v-btn></v-card-actions>
            </v-card>
        </v-dialog>
        <v-stepper v-model="step" :items="items" :show-actions="action" :hide-actions="!action" elevation="0" alt-labels
            next-text="Proceed to next step" prev-text="Back" color="#2C7721" flat>
            <template v-if="step === 1">
                <h4 class="text-center mt-4 fw-bolder "><u>Add Main Heading</u></h4>
                <v-card variant="tonal" color="info" style="border-left: 10px solid #1E88E5;" width="600" class="mb-4">
                    <v-card-text>Please submit english and malayalam data before proceeding to next page.</v-card-text>
                </v-card>
                <div class="d-flex">
                    <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                        <v-select class="select" :label="language ? 'Selected Language' : 'Select Language'"
                            density="comfortable" :items="languages" v-model="language" :rules="languageRules"
                            item-title="talk" item-value="dtId"></v-select>
                        <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                            density="comfortable" class="select" :rules="titleRules"></v-text-field>
                        <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc" rows="6"
                            v-model="description" :rules="descriptionRules" counter></v-textarea>
                        <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                            class=" select" rows="2" outlined v-model="url"></v-textarea>
                        <div class="d-flex justify-content-start gap-3">
                            <v-btn color="#2C7721" size="large" class="mb-3" type="submit" :disabled="subload"
                                variant="elevated" :loading="subload">Add {{ topic }} topic</v-btn>
                            <v-btn color="#2C7721" size="large" class="mb-3" :disabled="proceed" variant="outlined"
                                @click="step++">Next</v-btn>
                            <!-- <div v-else class="d-flex gap-2">
                                <v-btn color="#2C7721" size="large" class="mb-3" :disabled="!QRload" @click="generateQR"
                                    variant="outlined" :loading="loading">Generate QR</v-btn>
                                <v-btn color="#2C7721" size="large" class="mb-3" @click="reset"
                                    variant="outlined">Reset</v-btn>
                            </div> -->
                        </div>
                    </v-form>
                    <div class="w-100 d-flex flex-column align-items-end justify-content-center ">
                        <h4 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malHeading }} topic
                            added.
                        </h4>
                        <h4 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engHeading }} topic
                            added.
                        </h4>

                        <!-- <v-img src="@/assets/Qr.png" style="width: 200px; height: 100px;" v-if="qrgenerated"
                            class="p-0"></v-img> -->
                    </div>
                </div>
            </template>
            <template v-else-if="step === 2">
                <h4 class="text-center mt-4 fw-bolder "><u>Main Heading Image</u></h4>
                <div class="mt-5">
                    <input type="file" multiple @change="handleFileUpload" class="mb-3">
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
                    <div class="d-flex justify-content-start gap-3 mb-5">
                        <v-btn @click="uploadImages" color="#2C7721" size="large">Submit Images</v-btn>
                        <v-btn color="#2C7721" size="large" variant="outlined" @click="step++">Next</v-btn>
                    </div>
                </div>
            </template>
            <template v-else-if="step === 3">
                <h4 class="text-center mt-4 fw-bolder "><u>Main Heading Audio/Video</u></h4>
                <div class="my-3">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
                    <v-select class="select mb-3" label="Select Audio/Video" density="comfortable" :items="fileTypes"
                        v-model="fileType" :rules="languageRules" item-title="fileType" item-value="id"></v-select>

                    <v-card class="p-3" flat v-if="fileType === 1">
                        <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2">
                        <ul>
                            <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;" class="my-1">
                                <v-chip closable @click:close="removeAudio(index)">
                                    {{ file.name }}
                                </v-chip>
                            </li>
                        </ul>
                    </v-card>
                    <v-card class=" p-3" flat v-if="fileType === 2">
                        <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2">
                        <ul>
                            <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;" class="my-1">
                                <v-chip closable>
                                    {{ file.name }}
                                </v-chip>
                            </li>
                        </ul>
                    </v-card>
                    <div class="d-flex " :class="!fileType ? 'justify-content-end' : 'justify-content-between '">
                        <v-btn @click="submitVideo(fileType)" color="#2C7721" size="large" class="mb-3"
                            :disabled="videoLoad" variant="elevated" :loading="videoLoad" v-if="fileType === 2">Submit
                            Video</v-btn>
                        <v-btn @click="submitAudio(fileType)" color="#2C7721" size="large" class="mb-3"
                            :disabled="audioLoad" variant="elevated" :loading="audioLoad" v-if="fileType === 1">Submit
                            Audio</v-btn>
                        <div class="d-flex gap-3">
                            <v-btn @click="step--" color="#2C7721" size="large" class="mb-3" variant="outlined"
                                :loading="videoLoad">Back</v-btn>
                            <v-btn @click="step++" color="#2C7721" size="large" class="mb-3"
                                variant="outlined">Next</v-btn>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center"
                    v-if="!subhead">
                    <v-btn color="green" class="mb-3" @click="subhead = true; action = false" size="x-large"
                        append-icon="mdi-step-forward">Add
                        Subheading</v-btn>
                    <v-btn color="green" class="mb-3" @click="step = 1; action = true; subhead = false;"
                        prepend-icon="mdi-step-backward">Add
                        New Topic</v-btn>
                </div>
                <SubHeading v-else @add-new-topic="step = 1; action = true; subhead = false;"
                    @back-main="step = 1; action = true; subhead = false;" :idmal="idmal" :ideng="ideng" />
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
            malSubmit: false,
            engSubmit: false,
            step: 3,
            subhead: false,
            items: ['Main Topic', 'Upload Images', 'Upload Audio/Video', 'Subheadings'],
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
            snackbar: false,
            color: '#E8F5E9',
            timeout: 3000,
            qrgenerated: false,
            malHeading: '',
            engHeading: '',
            dialogTopic: false
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
        QRload() {
            if ((this.malSubmit) && (this.engSubmit)) {
                return true;
            } else return false;
        },
        topic() {
            if (this.language === 1) return 'Malayalam'
            else if (this.language === 2) return 'English'
            else return '';
        }
    },
    methods: {
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
                        this.loading = false;
                        this.subload = false;
                        this.message = 'Main Topic successfully';
                        this.dialogTopic = true;
                        if (this.language === 1) {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.message = `${response.data.title} (${language.talk}) added successfully`;
                            this.snackbar = true;
                            this.malHeading = response.data.title
                            this.malSubmit = true;
                            this.$refs.form.reset();
                            sessionStorage.setItem('idmal', response.data.mmalUid)
                            this.idmal = response.data.mmalUid;

                            this.language = 2;
                        }
                        else {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.message = `${response.data.title} (${language.talk}) added successfully`;
                            this.dialogTopic = true;
                            sessionStorage.setItem('ideng', response.data.mengUid)
                            this.ideng = response.data.mengUid;
                            this.$refs.form.reset();
                            this.engHeading = response.data.title
                            this.engSubmit = true;

                            this.language = 1;
                        }
                    }
                }
                catch (err) {
                    this.subload = false;
                    console.error(err);
                }
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
                const response = await axios.post(`http://192.168.1.21:8081/mediaData/mpData?uId=${uid}&mtId=${id}`, formData);
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
                const response = await axios.post(`http://192.168.1.21:8081/mediaData/mpData?uId=${uid}&mtId=${id}`, formData);
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
    width: 500px !important;
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

:deep(.v-stepper-window) {
    margin: 0;
}
</style>