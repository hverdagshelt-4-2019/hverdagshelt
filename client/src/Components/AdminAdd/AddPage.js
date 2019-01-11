import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {ExistingUser} from './ExistingUser';
import { registerService} from '../../Services/RegisterService';

export class AddPage extends Component{
    email = '';
    password1 = '';
    password2 = '';
    type = '';
    users =  [];
    typeNew = '';

    id = '';
    typeExist = '';

    render(){
        return(
            <div className="container" >
                <hr/>
                <div className="row">
                    <div className="col-md-6">
                        <h4>Registrer ny admin eller kommunearbeider</h4>
                        <hr/>
                        <form>
                            <div className="form-group">
                                <input className="form-control" placeholder="Email" onChange={(evt) => {this.email = evt.target.value}}></input>
                                <input className="form-control" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                                <input className="form-control" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                                <br/>
                                <input name="type"
                                className="form-check-input"
                                type="radio"
                                value="1"
                                id="type1"
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeNew = event.target.value)}
                                required
                                />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Admin
                                </label>
                                <br/>
                                <input name="type"
                                    className="form-check-input"
                                    type="radio"
                                    value="2"
                                    id="type2"
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeNew = event.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="defaultCheck1">
                                    Kommunearbeider
                                </label>
                            </div>
                        </form>
                        <hr/>
                        <button className="btn btn-primary" onClick={this.addNew}>Opprett ny</button>
                    </div>
                    <div className="col-md-6">  
                        <h4>Gi en eksisterende bruker admin- eller kommunerettigheter</h4>
                        <hr/>
                        <ExistingUser updateFunc={this.setId.bind(this)}/>
                        <br/>
                        <input name="type"
                            className="form-check-input"
                            type="radio"
                            value="1"
                            id="type1"                                
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeExist = event.target.value)}
                            required
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Admin
                            </label>
                            <br/>
                            <input name="type"
                                className="form-check-input"
                                type="radio"
                                value="2"                                    
                                id="type2"                                    
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeExist = event.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="defaultCheck1">
                                Kommunearbeider
                            </label>
                            <hr/>
                            <button className="btn btn-primary" onClick={this.updateExisting}>Opprett fra eksisterende</button>
                    </div>
                </div> 
            </div>
        )
    }

    addNew(){
        if(this.password1 == this.password2) {
            registerService.postUser(this.email, this.password1);
            if(typeNew == 1){
                registerService.postAdmin(this.email, this.password); //verifytoken? //Need to catch errors
            }
            else if(typeNew == 2){
                registerService.postPublicUser(this.email, this.password); //veifytoken? //Need to catch errors
            }
        }
        else{alert("Passordene stemmer ikke overens.");}
    }

    updateExisting(){
        registerService.updateUser(this.id, this.typeExist); 
    }

    setId(id){
        this.id = id;
    }

}