//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/TicketService';

export class AddTicket {
  render() {
    return (
      <ul>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
            <h2>Raporter en ny sak:</h2>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
          <h4>Tittel:</h4>
          <input />
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
          <h4>Beskrivelse:</h4>
          <textarea
            rows="10"
            cols="100"
          />
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
            <h4>Kategori:</h4>
         <select>
              <option>Hærverk</option>
                <option>Søppel</option>
                <option>Strøing</option>
              </select>{' '}
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
            <h4>Bilde:</h4>
            <label htmlFor="InputFile">Last opp bilde</label>
           <input type="file" className="form-control-file" id="InputFile"/>
           <small id="fileHelp" className="form-text text-muted"></small>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
            <h4>Plassering:</h4>
            </div>
            <div className="col-md-2" />
          </div>
        </div>
      </ul>
    );
  }
}