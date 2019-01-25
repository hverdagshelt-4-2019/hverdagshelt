//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import styles from "./style.css";
import { Category } from '../../Services/categoryService';

export class SpecificCategory extends Component<{deleteFunc: function, theCategory: Category}>{
    name = this.props.theCategory.name;

    render(){
        return(
            <li className="list-group-item">
                <div className={styles.categoryDiv}>
                    <h3>{this.props.theCategory.name}</h3>
                    <button className="btn btn-danger btn-sm" onClick={this.delete}><i className="fa fa-trash"></i> {' '} Slett</button>
                </div>
            </li>
        )
    }

    delete(){
        console.log("Sletter kategori med name " + this.props.theCategory.name);
        this.props.deleteFunc(this.props.theCategory.name);
    }
}