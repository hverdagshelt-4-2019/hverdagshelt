import {ReactDOM} from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { adminService} from '../../Services/adminService'

export default class ExistingUser extends Component{
    users=[{id:1}, {id:2}];
    existingUser = '';
    id = '';

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
                {this.users.map((user) => (
                    <li className="list-group-item">
                        <input 
                            name="user" 
                            type="radio" 
                            className="form-check-input" 
                            value={user.id} 
                            onClick={this.setID}
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.id = event.target.value)}
                        />
                        {' '}{user.id}
                    </li>
                ))}
            </div>
        )
    }

    getUsers(){
        registerService.getAllUsers()  //Gets all users with no rights. //OK
        .then(users => this.users = users)
        .catch((error : Error) => console.log(error.message));
 
        this.setState({list:true}); 
    }

    close(){
        this.setState({list:false});
    }

    setID(){
        this.props.setId(this.id);
    }
}