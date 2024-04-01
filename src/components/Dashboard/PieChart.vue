<!-- PieChart.vue -->
<template>
    <div style="height: auto; width: 300px;">
        <canvas id="pieChartCanvas"></canvas>
    </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import Chart from 'chart.js/auto';
export default {
    extends: Pie,
    mounted() {
        const ctx = document.getElementById('pieChartCanvas');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Foreigner', 'Institution', 'Public'],
                datasets: [{
                    data: [10, 20, 30],
                    backgroundColor: ['#BCEBEE', '#D7E8CD', '#A5F790']
                }]
            },
            options: {
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }

            }

        });
    }
};
</script>