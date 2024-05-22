<template>
    <v-card>
        <v-card-title class="text-center text-white" style="background-color: #2C7721;">Edit Topic</v-card-title>
        <v-dialog width="600" max-width="600" v-model="dialogTopic">
            <v-card width="600" rounded="3">
                <v-card-title class="text-center text-white" :style="{backgroundColor: color}">{{
                    dialogHead}}</v-card-title>
                <v-card-text class="px-5 text-center">
                    <v-icon size="88" class="mdi mdi-check-circle-outline" color="success"></v-icon>
                    <h6>{{ message }}</h6>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-card-text class="px-5 pb-5">
            <div>
                <v-form class="pt-0" ref="form" @submit.prevent="submitHeading">
                    <v-text-field v-model="editTitle" label='Heading' variant="outlined" density="comfortable"
                        class="select" :rules="titleRules"></v-text-field>
                    <v-textarea label='Description' class="desc" rows="10" v-model="editDescription"
                        :rules="descriptionRules" variant="outlined"></v-textarea>
                    <v-textarea label='References' density="comfortable" class="reference" rows="2" v-model="url"
                        variant="outlined"></v-textarea>
                    <div class="d-flex justify-content-end">
                        <v-btn color="#386568" size="large" class="text-capitalize" type="submit" :disabled="subload"
                            variant="elevated" rounded :loading="subload">Update topic</v-btn>
                    </div>
                </v-form>
            </div>
            <div>
                <div class="d-flex gap-3">
                    <div class="mt-4">
                        <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="mb-1">
                        <div class="d-flex gap-4 flex-wrap ">
                            <div v-for="(image, index) in imgPreview" :key="index" elevation="4"
                                style="position: relative;">
                                <div>
                                    <img :src="image.url" alt="Uploaded Image"
                                        style="max-width: 200px; background-size: cover;">
                                </div>
                                <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)" size="32"
                                    style="position:absolute; top: -16%; right:-6%" color="green-lighten-1"></v-icon>
                            </div>
                        </div>
                        <div class="d-flex justify-content-start gap-3 my-2">
                            <v-btn @click="uploadImages" color="#386568" size="large" variant="elevated" rounded
                                :disabled="imageLoad" :loading="imageLoad" prepend-icon="mdi-upload"
                                class="text-capitalize">Upload Images</v-btn>
                        </div>
                    </div>
                    <div class="d-flex flex-column align-items-end justify-content-center ">
                        <h6 class="text-success text-end fst-italic mb-0" v-if="imageSubmit">*Image successfully
                            uploaded.
                        </h6>
                    </div>
                </div>

            </div>
            <div class="d-flex gap-3">
                <div class="my-3">


                    <div flat>
                        <input type="file" ref="fileAudio" @change="handleAudio" class="mb-2">
                        <ul>
                            <li v-for="(file, index) in audioFiles" :key="index" style="list-style: none;" class="my-1">
                                <v-chip closable @click:close="removeAudio(index)">
                                    {{ file.name }}
                                </v-chip>
                            </li>
                        </ul>
                        <v-btn @click="submitAudio(fileType)" color="#386568" size="large" variant="elevated" rounded
                            prepend-icon="mdi-music" class="text-capitalize" :loading="audioLoad">Submit
                            Audio</v-btn>
                    </div>
                    <div class="mt-4">
                        <input type="file" ref="fileVideo" @change="handleVideo" class="mb-2">
                        <ul>
                            <li v-for="(file, index) in videoFiles" :key="index" style="list-style: none;" class="my-1">
                                <v-chip closable>
                                    {{ file.name }}
                                </v-chip>
                            </li>
                        </ul>
                        <v-btn @click="submitVideo(fileType)" color="#386568" size="large" variant="elevated" rounded
                            prepend-icon="mdi-video" class="text-capitalize" :loading="videoLoad">Submit
                            Video</v-btn>
                    </div>
                </div>
            </div>

            <div class="d-flex justify-content-end ">
                <v-btn color="#2C7721" size="large" variant="elevated" @click="finish">Finish</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
