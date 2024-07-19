<template>
  <v-app>
    <router-view></router-view>
  </v-app>
  
</template>

<script>


export default {
  name: 'App',
  data() {
    return {
      currentDay: '',
      currentMonth: '',
      currentYear: '',
    };
  },
  
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
created() {
const today = new Date();
this.currentDay = String(today.getDate()).padStart(2, '0');
this.currentMonth = String(today.getMonth() + 1).padStart(2, '0');
this.currentYear = today.getFullYear();
this.fetchBarChart();
this.fetchBarChartTickets();
this.fetchPieChart();
},
methods: {
async fetchPieChart() {
const formattedDate = `${this.currentYear}-${this.currentMonth}-${this.currentDay}`;
await this.$store.dispatch('fetchPieChartDate', formattedDate)
},
async fetchBarChart() {
await this.$store.dispatch('totalIncomeBarGraph', this.currentYear)
},
async fetchBarChartTickets() {
await this.$store.dispatch('totalTicketsBarGraph', this.currentYear)
}
},