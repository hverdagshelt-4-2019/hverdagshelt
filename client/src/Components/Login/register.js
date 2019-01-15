import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';
import userService from '../../Services/userService';
import { NavLink,} from 'react-router-dom';

//Need route to login site.
export default class Register extends Component {
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
                            <input className="form-control" placeholder="Email" onChange={(evt) => {this.email = evt.target.value}}></input>
                            <input type="password" className="form-control" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                            <input type="password" className="form-control" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                        </div>
                    </form>
                    <button className="btn btn-primary" onClick={this.register}>Opprett</button>
                    <br/>
                    <br/>
                    {this.warning &&
                        <div className="test">
                            <label>{this.warning}</label>
                        </div>
                    }
                    <br/>
                    <label>Har du allerede en bruker?</label>{' '}
                    <NavLink exact to={'/'}>Logg inn her!</NavLink>
                </div>
                <div style={{height: '200px'}}></div>
            </div>
        )
    }

    register(){
        if(this.password1 == this.password2) {
            if(!this.checkFields()) return;
            console.log("Registrerer...");
            userService.createUser(this.email, this.password1)
                .then(data => console.log(data))//OK
                .catch(err => console.log(err));
        }
        else{
            this.warning = "Passordene du skrev inn stemmer ikke overens.";
        }
    }

    checkFields(){
        if(this.email === null || this.password1 === null || this.password2 === null) {
            this.warning = "Du må fylle ut alle feltene for å opprette en bruker";
            return false;
        }
        return true;
    }
}