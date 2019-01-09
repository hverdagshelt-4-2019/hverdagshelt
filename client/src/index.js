// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component,} from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import  SimpleMap  from './map/map';// Gets map component


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={SimpleMap} />
      </div>
    </HashRouter>,
    root
  );