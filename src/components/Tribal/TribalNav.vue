<template>
    <v-main>
        <v-container class="py-8 px-6" fluid>
            <div style="margin-right: 2%; margin-left: 3%;">
                <div style="width: 500px; display:inline-block; background-color:#FCFDF6;">
                    <v-tabs v-model="tab" color="green-darken-4" grow>
                        <v-tab v-for="item in items" :key="item" :value="item" @click="change(item)"
                            style="text-transform: capitalize; color: #1A1C18;">
                            {{ item }}
                        </v-tab>
                    </v-tabs>
                </div>
                <router-view></router-view>
            </div>
        </v-container>
    </v-main>
</template>

<script>
export default {
    data() {
        return {
            // tab: 'Details',
            items: ['Add Topics', 'Topic Details'],
        };
    },
    methods: {
        change(item) {
            if (item === 'Add Topics') {
                this.$router.push({ name: 'tribal-add' })
            }
            else {
                this.$router.push({ name: 'tribal-view' })
            }

        }
    },
    computed: {
        tab: {
            get() {
                if ((this.$route.name === 'tribal-view')) {
                    return 'Topic Details';
                }
                else {
                    return 'Add Topics';
                }
            },
            set(value) {
                if (value === 'Topic Details') {
                    this.$router.push({ name: 'tribal-view' })
                }
                else {
                    this.$router.push({ name: 'tribal-add' })
                }
            }
        },
    }
};
</script>
