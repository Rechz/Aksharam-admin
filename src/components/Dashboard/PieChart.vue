<template>
    <div style="height: auto; width: 300px;">
        <canvas ref="pieChartCanvas"></canvas>
    </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import Chart from 'chart.js/auto';

export default {
    props: ['data', 'labels'],
    extends: Pie,
    mounted() {
        this.renderChart();
    },
    watch: {
        data: {
            handler() {
                this.renderChart();
            },
            deep: true
        }
    },
    methods: {
        renderChart() {
            if (this._chart) {
                this._chart.destroy(); // Destroy the existing chart instance
            }
            this.renderChartMethod();
        },
        renderChartMethod() {
            const ctx = this.$refs.pieChartCanvas.getContext('2d');
            this._chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: this.labels,
                    datasets: [{
                        data: this.data,
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
    }
};
</script>