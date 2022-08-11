import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ExchangeRatesTable(props) {
  console.log('props in currency converter: ', props);
  let { amount, base, rates } = props.baseCurrency;
  
  return (
    <div className="row mt-3">
      <div className="col-12 col-lg-5">
        {/* Add currently picked currency to headline, like so: US Dollar Exchange Rates Table */}
        <h2>Exchange Rates Table</h2>
        {/* Amount input 1 */}
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Enter amount" aria-label="Username" aria-describedby="basic-addon1" />
        </div>
        {/* Currency input/dropdown 1 */}
        <div className="input-group mb-3">
          {/* Flag, abbreviation and name of chosen currency displayed here. Inject. */}
          <input type="text" className="form-control" placeholder="Choose currency" aria-label="Text input with dropdown button">
            </input>
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
      </div>
      {/* Exchange rates of Top 10 currencies */}
      <div className="col-12 col-lg-7 mt-3">
        <h3>Top 10 currencies</h3>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Currency</th>
              <th scope="col">Full currency name</th>
              <th className="text-end" scope="col">Exchange rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">USD</th>
              <th scope="row">US dollar</th>
              <td className="text-end">1</td>
            </tr>
            <tr>
              <th scope="row">EUR</th>
              <th scope="row">Euro</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">JPY</th>
              <th scope="row">Japanese yen</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">GBP</th>
              <th scope="row">Pound sterling</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">AUD</th>
              <th scope="row">Australian dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">CAD</th>
              <th scope="row">Canadian dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">CHF</th>
              <th scope="row">Swiss franc</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">CNH</th>
              <th scope="row">Chinese renminbi</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">HKD</th>
              <th scope="row">Hong Kong dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">NZD</th>
              <th scope="row">New Zealand dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* Exchange rates of all currencies */}
      <div className="col-12 offset-lg-5 col-lg-7 mt-3">
        <h3>All currencies</h3>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Currency</th>
              <th scope="col">Full currency name</th>
              <th className="text-end" scope="col">Exchange rate</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">USD</th>
              <th scope="row">US dollar</th>
              <td className="text-end">1</td>
            </tr>
            <tr>
              <th scope="row">EUR</th>
              <th scope="row">Euro</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">JPY</th>
              <th scope="row">Japanese yen</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">GBP</th>
              <th scope="row">Pound sterling</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">AUD</th>
              <th scope="row">Australian dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">CAD</th>
              <th scope="row">Canadian dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">CHF</th>
              <th scope="row">Swiss franc</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">CNH</th>
              <th scope="row">Chinese renminbi</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">HKD</th>
              <th scope="row">Hong Kong dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
            <tr>
              <th scope="row">NZD</th>
              <th scope="row">New Zealand dollar</th>
              <td className="text-end">0.9821</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  
  );
}

export default ExchangeRatesTable;