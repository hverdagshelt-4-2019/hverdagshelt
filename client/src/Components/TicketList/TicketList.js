//@flo
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import SingleTicket from './SingleTicket';
import Ticket from '../Ticket/Ticket';
import css from './ticketStyle.css';
import PageNavigator from '../PageNavigator/PageNavigator'

//--- This class is not finished. No filter function created. ---\\
//At the moment, the list displays all tickets, not filtered.

export default class TicketList extends Component{
    followedCommunes : Commune[] = [];
    ticketCategories : Category[] = []; //Ticking off input box will add category to the array
    allTickets = [];
    level = '';
    base = 0;
    pageLim = 20;
    checkAllCommunes = true;
    checkedCommunes = []
    checkAllCategories = true;
    checkedCategories = []

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
                <h3 className="col-xs-6 col-sm-pull-9" align="center" style={{fontFamily: "Lato, sans-serif", fontWeight: "600", opacity: "0.7"}}>
                    Liste over saker
                    {(localStorage.getItem('level') == 'publicworker') && ' fra din kommune' }
                    {(localStorage.getItem('level') == 'user') && ' fra kommunene du følger' }
                </h3>
                <hr/>
                <div className="col-xs-6 col-sm-pull-9 sidebar-offcanvas" id="sidebar" style={{width: '2%', float: 'left', margin: '1%'}}>
                    <h5 id="tempText">Kategorier:</h5>
                    <button id="arrowBtn" className={"btn customBtn " + css.btnCircle} onClick={this.changeArrow} data-toggle="collapse" href="#allOptionsCat">
                        <i id="arrow" data-temp="false" className="fa fa-arrow-right"></i> 
                    </button>
                    <ul className="list-group collapse in shadow" id="allOptionsCat">
                        <div className="list-group">
                            <p className="list-group-item blue" style={{textAlign: "center"}}> <i className="fas fa-edit" style={{marginRight: "4px"}}></i>Velg kategorier</p>
                            <li className="list-group-item">
                                <div style={{marginLeft: "6px"}}>
                                    <input type="checkbox" onChange={() => this.toggleIt('cat')} style={{width: "17px", height: "17px"}} className="form-check-input cat" checked={this.checkAllCategories}/>
                                    <label className="form-check-label" style={{marginTop: "3px"}} htmlFor="checkAll">Alle kategorier</label>
                                </div>
                            </li>
                            {this.ticketCategories.map((category, index) =>
                            <li key={category.name} className="list-group-item">
                                <div style={{marginLeft: "6px"}}>
                                    <input type="checkbox" style={{width: "17px", height: "17px"}} onChange={() => this.checkIt(index, 'cat')} className="form-check-input markCheck cat" checked={this.checkedCategories[index]} defaultChecked/>
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
                            <button type="submit list-group-item" style={{width: "100%"}} onClick={this.updateTickets} className="btn customBtn"><i className="fas fa-filter" style={{marginRight: "4px"}}></i>Filtrer</button>
                        </div>
                        <p></p>
                        {(localStorage.getItem('level') === 'user' || localStorage.getItem('level') == 'none' || localStorage.getItem('level') == 'admin') &&
                            <div>
                            <p className="list-group-item blue" style={{textAlign: "center"}}><i
                                className="fas fa-edit" style={{marginRight: "4px"}}></i>Velg Kommuner</p>
                                <li className="list-group-item">
                                    <div style={{marginLeft: "6px"}}>
                                        <input type="checkbox" style={{width: "17px", height: "17px"}}
                                               className="form-check-input commune"
                                               onChange={() => this.toggleIt('com')}
                                               checked={this.checkAllCommunes}/>
                                        <label className="form-check-label" style={{marginTop: "3px"}}
                                               htmlFor="checkAllCommunes">Alle Kommuner</label>
                                    </div>
                                </li>
                                <div style={{maxHeight: "500px", overflow: "scroll"}}>
                                    {
                                        this.followedCommunes.map((commune, index) =>
                                            <li key={commune.commune_name} className="list-group-item">
                                                <div key={commune.commune_name} style={{marginLeft: "6px"}}>
                                                    <input type="checkbox" style={{width: "17px", height: "17px"}}
                                                           className="form-check-input markCheck commune"
                                                           checked={this.checkedCommunes[index]}
                                                           onChange={() => this.checkIt(index, 'com')} defaultChecked/>
                                                    <label className="form-check-label" style={{marginTop: "3px"}}
                                                           htmlFor={"check" + commune.commune_name}>{commune.commune_name}</label>
                                                </div>
                                            </li>
                                        )}
                                </div>
                                <button type="submit list-group-item" style={{width: "100%"}} onClick={this.updateTickets} className="btn customBtn"><i className="fas fa-filter" style={{marginRight: "4px"}}></i>Filtrer</button>
                            </div>
                        }
                    </ul>
                </div>
                <br />
                <div id="cases" className="row" style={{height: 'auto', width: '90%'}}>
                    <select id="sorting" className="shadow-sm" style={{marginLeft: '65%', width: '30%'}}  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.sortBy(event.target.value))}>
                        <option  id ="optionNyeste" key={"nyeste"}>Nyeste først</option>
                        <option  id ="optionEldste" key={"eldste"}>Eldste først</option>
                        <option  id ="optionBearbeides" key={"bearbeides"}>Bearbeides først</option>
                        <option  id ="optionUbehandlet" key={"ubehandlet"}>Ubehandlet først</option>
                        <option  id ="optionEldste" key={"mestP"}>Mest populær</option>
                        <option  id ="optionEldste" key={"minstP"}>Minst populær</option>
                    </select>
                    <div className="col-md-11 col-sm-offset-2 col-sm-8  float-right" style={{
                        float: "right",
                        marginLeft: '5%'}}>
                        <br />
                        {this.state.tickets.length ===0 &&
                            <h5 style={{marginLeft: "30%"}}>Ingen saker</h5>
                        }
                        {this.state.tickets.length > this.pageLim &&
                            <PageNavigator increment={this.increment} decrement={this.decrement} pageLim={this.pageLim} pageNumber={this.base+1} base={this.base} totalLimit={this.state.tickets.length}/>
                        }
                                  <ul className={css.ticketList}>
                            {this.state.tickets.slice(this.pageLim*this.base, this.pageLim*(this.base + 1)).map((ticket, i) => (
                                    <div key={ticket.id}>
                                    <SingleTicket 
                                        key={i}
                                        theTicket={ticket}
                                    />
                                    </div>
                            ))}
                        </ul>
                        <br />
                        {this.state.tickets.length > this.pageLim &&
                            <PageNavigator increment={this.increment} decrement={this.decrement} pageLim={this.pageLim} pageNumber={this.base+1} base={this.base} totalLimit={this.state.tickets.length}/>
                        }
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
        .then((categories : Category[]) =>  {this.ticketCategories = categories.data; categories.data.map(() => this.checkedCategories.push(true))})
        .catch((error : Error) => console.log("Error occured: " + error.message));
        document.getElementById("arrowBtn").click();

