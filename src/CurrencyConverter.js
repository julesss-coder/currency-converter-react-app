import React from 'react';
import Chart from 'chart.js/auto';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      allCurrencies: [],
      baseCurrency: {},
      currentPair: {
        baseOfPair: 'EUR',
        amountBaseOfPair: 1,
        pairedCurrency: 'USD',
        amountPairedCurrency: 0, 
      }
    }

    this.chartRef = React.createRef();

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.getHistoricalRates = this.getHistoricalRates.bind(this);
    this.buildChart = this.buildChart.bind(this);
  }

 
  componentDidMount() {
    // Get list of all available currencies and add them to state
    fetch('https://api.frankfurter.app/currencies')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      this.setState({allCurrencies: data});
      this.getHistoricalRates(baseOfPair, pairedCurrency);
    }).catch(error => {
      console.log(error);
    });
    
    // Get exchange rate for default base currency EUR and add them to state
    fetch('https://api.frankfurter.app/latest')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      this.setState({
        baseCurrency: data,
      });
    }).catch(error => {
      console.log(error);
    });
    
    let { baseOfPair, pairedCurrency } = this.state.currentPair;

  }

  // ********* HANDLE CURRENCY CHANGE *****************
  handleCurrencyChange(e) {
    e.preventDefault();
    let newCurrency = e.target.text.substring(0,3);

    // If user changes currency in top input field:
    if (e.target.closest('ul').classList.contains('currency-picker-1')) {
      fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
  
        throw new Error('Request was either a 404 or 500');
      }).then(data => {
        this.setState(() => ({
          baseCurrency: data,
          currentPair: {
            ...this.state.currentPair,
            baseOfPair: newCurrency,
          }
        }));
        
        if (newCurrency !== this.state.currentPair.pairedCurrency) {
          this.getHistoricalRates(newCurrency, this.state.currentPair.pairedCurrency);
        } else {
          this.chart.destroy();
        }
      }).catch(error => {
        console.log(error);
      });


    // Else if user changes currency in bottom input field:
    } else if (e.target.closest('ul').classList.contains('currency-picker-2')) {
      this.setState(() => ({
        currentPair: {
          ...this.state.currentPair,
          pairedCurrency: newCurrency,
        }
      }));

      if (this.state.currentPair.baseOfPair !== newCurrency) {
        this.getHistoricalRates(this.state.currentPair.baseOfPair, newCurrency);
      } else {
        this.chart.destroy();
      }
    }
  } 

  // ********** HANDLE AMOUNT CHANGE *************
  handleAmountChange(e) {
    // e.preventDefault(); ??
    let { baseOfPair, amountBaseOfPair, pairedCurrency, amountPairedCurrency } = this.state.currentPair;
    let { amount, base, date, rates } = this.state.baseCurrency;
    if (isNaN(e.target.value)) {
      return;
    }
    let newAmount = +e.target.value;
    
    // On amount change in first input field:
      if (e.target.classList.contains('amount-input-1')) {
        let newAmountPairedCurrency = newAmount * rates[pairedCurrency];
        this.setState({
          currentPair: {
            ...this.state.currentPair,
            amountBaseOfPair: newAmount,
            amountPairedCurrency: newAmountPairedCurrency,
          }
        });
        
    // On amount change in second input field:
    } else if (e.target.classList.contains('amount-input-2')) {
      let newAmountBaseOfPair = (1 / rates[pairedCurrency]) * newAmount;

      this.setState({
        currentPair: {
          ...this.state.currentPair,
          amountPairedCurrency: newAmount,
          amountBaseOfPair: newAmountBaseOfPair,
        }
      });
    }
  }


  // ******* GET HISTORICAL RATES***********
  getHistoricalRates(baseOfPair, pairedCurrency) {
    let startDate = new Date();
    let year = startDate.getFullYear();
    startDate = `${year - 1}${startDate.toISOString().slice(4, 10)}`;

    // Get rates for the past year
    fetch(` https://api.frankfurter.app/${startDate}..?from=${baseOfPair}&to=${pairedCurrency}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      if (data.error) {
        console.log(data.error);
        throw new Error(data.error);
      }

      let chartLabels = Object.keys(data.rates);
      let chartData = Object.values(data.rates).map(rate => {
        return rate[pairedCurrency];
      });
      
      let chartLabel = `${baseOfPair}/${pairedCurrency} rates for the past year`;

      this.buildChart(chartLabels, chartData, chartLabel);
    }).catch(error => {
      console.log(error);
    });

  }

  buildChart(labels, data, label) {
    // BUG: Historical chart does not always load upon first page load, because this.chartRef.current === null.
    // Removed check for this.chartRef.current in getHistoricalRates(), it seems to work now, but I don't understand why.
    const chartRef = this.chartRef.current.getContext("2d");

    if (typeof this.chart !== "undefined") {
      this.chart.destroy();
    }

    this.chart = new Chart(this.chartRef.current.getContext("2d"), {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: label,
            data,
            fill: false,
            tension: 0,
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
  }


  render() {
    let { allCurrencies, baseCurrency, currentPair } = this.state;
    let { base, amount, rates } = baseCurrency;
    let { baseOfPair, amountBaseOfPair, pairedCurrency, amountPairedCurrency } = currentPair;

    if (allCurrencies.length === 0 
      || Object.keys(baseCurrency).length === 0 
      || Object.keys(currentPair).length === 0) {
      return <p>Loading...</p>;
    } 

    // Create an array of dropdown items (one item per currency)
    let dropdownItemArray = [];
    for (let key in allCurrencies) {
      dropdownItemArray.push([key, allCurrencies[key]]);
    }
 
    return (
      <div className="row mt-3">
        <h2 className="mb-3">Currency Converter</h2>
        <div className="col-12 col-lg-6">
          {/* Currency input/dropdown 1 */}
          <div className="input-group mb-3">
            <input value={baseOfPair} type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button">
              </input>
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul onClick={(e) => this.handleCurrencyChange(e)} className="dropdown-menu dropdown-menu-end currency-dropdown currency-picker-1">
              {
                dropdownItemArray.map((item, index) => {
                  return <li key={ index }><a href="">{item[0]} {item[1]}</a></li>;
                })
              }
            </ul>
          </div>
          {/* Amount input 1 */}
          <div className="input-group mb-3">
            <input value={ amountBaseOfPair} onChange={ (e) => this.handleAmountChange(e) }  type="text" className="form-control amount-input-1" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {/* Currency input/dropdown 2 */}
          <div className="input-group mb-3">
            <input value={pairedCurrency} type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button" />
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            </button>
            <ul onClick={(e) => this.handleCurrencyChange(e)} className="dropdown-menu dropdown-menu-end currency-dropdown currency-picker-2">
              {
                dropdownItemArray.map((item, index) => {
                  return <li key={ index }><a href="">{item[0]} {item[1]}</a></li>;
                })
              }
            </ul>
          </div>
          {/* Amount input 2 */}
          <div className="input-group mb-3">
            {/* PROBLEM:
            A) On initial page load, amountPairedCurrency shows 0, as it is not updated in state until user changes it.
            B) When both currencies are the same, bottom input shows NaN
            SOLUTION: In order to show the correct amount: 
              If amountPairedCurreny === 0:
                If base currency !== pairedCurrency:
                  Calculate amountPairedCurrency based on rates
                Else if base currency === pairedCurrency:
                  Show amount of base currency
              Else:
                Get amountPairedCurrency directly from state */}
            <input 
              value={ 
                amountPairedCurrency === 0 
                ?
                (base !== pairedCurrency) 
                  ? 
                  rates[pairedCurrency] * amountBaseOfPair
                  :
                  amountBaseOfPair  
                :
                amountPairedCurrency
              }
              onChange={ (e) => this.handleAmountChange(e) } type="text" className="form-control amount-input-2" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          {/* Switch button */}
          {/* <button type="button" className="btn btn-outline-primary">
            <span>Switch&nbsp;&nbsp;</span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
          </button> */}
        </div>
        <div className="col-12">
          <canvas ref={ this.chartRef }></canvas>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;