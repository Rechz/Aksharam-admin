<template>
    <v-card v-if="!subheading">
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
                <v-form class="pt-0" ref="form" @submit.prevent="editTopic">
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
                        <div v-for="(image,index) in editImages" :key="image.imgID">
                            <v-card>
                                <v-img :src="image.furl" height="150" width="200" cover class="mx-auto"></v-img>
                                <v-card-actions class="py-0 d-flex justify-content-end ">
                                    <v-btn icon="mdi-pencil" size="small" color="success"
                                        @click="edit(image.imgID, index)"></v-btn>
                                    <v-btn icon="mdi-delete" size="small" color="error"
                                        @click="deleteImage(image.imgID)"></v-btn>
                                </v-card-actions>
                            </v-card>
                        </div>
                        <input type="file" ref="selectImage" @change="handleImage" class="d-none" accept="image/*">
                    </div>
                    <v-card-subtitle v-else class="mb-0 py-0">No images uploaded.</v-card-subtitle>
                    <div class="d-flex justify-content-end">
                        <input type="file" ref="addImage" @change="addImage" class="d-none" accept="image/*" multiple>
                        <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                            class="text-capitalize" @click="add">Add Image</v-btn>
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
                            <v-btn icon="mdi-pencil" size="small" color="success" @click="updateVideo"></v-btn>
                            <v-btn icon="mdi-delete" size="small" color="error" @click="deleteVideo"></v-btn>
                        </v-card-actions>
                        <input type="file" ref="selectVideo" @change="handleVideo" class="d-none" accept="video/*">
                    </v-card>

                    <v-card-subtitle v-else class="mb-0 py-0">No video uploaded.</v-card-subtitle>
                    <div class="d-flex justify-content-end">
                        <input type="file" ref="addVideo" @change="addVideo" class="d-none" accept="video/*">
                        <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                            class="text-capitalize" @click="addVid">Add Video</v-btn>
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
                            <v-btn icon="mdi-pencil" size="small" color="success" @click="updateAudio"></v-btn>
                            <v-btn icon="mdi-delete" size="small" color="error" @click="deleteAudio"></v-btn>
                        </v-card-actions>
                        <input type="file" ref="selectAudio" @change="handleAudio" class="d-none" accept="audio/*">
                    </v-card>
                    <v-card-subtitle v-else class="mb-0 py-0">No audio uploaded.</v-card-subtitle>
                    <div class="d-flex justify-content-end">
                        <input type="file" ref="addAudio" @change="addAudio" class="d-none" accept="audio/*">
                        <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                            class="text-capitalize" @click="addAud">Add Audio</v-btn>
                    </div>
                </v-card-text>

                <v-divider></v-divider>

                <v-card>
                    <v-card-title class="bg-blue-grey-lighten-5 mb-3">
                        Subtitles
                    </v-card-title>
                    <v-card-text>
                        <div v-if="subHeads && subHeads.length > 0">
                            <v-list lines="one">
                                <v-list-item v-for="(topic, index) in subHeads" :key="index"
                                    :title="index+1 + '.' + topic.title">
                                </v-list-item>
                            </v-list>
                        </div>
                        <v-card-subtitle v-else class="mb-0 py-0">No Subtitles added.</v-card-subtitle>
                        <div class="d-flex justify-content-end">
                            <v-btn color="#386568" size="large" variant="outlined" rounded prepend-icon="mdi-plus"
                                class="text-capitalize" @click="subheading = !subheading">Add Subheading</v-btn>
                        </div>
                    </v-card-text>
                </v-card>


            </v-card>
            <div class="d-flex justify-content-end mt-3">
                <v-btn color="#2C7721" size="large" variant="elevated" @click="finish">Finish</v-btn>
            </div>
        </v-card-text>
    </v-card>
    <v-card v-else>
        <EditSub @back="subheading = !subheading" :idmal="malId" :ideng="engId" @update="update" />
    </v-card>
</template>

