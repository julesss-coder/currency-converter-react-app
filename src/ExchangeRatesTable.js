import React from 'react';

class ExchangeRatesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCurrencies: {},
      baseCurrency: {},
    }

    this.handleBaseCurrencyChange = this.handleBaseCurrencyChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  componentDidMount() {
    // Get list of all available currencies and add them to state
    fetch('https://altexchangerateapi.herokuapp.com/currencies')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      this.setState({allCurrencies: data});
    }).catch(error => {
      console.log(error);
      // deal with error
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
  }

  handleBaseCurrencyChange(e) {
    e.preventDefault();
    let newCurrency = e.target.text.substring(0,3);

    fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      this.setState(() => ({
        baseCurrency: data,
      }));
    }).catch(error => {
      console.log(error);
    });
  }

  handleAmountChange(e) {
    if (isNaN(e.target.value)) {
      return;
    }

    let newAmount = +e.target.value;
    this.setState({
      baseCurrency: {
        ...this.state.baseCurrency,
        amount: newAmount,
      }
    });
  }
  

  render() {
    let { allCurrencies, baseCurrency } = this.state;

    if (allCurrencies.length === 0 || Object.keys(baseCurrency).length === 0) {
      return <p>Loading...</p>;
    }

    // Create an array of dropdown items (one item per currency)
    let dropdownItemArray = [];
    for (let key in allCurrencies) {
      dropdownItemArray.push([key, allCurrencies[key]]);
    }

    let ratesAmountInput = document.getElementsByClassName('rates-amount-input')[0];
    let top10currencies = ['EUR', 'USD', 'JPY', 'GBP','AUD',  'CAD', 'CHF', 'CNY', 'HKD', 'NZD'];
    let allCurrenciesArray = Object.entries(allCurrencies);

    return (
      <div className="row mt-3">
        <div className="col-12 col-lg-5">
          <h2>Exchange Rates Table</h2>
    
          {/* Currency input/dropdown 1 */}
          <div className="input-group mb-3">
            <input 
              value={ baseCurrency.base } 
              type="text" 
              className="form-control" 
              placeholder="Choose currency" 
              aria-label="Text input with dropdown button">
            </input>
            <button 
              className="btn btn-outline-secondary dropdown-toggle" type="button" 
              data-bs-toggle="dropdown" 
              aria-expanded="false">
            </button>
            <ul 
              onClick={ (e) => this.handleBaseCurrencyChange(e)  } 
              className="dropdown-menu dropdown-menu-end currency-dropdown">
                {
                  dropdownItemArray.map((item, index) => {
                    return <li key={ index }><a href="">{item[0]} {item[1]}</a></li>;
                  })
                }
            </ul>
          </div>

          {/* Amount input  */}
          <div className="input-group mb-3 rates-amount-input">
            <input 
              value={ baseCurrency.amount } 
              onChange={ (e) => this.handleAmountChange(e) } 
              type="text" 
              className="form-control" 
              placeholder="Enter amount" 
              aria-label="Username" 
              aria-describedby="basic-addon1" />
          </div>
        </div>
        {/* Exchange rates of Top 10 currencies */}
        <div className="col-12 col-lg-7 mt-3">
          <h3>Top 10 currencies</h3>       
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Currency</th>
                <th scope="col">Full currency name</th>
                <th className="text-end" scope="col">Exchange rate</th>
              </tr>
            </thead>
            <tbody> 
            {
              top10currencies.map((currency, index) => {
                if (currency === baseCurrency.base) {
                  return (
                    <tr key={ index }>
                      <th scope="row">{ currency }</th>
                      <th scope="row">{ allCurrencies[currency] }</th>
                      <td className="text-end">{ baseCurrency.amount }</td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={ index }>
                      <th scope="row">{ currency }</th>
                      <th scope="row">{ allCurrencies[currency] }</th>
                      <td className="text-end">{ (baseCurrency.rates[currency] * baseCurrency.amount).toFixed(5) }</td>
                    </tr>
                  )
                }
              })
            }
            </tbody>
          </table>
        </div>
        {/* Exchange rates of all currencies */}
        <div className="col-12 offset-lg-5 col-lg-7 mt-3">
          <h3>All currencies</h3>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Currency</th>
                <th scope="col">Full currency name</th>
                <th className="text-end" scope="col">Exchange rate</th>
              </tr>
            </thead>
            <tbody className="all-currencies-table">
            {
              allCurrenciesArray.map((currency, index) => {
                if (currency[0] === baseCurrency.base) {
                  return (
                    <tr key={ index }>
                      <th scope="row">{currency[0]}</th>
                      <th scope="row">{allCurrencies[currency[0]]}</th>
                      <td className="text-end">{baseCurrency.amount}</td>
                    </tr>
                  )
                } else {
                  return (
                    <tr key={ index }>
                      <th scope="row">{currency[0]}</th>
                      <th scope="row">{allCurrencies[currency[0]]}</th>
                      <td className="text-end">{ (baseCurrency.rates[currency[0]] * baseCurrency.amount).toFixed(5) }</td>
                    </tr>
                  )
                }
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ExchangeRatesTable;