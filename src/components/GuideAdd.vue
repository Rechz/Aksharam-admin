<template>
    <div class="row">
        <div class="col-8">
            <div class="d-flex flex-wrap mb-1">
                <div class="d-flex align-items-start gap-4">
                    <div class="mb-3">
                        <input type="file" id="actual-btn" hidden @change="handleFileChange" />
                        <div class="d-flex align-items-center">
                            <label for="actual-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-upload" color="white"></v-icon>Upload Image</label>
                            <span id="file-chosen" class="ms-1">{{ fileName }}</span>
                        </div>
                        <p class="error-message mt-2">{{ error }}</p>
                    </div>

                    <p class="text-center mt-2 py-0 fw-bold">or</p>
                    <v-select class="select" label="Select uploaded images" single-line hide-details
                        density="comfortable"></v-select>

                </div>
                <!-- <div>
            <v-img src="@/assets/pic1.jpg" width="150" height="150"></v-img> 
        </div> -->
            </div>
            <v-container fluid>


                <!-- <v-card width="80%" class="p-3 " elevation="4"> -->
                <div class="first-div">
                    <!-- <div class="d-flex "> -->
                    <v-select class="select mb-3" label="Select Language" density="comfortable" single-line hide-details
                        variant="outlined"></v-select>
                    <v-text-field v-model="titleMal" label="Item Heading" density="comfortable" variant="outlined"
                        class="guide"></v-text-field>

                    <!-- </div> -->
                    <div>
                        <input type="file" id="actual-btn" hidden @change="handleFileChange" />
                        <div class="d-flex align-items-center">
                            <label for="actual-btn"
                                class="label-btn text-center d-flex align-items-center justify-content-center"><v-icon
                                    class="mdi mdi-upload" color="white"></v-icon>Upload Audio</label>
                            <span id="file-chosen" class="ms-3">{{ fileName }}</span>
                        </div>
                    </div>
                    <v-textarea label="Item Description" variant="outlined" class="mt-4" style="width: 500px;"></v-textarea>
                </div>
            </v-container>
        </div>
        <div class="col-4">

            <v-img src="@/assets/pic1.jpg" width="300" height="300"></v-img>

        </div>
    </div>

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
    /* height: 45px !important; */
    /* background-color: #DFE4D7 !important; */
    /* border-bottom: 1px solid #546E7A; */
}
:deep(.guide .v-input__control){
    width: 250px !important;
    /* height: 45px !important; */
}

</style>