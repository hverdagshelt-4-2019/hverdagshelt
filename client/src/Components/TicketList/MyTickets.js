//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService, { Category } from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleTicket from './SingleTicket';
import Ticket from '../Ticket/Ticket';

//--- This class is not finished. No filter function created. ---\\
//At the moment, the list displays all tickets, not filtered.

export default class MyTickets extends Component{
    communes = [];
    tickets = [];
    filter = '';

    render(){
        return(
            <div className='container'>
                <h1>Liste over saker du har sendt inn</h1>
                <br/>

                <div className="row">
                    <div className="col-md-4" style={{
                        border: "2px solid lightblue",
                    }}>
                        <br/>
                        <input className="form-control" type="text" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.filter = event.target.value)} placeholder="Søk"/>
                        <br/>

                    </div>

                    <div className="col-md-8" style={{
                        border: "2px solid lightblue",
                    }}>
                        <br/>
                        <div>
                            {this.tickets.map((ticket, i) => (
                                <SingleTicket
                                    key={i}
                                    theTicket={ticket}
                                >
                                    <SingleTicket.Options id={ticket.id}/>
                                </SingleTicket>
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{height: '150px'}} />
            </div>
        )
    }

    mounted(){

        //Then get all the tickets from these communes
        ticketService.getTicketsUser()
            .then((tickets : {data: Ticket[]}) => this.tickets = tickets.data)
            .catch((error : Error) => console.log("Error occured: " + error.message));

        //--Get tickets based on commune and checked categories--
        //ticketService.getTicketsByCommuneAndCategory(this.communeId, this.categories)
        //.then(tickets => this.tickets = tickets);
    }

    itemChecked(){

        //When unchecking a category, tickets refreshed
        /*
        ticketService.getTicketsByCommuneAndCategory(this.communeId, this.categories)
        .then(tickets => this.tickets = tickets);
        */
    }

    changeArrow(){
        let e: HTMLElement|null = document.getElementById("arrow");
        if(e) {
            if (e.getAttribute("data-temp") === "false") {
                e.setAttribute("data-temp", "true");
                let temptext = document.getElementById("tempText");
                if(temptext) temptext.innerHTML = "";
            }
            if (e.getAttribute("class") === "fa fa-arrow-right") {
                e.setAttribute("class", "fa fa-arrow-left");
            } else {
                e.setAttribute("class", "fa fa-arrow-right");
            }
        }
    }




}
