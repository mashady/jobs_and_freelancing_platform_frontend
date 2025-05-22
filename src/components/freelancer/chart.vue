<template>
  <div class="p-2 rounded-2" style="background-color: white">
    <Line
      id="chartId"
      :options="chartOptions"
      :data="chartData"
    />
  </div>
</template>
  
<script setup>
  import { Line } from 'vue-chartjs'
  import { 
    Chart as ChartJS, 
    Title, 
    Tooltip, 
    Legend, 
    LineElement, 
    CategoryScale, 
    LinearScale,
    PointElement // Required for line chart points
  } from 'chart.js'
  
  // Register ChartJS components
  ChartJS.register(
    Title, 
    Tooltip, 
    Legend, 
    LineElement, 
    CategoryScale, 
    LinearScale,
    PointElement
  )
  
  const chartData = {
    labels: ['January', 'February', 'March'],
    datasets: [{ 
      label: 'Monthly Data',
      data: [40, 20, 12],
      borderColor: '#4e73df', // Line color
      backgroundColor: 'rgba(78, 115, 223, 0.05)', // Area under line color
      tension: 0.3, // Makes the line slightly curved
      fill: true, // Fills area under the line
      pointBackgroundColor: '#4e73df', // Point color
      pointBorderColor: '#fff', // Point border color
      pointRadius: 5, // Point size
      pointHoverRadius: 7 // Point size on hover
    }]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false
      },
      legend: {
        display: true, // Show legend for line chart
        position: 'top',
        labels: {
          color: '#000',
          boxWidth: 12,
          padding: 20
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#000'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: '#000'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      }
    }
  }
</script>