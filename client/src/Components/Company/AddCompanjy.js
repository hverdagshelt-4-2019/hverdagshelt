//@flow
/**
 * Component where public workers can assing a company to an exsisting user
 */
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
    company = "";
    email = "";
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
                            {/*<div className="autocomplete">*/}
                                {/*<input className="form-control" id="userSelectorCompany" ref={this.userSelectorCompany} placeholder="Bruker e-post" onChange={(event) => {console.log(event.target.value); console.log(event.target.id)}} required/>*/}
                            {/*</div>*/}
                            <select onChange={this.changeEmail} className="form-control" style={{width:'100%'}}>
                                {this.users.map((user, i) => (
                                    <option value={user} key={i}>{user}</option>
                                ))}
                            </select>
                            <br/>
                        </div>
                        <label htmlFor="userSelector">Bedriftsnavn:</label>
                        {' '}
                        <input className="form-control" onChange={this.changeCompany} id="companyName" placeholder="Bedriftsnavn" required/>
                        <br/>
                        <br/>
                        <button type="submit" className="btn customBtn">Send inn</button>
                    </form>  
                    <br/>
                <div style={{height: '150px'}} />
            </div>
        );
    }

    changeCompany = event => {
        this.company = event.target.value;
    }

    changeEmail = event => {
        this.email = event.target.value;
    }

    mounted() {
        userService.getUsers()
            .then(res => {
                this.users = res.data.map(e => e.email);
                this.email = this.users.length > 0? this.users[0] : "";
            })
            .catch(err => {
                console.log(err)
            })
    }

    /**
     * Validates input and registers the company
     * @param event Data from form
     */
    validation(event) {
        event.preventDefault();
        if(this.users.includes(this.email)){
            CompanyService.addOne(this.email, this.company)
                .then(res => {
                    Alert.success("Ny bedrift lagt til");
                    if(res.status == 200)window.location.reload();
                })
                .catch(err => {
                    console.log(err)
                })
        } else {
            Alert.danger("Vennligst skriv inn en gyldig bruker.");
        }
    }
}
// #NICE!