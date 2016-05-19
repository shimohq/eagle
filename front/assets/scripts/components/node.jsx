import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './node.scss';
import Radient from 'radient';
import util from '../../../../lib/format';

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

      if (info.extra) {
        info.extra = JSON.parse(info.extra);
      }
      this.setState({ info: info, disabled: false });
    }).fail(() => {
      this.setState({ disabled: true });
    });
  }

  render() {
    let labels;
    let color;
    let extra;
    let nodeStyle = 'node';
    const info = this.state.info;
    if (!this.state.disabled) {
      labels = [];
      color = gradient.color(info.delay / 30000).hexString();
      labels.push(<div styleName="label" key="delay">delay: {info.delay} ms</div>);
      if (info.memory) {
        const memory = util.bytesFormat(info.memory);
        labels.push(<div styleName="label" key="memory">memory: {memory}</div>);
      }
      if (info.cpu !== null) {
        const cpu = info.cpu + '%';
        labels.push(<div styleName="label" key="cpu">cpu: {cpu}</div>);
      }
      if (info.extra) {
        extra = _.map(info.extra, function (val, prop) {
          return <div styleName="label" key={prop}>{prop}: {val}</div>;
        });
      }
    } else {
      nodeStyle += ' disabled';
      labels = <div styleName="label">Eagle closed</div>;
    }
    return (
      <div styleName={nodeStyle}
        style={{ background: color }}>
        <div styleName="label name">
          {this.props.data.name}
        </div>
        {labels}
        {extra}
      </div>
    );
  }
}

export default CSSModules(Node, styles, { allowMultiple: true });
