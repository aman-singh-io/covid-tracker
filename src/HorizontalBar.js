import React from 'react'
import { Bar } from 'react-chartjs-2'

const options = {
  indexAxis: 'y',
  // Elements options apply to all of the options unless overridden in a dataset
  // In this case, we are setting the border of each horizontal bar to be 2px wide
  legend: {
    display: false,
  },
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
  },
}

const HorizontalBarChart = ({ totalCases, totalDeaths, totalRecovered }) => (
  <div style={{ padding: '50px' }}>
    <div className='header'>
      <h2 className='title' style={{ marginBottom: '2rem' }}>
        Total Cases Globally
      </h2>
    </div>
    <Bar
      data={{
        labels: ['Cases', 'Recovered', 'Deaths'],
        datasets: [
          {
            data: [totalCases, totalRecovered, totalDeaths],
            backgroundColor: [
              'rgba(29, 44, 77, 0.5)',
              'rgba(125, 215, 29, 0.5)',
              'rgba(204, 16, 52, 0.5)',
            ],
            borderColor: ['#1d2c4d', '#7dd71d', '#CC1034'],
            borderWidth: 1,
          },
        ],
      }}
      options={options}
    />
  </div>
)

export default HorizontalBarChart
