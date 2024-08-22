<template>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
        <v-card width="600" rounded="3">
            <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{ dialogHead
                }}</v-card-title>
            <v-card-text class="px-5 text-center">
                <v-icon size="88" :class="icon" :color="color"></v-icon>
                <h6>{{ message }}</h6>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-sheet class="pb-5">
        <v-card-title class="text-center text-white d-flex justify-content-between px-4 fixed-top"
            style="background-color: #2C7721;">
            <h5>Edit {{ title }} Details</h5>
            <v-icon size="24" color="white" @click="exit">mdi-close</v-icon>
        </v-card-title>
        <div ref="dialogContent"></div>
        <v-card flat>
            <v-card-text class="px-5 pt-5 mt-4">
                <v-form class="pt-0 " ref="form" @submit.prevent="submitHeading">
                    <div class="d-flex">
                        <v-card flat class="pt-2">
                            <v-text-field v-model="editTitle" :label="language == 1 ? 'തലക്കെട്ട്' : 'Paragraph title'"
                                density="comfortable" class="select mb-2" variant="outlined"></v-text-field>
                            <v-textarea :label="language == 1 ? 'വിവരണം' : 'Paragraph Description'" class="desc mb-2"
                                rows="6" v-model="editDescription" variant="outlined" counter></v-textarea>
                            <v-textarea :label="language == 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                class="reference desc" rows="2" v-model="editUrl" variant="outlined"
                                counter></v-textarea>
                        </v-card>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div class="d-flex gap-2">
                            <v-btn color="#386568" class="text-capitalize" type="submit" :disabled="subload"
                                variant="outlined" rounded :loading="subload">Update Topic</v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="mx-5">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">Images</v-card-title>
            <v-card-text>
                <div class="d-flex gap-3 flex-wrap" v-if="editImages.length > 0">
                    <div v-for="(image, index) in editImages" :key="image.imgID">
                        <v-card>
                            <v-card-text>
                                <v-img :lazy-src="image.furl" :src="image.furl" height="250" width="400" cover
                                    class="mx-auto"></v-img>
                                <v-card-actions v-if="image.editClicked" class="py-0 d-flex justify-content-end">
                                    <v-btn prepend-icon="mdi-pencil" size="small" color="success"
                                        @click="edit(image.id, index, image.imageName, image.imageRefUrl)"
                                        v-if="!image.isEdit">change image</v-btn>
                                    <v-progress-circular :width="1" color="success" indeterminate size="x-small"
                                        v-else></v-progress-circular>
                                </v-card-actions>

                                <div class="text-center" v-if="!image.editClicked">
                                    <p class="mb-0">{{ image.imageName ?? '' }}</p>
                                    <p class="mb-0">{{ image.imageRefUrl ?? '' }}</p>
                                </div>
                                <div v-else>
                                    <v-text-field v-model="image.imageName" label="Image Title" density="compact"
                                        variant="outlined"></v-text-field>
                                    <v-text-field v-model="image.imageRefUrl" label="Image Reference URL"
                                        density="compact" variant="outlined"></v-text-field>
                                </div>
                                <!-- <v-text-field v-model="image.imageName" label="image title" density="compact"
                                    variant="outlined"></v-text-field> -->
                                <v-card-actions class="py-0 d-flex justify-content-end " v-if="!image.editClicked">
                                    <v-btn icon="mdi-pencil" size="small" color="success"
                                        @click="image.editClicked = true"></v-btn>
                                    <v-btn icon="mdi-delete" size="small" color="error"
                                        @click="imageId = image.id; deleteDialogImage = true"></v-btn>
                                </v-card-actions>
                                <v-card-actions class="py-0 d-flex justify-content-end" v-else>
                                    <v-btn @click="image.editClicked = false;">Cancel</v-btn>
                                    <v-btn color="success"
                                        @click="updateImgDetails(image.id, image.imageName, image.imageRefUrl, image)">Submit</v-btn>
                                </v-card-actions>
                            </v-card-text>
                            <!-- <v-card-text> -->

                            <!-- </v-card-text> -->
                        </v-card>
                        <v-dialog v-model="deleteDialogImage" width="400px">
                            <v-card class="rounded-4 pb-4">
                                <v-card-title class="mb-2 text-white ps-4 fs-4"
                                    style="background-color: #BA1A1A;">Delete Image</v-card-title>
                                <v-container class="px-4 d-flex flex-column align-items-center">
                                    <v-icon color="#BA1A1A" size="80" class="mt-2 mdi mdi-trash-can-outline"></v-icon>
                                    <v-card-text class="mt-1 text-center">Are you sure you want to delete this
                                        image?</v-card-text>
                                </v-container>
                                <v-card-actions class="mx-4 d-flex flex-column align-items-center">
                                    <v-btn block class="text-white mb-3" style="background-color: #BA1A1A;"
                                        :disabled="imageDelete" :loading="imageDelete"
                                        @click="deleteImage()">Delete</v-btn>
                                    <v-btn block variant="text" class="mb-3"
                                        @click="deleteDialogImage = false">Cancel</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </div>
                    <input type="file" ref="selectImage" @change="handleImage" class="d-none" accept="image/*">
                </div>
                <v-card-subtitle v-else class="mb-0 py-0">No images uploaded.</v-card-subtitle>
                <div class="d-flex justify-content-end">
                    <input type="file" ref="addImage" @change="addImage" class="d-none" accept="image/*" multiple>
                    <v-btn color="#386568" variant="outlined" rounded prepend-icon="mdi-plus"
                        class="text-capitalize mt-3" @click="add" :disabled="imageLoad" :loading="imageLoad">Add
                        Image</v-btn>
                </div>
            </v-card-text>
        </v-card>
        <v-divider class="mx-5"></v-divider>

        <div class="d-flex justify-content-end gap-3 mx-5">
            <v-btn color="#2C7721" variant="elevated" prepend-icon="mdi-check" class="text-capitalize"
                @click="exit">Finish</v-btn>
        </div>
    </v-sheet>
