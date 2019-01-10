//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/TicketService';
import { Alert} from '../../widgets';
import { Navbar_person } from '../Navbars/Navbar_person';

export class Ticket_your extends Component<{ match: { params: { id: number } } }> {
  ticket = '';

  render() {
    return (
        <div className="container-fluid">
        <Navbar_person />
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderUp">
            <img src="rhyme.jpg" className="img-responsive" />
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderUp">
              <h1>Grafiti</h1>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderUp">
              <span id="commune">
                <b>Kommune:</b> Trondheim
              </span>
              <span id="company">
                <b>Bedrift:</b> Ingen
              </span>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderUp">
              <span id="commune">
              <b>Status:</b> Avventer svar
              </span>
              <span id="company">
                <b>Kategori:</b> Hærverk
              </span>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderUp">
              <b>Innsendt:</b> 09:31 10.01.2019
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderUp">
            Dayo dayo dayo
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderDown">
            <button type="button" class="btn btn-success" onClick={this.endre}>Endre</button>
            {' '}
            <button type="button" class="btn btn-danger" onClick={this.delete}>Slett</button>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="borderSide">Map</div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8" id="border">
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
  endre() {
    history.push('/ticket/edit/' + this.ticket.id);
  }

  delete() {
    ticketService
    .deleteTicket(this.ticket.id)
    .catch((error: Error) => Alert.danger(error.message));
    history.push('/home');
  }
}
