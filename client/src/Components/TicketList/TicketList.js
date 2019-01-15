//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {ticketService} from '../../Services/ticketService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleTicket from './SingleTicket';

//--- This class is not finished. No filter function created. ---\\
//At the moment, the list displays all tickets, not filtered.

export default class TicketList extends Component{
    communes = [];
    ticketCategories : Category[] = []; //Ticking off input box will add category to the array
    tickets = []; //After fetching tickets, they will be put here, then mapped into list

    render(){
        return(
            <div className='container'>
                <h1>Liste over saker</h1>
                <br/>
                <div className="row">
                    <div className="col-md-4" style={{
                        border: "2px solid lightblue",
                        }}>
                        <br/>
                        <input className="form-control" type="text" placeholder="Søk"/>
                        <br/>
                        <h4>Kategorier</h4>
                        {this.ticketCategories.map((category) => (
                            <div>
                                <input value={category.name} type="checkbox" defaultChecked onChange={(evt) => this.itemChecked(category.name)}  />
                                <label>{category.name}</label>
                            </div> 
                        ))}
                        <br/>
                        <input type="checkbox" />
                        <label>Vis arkiverte saker</label>  
                    
                    </div>

                    <div className="col-md-8" style={{
                        border: "2px solid lightblue",
                        }}>
                        <br/>
                        <li className="list-group-item" >
                            {this.tickets.map((ticket) => (
                                <SingleTicket title = {ticket.title} category = {ticket.category_id} />
                            ))}
                        </li>
                    </div>
                </div>
            </div>
        )
    }

    mounted(){
        /*
        //Get relevant communes for the user
        communeService.getFollowedCommunes()
        .then((communes : Commune[]) => this.communes = communes)
        .catch((error : Error) => console.log(error));

        //Then get all the tickets from these communes
        ticketService.getAllTickets([{id:'1', name:'Trondheim'}]) //Test values, will be changed to this.communes later.
        .then((tickets : Ticket[]) => this.tickets = tickets)
        .catch((error : Error) => console.log("Error occured: " + error.message));
        */

        //Get categories for the possibility to filter
        categoryService.getTicketCategories()
        .then((categories : Category[]) =>  this.ticketCategories = categories)
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
       let e = document.getElementById("arrow");
        if(e.getAttribute("data-temp")=="false"){
           e.setAttribute("data-temp", "true");
           document.getElementById("tempText").innerHTML = "";
       }
       if(e.getAttribute("class")=="fa fa-arrow-right"){
           e.setAttribute("class", "fa fa-arrow-left");
       }else{
          e.setAttribute("class", "fa fa-arrow-right");
       }
   }

}
