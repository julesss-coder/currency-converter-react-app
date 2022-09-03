import React from 'react';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

class CurrencyChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  //   // x axis
  //   const labels = [
  //     // dates
  //     // pass down to currencyChart as props from CurrencyConverter
  //   ];

  //   const data = {
  //     labels: labels,
  //     datasets: [{
  //       label: 'My First dataset',
  //       backgroundColor: 'rgb(255, 99, 132)',
  //       borderColor: 'rgb(255, 99, 132)',
  //       data: [0, 10, 5, 2, 20, 30, 45],
  //     }]
  //   };

  //   const config = {
  //     type: 'line',
  //     data: data,
  //     options: {}
  //   };

  //   const myChart = new Chart(
  //     document.getElementById('myChart'),
  //     config
  //   );
    
    return (
      <div>
        <canvas id="currency-chart">Currency Chart</canvas>
      </div>
    )
  }
}

export default CurrencyChart;