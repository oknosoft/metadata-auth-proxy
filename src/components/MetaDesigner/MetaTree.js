import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard, decorators} from '../react-treebeard';
import * as filters from './filter';
import Draggable from './Draggable';
import {Div} from '../react-treebeard/components/common';

export default class MetaTree extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {data: props.data, current: null};
  }

  onToggle = (node, toggled) => {
    if (node.children) {
      node.toggled = toggled;
    }
    this.forceUpdate();
  };

  onClickHeader = (node) => {
    const {current} = this.state;
    if (current) {
      current.active = false;
    }
    node.active = true;
    this.setState({current: node});
    this.props.onSelect(node);
  };

  applyFilter = (v) => {
    if(v !== undefined) {
      if(this._timout) clearTimeout(this._timout);
      this._filter = v;
      this._timout = setTimeout(this.applyFilter, 600);
    }
    else {
      const {_filter, props: {data}} = this;
      if (!_filter) {
        return this.setState({data});
      }
      Promise.resolve()
        .then(() => filters.filterTree(data, _filter))
        .then((filtered) => filters.expandFilteredNodes(filtered, _filter))
        .then((filtered) => this.setState({data: filtered}));
    }
  };

  onFilterMouseUp = ({target}) => {
    this.applyFilter(target.value.trim());
  };

  render() {
    return (
      <Draggable title="Метаданные">
        <div className="dsn-search-box">
          <input type="text"
                 className="dsn-input"
                 placeholder="Поиск в метаданных..."
                 onKeyUp={this.onFilterMouseUp}
          />
        </div>
        <div className="dsn-tree">
          <Treebeard
            data={this.state.data}
            decorators={decorators}
            separateToggleEvent={true}
            onToggle={this.onToggle}
            onClickHeader={this.onClickHeader}
          />
        </div>
      </Draggable>
    );
  }
}
