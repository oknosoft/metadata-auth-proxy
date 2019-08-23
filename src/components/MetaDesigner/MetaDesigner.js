import React, {Component} from 'react';
import PropTypes from 'prop-types';

import LayoutCSS from 'react-grid-layout/css/styles.css';
import ResizableCSS from 'react-resizable/css/styles.css';
import RGL, { WidthProvider } from "react-grid-layout";
import Draggable from './Draggable';
import MetaTree from './MetaTree';
import MetaProps from './MetaProps';
import LoadingMessage from 'metadata-react/DumbLoader/LoadingMessage';
import meta from './meta';
import './assets/designer.css';

const ReactGridLayout = WidthProvider(RGL);
const ltitle = 'Конфигуратор';


export default class MetaDesigner extends Component {

  state = {
    data: null,
    item: null,
  };

  componentDidMount() {
    this.props.drawerClose(() => {
      this.shouldComponentUpdate(this.props);
      meta().then((data) => this.setState({data}));
    });
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const {title} = nextProps;
    if(title != ltitle) {
      nextProps.handleIfaceState({
        component: '',
        name: 'title',
        value: ltitle,
      });
      return false;
    }
    return true;
  }

  treeSelect = (item) => {
    this.setState({item});
  }

  render() {
    const {data, item} = this.state;
    return data ?
      <ReactGridLayout
        className="layout"
        draggableHandle=".dsn-draggable-handle"
        cols={12}
        rowHeight={80}
      >
        <div key="a" data-grid={{x: 0, y: 0, w: 3, h: 7, minW: 2}}>
          <MetaTree data={data} onSelect={this.treeSelect}
          />
        </div>
        <div key="b" data-grid={{x: 3, y: 0, w: 6, h: 7, minW: 3}}>
          <Draggable title="Код">Код</Draggable>
        </div>
        <div key="c" data-grid={{x: 9, y: 0, w: 3, h: 7, minW: 2}}>
          <MetaProps data={data} item={item} />
        </div>
      </ReactGridLayout>
      :
      <LoadingMessage text="Подготовка данных..."/>;
  }

}
