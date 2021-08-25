import React from 'react'
import { Pie } from 'react-chartjs-2'

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 1,
    },
  ],
}

const PieChart = ({ totalCases, totalDeaths, totalRecovered }) => (
  <>
    {console.log(totalCases)}
    <div className='header'>
      <h3 className='title' style={{ marginTop: '2rem' }}>
        Worldwide Data
      </h3>
    </div>
    <Pie
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
    />
  </>
)

export default PieChart
