//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/TicketService';
import { Alert} from '../../widgets';
import { Navbar_person } from '../Navbars/Navbar_person';

export class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket = '';

  render() {
    return (
        <div className="container-fluid">
        <Navbar_person />
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
            <img src={this.ticket.picture} className="img-responsive" />
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <h1>{this.ticket.title}</h1>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <span className="commune">
                <b>Kommune:</b> Trondheim
              </span>
              <span className="company">
                <b>Bedrift:</b> Ingen
              </span>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <span className="commune">
              <b>Status:</b> {this.ticket.status}
              </span>
              <span className="company">
                <b>Kategori:</b> Hærverk
              </span>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <b>Innsendt:</b> {this.ticket.submitted_time}
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">{this.ticket.description}</div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">Map</div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <h4>Skriv melding:</h4>
              <textarea rows="10" cols="100" />
              <button className="button">Send</button>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
    );
  }

  mounted() {
    ticketService
      .getTicket(this.props.match.params.id)
      .then(ticket => (this.ticket = ticket[0]))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
