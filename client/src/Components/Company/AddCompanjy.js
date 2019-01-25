//@flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import userService from '../../Services/userService';
import Typography from '@material-ui/core/Typography';
import CompanyService from "../../Services/companyService";
import autocomplete from '../../Autocomplete';
import styles from './style.css';
import { Alert } from '../../widgets';

export default class AddCompany extends Component<{history: string[]}>{
    users = [];
    userSelectorCompany;
    constructor(props: any) {
        super(props);
        this.userSelectorCompany = React.createRef();
    }

    render() {
        return (
                <div className="aroundStuff rounded shadow p-3 mb-5" style={{backgroundColor:'white', border: "2px solid white"}}>
                    <br/>
                    <h4>Registrer ny bedrift</h4>
                    <hr/>
                    <form onSubmit={this.validation} autoComplete="off">
                        <div className="form-group">
                            <div>
                            <label>Velg bedrift bruker fra eksisterende brukere:</label>
                            </div>
                            <div className="autocomplete">
                                <input className="form-control" id="userSelectorCompany" ref={this.userSelectorCompany} placeholder="Bruker e-post" onChange={(event) => {console.log(event.target.value); console.log(event.target.id)}} required/>
                            </div>
                            <br/>
                        </div>
                        <label htmlFor="userSelector">Bedriftsnavn:</label>
                        {' '}
                        <input className="form-control" id="companyName" placeholder="Bedriftsnavn" required/>
                        <br/>
                        <br/>
                        <button type="submit" className="btn customBtn">Send inn</button>
                    </form>  
                    <br/>
                <div style={{height: '150px'}} />
            </div>
        );
    }

    mounted() {
        userService.getUsers()
            .then(res => {
                this.users = res.data.map(e => e.email);
                console.log(this.users.length)
                autocomplete(this.userSelectorCompany.current, this.users);
            })
            .catch(err => console.log(err))
    }

    validation() {
        if(this.users.includes(document.getElementById('userSelectorCompany').value)){
            CompanyService.addOne(document.getElementById('userSelectorCompany').value, document.getElementById('companyName').value)
                .then(res => {if(res.status == 200)this.props.history.push('/register')})
                .catch(err => console.log(err))
        } else {
            Alert.danger("Vennligst skriv inn en gyldig bruker.");
            document.getElementById('userSelector').value = '';
        }
    }
}
// #NICE!