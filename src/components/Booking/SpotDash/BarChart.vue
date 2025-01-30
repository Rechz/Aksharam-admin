<template>
  <div style="height: 370px; width: 700px;">
    <canvas id="myChart" ref="barChartCanvas"></canvas>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import Chart from "chart.js/auto";

export default {
  props: ["labels", "data", "data2"],
  extends: Bar,
  methods: {
    renderChart() {
      if (this._chart) {
        this._chart.destroy(); // Destroy the existing chart instance to avoid overlaps
      }
      const ctx = this.$refs.barChartCanvas.getContext("2d");
      this._chart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: "Total Income",
              data: this.data,
              backgroundColor: "#216D17",
              borderColor: "#216D17",
              borderWidth: 1,
            },
            {
              label: "Total Bookings",
              data: this.data2,
              backgroundColor: "#A5F790",
              borderColor: "#A5F790",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              beginAtZero: true, // Adjust the x-axis to start at 0
            },
            y: {
              beginAtZero: true, // Adjust the y-axis to start at 0
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function (context) {
                  let label = context.dataset.label || "";
                  if (label) {
                    label += ": ";
                  }
                  if (
                    context.datasetIndex === 1 &&
                    context.parsed.y !== null
                  ) {
                    label += (context.parsed.y / 100).toFixed(2); // Divide by 100 and format to 2 decimal places
                  } else {
                    label += context.parsed.y.toFixed(2); // Format y-value to 2 decimal places
                  }
                  return label;
                },
              },
            },
          },
        },
      });
    },
  },
  mounted() {
    this.renderChart(); // Initialize the chart when the component is mounted
  },
  watch: {
        data: {
            handler() {
                this.renderChart();
            },
            deep: true
        }
    },
};
</script>
