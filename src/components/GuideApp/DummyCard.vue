<template>

    <div class="row">
        <div class="col-8 pt-0">
            <v-container fluid class="pb-0">
            </v-container>
            <v-container fluid class="pt-0">
                <v-form ref="form" @submit.prevent="submitDetails" enctype="multipart/form-data">
                    <v-select class="select mb-3" label="Select Language" density="comfortable" :items="languages"
                        v-model="language" :rules="languageRules" item-title="talk" item-value="dtId"></v-select>
                    <v-text-field v-model="title"
                        :label="language === 'Malayalam' ? 'ഇനത്തിൻ്റെ തലക്കെട്ട്' : 'Heading'" density="comfortable"
                        class="select mb-3" :rules="titleRules"></v-text-field>
                    <!-- image -->
                    <div style="height: 70px;">
                        <input type="file" ref=pic id="image-btn" hidden @change="handleImageChange($event)" />
                        <div class="d-flex align-items-center">
                            <label for="image-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-upload me-2" color="white"></v-icon>Upload Image</label>
                            <span id="image-chosen" class="ms-3">{{ imageName }}</span>
                        </div>
                        <p v-if=!preview class="mb-0 error-message ps-3">{{ imageError }}</p>
                    </div>
                    <v-textarea :label="language === 'Malayalam' ? 'ഇനവിവരണം' : 'Description'" class="desc mb-3"
                        v-model="description" style="width: 700px;" :rules="descriptionRules"></v-textarea>
                    <!-- audio -->
                    <div style="height: 70px;">
                        <input type="file" id="audio-btn" hidden @change="handleAudioChange($event)" />
                        <div class="d-flex align-items-center">
                            <label for="audio-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-music me-2" color="white"></v-icon>Upload Audio</label>
                            <span id="audio-chosen" class="ms-3">{{ audioName }}</span>
                        </div>
                        <p class="mb-0 ms-3 error-message">{{ audioError }}</p>
                    </div>
                    <!-- audio end -->
                    <!-- video -->
                    <div style="height: 70px;">
                        <input type="file" id="video-btn" hidden @change="handleVideoChange($event)" />
                        <div class="d-flex align-items-center">
                            <label for="video-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-video me-2" color="white"></v-icon>Upload Video</label>
                            <span id="video-chosen" class="ms-3">{{ videoName }}</span>
                        </div>
                        <p class="mb-0 ms-3 error-message">{{ videoError }}</p>
                    </div>
                    <!-- video end -->
                    <div>
                        <v-textarea v-if="showTextField" label="Add URL" density="comfortable" class="mt-3 mb-3 select"
                            :rules="urlRules" outlined v-model="url" style="width: 500px;"></v-textarea>
                        <p class="mb-0 ms-3 error-message">{{ fileError }}</p>
                    </div>
                    <v-btn width="250" height="40" class="text-capitalize"
                        style="font-size: 16px;color: green;border-radius: 15px;" variant="outlined"
                        @click="showTextField = true"><v-icon class="mdi mdi-plus"></v-icon> Add Reference URL</v-btn>
                    <!-- </div> -->
                    <div class="d-flex justify-content-end">
                        <!-- <router-link to="/guide-app/addSub"> -->
                        <v-btn color="#2C7721" width="160" height="40" class="text-capitalize" style="font-size: 16px; "
                            type="submit">Proceed</v-btn>
                        <!-- </router-link> -->
                    </div>
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
            audioName: 'No file chosen',
            imageName: 'No file chosen',
            videoName: 'No file chosen',
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
            language: null,
            titleRules: [v => !!v || '*Title is required'],
            descriptionRules: [v => !!v || '*Description is required'],
            languageRules: [v => !!v || '*Language is required'],
            showTextField: false, 
            url: null,
            urlRules: [v => !!v || '*URL is required'],  
        };
    },
    computed: {

    },
    methods: {
        handleImageChange() {
            const file = this.$refs.pic.files[0];
            if (file) {
                
                this.imageName = file.name; // Assuming you have imageName property to display the file name
                // Optionally, you can also preview the image
                const reader = new FileReader();
                reader.onload = () => {
                    this.image = file
                    this.preview = reader.result;
                };
                reader.readAsDataURL(file);
            }
        },
        handleAudioChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.audio = file;
                this.audioName = file.name; 
            }
        },
        handleVideoChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.video = file;
                this.videoName = file.name; 
            }
        },
        proceedToNextStep() {
            this.$emit('proceed');
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
        validateAudio() {
            console.log('audio')
            if (!this.audio) {
                this.audioError = '*Please upload audio before submitting.'
                return false;
            }
            else {
                this.audioError = '';
                return true;
            }
        },
        validateVideo() {
            console.log('video')
            if (!this.video) {
                this.videoError = '*Please upload video before submitting.'
                return false;
            }
            else {
                this.videoError = '';
                return true;
            }
        },

        async submitDetails() {
            const { valid } = await this.$refs.form.validate();
            if ((this.validateImage() && this.validateAudio()) && valid) {
                const data = JSON.stringify({
                    "title": this.title,
                    "description": this.description,
                    "referenceUrl": this.url
                })
                const formData = new FormData();
                formData.append("data", data);
                formData.append("img", this.image);
                formData.append("audio", this.audio);
                formData.append("video", this.video);
                console.log(formData)
                try {
                    const response = await axios.post(`http://192.168.1.34:8081/DataEntry/TalkType?dId=${this.language}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }); 
                    if (response.status === 200) {
                        console.log(response.data)
                        this.proceedToNextStep()
                }
                }
                catch (error) {
                    console.error(error)
                }   
            }     
        },
        saveUrl() {
      console.log('URL saved:', this.url);
      this.showTextField = false;
      this.url = ''; 
        },
        async getAllLanguages() {
            try {
                  const response = await axios.get('http://192.168.1.34:8081/dataType1/getTalk')
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
    },
    mounted() {
        this.getAllLanguages()
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

/* :deep(.select .v-input__control) {
    width: 250px !important; */
    /* height: 45px !important; */
    /* background-color: #DFE4D7 !important; */
    /* border-bottom: 1px solid #546E7A; */
/* } */
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