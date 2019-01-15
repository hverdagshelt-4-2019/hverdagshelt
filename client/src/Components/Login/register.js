import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import userService from '../../Services/userService';
import {NavLink } from 'react-router-dom';

//Need route to login site.
export default class Register extends Component {
  email = "";
  password1 = "";
  password2 = "";
  warning = "";
  success = "";

    render(){
        return(
            <div className="container" align="center">
                <div className="mx-auto" style={{width: '25%'}} align="center">
                    <br/>
                    <h2>Registrer deg</h2>
                    <br/>
                    <label className="text-success">{this.success}</label>
                    <form>
                        <div className="form-group">
                            <input className="form-control" placeholder="Email" onChange={(evt) => {this.email = evt.target.value}}></input>
                            <input type="password" className="form-control" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                            <input type="password" className="form-control" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                        </div>
                    </form>
                    <button className="btn btn-primary" onClick={this.register}>Opprett</button>
                    <br/>
                    <br/>
                    <label className="text-danger">{this.warning}</label>
                    <br/>
                    <label>Har du allerede en bruker?</label>{' '}
                    <NavLink exact to={'/'}>Logg inn her!</NavLink>
                </div>
            </div>
        )
    }

    register(){
        this.success = null;
        this.warning = null;
        if(!this.checkFields()) return;
        if(this.password1 === this.password2) {
            userService.createUser(this.email, this.password1)
                .then(res => {
                    if(res.status === 200) this.success = "Ny bruker er registrert!";
                    else {
                        this.warning = "Kunne ikke legge til bruker fordi grunner.";
                    }
                })//OK
                .catch(err => {
                    console.log(err)
                    this.warning = "Intern server error. Ikke gi oss mindre enn perfekt data."
                });
        }
        else{
            this.warning = "Passordene du skrev inn stemmer ikke overens.";
        }
    }

    checkFields(){
        if(this.email.trim() === "" || this.password1.trim() === "" || this.password2.trim() === "") {
            this.warning = "Du må fylle ut alle feltene for å opprette en bruker";
            return false;
        }
        else if(this.password1.length < 8 || this.password2.length < 8){
            this.warning = "Passordet ditt er ikke langt nok";
            return false;
        }
        else if(this.email.length > 254){
            this.warning = "Emailen din er for lang.";
            return false;
        }
        else if (!this.email.includes("@")){
            this.warning = "Emailen din er ikke gyldig.";
            return false;
        }
        return true;
    }
}