import axios from 'axios';
export default {
    props: [
        "head",
        "description",
        "images",
        'video'],
   data() {
        return {
            expand: false,
            expand2: false,
           
            
            
            
            
            subload: false,
            imageLoad: false,
            videoLoad: false,
            audioLoad : false,
            // images: [],
            imgPreview: [],
           
            
            
            editTitle: this.head,
            titleRules: [v => !!v || '*Title is required'],
            editDescription: this.description,
            descriptionRules: [v => !!v || '*Description is required'],
            
            
            url: null,
            urlRules: [v => !!v || '*URL is required'],
            audioFiles: [],
            videoFiles: [],
            base_url: 'http://192.168.1.12:8081',
            message: '',
            loading: false,
            color: '',
            dialogTopic: false,
            dialogHead: '',  
        };
    },
    
    methods: {
        backToMain() {
            this.step = 1;
            sessionStorage.setItem('step', this.step);
            // action = true;
            // subhead = false;  
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
                        this.subload = false;
                        if (this.language === 1) {
                            const language = this.languages.find(lang => lang.dtId === this.language);
                            this.malHeading = response.data.title
                            sessionStorage.setItem('malHeading', response.data.title)
                            this.message = `${this.malHeading} (${language.talk}) added successfully!`;
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
                            sessionStorage.setItem('engHeading', response.data.title)
                            this.message = `${response.data.title} (${language.talk}) added successfully!`;
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
                    // this.images.push(file);
                    this.imgPreview.push({ url: reader.result })
                };
                reader.readAsDataURL(file);
            }
        },
        // removeImage(index) {
        //     this.imgPreview.splice(index, 1);
        //     this.images.splice(index, 1);
        // },
        async uploadImages() {
            this.imageLoad = true;
            const formData = new FormData();
            this.images.forEach((image) => {
                formData.append("file", image);
            });
            try {
                const response = await axios.post(`${this.base_url}/imgData/uploadImg?englishUId=${this.ideng}&malUid=${this.idmal}`, formData);
                if (response.status === 200) {
                    this.imageLoad = false;
                    this.imageSubmit = true;
                    this.message = 'Image uploaded successfully';
                    this.dialogHead = 'Success'
                    this.color = '#2E7D32'
                    this.dialogTopic = true;
                    // this.images = [];
                    this.imgPreview = [];
                    this.$refs.imageFile.value = '';
                }
            } catch (error) {
                this.imageLoad = false;
                this.imageSubmit = false;
                this.color = '#BA1A1A';
                this.dialogHead = 'Error';
                this.message = 'Error uploading images:' + error.message;
                this.dialogTopic = true;
            }
        },
        finish() {
            sessionStorage.clear();
            this.step =1
            this.idmal= ''
            this.ideng= ''
            this.videomal= ''
            this.audiomal= ''
            this.videoeng = ''
            this.audioeng=''
            this.malHeading=''
            this.engHeading = ''
            this.malSubmit = false
            this.engSubmit =false
        },
        async getType() {
            try {
                const response = await axios.get(`${this.base_url}/fileType/getFileType`);
                if (response.status >= 200 && response.status < 300) {
                    this.fileTypes = response.data; 
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
        addSub() {
            const response = window.confirm(`Are you sure you want to add subheading for ${this.engHeading}/${this.malHeading}`)  
            if (response) {
                this.step++;
                sessionStorage.setItem('step', this.step)
          }
        },
        async submitAudio(id) {
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
                }
            }
            catch (err) {
                this.audioLoad = false;
                this.color = '#BA1A1A';
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
                }
            }
            catch (err) {
                this.videoLoad = false;
                this.color = '#BA1A1A';
                this.dialogHead = 'Error';
                this.message = 'Error uploading video:' + err.message;
                this.dialogTopic = true;
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

