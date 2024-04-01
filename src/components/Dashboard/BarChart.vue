<template>
  <div style="height: 370px; width: 700px;">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>

import { Bar } from 'vue-chartjs';
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
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [{
          label: '# of Votes',
          data: [50, 19, 43, 15, 20, 3, 50, 19, 33, 75, 22, 3],
          backgroundColor: [
            '#216D17'
          ],
          borderColor: [
            '#216D17'
          ],
          borderWidth: 1
        },
        ]
      },
      options: {
        x: {
          beginAtZero: true // Adjust the x-axis to start at 0
        },
        y: {
          beginAtZero: true // Adjust the y-axis to start at 0
        }
      },
      responsive: true,
      maintainAspectRatio: false

    });
  }
};
</script>