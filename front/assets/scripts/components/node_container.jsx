import React from 'react';
import Node from './node';

class NodeContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { nodes: {} };
    $.getJSON('/config', (config) => {
      window.config = config;
      const nodes = [];
      const regex = new RegExp(config.nodeTest);
      _.each(config, (item, key) => {
        if (regex.test(key)) {
          item.name = key;
          nodes.push(item);
        }
      });
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
