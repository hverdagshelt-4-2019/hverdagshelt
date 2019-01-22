//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleTicket from './SingleTicket';
import Ticket from '../Ticket/Ticket';
import css from './ticketStyle.css';
import $ from 'jquery';

//--- This class is not finished. No filter function created. ---\\
//At the moment, the list displays all tickets, not filtered.

export default class TicketList extends Component{
    followedCommunes : Commune[] = [];
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
            <div className={"shadow " + css.aroundTickets}>
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
                        {this.ticketCategories.map(category =>
                        <li key={category.name} className="list-group-item">
                            <div style={{marginLeft: "6px"}}>
                                <input type="checkbox" style={{width: "17px", height: "17px"}} className="form-check-input markCheck cat" id={"check"+category.name} defaultChecked/>
                                <label className="form-check-label" style={{marginTop: "3px"}} htmlFor={"check"+category.name}>{category.name}</label>
                            </div>
                        </li>
                        )}
                        {this.followedCommunes.map(commune =>
                        <li key={commune.name} className="list-group-item">
                            <div style={{marginLeft: "6px"}}>
                                <input type="checkbox" style={{width: "17px", height: "17px"}} className="form-check-input markCheck cat" id={"check"+category.name} defaultChecked/>
                                <label className="form-check-label" style={{marginTop: "3px"}} htmlFor={"check"+commune.name}>{commune.name}</label>
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
                        <button type="submit list-group-item" onClick={this.updateTickets} className="btn customBtn"><i className="fas fa-filter" style={{marginRight: "4px"}}></i>Filtrer</button>
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
                        <ul className={css.ticketList}>
                            {this.state.tickets.map((ticket, i) => (
                                    <div>
                                    <SingleTicket 
                                        key={i}
                                        theTicket={ticket}
                                    />
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
        document.getElementById("arrowBtn").click();
        $("#checkAll").click(function () {
            $(".cat").prop('checked', $(this).prop('checked'));
        });
        communeService.getFollowedCommunes()
        .then((communes : Communes[]) => this.followedCommunes = communes.data)
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
                c.style.width = "70%";
                s.style.width = "25%";
            } else {
                e.setAttribute("class", "fa fa-arrow-right");
                c.style.width = "90%";
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
                    localTickets = localTickets.filter(e => e.status != "Fullført");
                }
            });
            console.log(localTickets);
        }else{
            localTickets = this.allTickets.filter(e => e.status != "Fullført");
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
