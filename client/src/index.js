// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Alert, Menu, Footer, Info } from './widgets';
import { Login } from './Components/Login/Login.js';
import { Register } from './Components/Login/Register.js';
import { TicketList } from './Components/TicketList/TicketList.js';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ticketlist" component={TicketList} />
      </div>
    </HashRouter>,
    root
  );
