/**
 * ### Поле выбора цвета
 *
 * @module FieldColor
 *
 * Created by Evgeniy Malyarov on 16.08.2019.
 */

import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Popover from '@material-ui/core/Popover';
import { ChromePicker } from 'react-color'

import AbstractField from 'metadata-react/DataField/AbstractField';
import withStyles from 'metadata-react/DataField/styles';

class FieldColor extends AbstractField {

  setAnchorEl = ({currentTarget}) => {
    this.setState({anchorEl: currentTarget});
  };

  handleClose = () => {
    this.setState({anchorEl: null});
  };

  handleChange = (color) => {
    if(this._ctimer) {
      clearTimeout(this._ctimer);
    }
    this._ctimer = setTimeout(this.setClr.bind(this, color.hex.substr(1)), 50);
  };

  setClr(v) {
    const {_obj, _fld} = this.props;
    _obj[_fld] = v;
  };

  render() {
    const {props, state: {anchorEl}, _meta, onChange} = this;
    const {_obj, _fld, classes, read_only, InputProps, bar, isTabular, ...other} = props;
    const attr = {
      disabled: read_only,
      title: _meta.tooltip || _meta.synonym,
      value: _obj[_fld],
      onChange,
      onClick: this.setAnchorEl,
    }
    let hex;
    if(attr.value.length === 3) {
      hex = '';
      for(let i=0; i<3; i++) {
        hex += attr.value[i];
        hex += attr.value[i];
      }
      hex = parseInt(hex, 16);
    }
    else if(attr.value.length === 6) {
      hex = parseInt(attr.value, 16);
    }
    other.inputProps = Object.assign({style: {cursor: 'pointer'}}, other.inputProps);
    if(hex) {
      let back = hex.toString(16);
      while (back.length < 6) {
        back = '0' + back;
      }
      back = '#' + back;
      let clr = (0xafafaf ^ hex).toString(16);
      while (clr.length < 6) {
        clr = '0' + clr;
      }
      clr = '#' + clr;
      Object.assign(other.inputProps.style, {
        backgroundColor: back,
        color: clr
      });
    }
    if(_meta.mandatory) {
      attr.required = true;
      if(!attr.value) {
        Object.assign(other.inputProps, {className: classes.required});
      }
    }

    return <div>
      {this.isTabular ?
        <input type="text" readOnly {...attr}/>
        :
        <TextField
          className={classes.formControl}
          label={_meta.synonym}
          InputProps={Object.assign({readOnly: true}, InputProps)}
          {...attr}
          {...other}
        />}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={this.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ChromePicker
          color={{hex: other.inputProps.style.backgroundColor}}
          disableAlpha
          onChange={this.handleChange}
        />
      </Popover>
    </div>;
  }
}

export default withStyles(FieldColor);
