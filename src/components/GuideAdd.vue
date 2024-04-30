<template>
    <div class="d-flex justify-content-between w-75 flex-wrap mb-1">
        <div>
            <div class="mb-3">
                <input type="file" id="actual-btn" hidden @change="handleFileChange" />
                <div class="d-flex align-items-center">
                    <label for="actual-btn"
                        class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                            class="mdi mdi-upload" color="white"></v-icon>Upload Image</label>
                    <span id="file-chosen" class="ms-3">{{ fileName }}</span>
                </div>
                <p class="error-message mt-2">{{ error }}</p>
            </div>
            <div>
                <p class="text-center mt-0 py-0">or</p>
                <div class="d-flex align-items-center gap-1">Select already uploaded images:<v-select class="select"
                        label="Select Image" single-line hide-details></v-select></div>
            </div>
        </div>
        <div>
            <v-img src="@/assets/pic1.jpg" width="150" height="150"></v-img>
        </div>
    </div>
    <v-container fluid>
    
       
                <!-- <v-card width="80%" class="p-3 " elevation="4"> -->
                    <div class="first-div">
                        <div class="d-flex gap-4">
                                <v-text-field v-model="titleMal" label="Image Heading" density="comfortable" variant="solo"
                            bg-color="grey-lighten-2" single-line></v-text-field>
                            <div>
                        <input type="file" id="actual-btn" hidden @change="handleFileChange" />
                        <div class="d-flex align-items-center">
                            <label for="actual-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-upload" color="white"></v-icon>Upload Audio</label>
                            <span id="file-chosen" class="ms-3">{{ fileName }}</span>
                        </div>
                    </div>
                        </div>
                    
                        
                        <v-textarea label="Description" variant="solo" bg-color="grey-lighten-2"
                            class=""></v-textarea>
                    </div>
                <!-- </v-card> -->
            
            <!-- <v-col cols="12" md="5">
                <v-card width="100%" class="px-3" elevation="4">
                    <div class="second-div">
                        English content
                        <v-text-field v-model="titleMal" label="Image Heading" density="comfortable" variant="solo"
                            bg-color="grey-lighten-2" single-line></v-text-field>
                        <input type="file" id="actual-btn" hidden @change="handleFileChange" />
                        <div class="d-flex align-items-center">
                            <label for="actual-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-upload" color="white"></v-icon>Upload Image</label>
                            <span id="file-chosen" class="ms-3">{{ fileName }}</span>
                        </div>
                        <v-textarea label="Description" variant="solo" bg-color="grey-lighten-2"
                            class="mt-4"></v-textarea>
                    </div>
                </v-card>

            </v-col> -->
  
    </v-container>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            fileName: 'No file chosen',
            error: ''
        };
    },
    methods: {
        handleFileChange(event) {
            const file = event.target.files[0];
            this.fileName = file.name;
            this.uploadFile(file);
        },

        async uploadFile(file) {
            const formData = new FormData();
            formData.append('file', file);
            try {
                const body = {
                    method: 'POST',
                    body: formData
                };
                const response = await axios.post('http://localhost:3000/api/upload', body);
                if (response.status === 200) {
                     console.log('image sent', body)
                } 
            } catch (error) {
                this.error = '*Error uploading file: ' + error.message;
            }
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
}

#file-chosen {
    margin-left: 0.3rem;
    font-family: sans-serif;
}
.error-message{
   color: red;
   font-style: italic;
   font-size: 14px;
}
:deep(.select .v-input__control) {
    width: 250px !important;
    height: 45px !important;
    /* background-color: #DFE4D7 !important; */
    /* border-bottom: 1px solid #546E7A; */
}
</style>