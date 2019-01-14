//@flow

import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';

export class SpecificCategory extends Component{
    name = this.props.theCategory.name;

    render(){
        return(
            <li className="list-group-item">
                <h3 to=''>{this.props.theCategory.name}</h3>
                <div className="float-right">
                    <button className="float-right btn btn-danger btn-sm" onClick={this.delete}>Slett</button>
                </div>
            </li>
        )
    }

    delete(){
        console.log("Sletter kategori med name " + this.name);
        this.props.deleteFunc(this.name);
    }
}