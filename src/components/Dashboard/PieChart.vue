<!-- PieChart.vue -->
<template>
    <div>
        <canvas id="pieChartCanvas"></canvas>
    </div>
</template>

<script>
    import { Pie} from 'vue-chartjs';
import Chart from 'chart.js/auto';
    export default {
        extends: Pie,
        mounted() {
            const ctx = document.getElementById('pieChartCanvas');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: ['Red', 'Blue', 'Yellow'],
                    datasets: [{
                        data: [10, 20, 30],
                        backgroundColor: ['red', 'blue', 'yellow']
                    }]
                }
            });
        }
    };
</script>