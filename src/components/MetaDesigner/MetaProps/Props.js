import React from 'react';
import PropTypes from 'prop-types';

import Draggable from '../Draggable';

export default class MetaProps extends React.Component {

  render() {
    const {item} = this.props;
    return (
      <Draggable title="Свойства">
        {`Свойства ${item && item.name}`}
      </Draggable>
    );
  }
}
