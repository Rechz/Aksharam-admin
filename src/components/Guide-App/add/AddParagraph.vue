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
    <v-sheet>
        <v-card-title class="text-center text-white d-flex justify-content-between px-4 fixed-top"
            style="background-color: #2C7721;">
            <h5>Add Paragraphs</h5>
            <v-icon size="24" color="white" @click="back">mdi-close</v-icon>
        </v-card-title>
        <div ref="dialogContent"></div>
        <v-card flat :disabled="!proceed && qrGenerated">
            <v-card-text class="px-5 pt-5 mt-4">
                <p class="text-danger fst-italic mt-1">**Please submit Malayalam & English data before proceeding to
                    upload media. Do not refresh the page to avoid data loss.</p>
                <v-form class="pt-0 " ref="form" @submit.prevent="submitHeading">
                    <div class="d-flex">
                        <v-card flat :disabled="!QRLoad">
                            <v-select class="select mb-2" label='Select Language' density="comfortable"
                                :rules="languageRules" :items="languages" v-model="language" item-title="talk"
                                item-value="dtId" variant="outlined" :disabled="malSubmit || engSubmit"></v-select>
                            <v-text-field v-model="title" :label="language == 1 ? 'തലക്കെട്ട്' : 'Paragraph title'"
                                density="comfortable" class="select mb-2" variant="outlined"></v-text-field>
                            <v-textarea :label="language == 1 ? 'വിവരണം' : 'Paragraph Description'" class="desc mb-2"
                                rows="6" v-model="description" variant="outlined" counter></v-textarea>
                            <v-textarea :label="language == 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                class="reference desc" rows="2" v-model="url" variant="outlined" counter></v-textarea>
                        </v-card>
                        <div class="d-flex flex-column ">
                            <h6 class="text-success text-end fst-italic mb-0" v-if="malSubmit">*Malayalam added.</h6>
                            <h6 class="text-success text-end fst-italic mb-0" v-if="engSubmit">*English added.</h6>
                        </div>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div class="d-flex gap-2">
                            <v-btn v-if="QRLoad" color="#386568" class="text-capitalize" type="submit"
                                :disabled="subload" variant="outlined" rounded :loading="subload"
                                prepend-icon="mdi-plus">Add {{ topic }}</v-btn>
                            <v-btn v-else color="#386568" class="text-capitalize" variant="elevated" rounded
                                :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit & Proceed</v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
        <v-divider class="mx-5"></v-divider>
        <v-card flat class="px-5" :disabled="!qrGenerated">
            <v-card-title class="bg-blue-grey-lighten-5 mb-3">Paragraph Images</v-card-title>
            <v-card-text class="">
                <input type="file" ref="imageFile" multiple @change="handleFileUpload" class="d-none" accept="image/*">
                <v-btn @click="triggerImageInput" color="blue-grey-darken-4" variant="outlined" size="small"
                    class="text-capitalize">Choose Images</v-btn>
                <template v-if="imgPreview.length === 0">
                    <label for="imageBg" class="ms-2">No images chosen.</label>
                </template>
                <!-- <template v-else>
                    <div class="mt-2">
                        <v-chip v-for="file in images" :key="file.name" closable @click:close="removeImage(file)"
                            class="me-2 mb-1">{{ file.name }} </v-chip>
                    </div>
                </template> -->
                <div class="d-flex gap-2 flex-wrap mt-3" v-if="imgPreview.length > 0">
                    <v-card v-for="image in imgPreview" :key="image.url" elevation="4" class="p-3">
                        <v-chip closable @click:close="removeImage(image.file)" class="my-1">{{ image.file.name
                            }}</v-chip>
                        <v-img :src="image.url" alt="Uploaded Image" width="400" height="200" cover></v-img>
                        <div class="mt-3 pb-4">
                            <v-text-field v-model="image.name" variant="outlined" density="compact" label="Name"
                                hide-details counter></v-text-field>
                            <v-textarea v-model="image.ref" variant="outlined" density="compact" label="Reference"
                                class="mt-2" hide-details counter>{{ image.ref }}</v-textarea>
                        </div>
                    </v-card>
                </div>
            </v-card-text>
            <div class="d-flex justify-content-end gap-3 my-2 w-100">
                <v-btn @click="uploadImages" color="#386568" variant="outlined" rounded :disabled="imageLoad"
                    :loading="imageLoad" prepend-icon="mdi-upload" class="text-capitalize">Upload Images</v-btn>
            </div>
            <div>
                <h6 class="text-success text-start fst-italic mb-0" v-if="imageSubmit">*Image successfully uploaded.
                </h6>
            </div>
        </v-card>
        <div class="my-5 d-flex justify-content-end align-items-center gap-2 px-5">
            <v-btn color="#2C7721" variant="elevated" prepend-icon="mdi-arrow-left" @click="back">Back</v-btn>
            <v-btn color="#2C7721" variant="elevated" prepend-icon="mdi-plus" @click="finish">Add New</v-btn>
        </div>
    </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    emits: ['exit','updatePara'],
    props: ['idmal', 'ideng'],
    data() {
        return {
            qrGenerated: false,
            QRLoad: true,
            QRLoading: false,
            malSubmit: false,
            engSubmit: false,
            imageSubmit: false,
            videoSubmit: false,
            audioEngSubmit: false,
            audioMalSubmit: false,
            subload: false,
            imageLoad: false,
            videoLoad: false,
            audioLoad: false,
            images: [],
            imgPreview: [],
            title: null,
            description: null,
            language: null,
            languageAV: null,
            languageRules: [v => !!v || '*Language is required'],
            url: null,
            audioFiles: [],
            videoFiles: [],
            message: '',
            loading: false,
            color: '',
            icon: '',
            dialogTopic: false,
            dialogHead: '',
            bgFile: [],
            imageBg: null,
            bgLoad: false,
            bgSubmit: false
        };
    },
    computed: {
        ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia']),
        ...mapGetters('guide', ['getparaidmal', 'getparaideng', 'getCommonIdPara', 'getmalParaHeading', 'getengParaHeading']),
        proceed() {
            if ((this.malSubmit) && (this.engSubmit)) {
                return false;
            } else return true;
        },
        topic() {
            if (this.language == 1) return 'Malayalam'
            else if (this.language == 2) return 'English'
            else return '';
        },
        languages() {
            return this.getLanguageList;
        },
        fileTypes() {
            return this.getFileTypes;
        },
        fileType() {
            return this.getMedia;
        },
        subidmal() {
            return this.getparaidmal;
        },
        subideng() {
            return this.getparaideng;
        },
        commonId() {
            return this.getCommonIdPara;
        },
        malSubHeading() {
            return this.getmalParaHeading;
        },
        engSubHeading() {
            return this.getengParaHeading;
        }
    },
    methods: {
        exit() {
            this.$emit('exit');
        },
        update() {
            this.$emit('updatePara');
        },
        back() {
            this.finish();
            this.update();
            this.exit();
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
            let uid = this.language == 1 ? this.idmal : this.ideng;
            const language = this.language;
            const data = {
                "topic": this.title,
                "description": this.description,
                "refURL": this.url
            };
            const payload = {
                uid: uid,
                lang: language,
                data: data
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
                try {
                    const response = await this.$store.dispatch('guide/submitParagraph', payload);
                    if (response) {
                        this.subload = false;
                        let language = this.languages.find(lang => lang.dtId == this.language);
                        let message;
                        if (this.language == 1) {
                            message = `${language.talk} paragraph added successfully!`;
                            this.success(message);
                            this.malSubmit = true;
                            this.$refs.form.reset();
                            this.language = 2;
                        }
                        else {
                            message = `${language.talk} paragraph added successfully!`;
                            this.success(message);
                            this.engSubmit = true;
                            this.$refs.form.reset();
                            this.language = 1;
                        }
                        this.update();
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
        async generateQR() {
            let message;
            this.QRLoading = true;
            const payload = {
                ideng: this.subideng,
                idmal: this.subidmal
            }
            try {
                const response = await this.$store.dispatch('guide/generateCommonIdPara', payload);
                if (response) {
                    this.QRLoading = false;
                    message = 'Proceed to next steps.';
                    this.qrGenerated = true;
                    this.QRLoad = true;
                    this.success(message);
                    this.update();
                }
            }
            catch (error) {
                this.QRLoad = false;
                this.QRLoading = false;
                this.imageSubmit = false;
                message = 'Error:' + error.message;
                this.error(message);
            }
        },
        
        triggerImageInput() {
            this.$refs.imageFile.click();
        },
        handleFileUpload(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                reader.onload = () => {
                    this.images.push(file);
                    this.imgPreview.push({ url: reader.result, file, name: '', ref: '' });
                };
                reader.readAsDataURL(file);
            }
        },
        removeImage(image) {
            // const imgIndex = this.images.findIndex(img => img === image);
            // if (imgIndex !== -1) {
            //     this.imgPreview.splice(imgIndex, 1);
            //     this.images.splice(imgIndex, 1);
            // }
            const imgIndex = this.imgPreview.findIndex(img => img.file === image);
            if (imgIndex !== -1) {
                this.imgPreview.splice(imgIndex, 1);
                // this.images.splice(imgIndex, 1);
            }
        },
        async uploadImages() {
            let message;
            this.imageLoad = true;
            const formData = new FormData();
            this.imgPreview.forEach((image) => {
                formData.append("files", image.file);
                formData.append("imgName", image.name);
                formData.append("imgUrls", image.ref)
            });
            const payload = {
              commonId: this.commonId,
              formData: formData
            }
            try {
                const response = await this.$store.dispatch('guide/submitImage', payload);
                if (response) {
                    this.imageLoad = false;
                    this.imageSubmit = true;
                    message = 'Image uploaded successfully';
                    this.success(message);
                    this.images = [];
                    this.imgPreview = [];
                    this.$refs.imageFile.value = '';
                    this.update();
                }
            } catch (error) {
                this.imageLoad = false;
                this.imageSubmit = false;
                message = 'Error uploading images:' + error.message;
                this.error(message);
            }
        },
        
        finish() {
            this.$store.commit('guide/setMalParaHeading', '');
            this.$store.commit('guide/setEngParaHeading', '');
            this.$store.commit('guide/setParaidmal', '');
            this.$store.commit('guide/setParaideng', '');
            this.subhead = false;
            this.language = null;
            this.malSubmit = false;
            this.engSubmit = false;
            this.imageSubmit = false;
            this.qrGenerated = false;
            this.images = [];
            this.imgPreview = [];
            // this.$emit('add')
            this.$refs.dialogContent.scrollIntoView({ behavior: 'smooth' });
        },
    },
    watch: {
        proceed(newValue) {
            if (!newValue) {
                this.language = null;
                this.QRLoad = false;
            }
        },
        audioCheck(newValue) {
            if (newValue) {
                this.languageAV = null;
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