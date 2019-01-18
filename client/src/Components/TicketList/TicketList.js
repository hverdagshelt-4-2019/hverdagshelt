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
            <div>
                <br/>
                <div className="col-xs-6 col-sm-pull-9 sidebar-offcanvas" id="sidebar" style={{width: '2%', float: 'left', margin: '1%'}}>
                    <h5 id="tempText">Kategorier:</h5>
                    <button className="btn" onClick={this.changeArrow} data-toggle="collapse" href="#allOptionsCat">
                        <i id="arrow" data-temp="false" className="fa fa-arrow-right"></i> 
                    </button>
                    <div className="list-group collapse in shadow" id="allOptionsCat">
                        <p className="list-group-item lightBlue">Velg kategorier</p>
                        <li className="list-group-item blue">
                            <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input" id="checkAll" defaultChecked/>
                            <label className="form-check-label" htmlFor="checkAll">Alle kategorier</label>
                        </li>
                        {this.ticketCategories.map(category =>
                        <li key={category.name} className="list-group-item blue">
                            <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input markCheck" id={"check"+category.name} defaultChecked/>
                            <label className="form-check-label" htmlFor={"check"+category.name}>{category.name}</label>
                        </li>
                        )}
                        <li className="list-group-item blue">
                            <br/>
                            <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input" id="arkiverteSaker"/>
                            <label className="form-check-label" htmlFor="arkiverteSaker">Vis bare arkiverte saker</label>
                        </li>
                        <button type="submit list-group-item" onClick={this.updateTickets} className="btn customBtn">Sorter</button>
                    </div>
                </div>
                <div id="cases" className="row" style={{height: 'auto', width: '85%'}}>
                    <select id="sorting" className="shadow-sm" style={{marginLeft: '70%', width: '30%', marginBottom: '5px'}}  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.sortBy(event.target.value))}>
                        <option  id ="optionNyeste" key={"nyeste"}>Nyeste først</option>
                        <option  id ="optionEldste" key={"eldste"}>Eldste først</option>
                        <option  id ="optionBearbeides" key={"bearbeides"}>Bearbeides først</option>
                        <option  id ="optionUbehandlet" key={"ubehandlet"}>Ubehandlet først</option>
                    </select>
                    <div className="col-md-11 float-right border shadow rounded" style={{
                        border: "2px solid lightblue",
                        float: "right",
                        marginLeft: '10%'}}>
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
                <div style={{height: '200px'}} />
            </div>
        )
    }

    mounted(){

        //Then get all the tickets from these communes
        ticketService.getAllTickets() //this.communes
        .then((tickets : {data: Ticket[]}) => { 
            this.allTickets = tickets.data;
            this.allTickets.sort(function(a,b){return new Date(b.submitted_time) - new Date(a.submitted_time)});
            let arkTickets = this.allTickets.filter(e => e.status != "Fullført");
            this.setState({tickets: arkTickets});
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
        let c = document.getElementById("cases");
        let s = document.getElementById("sidebar");
        if(e) {
            if (e.getAttribute("data-temp") === "false") {
                e.setAttribute("data-temp", "true");
                let temptext = document.getElementById("tempText");
                if(temptext) temptext.innerHTML = "";
            }
            if (e.getAttribute("class") === "fa fa-arrow-right") {
                e.setAttribute("class", "fa fa-arrow-left");
                c.style.width = "65%";
                s.style.width = "25%";
            } else {
                e.setAttribute("class", "fa fa-arrow-right");
                c.style.width = "85%";
                s.style.width = "2%";
            }
        }
    }
    updateTickets(){
        console.log("Updated tickets");
        let localTickets = [];
        if(!document.getElementById("checkAll").checked){
            this.ticketCategories.forEach(categories => {
                if(document.getElementById("check"+categories.name).checked){
                    localTickets = localTickets.concat(this.allTickets.filter(e => e.category == categories.name));
                }
            });
            console.log(localTickets);
        }else{
            localTickets = this.allTickets;
        } 
         if(document.getElementById("arkiverteSaker").checked){
            localTickets = localTickets.filter(e => e.status == "Fullført");
        }
        //this.setState({tickets: localTickets});
        let by = document.getElementById("sorting").value;
        console.log(by)
         switch(by) {
            case "Nyeste først":
                localTickets.sort(function(a,b){return new Date(b.submitted_time) - new Date(a.submitted_time)});
                break;
            case "Eldste først":
                localTickets.sort(function(a,b){return new Date(a.submitted_time) - new Date(b.submitted_time)});
                break;
            case "Bearbeides først":
                localTickets.sort(function(a,b){return (''+a.status).localeCompare(b.status)});
                break;
            case "Ubehandlet først":
                localTickets.sort(function(a,b){return (''+b.status).localeCompare(a.status)});
                break;
        }
        this.setState({tickets: localTickets})

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
            case "Bearbeides først":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return (''+a.status).localeCompare(b.status)})});
                break;
            case "Ubehandlet først":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return (''+b.status).localeCompare(a.status)})});
                break;
        }

    }

}
