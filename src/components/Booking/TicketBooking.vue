<template>
  <v-main>
    <v-container class="" fluid>
      <div style="margin-right: 2%; margin-left: 3%;">
        <div class="" style="width: 500px; display:inline-block; background-color:#FCFDF6;">
          <v-tabs v-model="tab" color="green-darken-4" grow>
            <v-tab v-for="item in items" :key="item" :value="item" @click="change(item)"
              style="text-transform: capitalize;">
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
        // tab: 'Add Employee',
        items: ['Spot Overview', 'Tickets'],
      };
    },
    methods: {
    change(item){
      if (item === 'Spot Overview'){
        this.$router.push({ name: 'spot-dashboard' })
      }
      else {
        this.$router.push({name: 'spot-ticket-nav'})
      }
    }
    },
    computed: {
      tab: {
        get() {
          return this.$route.name === 'spot-ticket-nav' ? 'Tickets' : 'Spot Overview';
        },
        set(value) {
          // Update route based on tab value
          if (value === 'Spot Overview') {
            this.$router.push({ name: 'spot-dashboard' });
          } else {
            this.$router.push({ name: 'spot-ticket-nav' });
          }
        }
      }
    }, 
  };
  </script>
  
  <style>
  /* Helper classes */
  .bg-basil {
    background-color: #FFFBE6 !important;
  }
  .text-basil {
    color: #356859 !important;
  }
  </style>
  