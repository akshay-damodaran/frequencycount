/* global window */

import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';

import './index.css';

import App from './App';

render(
  <App />,
  window.document.getElementById('app'),
);
