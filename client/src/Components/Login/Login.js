//@flow

import { ReactDOM } from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { loginService } from '../../services/LoginService';
import {Redirect, NavLink} from 'react-router-dom';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirect: false
    };
    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  login() {
    if (this.state.email && this.state.password) {
      loginService.loginUser(this.state.email, this.state.password).then(result => {
        if (result !== null) {
            localStorage.setItem('authToken', result.token);
            console.log(localStorage.getItem('authToken'));
            this.setState({redirect : true});
        } else {
            console.log('Innlogging mislyktes'); //temporary messaging
        }
      });
    }

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
      if(this.state.redirect) {
          return (<Redirect to={'/register'} />); //will change this to the homepage when we have decided for a name
      }
    return (
        <div>
            <div className="container" align="center">
                <div className="container-fluid center-align" style={{width: '40%'}}>
                    <form>
                    <div className="form-group">
                        <label>E-post</label>
                        <input type="email" placeholder="E-post" className="form-control" name="email" onChange={this.onChange} required/>
                    </div>
                    <div className="form-group">
                        <label>Passord</label>
                        <input
                        type="password"
                        placeholder="Passord"
                        className="form-control"
                        name="password"
                        onChange={this.onChange} required
                        />
                        <NavLink to={'/register'}>Registrer deg som bruker</NavLink>
                    </div>
                    </form>
                    <button type="submit" className="btn btn-primary btn-lg" onClick={this.login}>
                    Logg inn
                    </button>
                </div>
            </div>
        </div>
    );
  }
}
