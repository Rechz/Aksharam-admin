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

    <v-sheet>

        <v-card-title class="text-center fw-bolder text-white" style="background-color: #2C7721;">Add Sub
            Heading</v-card-title>
        <v-card flat :disabled="!proceed">
            <v-card-text class="px-5">
                <p class="text-danger fst-italic mt-1">**Please submit Malayalam & English data before proceeding to
                    upload
                    media. Do not refresh the page to avoid data loss.</p>

                <v-form class="pt-0 " ref="form" @submit.prevent="submitHeading">
                    <div class="d-flex">
                        <div>
                            <v-select class="select mb-2" label='Select Language' density="comfortable"
                                :items="languages" v-model="language" :rules="languageRules" item-title="talk"
                                item-value="dtId" variant="outlined"></v-select>
                            <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Sub Heading'"
                                density="comfortable" class="select mb-2" :rules="titleRules"
                                variant="outlined"></v-text-field>
                            <v-textarea :label="language === 1 ? 'വിവരണം' : 'Subheading Description'" class="desc mb-2"
                                rows="6" v-model="description" :rules="descriptionRules"
                                variant="outlined"></v-textarea>
                            <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                class="reference desc" rows="2" v-model="url" variant="outlined"></v-textarea>
                        </div>
                        <div class="d-flex flex-column ">
                            <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*{{ malSubHeading }}
                                (Malayalam) subtopic added.
                            </h6>
                            <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*{{ engSubHeading }}
                                (English) subtopic added.
                            </h6>
                        </div>

                    </div>

                    <div class="d-flex justify-content-end">
                        <v-btn color="#386568" size="large" class="text-capitalize" type="submit" :disabled="subload"
                            variant="outlined" rounded :loading="subload" prepend-icon="mdi-plus">Add {{ topic }} sub
                            topic</v-btn>

                    </div>
                </v-form>


            </v-card-text>

        </v-card>



        <v-divider class="mx-5"></v-divider>


        <v-card flat class="px-5" :disabled="proceed">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">Subheading Images</v-card-title>
            <v-card-text class="d-flex gap-3 ">

                <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="mb-1" accept="image/*">
                <div class="d-flex gap-4 flex-wrap ">
                    <div v-for="(image, index) in imgPreview" :key="index" elevation="4" style="position: relative;">
                        <v-card height="100" width="200">
                            <img :src="image.url" alt="Uploaded Image"
                                style="max-width: 200px; background-size: cover;">
                        </v-card>
                        <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)" size="32"
                            style="position:absolute; top: -16%; right:-6%" color="green-lighten-1"></v-icon>
                    </div>
                </div>

                <div class="d-flex flex-column align-items-end justify-content-center ">
                    <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully
                        uploaded.
                    </h6>
                </div>
            </v-card-text>
            <div class="d-flex justify-content-end gap-3 my-2 w-100">
                <v-btn @click="uploadImages" color="#386568" size="large" variant="outlined" rounded
                    :disabled="imageLoad" :loading="imageLoad" prepend-icon="mdi-upload" class="text-capitalize">Upload
                    Images</v-btn>

            </div>
        </v-card>


        <v-divider class="mx-5"></v-divider>

        <v-card flat class="px-5" :disabled="proceed">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">SubHeading Audio/Video</v-card-title>


            <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                v-model="languageAV" :rules="languageRules" item-title="talk" item-value="dtId"
                variant="outlined"></v-select>

            <v-sheet class="p-3" flat :disabled="audioMalSubmit && audioEngSubmit">
                <div class="d-flex flex-column gap-2">
                    <div>
                        <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2" accept="audio/*">
                        <ul>
                            <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;" class="my-1">
                                <v-chip closable>
                                    {{ file.name }}
                                </v-chip>
                            </li>
                        </ul>
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
                </div>
                <div class="d-flex justify-content-end">
                    <v-btn @click="submitAudio(fileType.audio)" color="#386568" size="large" variant="outlined" rounded
                        prepend-icon="mdi-music" class="text-capitalize" :disabled="audioLoad"
                        :loading="audioLoad">Submit Audio</v-btn>
                </div>



            </v-sheet>
            <v-sheet class="p-3" flat :disabled="videoMalSubmit && videoEngSubmit">
                <div class="d-flex flex-column gap-2">
                    <div>
                        <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2" accept="video/*">
                        <ul>
                            <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;" class="my-1">
                                <v-chip closable>
                                    {{ file.name }}
                                </v-chip>
                            </li>
                        </ul>
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

                </div>
                <div class="d-flex justify-content-end">
                    <v-btn @click="submitVideo(fileType.video)" color="#386568" size="large" variant="outlined" rounded
                        prepend-icon="mdi-video" class="text-capitalize" :disabled="videoLoad"
                        :loading="videoLoad">Submit
                        Video</v-btn>
                </div>


            </v-sheet>











        </v-card>
        <div class="my-5 d-flex justify-content-end align-items-center gap-2 px-5">
            <v-btn color="#2C7721" size="large" variant="elevated" prepend-icon="mdi-step-backward" @click="back">Finish
                &
                Return</v-btn>
            <v-btn color="#2C7721" size="large" variant="elevated" append-icon="mdi-step-forward" @click="finish">Add
                New
                Subheading</v-btn>
        </div>
    </v-sheet>
</template>

<script>

import axios from 'axios';
export default {

    emits: ['back', 'update'],
    props: ['idmal', 'ideng'],
    data() {
        return {
            action: true,
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
            count: 1,
            videomal: '',
            audiomal: '',
            videoeng: '',
            audioeng: '',
            malSubHeading: '',
            engSubHeading: '',
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
            base_url: 'http://localhost:8081',
            // base_url: 'http://192.168.1.32:8081',
            message: '',
            loading: false,
            color: '',
            icon: '',
            dialogTopic: false,
            dialogHead: '',
            subidmal: '',
            subideng: '',
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
        finish() {
            sessionStorage.clear();
            this.malSubHeading = ''
            this.engSubHeading = ''
            this.subhead = false;
            this.malSubmit = false;
            this.engSubmit = false;
            this.audioEngSubmit = false;
            this.audioMalSubmit = false;
            this.videoEngSubmit = false;
            this.videoMalSubmit = false;
            this.imageSubmit = false;
            this.languageAV = null;
            this.subideng = '';
            this.subidmal = ''
        },
        back() {
            this.$emit('back');
        },
        handleAudio(event) {
            const selectedFiles = event.target.files[0];
            this.audioFiles.push(selectedFiles)
        },
        removeAudio(index) {
            this.audioFiles.splice(index, 1);
            this.$refs.fileAudio.value = '';
        },
        handleVideo(event) {
            const selectedFiles = event.target.files[0];
            this.videoFiles.push(selectedFiles);
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
            this.imageLoad = true;
            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append("files", image);
            });
            try {
                const response = await axios.post(`${this.base_url}/imgData/uploadImg1?englishUId=${this.subideng}&malUid=${this.subidmal}`, formData);
                if (response.status === 200) {
                    this.imageLoad = false;
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.imageSubmit = true;
                    this.message = 'Image uploaded successfully';
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.images = [];
                    this.imgPreview = [];
                    this.$emit('update');
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
        removeImage(index) {
            this.imgPreview.splice(index, 1);
            this.images.splice(index, 1);
        },
        async submitHeading() {
            this.subload = true;
            let uid = '';
            if (this.language === 1) {
                uid = this.idmal;
            } else {
                uid = this.ideng;
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                try {
                    const response = await axios.post(`${this.base_url}/DataEntry2/firstSub?uId=${uid}`, {
                        "title": this.title,
                        "description": this.description,
                        "referenceURL": this.url
                    });
                    if (response.status >= 200 && response.status < 300) {
                        this.subload = false;
                        if (this.language === 1) {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.icon = 'mdi mdi-check-circle-outline'
                            this.$store.commit('setMalSubHeading', response.data.title)
                            this.malSubHeading = response.data.title
                            this.subidmal = response.data.fsUid
                            this.$store.commit('setSubidmal', response.data.fsUid)
                            this.message = `${language.talk} subheading added successfully!`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.malSubmit = true;
                            this.$emit('update');
                            this.$refs.form.reset();
                            this.language = 2;
                        }
                        else {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.icon = 'mdi mdi-check-circle-outline'
                            this.$store.commit('setEngSubHeading', response.data.title)
                            this.engSubHeading = response.data.title
                            this.subideng = response.data.fsUid
                            this.$store.commit('setSubideng', response.data.fsUid)
                            this.message = `${language.talk} subheading added successfully!`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.engSubmit = true;
                            this.$refs.form.reset();
                            this.$emit('update');
                            this.language = 1;
                        }
                    }
                }
                catch (err) {
                    this.subload = false;
                    this.icon = 'mdi mdi-alert-outline'
                    this.color = '#BA1A1A';
                    this.dialogHead = 'Error';
                    this.message = err.message;
                    this.dialogTopic = true;
                    console.error(err);
                }
            }
        },
        async submitAudio(id) {
            this.audioLoad = true;
            let uid = '';
            if (this.languageAV === 1) {
                uid = this.subidmal;
            } else {
                uid = this.subideng;
            }
            const formData = new FormData();
            this.audioFiles.forEach((file) => {
                formData.append("files", file);
            });
            try {
                const response = await axios.post(`${this.base_url}/mediaData/mpData1?uId=${uid}&mtId=${id}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.audioLoad = false;
                    if (this.languageAV === 1) {
                        this.message = 'Malayalam audio uploaded successfully';
                        this.audioMalSubmit = true;
                        this.languageAV = 2;
                    }
                    else {
                        this.message = 'English audio uploaded successfully';
                        this.audioEngSubmit = true;
                        this.languageAV = 1;
                    }
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.audioFiles = [];
                    this.$refs.fileAudio.value = '';
                    this.$emit('update');
                }
            }
            catch (err) {
                this.audioLoad = false;
                this.icon = 'mdi mdi-alert-outline'
                this.color = '#BA1A1A';
                this.dialogHead = 'Error';
                this.message = 'Error uploading audio:' + err.message;
                this.dialogTopic = true;
            }
        },
        async submitVideo(id) {
            this.videoLoad = true;
            let uid = '';
            if (this.languageAV === 1) {
                uid = this.subidmal;
            } else {
                uid = this.subideng;
            }
            const formData = new FormData();
            this.videoFiles.forEach((file) => {
                formData.append("files", file);
            });
            try {
                const response = await axios.post(`${this.base_url}/mediaData/mpData1?uId=${uid}&mtId=${id}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.icon = 'mdi mdi-check-circle-outline'
                    this.videoLoad = false;
                    if (this.languageAV === 1) {
                        this.message = 'Malayalam video uploaded successfully';
                        this.videoMalSubmit = true;
                        this.languageAV = 2;
                    }
                    else {
                        this.message = 'English video uploaded successfully';
                        this.videoEngSubmit = true;
                        this.languageAV = 1;
                    }
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    this.videoFiles = [];
                    this.$refs.fileVideo.value = '';
                    this.$emit('update');
                }
            }
            catch (err) {
                this.videoLoad = false;
                this.icon = 'mdi mdi-alert-outline'
                this.color = '#BA1A1A';
                this.dialogHead = 'Error';
                this.message = 'Error uploading video:' + err.message;
                this.dialogTopic = true;
            }
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
:deep(.select .v-input__details, .desc .v-input__details) {
    min-height: 10px;
}

:deep(.select .v-input__control) {
    /* border-bottom: 2px solid #216D17; */
    width: 400px !important;
}

:deep(.desc .v-input__control) {
    /* border-bottom: 2px solid #216D17; */
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
    /* border-bottom: 1px solid #48663f; */
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
</style>