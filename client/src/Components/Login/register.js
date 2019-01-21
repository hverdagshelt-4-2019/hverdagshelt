import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import userService from '../../Services/userService';
import {NavLink, Redirect,} from 'react-router-dom';
import CustomTable from "../CustomTable/CustomTable";

//Need route to login site.
export default class Register extends Component {
    email = "";
    password1 = "";
    password2 = "";
    warning = "";
    success = "";
    commune = "";
    redirect = false;

    getCommune(commune) {
        this.commune = commune;
        console.log("Commune selected: " + commune);
    }

    render(){
        if(this.redirect) return <Redirect from='/registrerdeg' to='/'/>
        else
        return(
            <div className="aroundStuff">
            <div className="container" align="center">
                <div className="mx-auto" style={{width: '50%'}} align="center">
                    <br/>
                    <h2>Registrer deg</h2>
                    <br/>
                    <label className="text-success">{this.success}</label>
                    <form>
                        <div className="form-group">
                            <input type="email" autoComplete="email" className="form-control" placeholder="Email" onChange={(evt) => {this.email = evt.target.value}}></input>
                            <input type="password" autoComplete="new-password" className="form-control" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                            <input type="password" autoComplete="new-password" className="form-control" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                        </div>
                    </form>
                    <CustomTable reciever={this.getCommune} />
                    <br />
                    <button className="btn customBtn" onClick={this.register}><i className="fas fa-plus customIcon"></i>Opprett</button>
                    <br/>
                    <br/>
                    <label className="text-danger">{this.warning}</label>
                    <br/>
                    <label>Har du allerede en bruker?</label>{' '}
                    <NavLink exact to={'/'}>Logg inn her!</NavLink>
                </div>
                <div style={{height: '200px'}}></div>
            </div>
            </div>
        )
    }

    register(){
        this.success = null;
        this.warning = null;
        console.log("register called")
        if(!this.checkFields()) return;
        if(this.password1 === this.password2) {
            userService.createUser(this.email, this.password1, this.commune)
                .then(res => {
                    if(res.status === 200) {
                        this.success = "Ny bruker er registrert!";
                        this.redirect = true;
                    }
                    else {
                        this.warning = "Kunne ikke legge til bruker fordi grunner.";
                    }
                })//OK
                .catch(err => {
                    // TODO: Skille mellom forskjellige server feil. F.eks. forskjellen mellom at emailen er tatt eller at brukeren har et ugyldig tegn i mailen sin (emojis etc.)
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
            this.warning = "Passordet ditt er ikke langt nok (må bestå av minst 8 tegn).";
            return false;
        }
        else if(this.email.length > 254){
            this.warning = "Emailen din er for lang.";
            return false;
        }
        else if(!this.email.includes("@")){
            this.warning = "Emailen din er ikke gyldig.";
            return false;
        }
        else if(this.commune.trim() === ""){
            this.warning = "Du må velge en kommune";
            return false;
        }
        return true;
    }
}