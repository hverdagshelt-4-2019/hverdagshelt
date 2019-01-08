// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component,} from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Alert, Menu, Footer, Info } from './widgets';


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        
      </div>
    </HashRouter>,
    root
  );