//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService, { Category } from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleTicket from './SingleTicket';
import Ticket from '../Ticket/Ticket';
import css from './ticketStyle.css';

//--- This class is not finished. No filter function created. ---\\
//At the moment, the list displays all tickets, not filtered.

export default class MyTickets extends Component{
    communes = [];
    tickets = [];
    filter = '';

    render(){
        return(
            <div className={css.aroundTickets}>
                <br/>

                <div className="row">
                        <br/>
                        <input style={{width: "90%", marginLeft: "5%"}} className="form-control" type="text" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.filter = event.target.value)} placeholder="Søk"/>
                        <br/>
                    <div className="col-md-11 col-sm-offset-2 col-sm-8  float-right" style={{
                    float: "right",
                    marginLeft: '5%'}}>
                    <br />
                    <ul className={css.ticketList}>
                        {this.tickets.map((ticket, i) => (
                            <div>
                            <SingleTicket
                                key={i}
                                theTicket={ticket}
                            >
                            </SingleTicket>
                            <SingleTicket.Options id={ticket.id}/>
                            </div>
                        ))}
                        </ul>
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
