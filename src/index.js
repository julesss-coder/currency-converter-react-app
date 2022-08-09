import React from 'react';
import ReactDOM from 'react-dom/client';
/* Bootstrap */
import 'bootstrap/dist/css/bootstrap.css';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

/* Fontawesome - import here or in App.js? */
import { library } from '@fortawesome/fontawesome-svg-core';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { faArrowRightArrowLeft, faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

library.add(faArrowRightArrowLeft, faCheckSquare, faCoffee);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
