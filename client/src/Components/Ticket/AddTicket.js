//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/ticketService';
import  categoryService  from '../../Services/categoryService';
import { Navbar_person } from '../Navbars/Navbar_person';
import { Alert } from '../../widgets';

export default class AddTicket extends Component {
ticketCategories: Category[] = [];
ticket = {
    category: '',
    title: '',
    description: '',
    picture: '',
    lat: '',
    long:''
};

  render() {
    return (
        <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Rapporter en ny sak:</h1>

                            <hr />

                            <h4>Tittel:</h4>
                            <input className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ticket.title = event.target.value)}/>

                             <h4>Beskrivelse:</h4>
                            <textarea className="form-control" style={{width:"100%"}} 
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ticket.description = event.target.value)}
                            />

                            <h4>Kategori:</h4>
                            
                            <select onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.ticket.category = event.target.value)}>
                                {this.ticketCategories.map((ticketCategories, i) => (
                                <option value={ticketCategories.name} key={i}>
                                    {ticketCategories.name}
                                </option>
                                ))}
                            </select>


                            <h4>Bilde:</h4>
                            <label htmlFor="InputFile">Last opp bilde</label>
                            <input type="file" className="form-control-file" id="InputFile"/>
                            <small id="fileHelp" className="form-text text-muted"></small>
                            {/* needs to be added function to listen to changes */}
                            <hr />

                            Map here

                            <hr />

                            <button type="button" className="btn btn-primary" onClick={this.save}>Send</button>

                            <br />
                            <br />
                    </div> 
                </div>
            </div>
        </div>
    );
  }

    mounted() {
        categoryService.getTicketCategories()
        .then((categories: Array<Category>) => this.ticketCategories = categories.data)
        .catch((error : Error) => console.log(error.message));
        
    }

    save() {
        if (!this.ticket.title || !this.ticket.description || !this.ticket.category) return null;

        ticketService
            .postTicket(ticket)
            .then(() => {
            if (this.ticket.title && this.ticket.description && this.ticket.category) history.push('/home');
            })
            
    }
}