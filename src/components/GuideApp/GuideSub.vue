<template>
    <div class="row ">
        <div class="col-8 pt-0">
            <v-container fluid class="pt-0" v-if="showContent">
                <!-- <v-card width="80%" class="p-3 " elevation="4"> -->
                <!-- <div class="first-div"> -->
                <!-- <div class="d-flex "> -->
                <v-form ref="form" @submit.prevent="submitDetails">
                    <!-- <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="language"  :rules="languageRules"></v-select> -->
                    <v-text-field v-model="title"
                        :label="language === 'Malayalam' ? 'ഇനത്തിൻ്റെ തലക്കെട്ട്' : 'SubHeading'" density="comfortable"
                         class="guide mb-3" :rules="titleRules"></v-text-field>
                     <div style="height: 70px;"> 
                    <div class="d-flex align-items-center">
                        <label
                            class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                class="mdi mdi-upload" color="white"></v-icon>Upload Images</label>
                        <span id="image-chosen" class="ms-3">{{ imageName }}</span>
                    </div>
                    <p v-if=!preview class="mb-0 error-message ps-3">{{ imageError }}</p>
                </div> 

                    <!-- </div> -->
                    
                    <v-textarea :label="language === 'Malayalam' ? 'ഇനവിവരണം' : 'Description'" 
                        class="desc mb-3" v-model="description" style="width: 700px;" :rules="descriptionRules"></v-textarea>
                        <!-- audio -->
                        <div style="height: 70px;">
                        <input type="file" id="audio-btn" hidden @change="handleFileChange" />
                        <div class="d-flex align-items-center">
                            <label for="audio-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-music me-2" color="white"></v-icon>Upload Audio</label>
                            <span id="file-chosen" class="ms-3">{{ fileName }}</span>
                        </div>
                        <p class="mb-0 ms-3 error-message">{{ fileError }}</p>
                    </div>
                    <!-- audio end -->
                    <!-- video -->
                    <div style="height: 70px;">
                        <input type="file" id="video-btn" hidden @change="handleFileChange" />
                        <div class="d-flex align-items-center">
                            <label for="video-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-video me-2" color="white"></v-icon>Upload Video</label>
                            <span id="file-chosen" class="ms-3">{{ fileName }}</span>
                        </div>
                        <p class="mb-0 ms-3 error-message">{{ fileError }}</p>
                    </div>
                    <!-- video end -->
                    <div>
                        <v-text-field v-if="showTextField" label="Add URL" density="comfortable" class="mt-3 mb-3" :rules="urlRules" outlined v-model="url" style="width: 500px;"></v-text-field>
                        <p class="mb-0 ms-3 error-message">{{ fileError }}</p>
                    </div>
                    <v-btn  width="250" height="40" class="text-capitalize" style="font-size: 16px;color: green;border-radius: 15px;" 
                         variant="outlined" @click="showTextField = true"><v-icon class="mdi mdi-plus"></v-icon> Add Reference</v-btn>
                    <!-- </div> -->
                    <div class="d-flex justify-content-end">
                    <v-btn color="#2C7721" width="160" height="40" class="text-capitalize" style="font-size: 16px; "
                        type="submit" ><v-icon class="mdi mdi-plus"></v-icon>Add Sub Item</v-btn></div>
                </v-form>
            </v-container>
            <v-container fluid class="pb-0">
                <v-btn  width="250" height="40" class="text-capitalize" style="font-size: 16px;color: green;border-radius: 15px;" 
                         variant="outlined" @click="showContent = true"><v-icon class="mdi mdi-plus"></v-icon> Add Sub Details</v-btn>
            </v-container>
            <div class="d-flex justify-content-end">
                    <v-btn color="#2C7721" width="160" height="40" class="text-capitalize" style="font-size: 16px;border-radius: 15px; "
                        type="submit" ><v-icon class="mdi mdi-plus"></v-icon>Add Item</v-btn></div>
        </div>
        <div class="col-4 pt-0">
            <v-img :src="preview" width="300" height="300" aspect-ratio="1" alt="Image Preview"></v-img>
        </div>
    </div>

