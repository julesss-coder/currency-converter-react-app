import React from 'react';
/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPair: {
        baseOfPair: 'EUR',
        amountBaseOfPair: 1,
        pairedCurrency: 'USD',
        amountPairedCurrency: 0, // calculate in componentDidMount / add later / calculate dynamically
      }
    }

    this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
  }

  // ********* HANDLE CURRENCY CHANGE *****************
  // On currency change in first dropdown:
    // Change base currency in state in App.js
    // Change baseOfPair in currentPair in state in CurrencyConverter
  // On currency change in second dropdown:
    // DO NOT change base currency in state in App.js - the base currency is unchanged
    // Change currentPair.pairedCurrency in state in CurrencyConverter
    // NO NEED to fetch anything from API
  handleCurrencyChange(e) {
    e.preventDefault();
    console.log('handleCurrencyChange runs');
    let { onBaseCurrencyChange } = this.props;
    // Funktion lässt sich nur von ul Element in CurrencyConverter aufrufen, wenn ich e.preventDefault(e) hier unterbringe!!! Wieso?
    
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
        console.log('data in fetch request for EUR rates: ', data);
        // Using a callback function and rest operator to partially update state
        this.setState(() => ({
          // baseCurrency: data, // this needs to be changed inside App!
          currentPair: {
            ...this.state.currentPair,
            baseOfPair: newCurrency,
          }

        }));

        // change base currency in App.js
        onBaseCurrencyChange(data);

      }).catch(error => {
        console.log(error);
        // deal with error
      });


    // Else if user changes currency in bottom input field:
    } else if (e.target.closest('ul').classList.contains('currency-picker-2')) {
      console.log('second if conditional runs'); //NO
      this.setState(() => ({
        currentPair: {
          ...this.state.currentPair,
          pairedCurrency: newCurrency,
        }
      }));
    }
  } 

  // ********** HANDLE AMOUNT CHANGE *************
  // Differentiate between amount change in first and second input field:
  // On amount change in first input field:
    // Calculate correct amount for paired currency
    // Update local state in CurrencyConverter
    // Render in second input field (controlled component)
    handleAmountChange(e) {
      // e.preventDefault(); ??
      console.log(e.target.value);
      let { baseOfPair, amountBaseOfPair, pairedCurrency, amountPairedCurrency } = this.state.currentPair;
      let { amount, base, date, rates } = this.props.baseCurrency;
      let newAmount = +e.target.value; // Handle '' input
      
      // If user changes amount in first input field:
      if (e.target.classList.contains('amount-input-1')) {
        // On page load / On amount change // What happens when both change?
        // let newValue = this.state.baseCurrency.rates[pairedCurrency] * newAmount;
        let newAmountPairedCurrency = newAmount * rates[pairedCurrency];
        this.setState({
          currentPair: {
            ...this.state.currentPair,
            amountBaseOfPair: newAmount,
            /* calculate new base currency amount */
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
      let newAmountBaseOfPair = (amountBaseOfPair / amountPairedCurrency) * newAmount;
      this.setState({
        currentPair: {
          ...this.state.currentPair,
          amountPairedCurrency: newAmount,
          amountBaseOfPair: newAmountBaseOfPair,
        }
      });
      // calculate new amount for base currency
      // update state with both new values

    }
  }


  render() {
    console.log('*****render() in CurrencyConverter runs******');
    let { amount, base, date, rates } = this.props.baseCurrency;
    let { allCurrencies, dropdownItemArray } = this.props;
    let { baseOfPair, amountBaseOfPair, pairedCurrency, amountPairedCurrency } = this.state.currentPair;

    console.log('amount, base, date, rates: ', amount, base, date, rates);
    console.log('this.props in render(): ', this.props);
    console.log('this.state in render: ', this.state);
    // let { USD } = rates;

    
    // Append list of all currencies to all ul.currency-dropdown
    // ***Is there a way to do this dynamically within the return statement?***
    // IDEA: Create the ul element, add li elements, add in the whole ul element dynamically
    // IDEA: Make a list of li elements (without them being children of a ul)

    // SOLUTION 1: WORKS!
      // let currencyDropdown = Array.from(document.getElementsByClassName('currency-dropdown'));
      // currencyDropdown.forEach(dropdown => {
      //   for (let key in allCurrencies) {
      //     let currencyItem = document.createElement('li');
      //     currencyItem.innerHTML = `<li><a className="dropdown-item" href="#">${[key]} ${allCurrencies[key]}</a></li>`;
      //     dropdown.appendChild(currencyItem);
      //   }
      // });

    // SOLUTION 2: DOES NOT WORK
    // create the ul dropdown, add it in whereever the same dropdown is needed
    // let currencyDropdown = document.createElement('ul');
    // currencyDropdown.classList.add('dropdown-menu', 'dropdown-menu-end', 'currency-dropdown');
    
    // for (let key in allCurrencies) {
    //   let dropdownItem = document.createElement('li');
    //   dropdownItem.textContent = `<li>${key} ${allCurrencies[key]}</li>`;
    //   currencyDropdown.appendChild(dropdownItem);
    // }
    // console.dir(currencyDropdown);

    // SOLUTION 3: Turn allCurrencies into an array, dropdownItemArray
    // map and render it inside return statement
    // *** REDUNDANT, as it is rendered in three different places (as there are three identical dropdown menus)***
    // *** SOLUTION 1 might be more suitable, as it is does not do redundant work. Have to put it into App.js and pass it down to CurrencyConverter and ExchnageRatesTable as props.***
    // let dropdownItemArray = [];
    // for (let key in allCurrencies) {
    //   dropdownItemArray.push([key, allCurrencies[key]]);
    // }
  
    // Why can I access `amount` and `base` in return statement, but not `rates`? All are in this.props.baseCurrency, and destructured at beginning of render().
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
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            </button>
            {/* Ich kann onCurrencyChange loggen, aber nicht aufrufen. Wieso nicht? */}
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
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
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
            {/* This works, as long as we don't add handler for changing amount in second input field:
            rates ? rates[pairedCurrency] * amountBaseOfPair : 'none'
             */}
             {/* `rates` are not immediately available on loading, so I have to accoutn for that */}
            <input value={ amountPairedCurrency === 0 && rates ? (rates[pairedCurrency] * amountBaseOfPair) : amountPairedCurrency } onChange={ (e) => this.handleAmountChange(e) } type="text" className="form-control amount-input-2" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
          {/* Switch button */}
          <button type="button" className="btn btn-outline-primary">
            <span>Switch&nbsp;&nbsp;</span>
            <FontAwesomeIcon icon="fa-solid fa-arrow-right-arrow-left" />
          </button>
        </div>
      </div>
    );
  }
}

export default CurrencyConverter;