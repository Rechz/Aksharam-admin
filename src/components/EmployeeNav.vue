<template>
    <v-card color="basil">
    <v-tabs v-model="tab"   bg-color="green-lighten-5" grow>
        <v-tab v-for="item in items" :key="item" :value="item">
          {{ item }}
        </v-tab>
      </v-tabs>
  
      <v-window v-model="tab">
        <v-window-item v-for="item in items" :key="item" :value="item">
          <v-card color="basil" flat v-if="item === 'Add Employee'">
            <EmployeePage/>
          </v-card>
          <v-card color="basil" flat v-else>
            <!-- ScannerRegister component goes here -->
            <ScannerRegister/>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
  </template>
  
  <script>
  import EmployeePage from './EmployeePage.vue';
  import ScannerRegister from './ScannerRegister.vue';
  
  export default {
    components: {
      EmployeePage,
       ScannerRegister
    },
  
    data() {
      return {
        tab: 'Add Employee',
        items: ['Add Employee', 'Scanner Register'],
      };
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
  