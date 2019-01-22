//@flow

import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import styles from "./style.css";
import { HashRouter, Route, NavLink } from 'react-router-dom';

export class SpecificCategory extends Component{
    name = this.props.theCategory.name;

    render(){
        return(
            <li className="list-group-item">
                <div className={styles.categoryDiv}>
                    <h3 to=''>{this.props.theCategory.name}</h3>
                    <button className="btn btn-danger btn-sm" onClick={this.delete}>Slett</button>
                </div>
            </li>
        )
    }

    delete(){
        console.log("Sletter kategori med name " + this.props.theCategory.name);
        this.props.deleteFunc(this.props.theCategory.name);
    }
}