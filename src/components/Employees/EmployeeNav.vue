<template>
  <div style="margin-right: 2%; margin-left: 3%;">
    <div class="mb-3" style="width: 500px; display:inline-block; background-color:#FCFDF6;">
      <v-tabs v-model="tab" color="green-darken-4" grow>
        <v-tab v-for="item in items" :key="item" :value="item" @click="change(item)"
          style="text-transform: capitalize;">
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
        // tab: 'Add Employee',
        items: ['Add Employee', 'Scanner Register'],
      };
    },
    methods: {
    change(item){
      if (item === 'Add Employee'){
        this.$router.push({ name: 'employee-add' })
      }
      else {
        this.$router.push({name: 'scanner'})
      }
    }
    },
    computed: {
      tab: {
        get() {
          return this.$route.name === 'scanner' ? 'Scanner Register' : 'Add Employee';
        },
        set(value) {
          // Update route based on tab value
          if (value === 'Add Employee') {
            this.$router.push({ name: 'employee-add' });
          } else {
            this.$router.push({ name: 'scanner' });
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
  