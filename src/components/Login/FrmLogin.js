/**
 * Форма авторизации
 *
 * @module FrmLogin
 *
 * Created by Evgeniy Malyarov on 21.06.2019.
 */

import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Creditales from 'metadata-react/FrmLogin/Creditales';
import {withMeta} from 'metadata-redux';
import {FacebookIcon, GoogleIcon, CouchdbIcon, OfflineIcon, LdapIcon} from './icons';
import withStyles from './styles';

class FrmLogin extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      fetching: false,
      showPassword: false,
      error: '',
      provider: '',
      login: '',
      password: '',

    };
  }

  handleMouseDownPassword(event) {
    event.preventDefault();
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleLogin = (provider) => {
    const {props, state} = this;
    const {login, password} = state;
    if(!provider) {
      provider = state.provider;
    }

    $p.adapters.pouch.props._auth_provider = provider;
    props.handleLogin(login, password);

  };

  footer() {

  }

  render() {
    const {state: {fetching, error, provider, login, password, showPassword}, props: {classes}} = this;
    let content;

    switch (provider) {
    case 'couchdb':
    case 'ldap':
      content = <Creditales
        login={login}
        password={password}
        showPassword={showPassword}
        handleClickShowPasssword={this.handleClickShowPasssword}
        handleMouseDownPassword={this.handleMouseDownPassword}
        handleLogin={this.handleLogin}
        loginChange={({target}) => this.setState({login: target.value})}
        passwordChange={({target}) => this.setState({password: target.value})}
      />;
      break;

    default:
      content = <div>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Войти с помощью:
        </Typography>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => this.setState({provider: 'couchdb'})}>
          <CouchdbIcon className={classes.icon}/> Couchdb
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => this.setState({provider: 'ldap'})}>
          <LdapIcon className={classes.icon}/> LDAP
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => this.handleLogin('google')}>
          <GoogleIcon className={classes.icon}/> Google
        </Button>
        <Button
          className={classes.button}
          variant="contained"
          onClick={() => this.handleLogin('google')}>
          <OfflineIcon className={classes.icon}/> Автономный режим
        </Button>
      </div>;
    }

    return <div className={classes.root}>{content}</div>;
  }

}

FrmLogin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withMeta(withStyles(FrmLogin));
