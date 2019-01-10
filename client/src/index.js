// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Alert} from './widgets';
import { Navbar_person } from './Components/Navbars/Navbar_person';
import { Ticket_commune } from './Components/Ticket/Ticket_commune';
import { AddTicket } from './Components/Ticket/AddTicket';
import { Login } from './Components/Login/Login.js';
import { Register } from './Components/Login/register.js';
import { TicketList } from './Components/TicketList/TicketList.js';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Navbar_person />
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/ticketlist" component={TicketList} />
      </div>
    </HashRouter>,
    root
  );