</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            fileName: 'No file chosen',
            imageName: 'No file chosen',
            message: '',
            fileError: '',
            imageError: null,
            dialog: false,
            preview: null,
            audio: null,
            languages: ['English', 'Malayalam'],
            title: null,
            description: null,
            language: null,
            titleRules: [v => !!v || '*Title is required'],
            descriptionRules: [v => !!v || '*Description is required'],
            languageRules: [v => !!v || '*Language is required'],
            showTextField: false, 
            url: null,
            urlRules: [v => !!v || '*URL is required'],
            showContent: false,
            images: [
                {
                    "image": "https://picsum.photos/500/300?image=15",
                    "id": 1,
                    "name": "imag15.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=20",
                    "id": 2,
                    "name": "imag20.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=25",
                    "id": 3,
                    "name": "imag25.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=30",
                    "id": 4,
                    "name": "imag30.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=35",
                    "id": 5,
                    "name": "imag35.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=40",
                    "id": 6,
                    "name": "imag40.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=45",
                    "id": 7,
                    "name": "imag45.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=50",
                    "id": 8,
                    "name": "imag50.jpg"
                },
                {
                    "image": "https://picsum.photos/500/300?image=55",
                    "id": 9,
                    "name": "imag55.jpg"
                }
            ]
        };
    },
    computed: {

    },
    methods: {
        selectImage(selectedImage) {
            // Update the file name in the dialog box
            this.imageName = selectedImage.name;
            this.preview = selectedImage.image
            this.dialog = false
        },
        openFileInput() {
            this.$refs.fileInput.click();
        },
        validateImage() {
            console.log('image')
            if (!this.preview) {
                this.imageError = '*Please upload image before submitting.'
                return false;
            }
            else {
                this.imageError = '';
                return true;
            }
        },
        validateFile() {
            console.log('audio')
            if (!this.audio) {
                this.fileError = '*Please upload audio before submitting.'
                return false;
            }
            else {
                this.fileError = '';
                return true;
            }
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) {
                this.imageError = '*Please select an image before submitting';
                return;
            }
            this.imageName = file.name;
            this.preview = URL.createObjectURL(file)
            this.dialog = false
            console.log("Selected file:", file);
        },
        handleFileChange(event) {
            const file = event.target.files[0];
            this.fileName = file.name;
            this.uploadFile(file);
        },
        async uploadFile(file) {
            this.fileError = '';
            this.message = '';
            const formData = new FormData();
            formData.append('file', file);
            try {
                const body = {
                    method: 'POST',
                    body: formData
                };
                const response = await axios.post('http://localhost:3000/api/upload', body);
                if (response.status === 200) {
                    this.message = 'File uploaded successfully';
                    console.log('image sent', body)
                }
            } catch (error) {
                this.fileError = '*Error uploading file: ' + error.message;
            }
        },
        async submitDetails() {
            const { valid } = await this.$refs.form.validate();
            console.log(this.validateFile())
            console.log(this.validateImage())
            if ((this.validateFile() && this.validateImage()) && valid)
                alert('Form is valid')
        },
      saveUrl() {
      console.log('URL saved:', this.url);
      this.showTextField = false;
      this.url = ''; 
    },
    }
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
    width: 250px !important;
    /* height: 45px !important; */
    /* background-color: #DFE4D7 !important; */
    /* border-bottom: 1px solid #546E7A; */
}

:deep(.guide .v-input__control) {
    width: 250px !important;
    /* height: 45px !important; */
}

:deep(.v-input__details) {
    padding-top: 1px;
}
:deep(.v-input--outlined .v-input__control .guide .desc) {
  border-bottom: 1px solid #48663f; /* Default border color */
  border-top: none;
  border-left: none;
  border-right: none;
  transition: border-color 0.2s ease-in-out; /* Transition for border color change */
}

/* When focused, change the bottom border color */
:deep(.v-input--outlined.v-input--is-focused .v-input__control .guide .desc) {
  border-bottom-color: #48663f; /* Focus border color */
}
</style>