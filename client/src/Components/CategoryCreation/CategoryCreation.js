//@flow

import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import categoryService from '../../Services/categoryService';
import {Adder} from './Adder';

export default class CategoryCreation extends Component{
    categories = [{name: 'Kategori1'}, {name: 'Kateogri2'}, {name: "Kategori3"}];

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
                            {this.categories.map((category, i) => (
                                <li className="list-group-item" key={i}>
                                    <h3 to=''>{category.name}</h3>
                                    <div className="float-right">
                                        <button className="float-right btn btn-danger btn-sm" onClick={this.delete}>Slett</button>
                                    </div>
                                </li>
                            ))}
                    </div>  
                    <div className="col-md-6" style={{width: '50%'}}>
                        <h3>Event categories</h3>
                        <Adder addFunction={this.addEventCategory.bind(this)} />
                            {this.categories.map((category, i) => (
                                <li className="list-group-item" key={i}>
                                    <h3 to=''>{category.name}</h3>
                                    <div className="float-right">
                                        <button className="float-right btn btn-danger btn-sm" onClick={this.delete}>Slett</button>
                                    </div>
                                </li>
                            ))}
                    </div> 
                </div>  
            </div>     
        )
    }

    mounted(){
        categoryService.getAllCategories()
        //.then((categories: Array<Category>) => this.categories = categories) //Uncomment when service is OK
        //.catch((error : Error) => console.log(error.message));
    }

    changeSate(){
        this.setState({editing: true});
    }

    addTicketCategory(name){ 
        categoryService.addTicketCategory(name);
    }

    addEventCategory(name){
        categoryService.addEventCategory(name);
    }

    deleteTC(){
        categoryService.deleteTicketCategory();
    }

    deleteEC(){
        categoryService.deleteEventCategory();
    }
}



