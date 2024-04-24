<template>
  <div style="height: 370px; width: 700px;">
    <canvas id="myChart"></canvas>
  </div>
</template>

<script>

import { Bar} from 'vue-chartjs';
import Chart from 'chart.js/auto';
export default {
  props: ['labels','data','data2'],
  extends: Bar,
  mounted() {
    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: 'Total Income',
          data: this.data,
          backgroundColor: [
            '#216D17'
          ],
          borderColor: [
            '#216D17'
          ],
          borderWidth: 1
        },
          {
            label: 'Total Bookings',
            data: this.data2,
            backgroundColor: '#A5F790',
            borderColor: '#A5F790',
            borderWidth: 1
          }
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