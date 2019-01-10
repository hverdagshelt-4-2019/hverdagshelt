//@flow

import { ReactDOM } from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {loginService} from '../../services/LoginService';

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
            loginService.loginUser(this.state).then((result) => {
                jwt.verify(result.token, 'key', (err, authData) => {
                  console.log(authData)
                });
                if(result !== null) localStorage.setItem('authToken', result.token)
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
        console.log(this.state); //Remove this
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
                    <button type="submit" className="btn btn-primary" onClick={this.login}>Logg inn </button>
                </form>
            </div>
        );
    }
};
