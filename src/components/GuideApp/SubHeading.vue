<template>
    <h5 class="text-center mt-0">Sub Heading {{ count }} - {{ head }}</h5>
    <v-card flat :disabled="!proceed">
        <div class="">
            <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                <v-select class="select" label='Select Language' density="comfortable" :items="languages"
                    v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"
                    single-line></v-select>
                <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'" density="comfortable"
                    class="select" :rules="titleRules" single-line></v-text-field>
                <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc" rows="6"
                    v-model="description" :rules="descriptionRules" single-line></v-textarea>
                <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable" class="reference"
                    rows="2" v-model="url" single-line></v-textarea>
                <div>
                    <v-btn color="#386568" size="large" class="text-capitalize" type="submit" :disabled="subload"
                        variant="elevated" rounded :loading="subload">Add {{ topic }}
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
    <v-btn @click="expand = !expand" color="#386568" size="large" variant="outlined" v-if="proceed"
        class="text-capitalize">+ Add Images</v-btn>
    <v-expand-transition>
        <v-card flat v-show="expand">
            <div class="mt-4">
                <input type="file" multiple @change="handleFileUpload" class="mb-1">
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
                <div class="d-flex justify-content-start gap-3 my-2">
                    <v-btn @click="uploadImages" color="#386568" size="large" variant="elevated" rounded
                        prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
                </div>
            </div>
        </v-card>
    </v-expand-transition>
    <v-divider></v-divider>
    <v-btn @click="expand2 = !expand2" color="#386568" size="large" variant="outlined" v-if="proceed"
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
                        <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;" class="my-1">
                            <v-chip closable @click:close="removeAudio(index)">
                                {{ file.name }}
                            </v-chip>
                        </li>
                    </ul>
                </v-card>
                <v-card flat v-if="fileType === 2">
                    <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2">
                    <ul>
                        <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;" class="my-1">
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
    <v-btn color="#386568" size="large" variant="outlined" v-if="proceed" class="text-capitalize" @click="step++">+ Add
        Subheading</v-btn>


</template>
<script>
// import SubSubHeading from './SubSubHeading.vue'
import axios from 'axios';
export default {
    // components:
    // {
    //     SubSubHeading
    // },
    props: ['idmal', 'ideng', 'head'],
    data() {
        return {
            expand: false,
            expand2: false,
            malSubmit: false,
            engSubmit: false,
            step: 1,
            count: 1,
            images: [],
            subhead: false,
            imgPreview: [],
            fileTypes: [],
            fileType: null,
            // idmal: sessionStorage.getItem('id1'),
            // ideng: sessionStorage.getItem('id2'),
            subidmal: '',
            subideng: '',
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
            malHeading: '',
            engHeading: '',
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

        addNewTopic() {
            this.$emit('add-new-topic'); // Emitting an event named 'add-new-topic'
        },
        backMain() {
            this.$emit('back-main'); // Emitting an event named 'add-new-topic'
        },
        handleAudio(event) {
            const selectedFiles = event.target.files;
            this.audioFiles = selectedFiles
        },
        removeAudio(index) {
            this.audioFiles.splice(index, 1);
            this.$refs.fileAudio.value = '';
        },
        handleVideo(event) {
            const selectedFiles = event.target.files;
            this.videoFiles = selectedFiles;
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


            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append("files", image);
            });
            try {
                const response = await axios.post(`${this.base_url}/imgData/uploadImg1?englishUId=${this.subideng}&malUid=${this.subidmal}`, formData);
                if (response.status === 200) {
                    alert('success')
                    this.images = [];
                }
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        },
        async getType() {
            try {
                const response = await axios.get(`${this.base_url}/fileType/getFileType`);
                if (response.status >= 200 && response.status < 300) {
                    console.log('gettype', response.data)
                    response.data.forEach(item => {
                        this.fileType[item.fileType.toLowerCase()] = item.id;
                    });
                }
            }
            catch (err) {
                console.log(err)
            }
        },
        removeImage(index) {
            this.imgPreview.splice(index, 1);
        },

        async getAllLanguages() {
            try {
                const response = await axios.get(`${this.base_url}/dataType1/getTalk`)
                if (response.status === 200) {
                    this.languages = response.data
                    // .map(item => item.talk);
                    console.log(response.data)
                }
            }
            catch (error) {
                console.error(error)
            }
        },
        async submitHeading() {
            let uid = '';
            if (this.language === 1) {
                uid = this.idmal;
            } else {
                uid = this.ideng;
            }
            console.log('language', this.language)
            console.log('selected uid', uid)
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                // console.log('click')
                try {
                    const response = await axios.post(`${this.base_url}/DataEntry2/firstSub?uId=${uid}`, {
                        "title": this.title,
                        "description": this.description,
                        "referenceURL": this.url
                    });
                    if (response.status >= 200 && response.status < 300) {
                        alert('success');
                        if (this.language === 1) {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.message = `${response.data.title} (${language.talk}) added successfully`;
                            this.snackbar = true;
                            this.malHeading = response.data.title
                            this.malSubmit = true;
                            this.$refs.form.reset();
                            sessionStorage.setItem('subidmal', response.data.fsUid)
                            this.subidmal = response.data.fsUid;
                            this.language = 2;
                        }
                        else {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.message = `${response.data.title} (${language.talk}) added successfully`;
                            this.dialogTopic = true;
                            sessionStorage.setItem('subideng', response.data.fsUid)
                            this.subideng = response.data.fsUid;
                            this.$refs.form.reset();
                            this.engHeading = response.data.title
                            this.engSubmit = true;
                            this.language = 1;
                        }
                    }
                }
                catch (err) {
                    console.error(err);
                }
            }
        },
        async submitAudio(id) {
            let uid = '';
            if (this.language === 1) {
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
                    alert('success');
                }
            }
            catch (err) {
                console.error(err);
            }
        },
        async submitVideo(id) {
           
            let uid = '';
            if (this.language === 1) {
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
                    alert('success');
                }
            }
            catch (err) {
                console.error(err);
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

:deep(.v-stepper-window) {
    margin: 0;
}
</style>