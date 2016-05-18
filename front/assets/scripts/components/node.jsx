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
      info: { delay: 0 }
    };
    this.ping();
    setInterval(this.ping.bind(this), 3000);
  }

  reqIndex = 0
  resIndex = 0

  ping() {
    const _reqIndex = ++this.reqIndex;
    $.get(`/api/pull/${this.props.data.name}`, (info) => {
      if (_reqIndex <= this.resInex) {
        return;
      }
      this.resIndex = _reqIndex;

      this.setState({ info: info, disabled: false });
    }).fail(() => {
      this.setState({ disabled: true });
    });
  }

  render() {
    let color;
    let delayMsg;
    let memory = '-';
    let cpu = '-';
    const info = this.state.info;
    if (!this.state.disabled) {
      color = gradient.color(info.delay / 30000).hexString();
      delayMsg = info.delay + ' ms';
      if (info.memory) {
        memory = Math.floor(info.memory / 1024 / 1024) + ' M';
        cpu = info.cpu + '%';
      }
    } else {
      color = 'gray';
      delayMsg = 'unavailable';
    }
    return (
      <div styleName="node"
        style={{ background: color }}>
        <div styleName="label name">
          {this.props.data.name}
        </div>
        <div styleName="label">delay: {delayMsg}</div>
        <div styleName="label">memory: {memory}</div>
        <div styleName="label">cpu: {cpu}</div>
      </div>
    );
  }
}

export default CSSModules(Node, styles, { allowMultiple: true });
