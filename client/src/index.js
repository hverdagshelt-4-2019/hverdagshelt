// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import SimpleMap  from './map/map';// Gets map component
import UploadImage from './temp/uploadImage'
import Login from './Components/Login/Login.js';
import Register from './Components/Login/register.js';
import Ticket from './Components/Ticket/Ticket';
import AddTicket from './Components/Ticket/AddTicket';
import EditTicket from './Components/Ticket/EditTicket';
import TicketList from './Components/TicketList/TicketList.js';
import CategoryCreation from './Components/CategoryCreation/CategoryCreation.js';
import AddPage from './Components/AdminAdd/AddPage.js';

const root = document.getElementById('root');
if (root)
  ReactDOM.render(
    <BrowserRouter>
      <div>
        <Route exact path="/uploadImage" component={UploadImage} />
        <Route exact path="/map" component={SimpleMap} />
        <Route exact path="/" component={Login} />
        <Route path="/registrerdeg" component={Register} />
        <Route path="/sakliste" component={TicketList} />
        <Route path="/leggtil" component={AddPage} />
        <Route path="/kategorier" component={CategoryCreation} />
        <Route path="/sak/:id" component={Ticket} />
        <Route path="/leggtilsak" component={AddTicket} />
        <Route path="/endresak" component={EditTicket} />
      </div>
    </BrowserRouter>,
    root
  );
