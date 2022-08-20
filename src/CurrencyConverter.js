import React from 'react';

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

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
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


  // ********* HANDLE CURRENCY CHANGE *****************
  // On currency change in first dropdown:
    // Change base currency in state in App.js
    // Change baseOfPair in currentPair in state in CurrencyConverter

  handleCurrencyChange(e) {
    e.preventDefault();
    
    // Get the currency the user clicked on:
    let newCurrency = e.target.text.substring(0,3);

    // If user changes currency in top input field:
    if (e.target.closest('ul').classList.contains('currency-picker-1')) {
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
          currentPair: {
            ...this.state.currentPair,
            baseOfPair: newCurrency,
          }
        }));
      }).catch(error => {
        console.log(error);
        // deal with error
      });


    // Else if user changes currency in bottom input field:
      // DO NOT change base currency in state in App.js - the base currency is unchanged
      // Change currentPair.pairedCurrency in state in CurrencyConverter
      // NO NEED to fetch anything from API
    } else if (e.target.closest('ul').classList.contains('currency-picker-2')) {
      this.setState(() => ({
        currentPair: {
          ...this.state.currentPair,
          pairedCurrency: newCurrency,
        }
      }));
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
      // Calculate correct amount for paired currency
      // Update local state in CurrencyConverter
      // Render in second input field (controlled component)
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
      // Get new amount
      // Calculate amount of base currency
      // Update local state in Currency Converter
      // Render in first input field (controlled component)
    } else if (e.target.classList.contains('amount-input-2')) {
      // new amount -> amountPairedCurrency
      // *** Use library money.js to calculate new amounts ***
      // amountPairedCurrency is 0 => Infinity
      // I need the previous amount if pairedCurrency (not 0)
      // Should be in state
      // E.g. 5 USD = x EUR?
      // (1 EUR / 1.0178 (EUR to USD rate)) * 5
      // => newAmountBaseOfPair = (1 / rates[pairedCurrency]) * newAmount;
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


  render() {
    let { allCurrencies, baseCurrency, currentPair } = this.state;
    let { base, amount, rates } = baseCurrency;
    let { baseOfPair, amountBaseOfPair, pairedCurrency, amountPairedCurrency } = currentPair;
    // Create an array of dropdown items (one item per currency)
    let dropdownItemArray = [];
    for (let key in allCurrencies) {
      dropdownItemArray.push([key, allCurrencies[key]]);
    }
 
    // Why can I access `amount` and `base` in return statement, but not `rates`? 
    return (
      <div className="row mt-3">
        <h2 className="mb-3">Currency Converter</h2>
        <div className="col-12 col-lg-6">
          {/* Add currently picked currency to headline, like so: US Dollar Currency Converter */}
          {/* Currency input/dropdown 1 */}
          <div className="input-group mb-3">
            {/* Flag, abbreviation and name of chosen currency displayed here. Inject. */}
            <input value={baseOfPair} type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button">
              </input>
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              {/* <FontAwesomeIcon icon={faCaretDown } /> */}
            </button>
            <ul onClick={(e) => this.handleCurrencyChange(e)} className="dropdown-menu dropdown-menu-end currency-dropdown currency-picker-1">
              {
                dropdownItemArray.map(item => {
                  return <li><a href="">{item[0]} {item[1]}</a></li>;
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
              {/* <FontAwesomeIcon icon={ faCaretDown } /> */}
            </button>
            <ul onClick={(e) => this.handleCurrencyChange(e)} className="dropdown-menu dropdown-menu-end currency-dropdown currency-picker-2">
              {
                dropdownItemArray.map(item => {
                  return <li><a href="">{item[0]} {item[1]}</a></li>;
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
              If amountPairedCurreny === 0 AND once rates are defined:
                If base currency !== pairedCurrency:
                  Calculate amountPairedCurrency based on rates
                Else if base currency === pairedCurrency:
                  Show amount of base currency
              Else:
                Get amountPairedCurrency directly from state */}
            <input value={ 
              (rates && amountPairedCurrency === 0) 
              ? 
                base !== pairedCurrency 
                  ? 
                  rates[pairedCurrency] * amountBaseOfPair
                  :
                  amountBaseOfPair
                : 
                amountPairedCurrency
              
              } onChange={ (e) => this.handleAmountChange(e) } type="text" className="form-control amount-input-2" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          {/* Switch button */}
          {/* <button type="button" className="btn btn-outline-primary">
            <span>Switch&nbsp;&nbsp;</span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
          </button> */}
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;