//@flow

import { ReactDOM } from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {userService} from '../../services/userService';
import {ticketService} from '../../services/ticketService';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    login() {
        if(this.state.email && this.state.password) {
            /*loginService.loginUser(this.state.email,this.state.password).then((result) => {
                console.log("okay");
                console.log(result.token);
               if(result !== null) localStorage.setItem('authToken', result.token)
            });*/
            console.log("post")
            //ticketService.postTicket();

        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div className="container text-center">
                HverdagsHelt - en nasjonal platform til å oppdatere kommunen om feil på offentlig infrastruktur
                <form>
                    <div className="form-group">
                        <label>E-post</label>
                        <input type="email" placeholder="E-post" className="form-control" name="email" onChange={this.onChange} />
                    </div>
                    <div className="form-group">
                        <label>Passord</label>
                        <input type="password" placeholder="Passord" className="form-control" name="password" onChange={this.onChange} />
                        <a href="">Registrer deg som bruker</a>
                    </div>
                </form>
                <button type="submit" className="btn btn-primary" onClick={this.login}>Logg inn </button>
            </div>
        );
    }
};