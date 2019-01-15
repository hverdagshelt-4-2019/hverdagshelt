import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Route, NavLink } from 'react-router-dom';
import ExistingUser from './ExistingUser';
import {userService} from '../../Services/userService';
import { adminService} from '../../Services/adminService';
import { publicWorkerService} from '../../Services/publicWorkerService';

//TODO: Fix so you can enter email and promote user to admin

export default class AddPage extends Component{
    //Common
    communes = [{id: '1', name: 'Trondheim' }, {id: '2', name: "Bergen"}]; //Test values
    
    //New user variables
    newEmail = '';
    password1 = '';
    password2 = '';
    typeNew = '';
    communeNew = this.communes[0].name;

    //Existing user variables
    existingEmail = 'skrt';
    communeExist = this.communes[0].name;
    typeExist = '';
    users =  [];    

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
                                <input className="form-control" placeholder="Email" onChange={(evt) => {this.newEmail = evt.target.value}}></input>
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
                                <label className="form-check-label" htmlFor="type1">
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
                                <label className="form-check-label" htmlFor="type2">
                                    Kommunearbeider
                                </label>
                            </div>
                            <label htmlFor="communeSelector">Kommune</label>  
                            <select id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeNew = event.target.value)}>
                                {this.communes.map((commune, i) => (
                                    <option value={commune.name} key={i}>{commune.name}</option>
                                ))}
                            </select>
                            <br/>
                            <br/>
                        </form>
                        <hr/>
                        <button className="btn btn-primary" onClick={this.addNew}>Opprett ny</button>
                    </div>
                    <div className="col-md-6">  
                        <h4>Gi en eksisterende bruker admin- eller kommunerettigheter</h4>
                        <hr/>
                        <ExistingUser updateFunc={this.setExistingEmail.bind(this)}/>
                        <br/>
                        <input name="type"
                            className="form-check-input"
                            type="radio"
                            value="1"
                            id="type1"                                
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeExist = event.target.value)}
                            required
                            />
                            <label className="form-check-label" htmlFor="type1">
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
                            <label className="form-check-label" htmlFor="type2">
                                Kommunearbeider
                            </label>
                            <br/>
                            <label htmlFor="communeSelector">Kommune</label>  
                            <select id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeExist = event.target.value)}>
                                {this.communes.map((commune, i) => (
                                    <option value={commune.name} key={i}>{commune.name}</option>
                                ))}
                            </select>
                            <br/>
                            <br/>
                            <button className="btn btn-primary" onClick={this.updateExisting}>Opprett fra eksisterende</button>
                    </div>
                </div> 
            </div>
        )
    }

    addNew(){
        if(this.password1 == this.password2){
            userService.createUser(this.newEmail, this.password1);
            if(this.typeNew == 1){
                console.log("New admin: " + this.newEmail);
                adminService.createAdmin(this.newEmail);
            }
            else if (this.typeNew == 2 ){
                console.log("New commune worker: " + this.newEmail, this.communeNew);
                publicWorkerService.createPublicWorker(this.newEmail, this.communeNew);
            }
        }
        else{
            alert("Passordene du skrev inn stemmer ikke overens.");
        }
    }

    updateExisting(){
        if(this.typeExist == 1){
            console.log("Admin from existing user: " + this.existingEmail);
            adminService.createAdmin(this.existingEmail);
        }
        else if(this.typeExist == 2){
            console.log("Commune worker from existing user: " + this.existingEmail + " " + this.communeExist);
            publicWorkerService.createPublicWorker(this.existingEmail, this.communeExist);
        }
    }

    setExistingEmail(email){
        this.existingEmail = email;
    }

}