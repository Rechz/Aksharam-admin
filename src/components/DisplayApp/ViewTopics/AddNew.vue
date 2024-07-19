<template>
    <v-dialog width="600" max-width="600" v-model="dialogTopic">
        <v-card width="600" rounded="3">
            <v-card-title class="text-center text-white" :style="{ backgroundColor: color }">{{
                dialogHead }}</v-card-title>
            <v-card-text class="px-5 text-center">
                <v-icon size="88" :class="icon" :color="color"></v-icon>
                <h6>{{ message }}</h6>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="dialogTopic = !dialogTopic" :color="color">Okay</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <v-sheet class="mt-5 mb-3">
        <v-card-title class="text-center text-white d-flex justify-content-between px-4 fixed-top"
            style="background-color: #2C7721;"><v-icon size="24" color="white" @click="back">mdi-arrow-left</v-icon>
            <h5>Add {{ topic }} Topic </h5>
            <v-icon size="24" color="white" @click="exit">mdi-close</v-icon>
        </v-card-title>
        <v-card flat :disabled="!proceed && qrGenerated">
            <v-card-text class="px-5">
                <p class="text-danger fst-italic mt-1">**Please click generate after submitting the topic details. Do
                    not refresh the page to avoid data loss.</p>
                <v-form class="pt-0 " ref="form" @submit.prevent="submitHeading">
                    <div class="d-flex">
                        <v-card flat :disabled="!QRLoad" class="py-3 pt-2">
                            <!-- <v-select class="select mb-2" label='Select Language' density="comfortable"
                                :items="languages" v-model="selectedLanguage" :rules="languageRules"
                                item-title="talk" item-value="dtId" variant="outlined" disabled="true"></v-select> -->
                            <v-text-field v-model="selectedLanguage" label="Language" :disabled="true" width="400" variant="outlined" density="comfortable"></v-text-field>
                            <v-text-field v-model="title" :label="language == 1 ? 'തലക്കെട്ട്' : 'Heading'"
                                density="comfortable" class="select mb-2" :rules="titleRules"
                                variant="outlined"></v-text-field>
                            <v-textarea :label="language == 1 ? 'വിവരണം' : 'Description'" class="desc mb-2"
                                rows="6" v-model="description" variant="outlined"
                                counter></v-textarea>
                            <v-textarea :label="language == 1 ? 'റഫറൻസ്' : 'References'" density="comfortable"
                                class="reference desc" rows="2" v-model="url" variant="outlined"></v-textarea>
                        </v-card>
                    </div>
                    <div class="d-flex justify-content-end">
                        <div class="d-flex gap-2">
                            <v-btn v-if="QRLoad" color="#386568" class="text-capitalize" type="submit"
                                :disabled="subload" variant="elevated" :loading="subload">Add {{ topic }} topic</v-btn>
                            <v-btn v-else color="#386568" class="text-capitalize" variant="outlined"
                                rounded :disabled="QRLoad" :loading="QRLoading" @click="generateQR">Submit &
                                Proceed</v-btn>
                        </div>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-sheet>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    emits: ['back', 'exit', 'update'],
    props: ['id','languageId'],
    data() {
        return {
            qrGenerated: false,
            QRLoad: true,
            QRLoading: false,
            malSubmit: false,
            engSubmit: false,
            
            subload: false,
            
            
            title: null,
            titleRules: [v => !!v || '*Title is required'],
            description: null,
            
           
        
            url: null,
            
           
            message: '',
            loading: false,
            color: '',
            icon: '',
            dialogTopic: false,
            dialogHead: '',
            
        };
    },
    computed: {
        ...mapGetters('display', ['getLanguageList', 'getFileTypes', 'getMedia', 'getidmal', 'getideng', 'getmalHeading', 'getengHeading']),
        proceed() {
            if ((this.malSubmit) || (this.engSubmit)) {
                return false;
            } else return true;
        },
        topic() {
            if (this.language === 1) return 'Malayalam'
            else if (this.language === 2) return 'English'
            else return '';
        },
        languages() {
            return this.getLanguageList;
        },
        idmal() {
            return this.getidmal;
        },
        ideng() {
            return this.getideng;
        },
        malHeading() {
            return this.getmalHeading;
        },
        engHeading() {
            return this.getengHeading;
        },
        selectedLanguage() {
            if (this.languageId === 1) {
                const language = this.languages.find(language => language.dtId === 2);
                return language ? language.talk : null;
            } else {
                const language = this.languages.find(language => language.dtId === 1);
                return language ? language.talk : null;
            }
        },  
        language() {
            if (this.languageId === 1) {
                return 2;
            } else return 1;
        }
    },
    methods: {
        back() {
            this.$emit('back');
        },
        exit() {
            this.$emit('exit');
        },
        update() {
           this.$emit('update') 
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
            if (this.language == 2) {
                this.$store.commit('display/setIdmal', this.id)
            } else {
                this.$store.commit('display/setIdeng', this.id)
            }
            const { valid } = await this.$refs.form.validate()
            if (valid) {
                this.subload = true;
                const language = this.language;
                const data = {
                    "title": this.title,
                    "description": this.description,
                    "referenceURL": this.url
                }
                try {
                    const response = await this.$store.dispatch('display/submitHeading', {
                        language: language,
                        data: data
                    });
                    if (response) {
                        this.subload = false;
                        if (this.language == 1) {
                            this.malSubmit = true;
                            const lang = this.languages.find(lang => lang.dtId == this.language);
                            const message = `${this.malHeading} (${lang.talk}) added successfully!`;
                            this.success(message);
                            this.$refs.form.reset();
                        }
                        else {
                            this.engSubmit = true;
                            const lang = this.languages.find(lang => lang.dtId == this.language);
                            const message = `${this.engHeading} (${lang.talk}) added successfully!`;
                            this.success(message);
                            this.$refs.form.reset();
                        }
                    }
                }
                catch (err) {
                    this.subload = false;
                    const message = err.message;
                    this.error(message);
                    console.error(err);
                }
            }
        },
        async generateQR() {
            
            this.QRLoading = true;
            try {
                const response = await this.$store.dispatch('display/generateQR', {
                    idmal: this.idmal,
                    ideng: this.ideng
                });
                if (response) {
                    this.QRLoading = false;
                    this.qrGenerated = true;
                    this.QRLoad = true;
                    const message = 'QR code generated successfully.';
                    this.success(message);
                    this.update();
                    this.exit();
                }
            }
            catch (error) {
                this.QRLoad = false;
                this.QRLoading = false;
                this.imageSubmit = false;
                const message = 'Error uploading images:' + error.message;
                this.error(message);
            }
        },
    },
    watch: {
        proceed(newValue) {
            if (!newValue) {
                this.language = null;
                this.QRLoad = false;
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
::-webkit-scrollbar,
:deep(::-webkit-scrollbar) {
    width: 4px;
    height: auto;

}

::-webkit-scrollbar-track,
:deep(::-webkit-scrollbar-track) {
    background: #272B25;
}

::-webkit-scrollbar-thumb,
:deep(::-webkit-scrollbar-thumb) {
    background: #8D9387;
    border-radius: 30px;
}

::-webkit-scrollbar-thumb:hover,
:deep(::-webkit-scrollbar-thumb:hover) {
    background: #f5eded;
    cursor: pointer;
}
</style>