<template>
  <div class="mb-2" style="width: 500px; display:inline-block; background-color:#f9faf1;">
    <v-tabs v-model="tab" color="green-darken-4" grow>
      <v-tab v-for="item in items" :key="item" :value="item" @click="change(item)" style="text-transform: capitalize;">
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
        tab: 'Add Employee',
        items: ['Add Employee', 'Scanner Register'],
      };
    },
    methods: {
    change(item){
      if (item === 'Add Employee'){
        this.$router.push('/employee/add')
      }
      else {
        this.$router.push('/employee/scanner')
      }
    }
  } 
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
  