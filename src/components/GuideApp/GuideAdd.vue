<template>
    <v-container class="py-8 px-0" fluid>
        <v-stepper v-model="step" :items="items" :show-actions="action" :hide-actions="!action" elevation="0" alt-labels
            :disabled="false" next-text="Proceed to next step" prev-text="Back" color="success" flat>
            <template v-if="step === 1">
                <h4 class="text-center mt-4 fw-bolder "><u>Add Main Heading</u></h4>
                <p class="text-danger fst-italic mt-1">*Please submit Malayalam & English data before proceeding to next
                    page.</p>
                <div class="d-flex">
                    <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                        <v-select class="select" label="Language" density="comfortable" :items="languages"
                            v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
                        <v-text-field v-model="title" :label="language === 1 ? 'തലക്കെട്ട്' : 'Heading'"
                            density="comfortable" class="select" :rules="titleRules"></v-text-field>
                        <v-textarea :label="language === 1 ? 'വിവരണം' : 'Description'" class="desc" rows="6"
                            v-model="description" :rules="descriptionRules" counter></v-textarea>
                        <v-textarea :label="language === 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                            class=" select" rows="3" outlined v-model="url"></v-textarea>
                        <div class="d-flex justify-content-start ">
                            <v-btn color="#2C7721" size="large" class="mb-3" type="submit">Submit</v-btn>
                        </div>
                    </v-form>
                    <div class="w-100">
                        <p class="text-success text-end fst-italic mb-0" v-if="malSubmit">*Malayalam data submitted.</p>
                        <p class="text-success text-end fst-italic" v-if="engSubmit">*English data submitted.</p>
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
                    <div class="d-flex justify-content-start mb-5">
                        <button @click="uploadImages" class="btn btn-success mt-3">Submit Images</button>
                    </div>
                </div>

            </template>
            <template v-else-if="step === 3">
                <h4 class="text-center mt-4 fw-bolder "><u>Main Heading Audio/Video</u></h4>
                <div class="my-3">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
                    <div class="d-flex flex-column gap-5">
                        <v-card class="bg-blue-grey-lighten-5 p-3">
                            <input type="file" ref="fileAudio" multiple @change="handleAudio" class="mb-2">
                            <ul>
                                <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;"
                                    class="my-1">
                                    <v-chip closable>
                                        {{ file.name }}
                                    </v-chip>
                                </li>
                            </ul>
                            <button @click="submitAudio(fileType.audio)" class="btn btn-success mt-2">Submit
                                Audio</button>
                        </v-card>
                        <v-card class="bg-blue-grey-lighten-5 p-3">
                            <input type="file" ref="fileVideo" multiple @change="handleVideo" class="mb-2">
                            <ul>
                                <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;"
                                    class="my-1">
                                    <v-chip closable>
                                        {{ file.name }}
                                    </v-chip>
                                </li>
                            </ul>
                            <button @click="submitVideo(fileType.video)" class="btn btn-success mt-2">Submit
                                Video</button>
                        </v-card>

                    </div>

                </div>
            </template>
            <template v-else>
                <div style="height: 50vh;" class="my-5 d-flex flex-column justify-content-center align-items-center"
                    v-if="!subhead">
                    <v-btn color="green" class="mb-3" @click="subhead = true; action= false" size="x-large"
                        append-icon="mdi-step-forward">Add
                        Subheading</v-btn>

                    <v-btn color="green" class="mb-3" @click="step = 1; action = true; subhead = false;"
                        prepend-icon="mdi-step-backward">Add
                        New Topic</v-btn>
                </div>
                <SubHeading v-else @add-new-topic="step = 1; action = true; subhead = false;"
                    @back-main="step = 1; action = true; subhead = false;" />
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
            step: 1,
            subhead: false,
            items: [
                'Main Topic',
                'Upload Images',
                'Upload Audio/Video',
                'Subheadings'
            ],
            action: true,
            images: [],
            imgPreview: [],
            fileTypes: [],
            fileType: {},
            idmal: sessionStorage.getItem('id1'),
            ideng: sessionStorage.getItem('id2'),
            heading: null,       
            languages: [],
            title: null,
            description: null,
            language: 1,
            titleRules: [v => !!v || '*Title is required'],
            descriptionRules: [v => !!v || '*Description is required'],
            languageRules: [v => !!v || '*Language is required'],
            url: null,
            urlRules: [v => !!v || '*URL is required'],
            audioFiles: [],
            videoFiles: [],
            audioId: null,
            videoId: null,
            
        };
    },
    computed: {
        proceed() {
            if ((this.malSubmit) && (this.engSubmit)) {
                return false;
            } else return true;
        }
    },
    methods: {
        
        handleAudio(event) {
            const selectedFiles = event.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                this.audioFiles.push(selectedFiles[i]);
            }
        },
        handleVideo(event) {
            const selectedFiles = event.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                this.videoFiles.push(selectedFiles[i]);
            }
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
            console.log('english', this.ideng)
            console.log('malayalam', this.idmal)
            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append("file", image);
            });
            try {
                const response = await axios.post(`http://192.168.1.17:8081/imgData/uploadImg?englishUId=${this.ideng}&malUid=${this.idmal}`, formData);
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
                const response = await axios.get('http://192.168.1.17:8081/fileType/getFileType');
                if (response.status >= 200 && response.status < 300) {
                    console.log('gettype', response.data)
                    response.data.forEach(item => {
                        this.fileType[item.fileType.toLowerCase()] = item.id;
                    });  
                    console.log(this.fileType)   
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
                const response = await axios.get('http://192.168.1.17:8081/dataType1/getTalk')
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
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                console.log('click')   
                try {
                    const response = await axios.post(`http://192.168.1.17:8081/DataEntry1/mainT?dId=${this.language}`, {
                        "title": this.title,
                        "description": this.description,
                        "referenceURL": this.url
                    });
                    if (response.status >= 200 && response.status < 300) {
                        
                        alert('success');
                        if (this.language === 1) {
                            this.$refs.form.reset();
                            this.heading = response.data.description;
                            this.malSubmit = true;
                            sessionStorage.setItem('id1', response.data.mmalUid)
                            this.language = 2;
                        }
                        else {
                            sessionStorage.setItem('id2', response.data.mengUid)
                            this.$refs.form.reset();
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
                const response = await axios.post(`http://192.168.1.17:8081/mediaData/mpData?uId=${uid}&mtId=${id}`, formData);
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
                const response = await axios.post(`http://192.168.1.17:8081/mediaData/mpData?uId=${uid}&mtId=${id}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    alert('success');
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    },
    // created() {
    //     this.fileType = this.fileTypes.forEach(item => {
    //         this.fileTypes[item.fileType.toLowerCase()] = item.id;
    //     });
    // },
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