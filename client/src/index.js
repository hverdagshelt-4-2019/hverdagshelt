// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Alert} from './widgets';
import { Login } from './Components/Login/Login.js';
import { Register } from './Components/Login/register.js';
import { Ticket } from './Components/Ticket/Ticket';
import { TicketTest } from './Components/Ticket/TicketTest';
import { AddTicket } from './Components/Ticket/AddTicket';
import { EditTicket } from './Components/Ticket/EditTicket';
import { TicketList } from './Components/TicketList/TicketList.js';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Route exact path="/" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/sak/:id" component={Ticket} />
        <Route path="/sak/leggtil" component={AddTicket} />
        <Route path="/sak/endre/:id" component={EditTicket} />
        <Route path="/ticketlist" component={TicketList} />
      </div>
    </HashRouter>,
    root
  );
