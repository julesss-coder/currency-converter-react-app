/* Fontawesome */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CurrencyConverter = () => {
  return (
    <div className="row">
      <div className="col-12 col-lg-6">
        {/* Currency input/dropdown 1 */}
        <div className="input-group mb-3">
          {/* Flag, abbreviation and name of chosen currency displayed here. Inject. */}
          <input type="text" className="form-control" aria-label="Text input with dropdown button">
            </input>
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
          <ul className="dropdown-menu dropdown-menu-end">
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
          <input type="text" className="form-control" aria-label="Text input with dropdown button" />
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Dropdown</button>
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

export default CurrencyConverter;