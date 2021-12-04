import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import { BrowserRouter as Router } from 'react-router-dom';
import './css/index.css';

ReactDOM.render(
  <Router>
  <App />
  </Router>,
  document.getElementById('root')
);

reportWebVitals();
