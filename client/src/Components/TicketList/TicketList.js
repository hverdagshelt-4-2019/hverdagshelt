//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {ticketService} from '../../Services/ticketService';
import {categoryService} from '../../Services/categoryService'

//---This class is not finished. No filter created. ---
export class TicketList extends Component{ 
    communeId = null; //Should the user be able to see tickets from other communes? ATM not possible
                        //Need to get the relevant commune id somehow
    categories = [{name: 'Kategori1'}, {name: 'Kateogri2'}, {name: "Kategori3"}]; //Ticking off input box will add category to the array
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
                        {this.categories.map((category) => (
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

        //--Get all categories--
        categoryService.getAllCategories();
        //.then(categories => this.categories = categories)
        //.catch((error : Error) => console.log("Error occured: " + error.message));

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

//Single ticket element in list, a number of these will be mapped in ticket list 
class SingleTicket extends Component<{
    title : string;
    category : string;
}>{
    render(){
        return (
            <div className="container">
                <div className="row">

                    <div 
                        className="col-sm-4"
                        style={{
                        width: '200px',
                        height: '100px',
                        border: '1px solid black',
                        margin: '2px'
                    }}>
                        <img src="" />
                    </div>

                    <div className="col-sm-8" >
                        <NavLink 
                            activeStyle={{ color: 'darkblue' }} 
                            to={' '}>
                                <h4>{this.props.title}</h4>
                        </NavLink>
                        <br/>
                        <br/>
                        {' '} - {this.props.category}{' '} - By {' '}

                        <div >
                            <button className="btn btn-primary btn-sm">Legg til bedrift</button>{' '}<button className="btn btn-primary btn-sm">Svar</button>
                        </div>      

                    </div>
                </div>
            </div>
        )
    }
}