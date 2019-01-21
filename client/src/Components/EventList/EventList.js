//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import eventService from '../../Services/eventService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleEvent from './SingleEvent';

export default class EventList extends Component{
    communes = [];
    communesArray = [];
    eventCategories : Category[] = []; 
    allEvents = [];

    constructor() {
        super();
        this.state = {
            events: []
        };
    } 

    render(){
        return(
            <div>
                <h1>Liste over events i din kommune</h1>
                <br/>
                <div className="col-xs-6 col-sm-pull-9 sidebar-offcanvas" id="sidebar" style={{width: '25%', float: 'left', margin: '10px'}}>
                    <h5 id="tempText">Kategorier:</h5>
                    <button className="btn" onClick={this.changeArrow} data-toggle="collapse" href="#allOptionsCat">
                        <i id="arrow" data-temp="false" className="fa fa-arrow-right"></i> 
                    </button>
                    <div className="list-group collapse in shadow" id="allOptionsCat">
                        <p className="list-group-item bg-primary" style={{color: "white"}}>Velg kategorier</p>
                        <li className="list-group-item">
                            <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input" id="checkAll" defaultChecked/>
                            <label className="form-check-label" htmlFor="checkAll">Alle kategorier</label>
                        </li>
                        {this.eventCategories.map(category =>
                        <li key={category.name} className="list-group-item">
                            <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input markCheck" id={"check"+category.name} defaultChecked/>
                            <label className="form-check-label" htmlFor={"check"+category.name}>{category.name}</label>
                        </li>
                        )}
                        <li className="list-group-item">
                            <br/>
                            <input type="checkbox" style={{width: "15px", height: "15px"}} className="form-check-input" id="arkiverteEvents"/>
                            <label className="form-check-label" htmlFor="arkiverteEvents">Vis arkiverte events</label>
                        </li>
                        <button type="submit list-group-item" onClick={this.updateEvents} className="btn btn-primary">Sorter</button>
                    </div>
                </div>
                <div className="row" style={{width: '60%'}}>
                    <div className="col-md-11 float-right border shadow bg-white rounded" style={{
                        border: "2px solid lightblue",
                        float: "right",
                        marginLeft: '10%'}}>
                        <br/>
                        <div>
                            {this.allEvents.map((event, i) => (
                                <div key={i}>
                                    <SingleEvent theEvent={event}>
                                        <SingleEvent.Options id={event.id}/>
                                    </SingleEvent>
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
        //eventService.getAllEvents()
        //.then(events => console.log(events.data));
        //.then(events => this.allEvents = events.data);

        eventService.getAllEvents() 
        .then((events : {data: Event[]}) => { 
            this.allEvents = events.data;
            this.allEvents.sort(function(a,b){return new Date(b.happening_time) - new Date(a.happening_time)});
            let arkEvent = this.allEvents.filter(e => e.status != "Fullført");
            this.setState({events: arkEvents});
            console.log("hei" +this.state.events);
        })
        .catch((error : Error) => console.log("Error occured: " + error.message));
        
        //Get categories for the possibility to filter //OK
        categoryService.getEventCategories()
        .then((categories : Category[]) =>  this.eventCategories = categories.data)
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
    updateEvents(){
        console.log("Updated events");
        let localEvents = [];
        if(!document.getElementById("checkAll").checked){
            this.eventCategories.forEach(categories => {
                if(document.getElementById("check"+categories.name).checked){
                    localEvents = localEvents.concat(this.allEvents.filter(e => e.category == categories.name));
                }
            });
            localEvents.sort(function(a,b){return new Date(b.happening_time) - new Date(a.happening_time)});
            console.log(localEvents);
        }else{
            localEvents = this.allEvents;
        } 
         if(document.getElementById("arkiverteSaker").checked){
            localEvent = localEvents.filter(e => e.status == "Fullført");
        }
        this.setState({events: localEvents});
    }

}
