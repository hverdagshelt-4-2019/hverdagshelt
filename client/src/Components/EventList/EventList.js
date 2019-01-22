//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import eventService from '../../Services/eventService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleEvent from './SingleEvent';
import css from './eventStyle.css';
import $ from 'jquery';

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
            <div className={"shadow " + css.aroundEvents}>
                <br/>
                <div className="col-xs-6 col-sm-pull-9 sidebar-offcanvas" id="sidebar" style={{width: '2%', float: 'left', margin: '1%'}}>
                    <h5 id="tempText">Kategorier:</h5>
                    <button id="arrowBtn" className={"btn customBtn " + css.btnCircle} onClick={this.changeArrow} data-toggle="collapse" href="#allOptionsCat">
                        <i id="arrow" data-temp="false" className="fa fa-arrow-right"></i> 
                    </button>
                    <div className="list-group collapse in shadow" id="allOptionsCat">
                        <p className="list-group-item blue" style={{textAlign: "center"}}> <i className="fas fa-edit" style={{marginRight: "4px"}}></i>Velg kategorier</p>
                        <li className="list-group-item">
                            <div style={{marginLeft: "6px"}}>
                                <input type="checkbox" style={{width: "17px", height: "17px"}} className="form-check-input cat" id="checkAll" defaultChecked/>
                                <label className="form-check-label" style={{marginTop: "3px"}} htmlFor="checkAll">Alle kategorier</label>
                            </div>
                        </li>
                        {this.eventCategories.map(category =>
                        <li key={category.name} className="list-group-item">
                            <div style={{marginLeft: "6px"}}>
                                <input type="checkbox" style={{width: "17px", height: "17px"}} className="form-check-input markCheck cat" id={"check"+category.name} defaultChecked/>
                                <label className="form-check-label" style={{marginTop: "3px"}} htmlFor={"check"+category.name}>{category.name}</label>
                            </div>
                        </li>
                        )}
                        <li className="list-group-item">
                            <div style={{marginLeft: "6px"}}>
                                <br/>
                                <input type="checkbox" style={{width: "17px", height: "17px"}} className="form-check-input" id="arkiverteSaker"/>
                                <label className="form-check-label" style={{marginTop: "3px"}} htmlFor="arkiverteSaker">Vis bare arkiverte saker</label>
                            </div>
                        </li>
                        <button type="submit list-group-item" onClick={this.updateEvents} className="btn customBtn"><i className="fas fa-filter" style={{marginRight: "4px"}}></i>Filtrer</button>
                    </div>
                </div>
                <br />
                <div id="cases" className="row" style={{height: 'auto', width: '90%'}}>
                    <select id="sorting" className="shadow-sm" style={{marginLeft: '65%', width: '30%'}}  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.sortBy(event.target.value))}>
                        <option  id ="optionNyeste" key={"nyeste"}>Nyeste først</option>
                        <option  id ="optionEldste" key={"eldste"}>Eldste først</option>
                        <option  id ="optionBearbeides" key={"bearbeides"}>Bearbeides først</option>
                        <option  id ="optionUbehandlet" key={"ubehandlet"}>Ubehandlet først</option>
                    </select>
                    <div className="col-md-11 col-sm-offset-2 col-sm-8  float-right" style={{
                        float: "right",
                        marginLeft: '5%'}}>
                        <br />
                        <ul className={css.eventList}>
                            {this.allEvents.map((event, i) => (
                                <div key={i}>
                                    <SingleEvent theEvent={event}>
                                    </SingleEvent>
                                    <SingleEvent.Options id={event.id}/>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>
                <div style={{height: '80px'}} />
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
        document.getElementById("arrowBtn").click();
        $("#checkAll").click(function () {
            $(".cat").prop('checked', $(this).prop('checked'));
        });

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
                c.style.width = "70%";
                s.style.width = "25%";
            } else {
                e.setAttribute("class", "fa fa-arrow-right");
                c.style.width = "90%";
                s.style.width = "2%";
            }
        }
    }

    itemChecked(){
        
        //When unchecking a category, tickets refreshed
        /*
        ticketService.getTicketsByCommuneAndCategory(this.communeId, this.categories)
        .then(tickets => this.tickets = tickets);
        */
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
