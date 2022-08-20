import React from 'react';

class ExchangeRatesTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      allCurrencies: {}, // initially set to array, I checked its lenght in the logic in render, but at that point, it was set to an object => that's why the condition allCurrencies.length > 0 returned false
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
      // deal with error
    });
  }

  handleBaseCurrencyChange(e) {
    e.preventDefault();
    // Get the currency the user clicked on:
    let newCurrency = e.target.text.substring(0,3);

    // get data for new base currency
    fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      // Using a callback function and rest operator to partially update state
      this.setState(() => ({
        baseCurrency: data,
      }));
    }).catch(error => {
      console.log(error);
      // deal with error
    });
  }

  //*********** */
  handleAmountChange(e) {
    let newAmount = +e.target.value;
    this.setState({
      baseCurrency: {
        ...this.state.baseCurrency,
        amount: newAmount,
      }
    });
    /* 
    If user changes amount:
      update baseCurrencyAmount in state

      For each currency in currency table:
        Exchange rate = baseCurrencyAmount * baseCurrency.rates[currency]
    
    */
  }
  //************* */

  

  render() {
    let { allCurrencies, baseCurrency } = this.state;

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
          {/* Add currently picked currency to headline, like so: US Dollar Exchange Rates Table */}
          <h2>Exchange Rates Table</h2>
    
          {/* Currency input/dropdown 1 */}
          <div className="input-group mb-3">
            {/* Flag, abbreviation and name of chosen currency displayed here. Inject. */}
            <input value={ baseCurrency.base } type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button">
              </input>
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {/* <FontAwesomeIcon icon={ faCaretDown } /> */}
            </button>
            <ul onClick={ (e) => this.handleBaseCurrencyChange(e)  } className="dropdown-menu dropdown-menu-end currency-dropdown">
              {
                dropdownItemArray.map(item => {
                  return <li><a href="">{item[0]} {item[1]}</a></li>;
                })
              }
            </ul>
          </div>

          {/* Amount input  */}
          <div className="input-group mb-3 rates-amount-input">
            <input value={ baseCurrency.amount } onChange={ (e) => this.handleAmountChange(e) } type="text" className="form-control" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
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
                allCurrencies !== undefined && baseCurrency.rates !== undefined
                ?
                top10currencies.map(currency => {
                  if (currency === baseCurrency.base) {
                    return (
                      <tr>
                        <th scope="row">{ currency }</th>
                        <th scope="row">{ allCurrencies[currency] }</th>
                        <td className="text-end">{ baseCurrency.amount }</td>
                      </tr>
                    )
                  } else {
                    return (
                      <tr>
                        <th scope="row">{ currency }</th>
                        <th scope="row">{ allCurrencies[currency] }</th>
                        <td className="text-end">{ (baseCurrency.rates[currency] * baseCurrency.amount).toFixed(5) }</td>
                      </tr>
                    )
                  }
                })
                :
                'no data received'
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
              allCurrencies !== undefined && baseCurrency.rates !== undefined
              ?
              allCurrenciesArray.map(currency => {
                if (currency[0] === baseCurrency.base) {
                  return (
                    <tr>
                      <th scope="row">{currency[0]}</th>
                      <th scope="row">{allCurrencies[currency[0]]}</th>
                      <td className="text-end">{baseCurrency.amount}</td>
                    </tr>
                  )
                } else {
                  return (
                    <tr>
                      <th scope="row">{currency[0]}</th>
                      <th scope="row">{allCurrencies[currency[0]]}</th>
                      <td className="text-end">{ (baseCurrency.rates[currency[0]] * baseCurrency.amount).toFixed(5) }</td>
                    </tr>
                  )
                }
              })
              :
              'no data received'
            } 
            </tbody>
          </table>
        </div>
      </div>
    
    );
  }
}

export default ExchangeRatesTable;