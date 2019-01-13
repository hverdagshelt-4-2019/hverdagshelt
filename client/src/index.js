// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import  SimpleMap  from './map/map';// Gets map component
import  Footer  from './Components/Footer/footer';// Gets map component
import UploadImage from './temp/uploadImage'
import { Alert, Info } from './widgets';
import { Login } from './Components/Login/Login.js';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/uploadImage" component={UploadImage} />
        <Route exact path="/map" component={SimpleMap} />
        <Route exact path="/" component={Login} />
        <Route path="/" component={Footer} />
      </div>
    </HashRouter>,
    root
  );
