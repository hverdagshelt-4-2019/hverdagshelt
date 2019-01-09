//@flow

import * as React from 'react';
import { Component } from 'react-simplified';

export class Ticket extends Component {
  ticket = '';

  render() {
    return (
      <ul>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <img src="rhyme.jpg" />
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <h1>Graffiti på vegg</h1>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <span className="commune">
                <b>Kommune:</b> Trondheim
              </span>
              <span className="category">
                <b>Kategori:</b> Hærverk
              </span>
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">
              <b>Status:</b> Avventer svar
            </div>
            <div className="col-md-2" />
          </div>

          <div className="row">
            <div className="col-md-2" />
            <div className="col-md-8">Maaaaaaaaaassssee tekst</div>
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
              <h4>Svar fra kommune:</h4>
              <p>Fuuuuullt av svar</p>
            </div>
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
      </ul>
    );
  }
}
