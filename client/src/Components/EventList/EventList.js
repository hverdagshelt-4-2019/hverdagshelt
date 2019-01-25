//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import eventService from '../../Services/eventService';
import categoryService from '../../Services/categoryService';
import SingleEvent from './SingleEvent';
import css from './eventStyle.css';
import $ from 'jquery';
import PageNavigator from "../PageNavigator/PageNavigator";

export default class EventList extends Component{
    communes = [];
    communesArray = [];
    eventCategories : Category[] = []; 
    allEvents = [];
    level = '';
    base = 0;
    pageLim = 20;

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
                <h3 className="col-xs-6 col-sm-pull-9" align="center" style={{fontFamily: "Lato, sans-serif", fontWeight: "600", opacity: "0.7"}}>
                    Liste over begivenheter 
                    {(localStorage.getItem('level') == 'admin' || localStorage.getItem('level') == 'none') && '' }
                    {(localStorage.getItem('level') == 'publicworker') && ' fra din kommune' }
                    {(localStorage.getItem('level') == 'user') && ' fra kommunene du følger' }
                </h3>
                <hr/>
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
                                <input type="checkbox" style={{width: "17px", height: "17px"}} className="form-check-input" id="oldEvents"/>
                                <label className="form-check-label" style={{marginTop: "3px"}} htmlFor="oldEvents">Vis også utgåtte begivenheter</label>
                                <div style={{height: "15px"}}></div>
                            </div>
                        </li>
                        <button type="submit list-group-item" onClick={this.updateEvents} className="btn customBtn"><i className="fas fa-filter" style={{marginRight: "4px"}}></i>Filtrer</button>
                    </div>
                </div>
                <br />
                <div id="cases" className="row" style={{height: 'auto', width: '90%'}}>
                    <select id="sorting" className="shadow-sm" style={{marginLeft: '65%', width: '30%'}}  onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.sortBy(event.target.value))}>
                        <option  id ="optionNyeste" key={"nyeste"}>Førstkommende</option>
                        <option  id ="optionEldste" key={"eldste"}>Sistkommende</option>
                    </select>
                    <div className="col-md-11 col-sm-offset-2 col-sm-8  float-right" style={{
                        float: "right",
                        marginLeft: '5%'}}>
                        <br />
                        {this.state.events.length ===0 &&
                            <h5 style={{marginLeft: "30%"}}>Ingen begivenheter</h5>
                        }
                        {this.state.events.length > this.pageLim &&
                            <PageNavigator increment={this.increment} decrement={this.decrement} pageLim={this.pageLim} pageNumber={this.base+1} base={this.base} totalLimit={this.state.events.length}/>
                        }
                        <ul className={css.eventList}>
                            {this.state.events.slice(this.base*this.pageLim, (this.base+1)*this.pageLim).map((event, i) => (
                                <div key={i}>
                                    <SingleEvent theEvent={event}>
                                    </SingleEvent>
                                    {(localStorage.getItem('level') === 'admin' || localStorage.getItem('commune') === event.commune_name ) && <SingleEvent.Options id={event.id}/>}
                                </div>
                            ))}
                        </ul>
                        <br />
                        {this.state.events.length > this.pageLim &&
                            <PageNavigator increment={this.increment} decrement={this.decrement} pageLim={this.pageLim} pageNumber={this.base+1} base={this.base} totalLimit={this.state.events.length}/>
                        }
                    </div>
                </div>
                <div style={{height: '80px'}} />
            </div>
        )
    }

    mounted(){
        eventService.getAllEvents() 
        .then((events : {data: Event[]}) => { 
            this.allEvents = events.data;
            this.allEvents.sort(function(a,b){return new Date(a.happening_time) - new Date(b.happening_time)});
            let le = this.allEvents
            le = le.filter(a => {
                return((new Date(a.happening_time).getTime() >= new Date().getTime()))
            });
            this.setState({events: le});
        })
        .catch((error : Error) => console.log("Error occured: " + error.message));
        
        //Get categories for the possibility to filter
        categoryService.getEventCategories()
        .then((categories : Category[]) =>  this.eventCategories = categories.data)
        .catch((error : Error) => console.log("Error occured: " + error.message));

        document.getElementById("arrowBtn").click();
        $("#checkAll").click(function () {
            $(".cat").prop('checked', $(this).prop('checked'));
        }); 
    }

    increment() {
        this.base++;
    }

    decrement() {
        this.base--;
    }

    changeArrow(){
        let e: HTMLElement|null = document.getElementById("arrow");
        let c: HTMLElement|null = document.getElementById("cases");
        let s: HTMLElement|null = document.getElementById("sidebar");
        if(e && c && s) {
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

    updateEvents(){
        console.log("Updated Events");
        console.log(new Date());
        let localEvents = [];
        if(!document.getElementById("checkAll").checked){
            this.eventCategories.forEach(categories => {
                if(document.getElementById("check"+categories.name).checked){
                    localEvents = localEvents.concat(this.allEvents.filter(e => e.category == categories.name));
                }
            });
            console.log(localEvents);
        }else{
            localEvents= this.allEvents;
        }
        if(!document.getElementById("oldEvents").checked){
            localEvents = localEvents.filter(a => {
                return((new Date(a.happening_time).getTime() >= new Date().getTime()))
            });
        }
        let by = document.getElementById("sorting").value;
        console.log(by);
         switch(by) {
            case "Førstkommende":
                localEvents.sort(function(a,b){return new Date(a.happening_time) - new Date(b.happening_time)});
                break;
            case "Sistkommende":
                localEvents.sort(function(a,b){return new Date(b.happening_time) - new Date(a.happening_time)});
                break;
        }
        this.base = 0;
        this.setState({events: localEvents});

    }

    sortBy(by: string){
        let localEvents = this.state.events;
        console.log(by);
         switch(by) {
            case "Førstkommende":
                localEvents.sort(function(a,b){return new Date(a.happening_time) - new Date(b.happening_time)});
                break;
            case "Sistkommende":
                localEvents.sort(function(a,b){return new Date(b.happening_time) - new Date(a.happening_time)});
                break;
        }
        this.base=0;
        this.setState({events: localEvents});
    }

}
