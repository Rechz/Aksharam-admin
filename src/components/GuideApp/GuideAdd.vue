<template>
    <div>
        <!-- Progress Linear -->
        <v-progress-linear v-if="showProgressLinear" :value="(step / items.length) * 100" color="primary"
            height="10"></v-progress-linear>

        <!-- Stepper -->
        <v-stepper v-model="step" :items="items" show-actions v-if="showStepper">
            <template v-slot:item="{ item}">
                <span>{{ item }}</span>
            </template>
        </v-stepper>

        <!-- Button actions -->
        <v-btn v-if="step !== 1" @click="prevStep" color="primary">
            Back
        </v-btn>
        <v-btn v-if="step !== items.length" @click="nextStep" color="primary">
            Next
        </v-btn>
        <v-btn v-if="step === items.length" @click="submitOrder" color="primary">
            Confirm Order
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            step: 1,
            items: ['Step 1', 'Step 2', 'Step 3'],
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
        submitOrder() {
            // Logic to submit the order
        }
    }
};
</script>
