// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Alert, Menu, Footer, Info } from './widgets';
import { Navbar_person } from './Components/Navbars/Navbar_person';
import { Ticket } from './Components/Ticket/Ticket';
import { Login } from './Components/Login/Login.js';
import { Register } from './Components/Login/Register.js';
import { TicketList } from './Components/TicketList/TicketList.js';
import { CategoryCreation } from './Components/CategoryCreation/CategoryCreation.js';
import { AddPage } from './Components/AdminAdd/AddPage.js';


const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <HashRouter>
      <div>
        <Navbar_person />
        <Route exact path="/" component={Login} />
        <Route path="/registrerdeg" component={Register} />
        <Route path="/sakliste" component={TicketList} />
        <Route path="/leggtil" component={AddPage}/>
        <Route path="/kategorier" component={CategoryCreation} />
      </div>
    </HashRouter>,
    root
  );
