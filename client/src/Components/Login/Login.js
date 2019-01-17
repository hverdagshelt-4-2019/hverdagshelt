//@flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {NavLink, Redirect} from "react-router-dom"
import userService from '../../Services/userService';

export default class Login extends Component {
    email: string;
    password: string;
    redirect: boolean = false;

    constructor(props: any) {
        super(props);
        this.email = "";
        this.password = "";
    }

    login() {
        if(this.email && this.password) {
            userService.loginUser(this.email,this.password).then((result) => {
                if(result !== null) {
                    localStorage.setItem('authToken', result.data.token);
                    localStorage.setItem('level', result.data.level);
                    localStorage.setItem('id', result.data.id);
                    localStorage.setItem('commune', result.data.commune);
                    localStorage.setItem('company', result.data.company);
                    this.redirect = true;
                }
            });
        }
    }

    render() {

        if(this.redirect) return <Redirect from='/' to='/Hjem'/>
        else
        return (
            <div className="container" align="center">
                <div className="container-fluid center-align" style={{width: '40%'}}>
                    <form>
                        <div className="form-group">
                            <label>E-post</label>
                            <input type="email" autoComplete="current-email" placeholder="E-post" className="form-control" name="email" onChange={e => this.email = e.target.value} />
                        </div>
                        <div className="form-group">
                            <label>Passord</label>
                            <input type="password" autoComplete="current-password" placeholder="Passord" className="form-control" name="password" onChange={e => this.password = e.target.value} />
                            <NavLink to="registrerdeg">Registrer deg som bruker</NavLink>
                        </div>
                    </form>
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Logg inn </button>
                </div>
            </div>
        );
    }
}

