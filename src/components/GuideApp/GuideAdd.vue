<template>
    <div>
        <!-- Progress Linear -->
        <!-- <v-progress-linear v-if="showProgressLinear" :value="(step / items.length) * 100" color="primary"></v-progress-linear> -->
        <!-- Stepper -->
        <v-stepper hide-actions v-model="step" :items="items" show-actions v-if="showStepper">
            <template v-slot:item="{ item }">
                <span>{{ item }}</span>
                <component :is="getStepComponent(step)" @proceed="nextStep"></component>
            </template>
        </v-stepper>
        
        <!-- Button actions -->
        <v-btn v-if="step !== 1" @click="prevStep" color="primary">Back</v-btn>
        <v-btn v-if="step !== items.length" @click="nextStep" color="primary">Next</v-btn>
        <v-btn v-if="step === items.length" @click="submitOrder" color="primary">Confirm Order</v-btn>
    </div>
</template>


<script>
import DummyCard from './DummyCard.vue';
import GuideSub from './GuideSub.vue';

export default {
    components: {
        DummyCard,
        GuideSub
    },
    data() {
        return {
            step: 1,
            items: ['Add Introduction', 'Add Sub Details'],
            showProgressLinear: true,
            showStepper: true
        };
    },
    methods: {
        nextStep() {
            this.step++;
        },
        prevStep() {
            this.step--;
        },
        getStepComponent(step) {
            if (step === 1) {
                return 'DummyCard';
            } else if (step === 2) {
                return 'GuideSub';
            } else {
                return ''; 
            }
        }
    }
};
</script>


<style scoped>
:deep(.v-stepper-header) {
    box-shadow: 0px 0px 0px 0px !important;
}
</style>