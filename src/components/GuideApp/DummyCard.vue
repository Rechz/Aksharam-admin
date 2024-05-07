<template>
    <v-dialog v-model="dialog" width="600">
        <v-sheet width="800" class="p-5">
            <v-row>
                <v-col v-for="n in images" :key="n.id" class="d-flex child-flex" cols="4">
                    <v-img :src="n.image" aspect-ratio="1" class="bg-grey-lighten-2" @click="selectImage(n)" cover>
                        <template v-slot:placeholder>
                            <v-row align="center" class="fill-height ma-0" justify="center">
                                <v-progress-circular color="grey-lighten-5" indeterminate></v-progress-circular>
                            </v-row>
                        </template>
                    </v-img>
                </v-col>
                <v-col class="d-flex child-flex" cols="4">
                    <input type="file" style="display: none" ref="fileInput" @change="handleFileUpload">
                    <v-btn @click="openFileInput" height="200" width="200" prepend-icon="mdi-upload" class="fw-bold"
                        elevation="6" color="blue-grey-lighten-5">Upload Image</v-btn>
                </v-col>
            </v-row>
        </v-sheet>
    </v-dialog>
    <div class="row ">
        <div class="col-8 pt-0">
            <v-container fluid class="pb-0">
                <div style="height: 70px;">
                    <div class="d-flex align-items-center">
                        <label @click="dialog = true"
                            class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                class="mdi mdi-camera me-2" color="white"></v-icon>Select Image</label>
                        <span id="image-chosen" class="ms-3">{{ imageName }}</span>
                    </div>
                    <p v-if=!preview class="mb-0 error-message ps-3">{{ imageError }}</p>
                </div>

            </v-container>
            <v-container fluid class="pt-0">
                <!-- <v-card width="80%" class="p-3 " elevation="4"> -->
                <!-- <div class="first-div"> -->
                <!-- <div class="d-flex "> -->
                <v-form ref="form" @submit.prevent="submitDetails">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="language" variant="outlined" :rules="languageRules"></v-select>
                    <v-text-field v-model="title"
                        :label="language === 'Malayalam' ? 'ഇനത്തിൻ്റെ തലക്കെട്ട്' : 'Item Heading'" density="comfortable"
                        variant="outlined" class="guide mb-3" :rules="titleRules"></v-text-field>

                    <!-- </div> -->
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
                    <v-textarea :label="language === 'Malayalam' ? 'ഇനവിവരണം' : 'Item Description'" variant="outlined"
                        class="mb-3" v-model="description" style="width: 700px;" :rules="descriptionRules"></v-textarea>
                    <!-- </div> -->
                    <v-btn color="#2C7721" width="160" height="40" class="text-capitalize" style="font-size: 16px; "
                        type="submit">Submit</v-btn>
                </v-form>
            </v-container>
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
        }
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
</style>