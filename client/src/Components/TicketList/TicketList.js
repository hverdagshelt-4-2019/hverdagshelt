//@flow
import { ReactDOM } from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { ticketService } from '../../services/TicketService';

export class TicketList extends Component {
  communeIds = [];
  tickets = [];

  render() {
    return (
      <div className="container">
        <br />
        <div className="row justify-content-between">
          <div
            className="col-4"
            style={{
              border: '2px solid grey',
              boxShadow: '5px 10px #D8D8D8'
            }}
          >
            <br />
            <input className="form-control" type="text" placeholder="Søk" />
            <br />
            <h5>Kategorier</h5>
            <input type="checkbox" />
            <label>Kategori 1</label>
            <br />
            <input type="checkbox" />
            <label>Vis arkiverte saker</label>
          </div>
          <div
            className="col-7"
            style={{
              border: '2px solid grey',
              boxShadow: '5px 10px #D8D8D8'
            }}
          >
            <br />
            <li className="list-group-item">
              <div className="row">
                <div
                  className="col-3"
                  style={{
                    width: '200px',
                    height: '100px',
                    border: '1px solid black',
                    margin: '2px'
                  }}
                >
                  <img src="" />
                </div>
                <div col-9>
                  {' '}
                  <NavLink activeStyle={{ color: 'darkblue' }} style={{ width: '10px' }} to={' '}>
                    <h5>En overskrift som beskriver problem</h5>
                  </NavLink>
                  <br />
                  <br /> - En kategori - En by{' '}
                  <div style={{ float: 'right' }}>
                    <button className="btn btn-primary btn-sm">Legg til bedrift</button>{' '}
                    <button className="btn btn-primary btn-sm">Svar</button>
                  </div>
                </div>
              </div>
            </li>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    ticketService.getAllCommuneTickets(this.communeIds).then(tickets => (this.tickets = tickets));
  }
}