</template>

<script>

import { mapGetters } from 'vuex';
export default {
    emits: ['exit', 'update'],

    props: ['title', 'description', 'reference', 'topicImage', 'commonId'],
    data() {
        return {
            subload: false,
            imageLoad: false,
            editTitle: this.title,
            editDescription: this.description,
            editUrl: this.reference,
            images: [],
            message: '',
            loading: false,
            color: '',
            icon: '',
            dialogTopic: false,
            dialogHead: '',
            imageId: null,
            imageIndex: null,
            imageDelete: false,
            newImage: null,
            imagesAdd: [],
            deleteDialogImage: false,
        };
    },
    computed: {
        ...mapGetters('display', ['getFileTypes', 'getMedia', 'getLanguage']),
        language() {
            return this.getLanguage;
        },
        fileTypes() {
            return this.getFileTypes;
        },
        fileType() {
            return this.getMedia;
        },
        editImages() {
            return this.topicImage || [];
        },
    },
    created() {
        this.editImages.forEach(image => { image.isEdit = false; image.editClicked = false });
    },
    methods: {
        exit() {
            this.$emit('exit');
        },
        success(message) {
            this.icon = 'mdi mdi-check-circle-outline'
            this.message = message;
            this.dialogHead = 'Success'
            this.color = '#2E7D32'
            this.dialogTopic = true;
        },
        error(message) {
            this.color = '#BA1A1A';
            this.icon = 'mdi mdi-alert-outline'
            this.dialogHead = 'Error';
            this.message = message;
            this.dialogTopic = true;
        },
        async submitHeading() {
            let uid = this.commonId;
            const language = this.language;
            const data = {
                "topic": this.editTitle,
                "description": this.editDescription,
                "refURL": this.editUrl
            };
            const payload = {
                id: uid,
                lang: language,
                data: data
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
                try {
                    const response = await this.$store.dispatch('guide/updateTopic', payload);
                    if (response) {
                        this.subload = false;
                        let message = 'Updated successfully!';
                        this.success(message);
                        this.$emit('update');
                    }
                }
                catch (err) {
                    this.subload = false;
                    let message = err.message;
                    this.error(message);
                    console.error(err);
                }
            }
        },
        edit(id, index, name, ref) {
            this.imageIndex = index
            this.imageId = id;
            this.imgName = name;
            this.imgRef = ref;
            this.$refs.selectImage.click();
        },
        async handleImage(event) {
            const files = event.target.files[0];
            this.newImage = files;
            const formData = new FormData();
            formData.append('files', this.newImage);
            formData.append('imgName', this.imgName);
            formData.append('imgUrls', this.imgRef);
            if (this.newImage) {
                try {
                    this.editImages[this.imageIndex].isEdit = true;
                    let response = await this.$store.dispatch('guide/updateImage',
                        {
                            commonId: this.commonId,
                            data: formData,
                            id: this.imageId
                        });
                    if (response) {
                        this.editImages[this.imageIndex].isEdit = false;
                        let message = `Image updated successfully!`;
                        this.success(message);
                        this.$emit('update');
                        this.imageId = null
                        this.imageIndex = null
                    }
                }
                catch (error) {
                    this.editImages[this.imageIndex].isEdit = false;
                    let message = error.message;
                    this.error(message);
                }
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
            let formData = new FormData();
            try {
                let response;
                let payload;
                this.imageLoad = true;
                this.imagesAdd.forEach((image) => {
                    formData.append("files", image);
                    formData.append("imgName", ' ');
                    formData.append("imgUrls", ' ')
                });
                payload = {
                    commonId: this.commonId,
                    formData: formData
                };
                response = await this.$store.dispatch('guide/submitImage', payload);
                if (response) {
                    this.imageLoad = false;
                    this.imagesAdd = [];
                    let message = `Image added successfully!`;
                    this.success(message);
                    this.$emit('update');
                }
            }
            catch (error) {
                this.imageLoad = false;
                let message = error.message;
                this.error(message);
            }
        },
        async deleteImage() {
            this.imageDelete = true;
            let response;
            let message;
            try {
                response = await this.$store.dispatch('guide/deleteImage', {
                    id: this.editImages[0].commonId,
                    index: this.imageId
                });
                if ((response)) {
                    this.imageDelete = false;
                    this.deleteDialogImage = false;
                    message = `Image deleted successfully!`;
                    this.success(message);
                    this.$emit('update');
                    this.imageId = null
                    this.imageIndex = null
                }
            }
            catch (err) {
                this.imageDelete = false;
                message = err.message;
                this.error(message);
            }
        },
        async updateImgDetails(id, name, ref, image) {

            let message;
            this.editLoad = true;
            const payload = {
                commonId: this.commonId,
                id: id,
                name: name,
                ref: ref
            }
            try {
                const response = await this.$store.dispatch('guide/updateImageName', payload);
                if (response) {
                    image.editClicked = false;
                    message = `Updated details successfully!`;
                    this.success(message);
                    this.$emit('update');
                }
            } catch (error) {

                message = 'Error uploading images:' + error.message;
                this.error(message);
            }
        }
    },
};
</script>
<style scoped>
:deep(.select .v-input__details, .desc .v-input__details) {
    min-height: 10px;
}

:deep(.select .v-input__control) {
    width: 400px !important;
}

:deep(.desc .v-input__control) {
    width: 700px !important;
}

:deep(.guide .v-input__control) {
    width: 250px !important;
}

:deep(.v-input__details) {
    padding-top: 1px;
}

:deep(.v-input--outlined .v-input__control .guide .desc) {
    border-top: none;
    border-left: none;
    border-right: none;
    transition: border-color 0.2s ease-in-out;
}

:deep(.v-input--outlined.v-input--is-focused .v-input__control .guide .desc) {
    border-bottom-color: #48663f;
}
</style>