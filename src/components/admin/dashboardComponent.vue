<template>
    <div>
      <h1>Website Views per Day</h1>
      <canvas ref="lineChart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js/auto';
  
  export default {
    data() {
      return {
        chart: null,
        viewData: {
          labels: [], // Date labels
          data: [],   // View data
        },
      };
    },
    mounted() {
      // Simulated data (replace with your actual data)
      this.viewData.labels = ['2023-10-01', '2023-10-02', '2023-10-03', '2023-10-04'];
      this.viewData.data = [100, 200, 150, 300];
  
      this.createChart();
    },
    methods: {
      createChart() {
        const ctx = this.$refs.lineChart.getContext('2d');
        
        this.chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.viewData.labels,
            datasets: [
              {
                label: 'Views per Day',
                data: this.viewData.data,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MMM DD',
                  },
                },
              },
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Number of Views',
                },
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style>
  /* Add any custom CSS styles for your chart container here */
  </style>
  