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

import {FacebookIcon, GoogleIcon, CouchdbIcon} from './icons';
import oAuthPopup from './popup';

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
    const {state} = this;
    const {login, password} = state;
    if(!provider) {
      provider = state.provider;
    }
    if(['ldap','couchdb'].includes(provider)){
      if(login && password) {
        const opts = {
          method: 'post',
          credentials: 'include',
          headers: {
            Authorization: `Basic ${btoa(unescape(encodeURIComponent(username + ':' + password)))}`,
            suffix: _suffix || '0'
          },
          body: JSON.stringify(selector)
        };
        return fetch(`/auth/${provider}`, opts)
      }
    }
    else {
      oAuthPopup(`/auth/${provider}`)
        .then((res) => {

        })
        .catch((err) => {

        });
    }
  };

  render() {
    const {fetching, error, provider, login, password, showPassword} = this.state;

    switch (provider) {
    case 'couchdb':
    case 'ldap':
      return <Creditales
        login={login}
        password={password}
        showPassword={showPassword}
        handleClickShowPasssword={this.handleClickShowPasssword}
        handleMouseDownPassword={this.handleMouseDownPassword}
        handleLogin={this.handleLogin}
        loginChange={({target}) => this.setState({login: target.value})}
        passwordChange={({target}) => this.setState({password: target.value})}
      />;

    default:
      return <div>
        <Typography variant="subtitle1" color="primary" gutterBottom>
          Войти с помощью:
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={() => this.setState({provider: 'couchdb'})}>
          <CouchdbIcon style={{fontSize: 30}}/> Couchdb
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => this.setState({provider: 'ldap'})}>
          LDAP
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => this.handleLogin('google')}>
          <GoogleIcon style={{fontSize: 30}}/> Google
        </Button>
      </div>;
    }
  }

}

export default FrmLogin;
