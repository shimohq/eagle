import React from 'react';
import Node from './node';

class NodeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nodes: {} };
    $.getJSON('/config', (data) => {
      _.each(data, (item, key) => {
        item.name = key;
      });
      this.setState({ nodes: data });
    });
  }

  render() {
    const nodes = _.map(this.state.nodes, (item) => {
      return (
        <Node
          key={item.name}
          data={item}/>
      );
    });
    return <div id="node-container">{nodes}</div>;
  }
}

export default NodeContainer;
