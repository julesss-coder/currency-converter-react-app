import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// pages
import CurrencyConverter from './CurrencyConverter';
import ExchangeRatesTable from './ExchangeRatesTable';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
  }

  /* Bootstrap's dropdowns work with third party library popper.js, which is included in bootstrap.bundle.min.js - imported in index.js. It expands the dropdown upon click on hamburger menu, but it doesn't collapse it again.
  Source: URL: https://getbootstrap.com/docs/5.0/components/dropdowns/ */
  /* CURRENT SOLUTION: toggleNavbar collapses dropdown upon user clicking navlink, but there is no visual transition. */
  toggleNavbar(e) {
    let navbarDropdown = document.getElementsByClassName('navbar-collapse')[0];
    if (navbarDropdown.classList.contains('show')) {
      if (e.target.classList.contains('nav-link')) {
        document.getElementsByClassName('navbar-collapse')[0].classList.remove('show');
      }
    }
  }

  render() {
    return (
      <Router>
        {/* Bootstrap 5 container */}
        <div className="container">
          {/* Navigation Bar */}
          {/* from xs to lg exclusively: hamburger menu */}
          {/* from lg onward: regular nav */}
          {/* Bootstrap 5 basic navbar */}
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">Convert Me</a>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <Link to="/" onClick={ (e) => this.toggleNavbar(e) } className="nav-link" aria-current="page" href="#">Currency Converter</Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/exchange-rates-table" onClick={ (e) => this.toggleNavbar(e) } className="nav-link" href="#">Exchange Rates Table</Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <Routes>
            <Route path="/" exact element={< CurrencyConverter />} />
            <Route path="/exchange-rates-table" element={<ExchangeRatesTable />} />
          </Routes>

        
          {/* Footer */}
          <footer className="mt-5 lh-lg text-muted">
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
