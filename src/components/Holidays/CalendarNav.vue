<template>
    <div style="margin-right: 2%; margin-left: 3%;">
        <div class="mb-3" style="width: 500px; display:inline-block; background-color:#FCFDF6;">
            <v-tabs v-model="tab" color="green-darken-4" grow>
                <v-tab v-for="item in items" :key="item" :value="item" @click="change(item)"
                    style="text-transform: capitalize; color: #1A1C18;">
                    {{ item }}
                </v-tab>
            </v-tabs>
        </div>
        <router-view></router-view>
    </div>

</template>

<script>
export default {
    data() {
        return {
            // tab: 'Details',
            items: ['Add Holiday', 'View Holiday'],
        };
    },
    methods: {
        change(item) {
            if (item === 'Add Holiday') {
                this.$router.push({ name: 'holiday-add' })
            }
            else {
                this.$router.push({ name: 'holiday-view' })
            }
            
        }
    },
    computed: {
        tab: {
            get() {
                if ((this.$route.name === 'holiday-view')) {
                    return 'View Holiday';
                }
                else {
                    return 'Add Holiday';
                }
            },
            set(value) {
                if (value === 'View Holiday') {
                    this.$router.push({ name: 'holiday-view' })
                }
                else {
                    this.$router.push({ name: 'holiday-add' })
                }
            }
        },
    }
};
</script>
