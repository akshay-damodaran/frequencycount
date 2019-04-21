/* global window */

import React from 'react';
import { render } from 'react-dom';
import '@babel/polyfill';

import App from './App';

render(
  <App />,
  window.document.getElementById('app'),
);
