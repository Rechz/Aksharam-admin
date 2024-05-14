<template>

    <div class="row">
        <div class="col-8 pt-0">

            <v-container fluid class="pt-0">
                <v-form ref="form" @submit.prevent="submitHeading">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
                    <v-text-field v-model="title"
                        :label="language === 'Malayalam' ? 'ഇനത്തിൻ്റെ തലക്കെട്ട്' : 'Heading'" density="comfortable"
                        class="select mb-3" :rules="titleRules"></v-text-field>
                    <p v-if="heading">{{ heading }}</p>
                    <v-textarea label="Add URL" density="comfortable" class="mt-3 mb-3 select" :rules="urlRules"
                        outlined v-model="url" style="width: 500px;"></v-textarea>
                    <v-textarea :label="language === 'Malayalam' ? 'ഇനവിവരണം' : 'Description'" class="desc mb-3"
                        v-model="description" style="width: 700px;" :rules="descriptionRules"></v-textarea>
                    <v-btn color="green" class="mb-3" type="submit">Submit</v-btn>
                </v-form>

            </v-container>
        </div>
        <div>
            <input type="file" multiple @change="handleFileUpload">
            <div class="d-flex gap-2 flex-wrap ">
                <div v-for="(image, index) in imgPreview" :key="index" elevation="4" style="position: relative;">
                    <v-card height="100" width="200">
                        <img :src="image.url" alt="Uploaded Image" style="max-width: 200px; background-size: cover;">
                    </v-card>

                    <v-icon class="mdi mdi-close-circle-outline" @click="removeImage(index)"
                        style="position:absolute; top: 0; right:0" color="light-green-darken-1"></v-icon>
                </div>
            </div>
            <button @click="uploadImages" class="btn btn-success mt-3">Upload Images</button>

        </div>

    </div>
    <div class="mt-3">
        <v-select class="select mb-3" label="Select Type" density="comfortable" :items="fileTypes" v-model="fileType"
            :rules="languageRules" item-title="fileType" item-value="id"></v-select>
        <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
            v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
        <div>
            <input type="file" ref="fileInput" multiple @change="handleAudioVideo">
            <ul>
                <li v-for="(file, index) in files" :key="index">{{ file.name }}</li>
            </ul>
        </div>
        <button @click="submitAudioVideo" class="btn btn-success mt-3">Upload {{ fileType === 1 ? 'Audio' :
            'Video'}}</button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            audioName: 'No file chosen',
            imageName: 'No file chosen',
            videoName: 'No file chosen',
            images: [],
            imgPreview: [],
            fileTypes: [],
            fileType: 1,
            idmal: sessionStorage.getItem('id1'),
            ideng: sessionStorage.getItem('id2'),
            heading: null,
            mainId: null,
            image: null,
            audio: null,
            video: null,
            audioError: '',
            imageError: '',
            videoError: '',
            preview: null,
            languages: [],
            title: null,
            description: null,
            language: 1,
            titleRules: [v => !!v || '*Title is required'],
            descriptionRules: [v => !!v || '*Description is required'],
            languageRules: [v => !!v || '*Language is required'],
            showTextField: false,
            url: null,
            urlRules: [v => !!v || '*URL is required'],
            files: []
        };
    },
    computed: {

    },
    methods: {
        handleImageChange() {
            const file = this.$refs.pic.files[0];
            if (file) {
                this.imageName = file.name; 
                const reader = new FileReader();
                reader.onload = () => {
                    this.image = file
                    this.preview = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        handleAudioVideo(event) {
            const selectedFiles = event.target.files;
            for (let i = 0; i < selectedFiles.length; i++) {
                this.files.push(selectedFiles[i]);
            }
        },
        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    this.images.push(file);
                    this.imgPreview.push({url:reader.result})
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
                const response = await axios.post(`http://192.168.1.32:8081/imgData/uploadImg?englishUId=${this.ideng}&malUid=${this.idmal}`, formData);
                if (response.status === 200) {
                    alert('success')
                }
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        },
        async getType() {
            try {
                const response = await axios.get('http://192.168.1.32:8081/fileType/getFileType');
                if (response.status >= 200 && response.status < 300) {
                    console.log('gettype',response.data)
                    this.fileTypes = response.data;
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
                const response = await axios.get('http://192.168.1.32:8081/dataType1/getTalk')
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
            try {
                const response = await axios.post(`http://192.168.1.32:8081/DataEntry1/mainT?dId=${this.language}`, {
                "title": this.title,
                "description": this.description,
                "referenceURL": this.url
            });

            if (response.status >= 200 && response.status < 300) {
                alert('success');
                if (this.language === 1) {
                    this.heading = response.data.descreption;
                    sessionStorage.setItem('id1', response.data.mmalUid)
                    console.log('uid1', sessionStorage.getItem('id1'))
                    this.language = 2;
                }
                else {
                    sessionStorage.setItem('id2', response.data.mengUid)
                    console.log('uid2', sessionStorage.getItem('id2'))
                    this.language = 1;
                }
                this.title = '',
                    this.url = '',
                this.description = ''
                
            }
            }
            catch (err) {
                console.error(err);
            }
            
        },
        async submitAudioVideo() {
            let uid = ''
            if (this.language === 1) {
                uid = this.idmal;
            }
            else {
                uid= this.ideng
            }
            console.log(uid)
            const formData = new FormData();
            this.files.forEach((file) => {
                formData.append("files", file);
            });
            console.log('formdata',formData)
            try {
                const response = await axios.post(`http://192.168.1.32:8081/mediaData/mpData?uId=${uid}&dtId=${this.language}`, formData);

                if (response.status >= 200 && response.status < 300) {
                    alert('success');
                    if (this.language === 1) {
                        
                        console.log(response.data)
                        this.language = 2;
                    }
                    else {
                        console.log(response.data)
                        this.language = 1;
                    }
                    

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
    background-color: #DFE4D7 !important;
    width: 400px !important;
}

:deep(.desc .v-input__control) {
    border-bottom: 2px solid #216D17;
    background-color: #DFE4D7 !important;
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
</style>