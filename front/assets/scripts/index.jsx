import React from 'react';
import { render } from 'react-dom';
import NodeContainer from './components/node_container';

$(function () {
  render(<NodeContainer />, $('#node-container-wrap')[0]);
});
