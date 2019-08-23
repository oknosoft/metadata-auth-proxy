import React from 'react';
import PropTypes from 'prop-types';

import {Div} from '../common';


const Header = ({node, style, onClick, onRightClick}) => (
  <Div
    style={node.children ? style.base : Object.assign({marginLeft: 16}, style.base)}
    onClick={onClick}
    onContextMenu={(e) => {
      if (onRightClick) {
        e.preventDefault();
      }
    }}
    onMouseDown={(e) => {
      if (onRightClick && e.button === 2) {
        onRightClick(node, e);
      }
    }}>
    <Div style={style.title}>
      <div className={`dsn-treeview-icon ${node.icon}`}/>
      {node.name}
    </Div>
  </Div>
);

Header.propTypes = {
    style: PropTypes.object,
    node: PropTypes.object.isRequired,
    onClick: PropTypes.func,
    onRightClick: PropTypes.func,
};

export default Header;
