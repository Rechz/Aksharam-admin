<template>
  <div style="margin-right: 2%; margin-left: 3%;">
    <div class="mb-4" style="width: 500px; display:inline-block; background-color:#FCFDF6;">
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
      items: ['Details', 'Price', 'Slots'],
    };
  },
  methods: {
    change(item) {
      if (item === 'Details') {
        this.$router.push('/admin/tickets/details')
      }
      else if (item === 'Price') {
        this.$router.push('/admin/tickets/price')
      }
      else {
        this.$router.push('/admin/tickets/slots')
      }
    }
  },
  computed: {
    tab: {
      get() {
        if ((this.$route.path === '/admin/tickets/slots')) {
          return 'Slots';
        }
        else if (this.$route.path === '/admin/tickets/price') {
          return 'Price';
        }
        else {
          return 'Details';
        }
      },
      set(value) {
        if (value === 'Details') {
          this.$router.push('/admin/tickets/details')
        }
        else if (value === 'Price') {
          this.$router.push('/admin/tickets/price')
        }
        else {
          this.$router.push('/admin/tickets/slots')
        }
      }
    }
  },
};
</script>
