//@flow 

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import adminService from '../../Services/adminService';
import publicWorkerService from '../../Services/publicWorkerService';
import communeService from '../../Services/communeService';
import userService from '../../Services/userService';
import {Alert} from '../../widgets';

export default class AddPage extends Component{
    //Common
    communes : Commune[] = []; 
    
    //New user variables
    newName : string = '';
    newEmail : string = '';
    password1 : string = '';
    password2 : string= '';
    typeNew : string = '';
    communeNew : string = '';

    //Existing user variables
    existingEmail : string = '';
    communeExist : string = '';
    typeExist : string = '';
    users : User[] =  [];    
    user : string = '';

    warningNew = "";
    warningExist = "";

    render(){
        return(
            <div className="container" >
                <br/>
                <div className="row">
                    <div className="col-md-6 rounded shadow p-3 mb-5" style={{backgroundColor:'white', border: "1px solid lightgrey"}}>
                        <br/>
                        <h4>Registrer ny admin</h4>
                        <h4>eller</h4>
                        <h4>kommunearbeider</h4>
                        
                        <hr/>
                        <form>
                            <div className="form-group">
                                <input className="form-control" placeholder="Fullt navn" onChange={(evt) => {this.newName = evt.target.value}}></input>
                                <input className="form-control" placeholder="Email" onChange={(evt) => {this.newEmail = evt.target.value}}></input>
                                <input className="form-control" type="password" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                                <input className="form-control" type="password" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                                <br/>
                                <input name="type"
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
                            {' '} 
                            <select className="form-control" style={{width:'100%'}} id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeNew = event.target.value)}>
                                {this.communes.map((commune, i) => (
                                    <option value={commune.commune_name} key={i}>{commune.commune_name}</option>
                                ))}
                            </select>
                            <br/>
                            <br/>
                        </form>
                        <div >
                            <hr/>
                            <button className="btn customBtn" onClick={this.addNew}>Opprett ny</button>
                            <br/>
                            <br/>
                            <label className="text-danger">{this.warningNew}</label>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div className="col-md-6 rounded shadow p-3 mb-5" style={{backgroundColor:'white', border: "1px solid lightgrey"}}> 
                        <br/> 
                        <h4>Gi en eksisterende bruker</h4>
                        <h4>admin- eller</h4>
                        <h4>kommunerettigheter</h4>
                        <hr/>
                        <select className="form-control" style={{width:'100%'}} id="userSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.existingEmail = event.target.value)}>
                            {this.users.map((user, i) => (
                                <option value={user.email} key={i}>{user.email}</option>
                            ))}
                        </select>
                        <br/>
                        <input name="type"
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
                            <br/>
                            <label htmlFor="communeSelector">Kommune</label> 
                            {' '} 
                            <select className="form-control" style={{width:'100%'}} id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeExist = event.target.value)}>
                                {this.communes.map((commune, i) => (
                                    <option value={commune.commune_name} key={i}>{commune.commune_name}</option>
                                ))}
                            </select>
                            <br/>
                            <br/>
                            <div>
                            <div style={{height: '111px'}} /> 
                                <hr/>
                                <button className="btn customBtn" onClick={this.updateExisting}>Opprett fra eksisterende</button>
                                <br/>
                                <br/>
                                <label className="text-danger">{this.warningExist}</label>
                                <br/>
                                <br/>
                            </div>
                    </div>
                </div>
                <div style={{height: '150px'}} /> 
            </div>
        )
    }

    async addNew(){
        if(!this.checkFieldsNew()) return;
        if(this.password1 == this.password2){
            console.log("Oppretter en ny...");
            await userService.createUser(this.newEmail, this.newName, this.password1, this.communeNew)
                .then(res => {
                    if(res.status === 200) console.log("Ny bruker er registrert!");
                    else {
                        console.log("Kunne ikke legge til bruker, error " + res.status);
                        return;
                    };
                })  
            if(this.typeNew == 1){
                adminService.createAdmin(this.newEmail);
                window.location.reload();
            }
            else if (this.typeNew == 2 ){
                publicWorkerService.createPublicWorker(this.newEmail);
                window.location.reload();
            }
        }
        else{
            this.warningNew = "Passordene du skrev inn stemmer ikke overens.";
            return; 
        }
    }

    updateExisting(){
        if(!this.checkFieldsExist()) return;
        if(this.typeExist == 1){
            console.log("Admin from existing user: " + this.existingEmail);
            adminService.createAdmin(this.existingEmail);
            window.location.reload();
        }
        else if(this.typeExist == 2){
            console.log("Commune worker from existing user: " + this.existingEmail + " " + this.communeExist);
            publicWorkerService.createPublicWorker(this.existingEmail, this.communeExist);
            window.location.reload();
        }
    }

    setExistingEmail(email){
        this.existingEmail = email;
    }

    async mounted(){
        //Get all communes
        await communeService.getAllCommunes()
        .then(communes => this.communes = communes.data)
        .catch((error : Error) => console.log(error.message));

        this.communeNew = this.communes[0].commune_name;
        this.communeExist = this.communes[0].commune_name;

        //Get all users 
        userService.getUsers() 
        .then(users => this.users = users.data)
        .catch((error : Error) => console.log(error.message));
    }

    checkFieldsNew(){
        if(this.newName.trim() === "" || this.newEmail.trim() === "" || this.password1.trim() === "" || this.password2.trim() === "") {
            this.warningNew = "Du må fylle ut alle feltene";
            return false;
        }
        else if(this.newName.length > 254){
            this.warningNew = "Navnet ditt er for langt";
            return false; 
        }
        else if(this.newEmail.length > 254){
            this.warningNew = "Emailen din er for lang.";
            return false;
        }
        else if(!this.newEmail.includes("@")){
            this.warningNew = "Emailen din er ikke gyldig.";
            return false;
        }
        else if(this.password1.length < 8 || this.password2.length < 8){
            this.warningNew = "Passordet ditt er ikke langt nok (må bestå av minst 8 tegn).";
            return false;
        }
        else if(!this.typeNew){
            this.warningNew = "Du må velge en admin eller kommunearbeider.";
            return false; 
        }
        else if(this.communeNew.trim() === ""){
            this.warningNew = "Du må velge en kommune";
            return false;
        }
        return true;
    }

    checkFieldsExist(){
        if(this.existingEmail === "") {
            this.warningExist = "Du må velge en bruker fra listen.";
            return false;
        }
        else if(this.typeExist === ''){
            this.warningExist = "Du må velge en admin eller kommunearbeider.";
            return false; 
        }
        return true;
    }
}