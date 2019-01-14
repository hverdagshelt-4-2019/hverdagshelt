import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { Route, NavLink } from 'react-router-dom';
import {userService} from '../../Services/userService';
import { adminService} from '../../Services/adminService';
import { publicWorkerService } from '../../Services/publicWorkerService';

export default class ExistingUser extends Component{
    users=[{id:1, email:"mail"}, {id:2, email:"mail2"}]; //Test values
    existingUser = '';
    email = '';

    constructor(){
        super();
        this.state = {list:false};
    }
    render(){
        if(this.state.list){
            return this.renderList();
        }
        else{
            return this.renderButton();
        }
    }

    renderButton(){
        return(
            <button className="btn btn-primary btn-block" onClick={this.getUsers}>Vis brukerliste</button>
        )
    }

    renderList(){
        return(
            <div>
                <button className="btn btn-primary btn-block" onClick={this.close}>Lukk liste</button>
                {this.users.map((user, i) => (
                    <li key={i} className="list-group-item">
                        <input 
                            name="user" 
                            type="radio" 
                            className="form-check-input" 
                            value={user.email} 
                            onClick={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setEmail(event.target.value))}
                        />
                        {' '}{user.id}
                    </li>
                ))}
            </div>
        )
    }

    getUsers(){
        userService.getUsers() 
        .then(users => this.users = users)
        .catch((error : Error) => console.log(error.message));
 
        this.setState({list:true}); 
    }

    close(){
        this.setState({list:false});
    }

    setEmail(email){
        console.log("Setter email");
        this.props.updateFunc(email);
    }
}