import React from 'react';
import { render } from 'react-dom';
import Node from './components/node';

window.onload = function () {
  render(<Node />, document.getElementById('node-container'));
};
