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
  }

  // When I change the second currency, currentPair is not updated.
  // When I change the first currency: Only the keys included in this.setState below are still in state, the rest are missing. 
  // But state updates are supposed to merge? According to: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged 
  handleCurrencyChange(e) {
    e.preventDefault();
    console.log('handleCurrencyChange runs');
    // Funktion lässt sich nur von ul Element in CurrencyConverter aufrufen, wenn ich e.preventDefault(e) hier unterbringe!!! Wieso?
    
    // Get the currency the user clicked on:
    let newCurrency = e.target.text.substring(0,3);

    // If user changes currency in top input field:
    // if e.target has classname currency-picker1:
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
      
    } else if (e.target.closest('ul').classList.contains('currency-picker-2')) {
      // change baseCurrency
      // change currentPair: baseOfPair to new currency
    // Else if user changes currency in bottom input field:
    // if e.target has classname currency-picker2:
      // change currentPair: pairedCurrency to new currency
      // get data for new base currency
      fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
  
        throw new Error('Request was either a 404 or 500');
      }).then(data => {
        console.log('data in fetch request for EUR rates: ', data);
        // work with data
        // let pairedCurrency = newCurrency;
        console.log('newCurrency: ', newCurrency);
        // this.setState({
        //   currentPair: {
        //     pairedCurrency: newCurrency,
        //   }
        // });
        this.setState(() => ({
          currentPair: {
            ...this.state.currentPair,
            pairedCurrency: newCurrency,
          }
        }));
      }).catch(error => {
        console.log(error);
        // deal with error
      });
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
            <input value={ amountBaseOfPair} /* onChange={ onAmountChange } */ type="text" className="form-control amount-input-1" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {/* Currency input/dropdown 2 */}
          <div className="input-group mb-3">
            <input value={pairedCurrency} type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button" />
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            </button>
            <ul /* onClick={(e) => onCurrencyChange(e)}  */className="dropdown-menu dropdown-menu-end currency-dropdown currency-picker-2">
              {
                dropdownItemArray.map(item => {
                  return <li><a href="">{item[0]} {item[1]}</a></li>;
                })
              }
            </ul>
          </div>
          {/* Amount input 2 */}
          <div className="input-group mb-3">
            <input value={ rates ? rates.USD * amountBaseOfPair : amountPairedCurrency } /* onChange={ onAmountChange }  */type="text" className="form-control amount-input-2" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
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