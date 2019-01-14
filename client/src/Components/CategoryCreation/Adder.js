import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';

export class Adder extends Component{
    name = '';

    constructor(){
        super();
        this.state = {adding: false};
    }

    render(){
        if(this.state.adding){
            return this.renderAdding();
        }
        else{
            return this.renderButton();
        }
    }

    renderButton(){
        return(
            <button className="btn btn-primary btn-block" onClick={this.setAdding}>
                Legg til kategori
            </button> 
        )
        
    }

    renderAdding(){
        return(
            <div style={{border: '1px solid lightgrey'}}>
                <input className="form-control" placeholder="Kategorinavn" onChange={(evt) => {this.name = evt.target.value}}/>
                <br/>
                <button className="btn btn-primary" onClick={this.save}>Lagre</button>
                {' '}
                <button className="btn btn-secondary" onClick={this.setButton}>Avbryt</button>
            </div>
        )
    }

    setAdding(){
        this.setState({adding:true});
    }

    setButton(){
        this.setState({adding:false});
    }

    save(){
        alert("Du la til kategorien: " + this.name);
        this.props.addFunction(this.name);
        this.setState({adding:false});
    }
}