        setTimeout(() =>{
            let start = performance.now();
            if(localStorage.getItem('level') === 'none'|| localStorage.getItem('level') === 'admin') {
                communeService.getAllCommunes()
                    .then(communes => {this.followedCommunes = communes.data; this.checkedCommunes = new Array(this.followedCommunes.length).fill(true, 0); console.log(performance.now() - start)})
                    .catch(err => console.log(err))
            } else {
                communeService.getFollowedCommunes()
                    .then(communes =>{ this.followedCommunes = communes.data; this.checkedCommunes = new Array(this.followedCommunes.length).fill(true, 0);})
                    .catch((error : Error) => console.log("Error occured: " + error.message));
            }
        }, 200);
    }

    checkIt(i, flag) {
        if(flag === 'com') {
            this.checkedCommunes[i] = !this.checkedCommunes[i];
            this.checkAllCommunes = !this.checkedCommunes.includes(false);
        } else if(flag === 'cat') {
            this.checkedCategories[i] = !this.checkedCategories[i];
            this.checkAllCategories = !this.checkedCategories.includes(false);
        }
    }

    toggleIt(flag) {
        if (flag === 'com') {
            this.checkAllCommunes = !this.checkAllCommunes;
            if (this.checkAllCommunes) {
                this.checkedCommunes = this.checkedCommunes.map(() => true);
            } else {
                this.checkedCommunes = this.checkedCommunes.map(() => false);
            }
        } else if(flag === 'cat') {
            this.checkAllCategories = !this.checkAllCategories;
            if (this.checkAllCategories) {
                this.checkedCategories = this.checkedCategories.map(() => true);
            } else {
                this.checkedCategories = this.checkedCategories.map(() => false);
            }
        }
    }

    increment() {
        this.base++;
    }

    decrement() {
        this.base--;
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
        let localTickets = [];
        if(!this.checkAllCategories) {
            this.checkedCategories.forEach((categoryChecked, index) => {
                if(categoryChecked) {
                    localTickets = localTickets.concat(this.allTickets.filter(e => e.category == this.ticketCategories[index].name));
                }
            });
        } else {
            localTickets = this.allTickets;
        }
        if(document.getElementById("arkiverteSaker").checked){
            localTickets = localTickets.filter(e => e.status == "Fullført");
        }else {
            localTickets = localTickets.filter(e => e.status != "Fullført");
        }
        if(localStorage.getItem("level") == "user" ||  localStorage.getItem("level") == "admin" || localStorage.getItem('level') == 'none'){
            let temp = [];
            this.checkedCommunes.forEach((communeChecked, index) => {
                if(communeChecked){
                    temp = temp.concat(localTickets.filter(e => e.responsible_commune == this.followedCommunes[index].commune_name));
                }
            });
            localTickets = temp;
        }

        //this.setState({tickets: localTickets});
        let by = document.getElementById("sorting").value;
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
            case "Mest populær":
                localTickets.sort(function(a,b){return b.countcomm - a.countcomm});
                break;
            case "Minst populær":
                localTickets.sort(function(a,b){return a.countcomm - b.countcomm});
                break;
        }
        this.base=0;
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
            case "Mest populær":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return b.countcomm - a.countcomm})});
                break;
            case "Minst populær":
                this.setState({tickets: this.state.tickets.sort(function(a,b){return a.countcomm - b.countcomm})});
                break;
        }
        this.base=0;

    }

}
