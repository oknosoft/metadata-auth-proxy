// @flow

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Helmet from 'react-helmet';
import styles from './styles';

import {htitle, ltitle} from '../App/menu_items';

function PageHome(props) {
  const {classes, handleNavigate, title} = props;

  if(title != ltitle) {
    props.handleIfaceState({
      component: '',
      name: 'title',
      value: ltitle,
    });
  }

  return (
    <div className={classes.root}>
      <Helmet title={htitle}/>

      <div className={classes.hero}>
        <div className={classes.content}>

          <div className={classes.text}>
            <Typography variant="h4" component="h1" color="inherit" noWrap style={{marginBottom: 24}}>Пользователи абонентов</Typography>
            <Typography variant="subtitle1" component="h2" color="inherit" className={classes.headline}>
              Администрирование пользователей,<br/> отделов абонентов и репликаций
            </Typography>
            <Button className={classes.button} variant="contained" onClick={() => handleNavigate('/help')}>Начать</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

PageHome.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  handleNavigate: PropTypes.func.isRequired,
  handleIfaceState: PropTypes.func.isRequired,
};

export default withStyles(styles)(PageHome);
