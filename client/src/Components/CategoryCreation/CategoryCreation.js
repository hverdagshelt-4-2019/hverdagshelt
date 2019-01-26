/**
 * Page where an admin can create a category for use in events and tickets
 */
//@flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import categoryService from '../../Services/categoryService';
import {Adder} from './Adder';
import Category from '../../Services/categoryService';
import {SpecificCategory} from './SpecificCategory';

type P = {

}

type S = {
    adding: boolean,
    editing: boolean
}

export default class CategoryCreation extends Component<P, S>{
    eventCategories: Category[] = [];
    ticketCategories: Category[] = [];
    constructor(props: Object){
        super(props);
        this.state = {
            adding: false,
        }
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 " style={{width: '50%'}}>
                        <h3>Sak kategorier</h3>
                        <Adder addFunction={this.addTicketCategory.bind(this)} />
                            {this.ticketCategories.map((category, i) => (
                                <SpecificCategory key={category.id} theCategory={category} deleteFunc={this.deleteTC.bind(this)}/>
                            ))}
                    </div>  
                    <div className="col-md-6" style={{width: '50%'}}>
                        <h3>Begivenhet kategorier</h3>
                        <Adder addFunction={this.addEventCategory.bind(this)} />
                            {this.eventCategories.map((category, i) => (
                                <SpecificCategory theCategory={category} deleteFunc={this.deleteEC.bind(this)}/>
                            ))}
                    </div> 
                </div>
                <div style={{height: '200px'}}></div>  
            </div>     
        )
    }

    mounted(){
        this.help();
    }

    help() {
        categoryService.getEventCategories()
            .then(res => this.eventCategories = res.data)
            .catch(err => console.log(err))
        categoryService.getTicketCategories()
            .then(res => this.ticketCategories = res.data)
            .catch(err => console.log(err))
    }

    changeSate(){
        this.setState({editing: true});
    }

    addTicketCategory(name: string){
        categoryService.addTicketCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
    }

    addEventCategory(name: string){
        categoryService.addEventCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
    }

    deleteTC(name: string){
        categoryService.deleteTicketCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
            .catch(err => {console.log(err)})
    }

    deleteEC(name: string){
        categoryService.deleteEventCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
            .catch(err => console.log(err))

    }
}



