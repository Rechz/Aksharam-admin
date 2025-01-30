<template>
  <v-main>
    <v-container class="py-8 px-6" fluid>
      <div style="margin-right: 2%; margin-left: 3%;">
        <div class="" style="width: 500px; display:inline-block; background-color:#FCFDF6;">
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
      items: ['Details', 'Price', 'Slots','Discount'],
    };
  },
  methods: {
    change(item) {
      if (item === 'Details') {
        this.$router.push({ name: 'spot-ticket-details' })
      }
      else if (item === 'Price') {
        this.$router.push({ name: 'spot-ticket-price' })
      }
      else if(item === 'Slots'){
        this.$router.push({ name: 'spot-ticket-slots' })
      }
      else{
        this.$router.push({ name: 'spot-ticket-discount' })
      }
    }
  },
  computed: {
    tab: {
      get() {
        if ((this.$route.name === 'spot-ticket-slots')) {
          return 'Slots';
        }
        else if (this.$route.name === 'spot-ticket-price') {
          return 'Price';
        }
        else if (this.$route.name === 'spot-ticket-details'){
          return 'Details';
        }
        else{
          return 'Discount'
        }
      },
      set(value) {
        if (value === 'Details') {
          this.$router.push({ name: 'spot-ticket-details' })
        }
        else if (value === 'Price') {
          this.$router.push({ name: 'spot-ticket-price' })
        }
        else if (value === 'Slots'){
          this.$router.push({name: 'spot-ticket-slots'})
        }
        else{
          this.$router.push({name: 'spot-ticket-discount'})
        }
      }
    }
  },
};
</script>
