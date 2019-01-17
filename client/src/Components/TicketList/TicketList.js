//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleTicket from './SingleTicket';
import Ticket from '../Ticket/Ticket';

//--- This class is not finished. No filter function created. ---\\
//At the moment, the list displays all tickets, not filtered.

export default class TicketList extends Component{
    communes = [];
    ticketCategories : Category[] = []; //Ticking off input box will add category to the array
    allTickets = [];
    constructor() {
        super();
        this.state = {
            tickets: []
        };
    } 

    render(){
        return(
            <div className='container'>
                <h1>Liste over saker</h1>
                <br/>
                <div className="row">
                    <div className="col-xs-6 col-sm-pull-9 sidebar-offcanvas" id="sidebar" style={{width: '20%'}}>
                        <h5 id="tempText">Kategorier:</h5>
                        <button className="btn" onClick={this.changeArrow} data-toggle="collapse" href="#allOptionsCat">
                            <i id="arrow" data-temp="false" className="fa fa-arrow-right"></i> 
                        </button>
                        <div className="list-group collapse in" id="allOptionsCat">
                            <p className="list-group-item bg-primary" style={{color: "white"}}>Velg kategorier</p>
                            <li className="list-group-item">
                                <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input" id="checkAll" defaultChecked/>
                                <label className="form-check-label" htmlFor="checkAll">Alle kategorier</label>
                            </li>
                            {this.ticketCategories.map(category =>
                            <li key={category.name} className="list-group-item">
                                <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input markCheck" id={"check"+category.name} defaultChecked/>
                                <label className="form-check-label" htmlFor={"check"+category.name}>{category.name}</label>
                            </li>
                            )}
                            <li className="list-group-item">
                                <br/>
                                <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input" id="arkiverteSaker"/>
                                <label className="form-check-label" htmlFor="arkiverteSaker">Vis arkiverte saker</label>
                            </li>
                            <button type="submit list-group-item" onClick={this.updateTickets} className="btn btn-primary">Sorter</button>
                        </div>
                    </div>
                    <div className="col-md-8" style={{
                        border: "2px solid lightblue",
                        float: "right"}}>
                        <br/>
                        <div>
                            {this.state.tickets.map((ticket, i) => (
                                <div>
                                    <SingleTicket 
                                        key={i}
                                        theTicket={ticket}
                                    />
                                </div>
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
        ticketService.getAllTickets() //this.communes
        .then((tickets : {data: Ticket[]}) => { 
            this.allTickets = tickets.data;
            this.allTickets.sort(function(a,b){return new Date(b.submitted_time) - new Date(a.submitted_time)});
            this.setState({tickets: this.allTickets});
            console.log("hei" +this.state.tickets);
        })
        .catch((error : Error) => console.log("Error occured: " + error.message));
        //Get categories for the possibility to filter //OK
        categoryService.getTicketCategories()
        .then((categories : Category[]) =>  this.ticketCategories = categories.data)
        .catch((error : Error) => console.log("Error occured: " + error.message));

        //--Get tickets based on commune and checked categories--
        //ticketService.getTicketsByCommuneAndCategory(this.communeId, this.categories)
        //.then(tickets => this.tickets = tickets);  
        /*ticketService.getAllTickets() //this.communes
        .then((tickets: Ticket[]) => this.setState({tickets}, () => {
        console.log('Tickets fetched...', tickets);
        this.allTickets = [];
        this.allTickets = this.allTickets.concat(tickets);
        console.log(this.allTickets);
        }
        ));*/ 
            
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
    updateTickets(){
        console.log("Updated tickets");
        if(!document.getElementById("checkAll").checked){
            let localTickets = [];
            this.ticketCategories.forEach(categories => {
                if(document.getElementById("check"+categories.name).checked){
                    console.log("yep");
                    localTickets = localTickets.concat(this.allTickets.filter(e => e.category == categories.name));
                }
            });
            localTickets.sort(function(a,b){return new Date(b.submitted_time) - new Date(a.submitted_time)});
            this.setState({tickets: localTickets});
            console.log(localTickets);
        }else{
            this.setState({tickets: this.allTickets});
            console.log(this.allTickets);
        }
    }
   


}
