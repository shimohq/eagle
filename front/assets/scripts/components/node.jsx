import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './node.scss';
import Radient from 'radient';

var gradient = new Radient();
gradient.stop('#008f00', 0);
gradient.stop('#929000', 1000 / 30000);
gradient.stop('#941100', 1);

class Node extends React.Component {

  static propTypes = {
    data: React.PropTypes.object
  }

  constructor(props) {
    super(props);
    this.state = {
      delay: 0
    };
    this.ping();
    setInterval(this.ping.bind(this), window.config.pingInterval);
  }

  reqIndex = 0
  resIndex = 0

  ping() {
    const _reqIndex = ++this.reqIndex;
    $.get(`/ping/${this.props.data.name}`, (delay) => {
      if (_reqIndex <= this.resInex) {
        return;
      }
      this.resIndex = _reqIndex;

      this.setState({ delay: delay });
    });
  }

  render() {
    const styleName = 'node';
    const color = gradient.color(this.state.delay / 30000).hexString();
    return (
      <div styleName={styleName}
        style={{ background: color }}>
        <div styleName="label name">
          {this.props.data.name}
        </div>
        <div styleName="label delay">{this.state.delay}ms</div>
      </div>
    );
  }
}

export default CSSModules(Node, styles, { allowMultiple: true });
