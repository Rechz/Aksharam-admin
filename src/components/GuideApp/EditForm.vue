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
                <v-form class="pt-0" ref="form">
                    <v-text-field v-model="editTitle" label='Heading' variant="outlined" density="comfortable"
                        class="select" :rules="titleRules"></v-text-field>
                    <v-textarea label='Description' class="desc" rows="10" v-model="editDescription"
                        :rules="descriptionRules" variant="outlined"></v-textarea>
                    <v-textarea label='References' density="comfortable" class="reference" rows="2" v-model="editUrl"
                        variant="outlined"></v-textarea>
                    <div class="d-flex justify-content-end">
                        <v-btn color="#386568" size="large" class="text-capitalize" type="submit" :disabled="subload"
                            variant="outlined" rounded :loading="subload">Update topic</v-btn>
                    </div>
                </v-form>
            </div>
            <v-divider></v-divider>
            <v-card>
                <v-card-title class="bg-blue-grey-lighten-5 mb-3">
                    Images
                </v-card-title>
                <v-card-text>
                    <div class="d-flex gap-3 flex-wrap" v-if="editImages.length > 0">
                        <div v-for="image in editImages" :key="image.imgID">
                            <v-card>
                                <v-img v-bind="props" :src="image.furl" height="150" width="200" cover
                                    class="mx-auto"></v-img>
                                <v-card-actions class="py-0 d-flex justify-content-end ">
                                    <v-btn icon="mdi-delete" size="small" color="error"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                    </div>
                    <v-card-subtitle v-else class="mb-0 py-0">No images uploaded.</v-card-subtitle>
                    <div class="d-flex justify-content-end">
                        <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                            class="text-capitalize">Add Image</v-btn>
                    </div>

                </v-card-text>


            </v-card>
            <v-divider></v-divider>
            <v-card>
                <v-card-title class="bg-blue-grey-lighten-5 mb-3">
                    Video
                </v-card-title>
                <v-card-text>
                    <v-card class="py-0" v-if="editVideo.length > 0" width="200">
                        <video controls width="200" :src="editVideo[0].furl" type="video/*" cover>
                            Your browser does not support the video tag.
                        </video>
                        <v-card-actions class="py-0 d-flex justify-content-end " min-height="0">
                            <v-btn icon="mdi-delete" size="small" color="error"></v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card-subtitle v-else class="mb-0 py-0">No video uploaded.</v-card-subtitle>
                    <div class="d-flex justify-content-end">
                        <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                            class="text-capitalize">Add Video</v-btn>
                    </div>
                </v-card-text>


            </v-card>
            <v-divider></v-divider>
            <v-card>
                <v-card-title class="bg-blue-grey-lighten-5 mb-3">
                    Audio
                </v-card-title>
                <v-card-text>
                    <v-card v-if="editAudio.length > 0" width="320" class="pt-2 px-2">
                        <audio controls :src="editAudio[0].furl" type="audio/*" width="200">
                            Your browser does not support the audio element.
                        </audio>
                        <v-card-actions class="py-0 d-flex justify-content-end ">
                            <v-btn icon="mdi-delete" size="small" color="error"></v-btn>
                        </v-card-actions>
                    </v-card>
                    <v-card-subtitle v-else class="mb-0 py-0">No audio uploaded.</v-card-subtitle>
                    <div class="d-flex justify-content-end">
                        <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                            class="text-capitalize">Add Audio</v-btn>
                    </div>
                </v-card-text>


            </v-card>
            <div class="d-flex justify-content-end mt-3">
                <v-btn color="#2C7721" size="large" variant="elevated" @click="finish">Finish</v-btn>
            </div>
        </v-card-text>
    </v-card>
</template>

<script>
// import axios from 'axios';
export default {
    props: ["head","description","images",'video','url','audio'],
    emits: ['finish'],
   data() {
        return {
            expand: false,
            expand2: false,
            subload: false,
            imageLoad: false,
            videoLoad: false,
            audioLoad : false,
            // images: [],
            editImages: [...this.images],
            editVideo: [...this.video],
            editAudio: [...this.audio],
            imgPreview: [],
            editTitle: this.head,
            titleRules: [v => !!v || '*Title is required'],
            editDescription: this.description,
            descriptionRules: [v => !!v || '*Description is required'],
            editUrl: this.url,
            urlRules: [v => !!v || '*URL is required'],
            audioFiles: [],
            videoFiles: [],
            base_url: 'http://localhost:8086',
            message: '',
            loading: false,
            color: '',
            dialogTopic: false,
            dialogHead: '',  
        };
    },
    
    methods: {
        finish() {
            this.$emit('finish');
        },
        addSub() {
            const response = window.confirm(`Are you sure you want to add subheading for ${this.engHeading}/${this.malHeading}`)  
            if (response) {
                this.step++;
                sessionStorage.setItem('step', this.step)
          }
        },
    },
};
</script>

