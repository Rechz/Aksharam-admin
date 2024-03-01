<template>
    <v-card >
      <v-tabs
        v-model="tab"
        bg-color="#F9FBE7"
        color="green-darken-4"
        grow
      >
        <v-tab
          v-for="item in items"
          :key="item"
          :value="item"
        >
          {{ item }}
        </v-tab>
      </v-tabs>
  
      <v-window v-model="tab" class="mt-4">
        <v-window-item v-for="item in items" :key="item" :value="item">
        <v-card  flat v-if="item === 'Details'">
          <TicketPage/>
        </v-card>
        <v-card  flat v-else-if="item === 'Price'">
          <TicketPrice/>
        </v-card>
        <v-card  flat v-else-if="item === 'Slots'">
          <TicketSlots/>
        </v-card>
      </v-window-item>
      </v-window>
    </v-card>
  </template>
  <script>
  import TicketPage from './TicketPage.vue';
  import TicketPrice from './TicketPrice.vue';
  import TicketSlots from './TicketSlots.vue'
    export default {
      data () {
        return {
            tab: 'Details',
            items: ['Details', 'Price', 'Slots'],
        }
      },
      components : { TicketPage, TicketPrice, TicketSlots}
    }
  </script>
  <style>
  /* Helper classes */
  /* .bg-basil {
    background-color: #FFFBE6 !important;
  }
  .text-basil {
    color: #356859 !important;
  } */
  </style>