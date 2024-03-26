<template>
<div>
  <canvas id="myChart" style="width:700px"></canvas>
</div>
</template>

<script>

import { Bar} from 'vue-chartjs';
import Chart from 'chart.js/auto';
export default {
  
  extends: Bar,
  mounted() {
    // Reference the canvas element using $refs
   const ctx = document.getElementById('myChart');
    
    // Create the chart using Chart object
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '# of Votes',
          data: [50, 19, 3, 5, 2, 3],
          borderWidth: 1
        },
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
};
</script>