//@flow

import * as React from 'react';
import { Component,} from 'react-simplified';
import ticketService from '../../Services/ticketService';

export default class EditTicket extends Component {
  render() {
    return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Endre sak:</h1>

                            <hr />

                            <h4>Tittel:</h4>
                            <input className="form-control" defaultValue="Hull i veien"/>

                             <h4>Beskrivelse:</h4>
                            <textarea className="form-control" style={{width:"100%"}} defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus."/>
                            
                            <h4>Kategori:</h4>
                            <select>
                                <option>Hærverk</option>
                                <option>Søppel</option>
                                <option selected="selected">Veiproblem</option>
                            </select>

                            <h4>Bilde:</h4>
                           
                            <input type="file" className="form-control-file" id="InputFile"/>
                            <small id="fileHelp" className="form-text text-muted"></small>
                            {/* need to fix default value here */}

                            <hr />

                            Map here

                            <hr />

                            <button type="button" className="btn btn-primary">Lagre</button>

                        </div>
                    </div>
                </div>
                <div style={{height: '150px'}}></div>
            </div>
        );
    }
}