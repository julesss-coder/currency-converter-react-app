import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


// pages
import CurrencyConverter from './CurrencyConverter';
import ExchangeRatesTable from './ExchangeRatesTable';

class App extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      allCurrencies: [],
    }
    // this.toggleNavbar = this.toggleNavbar.bind(this);
  }


  // componentDidMount() {
  //   let allCurrencies;
  //   console.log('props in componentDidMount in App.js: ', this.props);

  //   fetch('https://altexchangerateapi.herokuapp.com/currencies')
  //   .then(response => {
  //     if (response.ok) {
  //       return response.json();
  //     }
  //     throw new Error('Request was either a 404 or 500');
  //   }).then(data => {
  //     // console.log('json data: ', data);
  //     allCurrencies = data;
  //     console.log('allCurrencies:', allCurrencies);
  //   }).catch(error => {
  //     console.log(error);
  //     // deal with error
  //   });

  //   this.setState({allCurrencies: allCurrencies});
  //   // this.setState((state, props) => ({
  //   //   allCurrencies: state.allCurrencies + 
  //   // }));
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
    console.log('state in App.js render(): ', this.state);
    let baseCurrency = 
    {
      "amount":1.0,
      "base":"EUR",
      "date":"2021-04-16",
      "rates":{
        "AUD":1.6141,
        "BGN":1.9558,
        "BRL":4.5666,
        "CAD":1.5,
        "CHF":1.1263,
        "CNY":7.7228,
        "CZK":25.766,
        "DKK":7.4681,
        "GBP":0.8762,
        "HKD":8.7656,
        //... more currencies
      }
    };

    

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
            <Route path="/" exact element={< CurrencyConverter baseCurrency={baseCurrency} />} />
            <Route path="/exchange-rates-table" element={<ExchangeRatesTable baseCurrency={baseCurrency} />} />
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
