import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import styles from "./style.css";

export class Adder extends Component{
    name = '';
    warning  = "";

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
            <div className={styles.addCategory}>
                <input className="form-control" placeholder="Kategorinavn" onChange={(evt) => {this.name = evt.target.value}}/>
                {this.warning !== "" &&
                <label className="text-danger">{this.warning}</label>
                }
                <br/>
                <button className="btn btn-primary" onClick={this.save}>Lagre</button>
                {' '}
                <button className="btn btn-secondary" onClick={this.setButton}>Avbryt</button>
                <br/>
            </div>
        )
    }

    setAdding(){
        this.setState({adding:true});
    }

    setButton(){
        this.setState({adding:false});
        this.warning = "";
    }

    save(){
        this.warning = "";
        if(!this.checkInput()) return;
        this.props.addFunction(this.name);
        this.setState({adding:false});
    }

    checkInput() {
        if(this.name.trim() === ""){
            this.warning = "You cant add an empty category";
            return false;
        }
        return true;
    }
}