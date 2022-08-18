import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// pages
import CurrencyConverter from './CurrencyConverter';
import ExchangeRatesTable from './ExchangeRatesTable';
import { faList } from '@fortawesome/free-solid-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      allCurrencies: [],
      baseCurrency: {},
      // currentPair: {
      //   baseOfPair: 'EUR',
      //   amountBaseOfPair: 1,
      //   pairedCurrency: 'USD',
      //   amountPairedCurrency: null, // calculate in componentDidMount / add later / calculate dynamically
      // }
    }
    // this.toggleNavbar = this.toggleNavbar.bind(this);
    // this.handleCurrencyChange = this.handleCurrencyChange.bind(this);
    // this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleBaseCurrencyChange = this.handleBaseCurrencyChange.bind(this);
  }


  componentDidMount() {
    // Get list of all available currencies and add them to state
    let allCurrencies;

    fetch('https://altexchangerateapi.herokuapp.com/currencies')
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Request was either a 404 or 500');
    }).then(data => {
      // console.log('json data: ', data);
      allCurrencies = data;
      console.log('allCurrencies:', allCurrencies);
      this.setState({allCurrencies: allCurrencies});
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
      console.log('data in fetch request for EUR rates: ', data);
      // work with data
      this.setState({
        baseCurrency: data,
      });
    }).catch(error => {
      console.log(error);
      // deal with error
    });
  }

  handleBaseCurrencyChange(newBase) {
    this.setState({
      baseCurrency: newBase,
    });
  }

  // When I change the second currency, currentPair is not updated.
  // When I change the first currency: Only the keys included in this.setState below are still in state, the rest are missing. 
  // But state updates are supposed to merge? According to: https://reactjs.org/docs/state-and-lifecycle.html#state-updates-are-merged 
  // handleCurrencyChange(e) {
  //   e.preventDefault();
  //   console.log('handleCurrencyChange runs');
  //   // Funktion lässt sich nur von ul Element in CurrencyConverter aufrufen, wenn ich e.preventDefault(e) hier unterbringe!!! Wieso?
    
  //   // Get the currency the user clicked on:
  //   let newCurrency = e.target.text.substring(0,3);

  //   // If user changes currency in top input field:
  //   // if e.target has classname currency-picker1:
  //   if (e.target.closest('ul').classList.contains('currency-picker-1')) {
  //     // get data for new base currency
  //     fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  
  //       throw new Error('Request was either a 404 or 500');
  //     }).then(data => {
  //       console.log('data in fetch request for EUR rates: ', data);
  //       // Using a callback function and rest operator to partially update state
  //       this.setState(() => ({
  //         baseCurrency: data,
  //         currentPair: {
  //           ...this.state.currentPair,
  //           baseOfPair: newCurrency,
  //         }
  //       }));
  //     }).catch(error => {
  //       console.log(error);
  //       // deal with error
  //     });
      
  //   } else if (e.target.closest('ul').classList.contains('currency-picker-2')) {
  //     // change baseCurrency
  //     // change currentPair: baseOfPair to new currency
  //   // Else if user changes currency in bottom input field:
  //   // if e.target has classname currency-picker2:
  //     // change currentPair: pairedCurrency to new currency
  //     // get data for new base currency
  //     fetch(`https://api.frankfurter.app/latest?from=${newCurrency}`)
  //     .then(response => {
  //       if (response.ok) {
  //         return response.json();
  //       }
  
  //       throw new Error('Request was either a 404 or 500');
  //     }).then(data => {
  //       console.log('data in fetch request for EUR rates: ', data);
  //       // work with data
  //       // let pairedCurrency = newCurrency;
  //       console.log('newCurrency: ', newCurrency);
  //       // this.setState({
  //       //   currentPair: {
  //       //     pairedCurrency: newCurrency,
  //       //   }
  //       // });
  //       this.setState(() => ({
  //         currentPair: {
  //           ...this.state.currentPair,
  //           pairedCurrency: newCurrency,
  //         }
  //       }));
  //     }).catch(error => {
  //       console.log(error);
  //       // deal with error
  //     });
  //   }
  // }

  // // Differentiate between amount change in first and second input field:
  // handleAmountChange(e) {
  //   // e.preventDefault(); ??
  //   console.log(e.target.value);
  //   let { baseOfPair, amountBaseOfPair, pairedCurrency, amountPairedCurrency } = this.state.currentPair;
  //   let newAmount = +e.target.value; // Handle '' input

  //   // If user changes amount in first input field:
  //   if (e.target.classList.contains('amount-input-1')) {
  //     // On page load / On amount change // What happens when both change?
  //     // let newValue = this.state.baseCurrency.rates[pairedCurrency] * newAmount;
  //     this.setState({
  //       currentPair: {
  //         ...this.state.currentPair,
  //         amountBaseOfPair: newAmount, /* calculate new base currency amount */
  //       }
  //     });
  //     // Render amount in input field // Do not change state

  //   } else if (e.target.classList.contains('amount-input-2')) {
  //     // new amount -> amountPairedCurrency
  //     // *** Use library money.js to calculate new amounts ***
  //     let newAmountBaseOfPair = (amountBaseOfPair / amountPairedCurrency) * newAmount;
  //     this.setState({
  //       currentPair: {
  //         ...this.state.currentPair,
  //         amountPairedCurrency: newAmount,
  //         amountBaseOfPair: newAmountBaseOfPair,
  //       }
  //     });
  //     // calculate new amount for base currency
  //     // update state with both new values

  //   }

  //   // Else if user changes amount in second input field




  // }
  
  /* Bootstrap 5's navbar hamburger menu doesn't collapse on click, so I wrote this event handler to make it work. */
  /* UPDATE 9 AUG 2022: Bootstrap's dropdowns work with third party library popper.js, which is included in bootstrap.bundle.min.js - imported in index.js 
  Source: URL: https://getbootstrap.com/docs/5.0/components/dropdowns/ */
  // toggleNavbar(e) {
  //   // console.log('e.target: ', e.target);
  //   // console.log('e: ', e);
  //   // There must be a simpler way of handling this, with event bubbling/propagation?
  //   let navbarDropdown = document.getElementsByClassName('navbar-collapse')[0];
  //   // If dropdown menu is hidden:
  //   if (navbarDropdown.classList.contains('collapse')) {
  //     if (e.target.className === 'navbar-toggler' || e.target.className === 'navbar-toggler-icon') {
  //       console.log('navbar toggler/icon clicked');
  //       // Show dropdown menu
  //       document.getElementsByClassName('navbar-collapse')[0].classList.remove('collapse');
  //     }
  //   }
  //   // else if dropdown menu is visible
  //   else {
  //     // if user clicks somewhere on dropdown menu, or navbar toggler
  //     if (e.target.classList.contains('nav-link')
  //     || e.target.classList.contains('navbar-toggler')
  //     || e.target.classList.contains('navbar-toggler-icon')
  //     ) {
  //       // Hide drop down menu
  //       document.getElementsByClassName('navbar-collapse')[0].classList.add('collapse');
  //     }
  //   }
    
  // }

  render() {
    let { allCurrencies, baseCurrency } = this.state;
    
    // Create an array of dropdown items (one item per currency)
    let dropdownItemArray = [];
    for (let key in allCurrencies) {
      dropdownItemArray.push([key, allCurrencies[key]]);
    }
    // Pass dropdownItemArray to child components are props and render dropdown item there
    
    console.log('state in App.js render(): ', this.state);

    // let baseCurrency = 
    // {
    //   "amount":1.0,
    //   "base":"EUR",
    //   "date":"2021-04-16",
    //   "rates":{
    //     "AUD":1.6141,
    //     "BGN":1.9558,
    //     "BRL":4.5666,
    //     "CAD":1.5,
    //     "CHF":1.1263,
    //     "CNY":7.7228,
    //     "CZK":25.766,
    //     "DKK":7.4681,
    //     "GBP":0.8762,
    //     "HKD":8.7656,
    //     //... more currencies
    //   }
    // };

    // SOLUTION 1: WORKS!
    // Kann ich auf die Elemente mit Klasse currency-dropdown überhaupt schon zugreifen zu diesem Zeitpunkt?
    // Annahme: Nein, denn die Komponenten CurrencyConverter und ExchangeRatesTable wurde noch nicht geladen.
    // Soll ich das ganze in ComponentDidMount in den beiden Komponenten gegeben geben?
    // Wenn parent component gemountet ist, heißt das, dass auch alle child components gemountet sind?
    // let currencyDropdown = Array.from(document.getElementsByClassName('currency-dropdown'));
    // // Antwort: Nur nach einem Re-Render der Seite loggt die folgende Zeile die jeweiligen Dropdowns, d.h. 2, wenn ich CurrencyConverter Seite lade, 1 wenn ich ExchangeRateTables lade.
    // console.log('currencyDropdown: ', currencyDropdown);
    // let { allCurrencies } = this.state;
    // currencyDropdown.forEach(dropdown => {
    //   for (let key in allCurrencies) {
    //     let currencyItem = document.createElement('li');
    //     currencyItem.innerHTML = `<li><a className="dropdown-item" href="#">${[key]} ${allCurrencies[key]}</a></li>`;
    //     dropdown.appendChild(currencyItem);
    //   }
    // });
    

    return (
      <Router>
        {/* Bootstrap 5 container */}
        <div className="container">
          {/* Navigation Bar */}
          {/* from xs to lg exclusively: hamburger menu */}
          {/* from lg onward: regular nav */}
          {/* Bootstrap 5 basic navbar */}
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Convert Me</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" className="nav-link active" aria-current="page" href="#">Currency Converter</Link>
                    {/* <a className="nav-link active" aria-current="page" href="#">Currency Converter</a> */}
                  </li>
                  <li className="nav-item">
                    <Link to="/exchange-rates-table" className="nav-link" href="#">Exchange Rates Table</Link>
                    {/* <a className="nav-link" href="#">Exchange Rates Table</a> */}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" exact element={< CurrencyConverter baseCurrency={baseCurrency} allCurrencies={allCurrencies} dropdownItemArray={dropdownItemArray} onBaseCurrencyChange={ this.handleBaseCurrencyChange } />} />
            <Route path="/exchange-rates-table" element={<ExchangeRatesTable baseCurrency={baseCurrency} allCurrencies={allCurrencies} dropdownItemArray={dropdownItemArray} />} />
          </Routes>

        
          {/* Footer */}
          <footer className="bg-light mt-5 lh-lg text-muted">
            <li>By julesss-coder</li>
            <li>Find me on <a href="https://github.com/julesss-coder">GitHub</
            a></li>
            <li>
              <a href="https://julesss-coder.github.io/personal-portfolio/">Personal portfolio</a>
            </li>
          </footer>
        </div>
      </Router>
    );
  }
}

export default App;
