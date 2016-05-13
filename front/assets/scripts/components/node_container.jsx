import React from 'react';
import Node from './node';

class NodeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nodes: {} };
    $.getJSON('/api/nodes', (nodes) => {
      this.setState({ nodes: nodes });
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