<script>
import axios from 'axios';
import EditSub from './EditSub.vue';
export default {
    props: ["head", "description", "images", 'video', 'url', 'audio', 'commonId', 'uId', 'main', 'subtopic', 'malId',
        'engId'],
    emits: ['finish', 'update'],
    components: {EditSub},
   data() {
       return {
            subheading: false,
            subload: false,
            imageLoad: false,
            videoLoad: false,
            audioLoad: false,
            imageId: null,
            imageIndex: null,
            newImage: null,
            imagesAdd: [],
            videoAdd: null,
            audioAdd: null,
            // images: [],
            editImages: this.images,
            editVideo: this.video,
            editAudio: this.audio,
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
            subHeads: this.subtopic
        };
    },
    
    methods: {
        finish() {
          this.$emit('finish');
        },
        update() {
            this.$emit('update'); 
        },
        edit(id, index) {
           this.imageIndex = index
           this.imageId = id;
           this.$refs.selectImage.click(); 
        },
        async handleImage(event) {
            const files = event.target.files[0];
            this.newImage = files;
            const formData = new FormData();
            formData.append('files', this.newImage); 
            formData.append('imgIds', this.imageId); 
            formData.append('commonId', this.commonId);
            try {
                const response = await axios.put(`${this.base_url}/updateMain/updateUploadImg`, formData);
                console.log(response);
                if ((response.status >= 200) || (response.status < 300)) {
                    this.$emit('update');
                    this.imageId = null
                    // this.editImages[this.imageIndex] = response.data;
                    this.imageIndex = null
                }  
            } catch (error) {
                console.error('PUT request failed:', error);    
            }
        },
        add() {      
            this.$refs.addImage.click();
        },
        async addImage(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.imagesAdd.push(file);    
            }
            const formData = new FormData();
            this.imagesAdd.forEach((image) => {
                formData.append("file", image);
            });         
            try {
                const response = await axios.post(`${this.base_url}/imgData/uploadImg?englishUId=${this.engId}&malUid=${this.malId}`, formData);
                if (response.status === 200) {
                    this.imagesAdd = [];
                    this.$emit('update');
                    alert('success')
                }
            } catch (error) {
                console.error(error)
            }
        },
        addVid() {
            this.$refs.addVideo.click();
        },
        async addVideo(event) {
            const files = event.target.files[0];
            this.videoAdd = files;
            const formData = new FormData();
            formData.append("files", this.videoAdd);
            try {
                const response = await axios.post(`${this.base_url}/mediaData/mpData?uId=${this.uId}&mtId=${this.media.video}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.$emit('update');
                    alert('success')
                    this.videoAdd = null
                }
            }
            catch (err) {
                console.error(err)
            }
        },
        updateVideo() {
            this.$refs.selectVideo.click(); 
        },
        async handleVideo(event) {
            const files = event.target.files[0];
            this.videoAdd = files;
            const formData = new FormData();
            formData.append("uId", this.uId);
            formData.append("mtId", this.media.video);
            formData.append("files", this.videoAdd);
            try {
                const response = await axios.put(`${this.base_url}/updateMain/updateMpData`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.$emit('update');
                    alert('success')
                    this.videoAdd = null
                }
            }
            catch (err) {
                console.error(err)
            }
        },
        addAud() {
            this.$refs.addAudio.click();
        },
        async addAudio(event) {
            const files = event.target.files[0];
            this.audioAdd = files;
            const formData = new FormData();
            formData.append("files", this.audioAdd);
            try {
                const response = await axios.post(`${this.base_url}/mediaData/mpData?uId=${this.uId}&mtId=${this.media.audio}`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.$emit('update');
                    alert('success')
                    this.audioAdd = null
                }
            }
            catch (err) {
                console.error(err)
            }
        },
        updateAudio() {
            this.$refs.selectAudio.click(); 
        },
        async handleAudio(event) {
            const files = event.target.files[0];
            this.audioAdd = files;
            const formData = new FormData();
            formData.append("uId", this.uId);
            formData.append("mtId", this.media.audio);
            formData.append("files", this.audioAdd);
            try {
                const response = await axios.put(`${this.base_url}/updateMain/updateMpData`, formData);
                if (response.status >= 200 && response.status < 300) {
                    this.$emit('update');
                    alert('success')
                    this.audioAdd = null
                }
            }
            catch (err) {
                console.error(err)
            }
        },
        async deleteImage(id) {
            try {
                const response = await axios.delete(`${this.base_url}/deleteMain/deleteImages?commonId=${this.commonId}&imgIds=${id}`);
            if ((response.status >= 200) || (response.status < 300)) {
                this.$emit('update');
                this.imageId = null
                this.imageIndex = null
            }
            }
            catch (err) {
                console.error(err)
            }
        },
        async editTopic() {
            console.log('main',this.main)
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
                try {
                    let response;
                    if (this.main == true) {
                        console.log('edit main')
                        response = await axios.put(`${this.base_url}/updateMain/stringUpdate/${this.uId}`, {
                        "title": this.editTitle,
                        "description": this.editDescription,
                        "referenceURL": this.editUrl
                    });
                    } if (this.main == false) {
                        console.log('edit sub')
                        response = await axios.put(`${this.base_url}/updateFirst/updateFirstData/${this.uId}`, {
                            "title": this.editTitle,
                            "description": this.editDescription,
                            "referenceURL": this.editUrl
                        }); 
                    }
                  
                    if (response.status >= 200 && response.status < 300) {
                        this.icon = 'mdi mdi-check-circle-outline'
                        this.subload = false;
                        this.message = `Topic updated successfully!`;
                            this.dialogHead = 'Success'
                            this.color = '#2E7D32'
                            this.dialogTopic = true;
                            this.$emit('update');
                    }
                }
                catch (err) {
                    this.subload = false;
                    this.color = '#BA1A1A';
                    this.icon = 'mdi mdi-alert-outline'
                    this.dialogHead = 'Error';
                    this.message = err.message;
                    this.dialogTopic = true;
                    console.error(err);
                }
            }
        },
    },
    computed: {
        media() {
            return this.$store.getters.getMedia;
        }
    }
};
</script>

