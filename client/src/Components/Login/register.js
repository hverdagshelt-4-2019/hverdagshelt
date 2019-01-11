import { ReactDOM } from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import { userService } from '../../services/userService';

//Need route to login site.
export class Register extends Component {
  fullname = null;
  email = null;
  password1 = null;
  password2 = null;
  warning = null;

    render(){
        return(
            <div className="container" align="center">
                <div className="mx-auto" style={{width: '25%'}} align="center">
                    <br/>
                    <h2>Registrer deg</h2>
                    <br/>
                    <form>
                        <div className="form-group">
                            <input className="form-control" placeholder="Fullt navn" onChange={(evt)=> {this.fullname = evt.target.value}}></input>
                            <input className="form-control" placeholder="Email" onChange={(evt) => {this.email = evt.target.value}}></input>
                            <input className="form-control" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                            <input className="form-control" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                        </div>
                    </form>
                    <button className="btn btn-primary" onClick={this.register}>Opprett</button>
                    <br/>
                    <br/>
                    <label>{this.warning}</label>
                    <br/>
                    <label>Har du allerede en bruker?</label>{' '}
                    <NavLink exact to={'/'}>Logg inn her!</NavLink>
                </div> 
            </div>
        )
    }

    register(){
        if(this.password1 == this.password2) {
            console.log("Registrerer...");
            userService.postNewUser(this.email, this.password1) //OK
            .catch(error => console.log("Noe gikk galt."));
        }
        else{
            this.warning = "Passordene du skrev inn stemmer ikke overens.";
        }
    }
  }
