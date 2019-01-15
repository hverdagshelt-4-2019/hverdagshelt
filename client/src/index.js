// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { BrowserRouter, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';

import SimpleMap  from './map/map';// Gets map component
import UploadImage from './temp/uploadImage'
import { Alert, Info } from './widgets';
import { TicketTest } from './Components/Ticket/TicketTest';
import Login from './Components/Login/Login.js';
import Register from './Components/Login/register.js';
import Ticket from './Components/Ticket/Ticket';
import AddTicket from './Components/Ticket/AddTicket';
import EditTicket from './Components/Ticket/EditTicket';
import TicketList from './Components/TicketList/TicketList.js';
import CategoryCreation from './Components/CategoryCreation/CategoryCreation.js';
import AddPage from './Components/AdminAdd/AddPage.js';
import Navbar from './Components/Navbars/Navbar'
import Footer from './Components/Footer/footer'
import userService from './Services/userService';


const root = document.getElementById('root');
if (root) {
    userService.getLevel().then(res => {
        localStorage.setItem('level', res.data.level);
        localStorage.setItem('commune', res.data.commune);
        ReactDOM.render(
            <BrowserRouter>
                <div>
                    <Navbar/>
                    <Route exact path="/uploadImage" component={UploadImage}/>
                    <Route exact path="/hjem" component={SimpleMap}/>
                    <Route exact path="/" component={Login}/>
                    <Route path="/registrerdeg" component={Register}/>
                    <Route path="/sakliste" component={TicketList}/>
                    <Route path="/leggtil" component={AddPage}/>
                    {res.data.level === 'admin' && <Route path="/kategorier" component={CategoryCreation}/>}
                    <Route path="/sak/:id" component={Ticket}/>
                    <Route path="/leggtilsak" component={AddTicket}/>
                    <Route path="/endresak/:id" component={EditTicket}/>
                    <Route path="/" component={Footer}/>
                </div>
            </BrowserRouter>,
            root
        );
    });
}