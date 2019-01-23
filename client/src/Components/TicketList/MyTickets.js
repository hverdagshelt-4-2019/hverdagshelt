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
    allTickets = [];
    filter = '';
    constructor() {
        super();
        this.state = {
            tickets: []
        };
    } 

    render(){
        return(
            <div className={css.aroundTickets}>
                <br />
                <div className="row">
                    <select id="sorting" className="shadow-sm" style={{marginLeft: '65%', width: '30%'}}  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.sortBy(event.target.value))}>
                        <option  id ="optionNyeste" key={"nyeste"}>Nyeste først</option>
                        <option  id ="optionEldste" key={"eldste"}>Eldste først</option>
                        <option  id ="optionBearbeides" key={"fullført"}>Fullført først</option>
                        <option  id ="optionBearbeides" key={"ubehandlet"}>Ubehandlet først</option>
                        <option  id ="optionEldste" key={"mestP"}>Mest populær</option>
                        <option  id ="optionEldste" key={"minstP"}>Minst populær</option>
                    </select>
                    <div className="col-md-11 col-sm-offset-2 col-sm-8  float-right" style={{
                    float: "right",
                    marginLeft: '5%'}}>
                    <ul className={css.ticketList}>
                        {this.state.tickets.map((ticket, i) => (
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
            .then((tickets : {data: Ticket[]}) => {
                this.allTickets = tickets.data;
                this.allTickets.sort(function(a,b){return new Date(b.submitted_time) - new Date(a.submitted_time)});
                this.setState({tickets: this.allTickets});
            })
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
    
    sortBy(by: string){
        //event.target.value
        switch(by) {
            case "Nyeste først":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return new Date(b.submitted_time) - new Date(a.submitted_time)})});
                break;
            case "Eldste først":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return new Date(a.submitted_time) - new Date(b.submitted_time)})});
                break;
            case "Fullført først":
                this.setState({tickets: this.state.tickets.sort(function(a,b){
                    if(a.status == "Fullført"){
                        return -10000;

                    }else if(b.status == "Fullført"){
                        return 10000;
                    }
                    else {
                        return (''+a.status).localeCompare(b.status);
                    }
                    })});
                break;
            case "Ubehandlet først":
                this.setState({tickets: this.state.tickets.sort(function(a,b){
                    if(a.status == "Fullført"){
                        return 10000;

                    }else if(b.status == "Fullført"){
                        return -10000;
                    }
                    else {
                        return (''+b.status).localeCompare(a.status);
                    }
                    })});
                break;
            case "Mest populær":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return b.countcomm - a.countcomm})});
                break;
            case "Minst populær":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return a.countcomm - b.countcomm})});
                break;
        }

    }

}
