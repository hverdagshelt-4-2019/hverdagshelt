//@flow

import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {categoryService} from '../../Services/categoryService';
import {Adder} from './Adder';
import {SpecificCategory} from './SpecificCategory';

export class CategoryCreation extends Component{
    ticketCategories = [{name: 'Kategori1', id:'1'}, {name: 'Kateogri2', id:'2'}, {name: "Kategori3", id:'3'}]; //Test values
    eventCategories = [];

    constructor(props){
        super(props);
        this.state = {adding: false};
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{width: '50%'}}>
                        <h3>Ticket categories</h3>
                        <Adder addFunction={this.addTicketCategory.bind(this)} />
                            {this.ticketCategories.map((category, i) => (
                                <SpecificCategory theCategory={category} deleteFunc={this.deleteTC.bind(this)}/>
                            ))}
                    </div>  
                    <div className="col-md-6" style={{width: '50%'}}>
                        <h3>Event categories</h3>
                        <Adder addFunction={this.addEventCategory.bind(this)} />
                            {this.eventCategories.map((category, i) => (
                                <SpecificCategory theCategory={category} deleteFunc={this.deleteEC.bind(this)}/>
                            ))}
                    </div> 
                </div>  
            </div>     
        )
    }

    mounted(){
        categoryService.getTicketCategories()
        .then((categories: Array<Category>) => this.categories = categories) //Uncomment when service is OK
        .catch((error : Error) => console.log(error.message));

        categoryService.getEventCategories()
        .then((categories: Array<Category>) => this.categories = categories) //Uncomment when service is OK
        .catch((error : Error) => console.log(error.message));
    }

    changeSate(){
        this.setState({editing: true});
    }

    addTicketCategory(name){ 
        console.log("Navn: " + name);
        categoryService.addTicketCategory(name);
    }

    addEventCategory(name){
        console.log("Navn: " + name);
        categoryService.addEventCategory(name);
    }

    deleteTC(){
        categoryService.deleteTicketCategory();
    }

    deleteEC(){
        categoryService.deleteEventCategory();
    }
}



