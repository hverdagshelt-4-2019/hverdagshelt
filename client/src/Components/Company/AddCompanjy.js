//@flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import userService from '../../Services/userService';
import Typography from '@material-ui/core/Typography';
import CompanyService from "../../Services/companyService";
import autocomplete from '../../Autocomplete';
import styles from './style.css';

export default class AddCompany extends Component<{history: string[]}>{
    users = [];

    render() {
        return (
            <div className="container" >
                <br/>
                <div className="row">
                    <div className="col-md-6 rounded shadow p-3 mb-5" style={{backgroundColor:'white', border: "2px solid lightblue"}}>
                        <br/>
                        <h4>Registrer nytt selskap</h4>
                        <hr/>
                        <form onSubmit={this.validation} autoComplete="off">
                            <div className="form-group">
                                <div>
                                <label>Velg firma bruker:</label>
                                </div>
                                <div className="autocomplete">
                                    <input className="form-control" id="userSelector" placeholder="Bruker e-post" onChange={(event) => {console.log(event.target.value)}}/>
                                </div>
                                <br/>
                            </div>
                            <label htmlFor="userSelector">Bedriftsnavn:</label>
                            {' '}
                            <input className="form-control" id="companyName" placeholder="Bedriftsnavn" required/>
                            <br/>
                            <br/>
                            <button type="button" className="btn customBtn">Send inn</button>
                        </form>
                        
                        <br/>
                    </div>
                </div>
                <div style={{height: '150px'}} />
            </div>
        );
    }

    mounted() {
        userService.getUsers()
            .then(res => {
                this.users = res.data.map(e => e.email);
                console.log(this.users.length)
                autocomplete(document.getElementById("userSelector"), this.users);
            })
            .catch(err => console.log(err))
    }

    validation() {
        if(this.users.includes(document.getElementById('userSelector').value)){
            CompanyService.addOne(document.getElementById('userSelector').value, document.getElementById('companyName').value)
                .then(res => {if(res.status == 200)this.props.history.push('/register')})
                .catch(err => console.log(err))
        } else {
            alert("Vennligst skriv inn en gyldig bruker.");
            document.getElementById('userSelector').value = '';
        }
    }
}
// #NICE!