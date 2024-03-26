<template>
  <div class="d-flex">
    <v-card height="200" width="200" image="@/assets/pic1.jpg"></v-card>
  </div>
  <!-- <div class="d-flex justify-content-between ">
  <v-card
    class="me-5"
    max-width="500"
    hover
  >
    <BarChart/>
  </v-card>
<v-card
    class="m5-5"
    max-width="500"
    hover
  ><PieChart/>
</v-card>

  </div> -->

</template>

<script>
// import BarChart from './BarChart.vue'; 
// import PieChart from './PieChart.vue';
export default {
  // components: {
  //   BarChart, PieChart
  // },

};
</script>

<style scoped>
.card-style{
background-image: linear-gradient(45deg, rgb(58, 188, 117) 0%, rgb(58, 188, 117) 14%,rgb(61, 172, 114) 14%, rgb(61, 172, 114) 19%,rgb(65, 157, 111) 19%, rgb(65, 157, 111) 24%,rgb(68, 141, 108) 24%, rgb(68, 141, 108) 26%,rgb(72, 126, 104) 26%, rgb(72, 126, 104) 32%,rgb(75, 110, 101) 32%, rgb(75, 110, 101) 51%,rgb(79, 95, 98) 51%, rgb(79, 95, 98) 93%,rgb(82, 79, 95) 93%, rgb(82, 79, 95) 100%);
}

</style>