import React from 'react';
/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class CurrencyConverter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allCurrencies: [],
    }
  }
  
  componentDidMount() {
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
    }).catch(error => {
      console.log(error);
      // deal with error
    });

    this.setState({allCurrencies: allCurrencies});
  }

  render() {
    let { amount, base, rates } = this.props.baseCurrency;
    
    console.log('allCurrencies in Currency Converter: ', this.state.allCurrencies); // still undefined
    
    /* 
    For each currency pair in allCurrencies:
      Render key and value inside dropdown
    */
  
  
    return (
      <div className="row mt-3">
        <h2 className="mb-3">Currency Converter</h2>
        <div className="col-12 col-lg-6">
          {/* Add currently picked currency to headline, like so: US Dollar Currency Converter */}
          {/* Currency input/dropdown 1 */}
          <div className="input-group mb-3">
            {/* Flag, abbreviation and name of chosen currency displayed here. Inject. */}
            <input type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button">
              </input>
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              {/* {
                allCurrencies should be injected here
              } */}
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div>
          {/* Amount input 1 */}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
          </div>
        </div>
        <div className="col-12 col-lg-6">
          {/* Currency input/dropdown 2 */}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button" />
            <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <FontAwesomeIcon icon="fa-solid fa-caret-down" />
            </button>
            <ul className="dropdown-menu dropdown-menu-end">
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something else here</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Separated link</a></li>
            </ul>
          </div>
          {/* Amount input 2 */}
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
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