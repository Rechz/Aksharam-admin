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
            items: ['Add Topics', 'Topic Details','User Details'],
        };
    },
    methods: {
        change(item) {
            if (item === 'Add Topics') {
                this.$router.push({ name: 'guide-add-main' })
            }
            else if(item === 'Topic Details'){
                this.$router.push({ name: 'guide-view' })
            }
            else {
                this.$router.push({ name: 'guide-user-view' })
            }

        }
    },
    computed: {
        tab: {
            get() {
                if ((this.$route.name === 'guide-view')) {
                    return 'Topic Details';
                }
                else if(this.$route.name === 'guide-add-main'){
                    return 'Add Topics';
                }
                else {
                    return 'User Details';
                }
            },
            set(value) {
                if (value === 'Topic Details') {
                    this.$router.push({ name: 'guide-view' })
                }
                else if(value === 'Add Topics'){
                    this.$router.push({ name: 'guide-add-main' })
                }
                else {
                    this.$router.push({name: 'guide-user-view'})
                }
            }
        },
    }
};
</script>
