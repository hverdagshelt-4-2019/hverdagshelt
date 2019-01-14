//@flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import categoryService from '../../Services/categoryService';
import {Adder} from './Adder';
import Category from '../../Services/categoryService';

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
        };
    }

    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{width: '50%'}}>
                        <h3>Ticket categories</h3>
                        <Adder addFunction={this.addTicketCategory.bind(this)} />
                            {this.ticketCategories.map((category, i) => {
                                    return (
                                        <li className="list-group-item" key={i}>
                                            <h3 to=''>{category.name}</h3>
                                            <div className="float-right">
                                                <button className="float-right btn btn-danger btn-sm"
                                                        onClick={this.deleteTC}>Slett
                                                </button>
                                            </div>
                                        </li>
                                    )
                                }
                            )}
                    </div>  
                    <div className="col-md-6" style={{width: '50%'}}>
                        <h3>Event categories</h3>
                        <Adder addFunction={this.addEventCategory.bind(this)} />
                            {this.eventCategories.map((category, i) => {
                                return(
                                    <li className="list-group-item" key={i}>
                                        <h3 to=''>{category.name}</h3>
                                        <div className="float-right">
                                            <button className="float-right btn btn-danger btn-sm"
                                                    onClick={this.deleteEC}>Slett
                                            </button>
                                        </div>
                                    </li>
                                )
                            }
                            )}
                    </div> 
                </div>  
            </div>     
        )
    }

    mounted(){
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
        categoryService.addTicketCategory(name);
    }

    addEventCategory(name: string){
        categoryService.addEventCategory(name);
    }

    deleteTC(name: string){
        categoryService.deleteTicketCategory(name);
    }

    deleteEC(name: string){
        categoryService.deleteEventCategory(name);
    }
}



