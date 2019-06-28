import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route, Redirect} from 'react-router';


// 404
import NotFound from './NotFound';

// информация о программе
import About from './About';


export default function MarkdownRoute() {
  return <Switch>
    <Route path="/about" component={About}/>
    <Redirect from='/help' to='/about'/>
    <Route component={NotFound}/>
  </Switch>;
}

MarkdownRoute.propTypes = {
  match: PropTypes.object.isRequired,
};




