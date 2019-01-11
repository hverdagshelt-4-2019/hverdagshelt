//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/TicketService';
import { Navbar_person } from '../Navbars/Navbar_person';

export class AddTicket extends Component {
  render() {
    return (
        <div>
            <Navbar_person />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Raporter en ny sak:</h1>

                            <hr />

                            <h4>Tittel:</h4>
                            <input className="form-control"/>

                             <h4>Beskrivelse:</h4>
                            <textarea className="form-control" style={{width:"100%"}} />

                            <h4>Kategori:</h4>
                            <select>
                                <option>Hærverk</option>
                                <option>Søppel</option>
                                <option>Strøing</option>
                            </select>

                            <h4>Bilde:</h4>
                            <label htmlFor="InputFile">Last opp bilde</label>
                            <input type="file" className="form-control-file" id="InputFile"/>
                            <small id="fileHelp" className="form-text text-muted"></small>

                            <hr />

                            Map here

                            <hr />

                            <button type="button" class="btn btn-primary">Send</button>

                            <br />
                            <br />
                    </div>
                </div>
            </div>
        </div>
    );
  }
}