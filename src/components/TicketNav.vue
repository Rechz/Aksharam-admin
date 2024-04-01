<template>
  <div class="mb-5" style="width: 500px; display:inline-block; background-color:#FCFDF6;">
    <v-tabs v-model="tab" color="green-darken-4" grow>
      <v-tab v-for="item in items" :key="item" :value="item" @click="change(item)"
        style="text-transform: capitalize; color: #1A1C18;">
        {{ item }}
      </v-tab>
    </v-tabs>
  </div>
  <router-view></router-view>
</template>

<script>
export default {
  data() {
    return {
      tab: 'Details',
      items: ['Details', 'Price', 'Slots'],
    };
  },
  methods: {
    change(item) {
      if (item === 'Details') {
        this.$router.push('/tickets/details')
      }
      else if (item === 'Price') {
        this.$router.push('/tickets/price')
      }
      else {
        this.$router.push('/tickets/slots')
      }
    }
  }
};
</script>
