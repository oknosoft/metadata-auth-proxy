import React from 'react';
import PropTypes from 'prop-types';
import {Treebeard, decorators} from '../react-treebeard';
import * as filters from './filter';
import Draggable from './Draggable';
import Menu from './MetaTreeMenu';

export default class MetaTree extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      data: props.data,
      current: null,
      anchorEl: null,
      menuItem: null,
    };
  }

  handleMenuOpen = (node, {currentTarget}) => {
    this.setState({menuItem: node, anchorEl: currentTarget});
  }

  handleMenuClose = () => {
    this.handleMenuOpen(null, {currentTarget: null});
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
    const {anchorEl, menuItem, data} = this.state;
    return (
      <Draggable title="Метаданные">
        <div className="dsn-search-box">
          <input type="text" className="dsn-input" placeholder="Поиск в метаданных..." onKeyUp={this.onFilterMouseUp}/>
        </div>
        <div className="dsn-tree" ref={node => this.node = node}>
          <Treebeard
            data={data}
            decorators={decorators}
            separateToggleEvent={true}
            onToggle={this.onToggle}
            onClickHeader={this.onClickHeader}
            onRightClickHeader={this.handleMenuOpen}
          />
        </div>
        <Menu item={menuItem} anchorEl={anchorEl} handleClick={this.handleMenuClose} handleClose={this.handleMenuClose} />
      </Draggable>
    );
  }
}
