import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import ExistingUser from './ExistingUser';
import adminService from '../../Services/adminService';
import publicWorkerService from '../../Services/publicWorkerService';
import communeService from '../../Services/communeService';
import userService from '../../Services/userService';

//TODO: Fix so you can enter email and promote user to admin

export default class AddPage extends Component{
    //Common
    communes = []; //Test values
    
    //New user variables
    newEmail = '';
    password1 = '';
    password2 = '';
    typeNew = '';
    communeNew = '';

    //Existing user variables
    existingEmail = '';
    communeExist = '';
    typeExist = '';
    users =  [];    
    user = '';

    render(){
        return(
            <div className="container" >
                <br/>
                <div className="row">
                    <div className="col-md-6 rounded shadow p-3 mb-5" style={{backgroundColor:'white', border: "1px solid lightgrey"}}>
                        <br/>
                        <h4>Registrer ny admin</h4>
                        <h4>eller</h4>
                        <h4>kommunearbeider</h4>
                        
                        <hr/>
                        <form>
                            <div className="form-group">
                                <input className="form-control" placeholder="Email" onChange={(evt) => {this.newEmail = evt.target.value}}></input>
                                <input className="form-control" placeholder="Passord" onChange={(evt) => {this.password1 = evt.target.value}}></input>
                                <input className="form-control" placeholder="Gjenta passord" onChange={(evt) => {this.password2 = evt.target.value}}></input>
                                <br/>
                                <input name="type"
                                type="radio"
                                value="1"
                                id="type1"
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeNew = event.target.value)}
                                required
                                />
                                <label className="form-check-label" htmlFor="type1">
                                    Admin
                                </label>
                                <br/>
                                <input name="type"
                                    type="radio"
                                    value="2"
                                    id="type2"
                                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeNew = event.target.value)}
                                    required
                                />
                                <label className="form-check-label" htmlFor="type2">
                                    Kommunearbeider
                                </label>
                            </div>
                            <label htmlFor="communeSelector">Kommune</label> 
                            {' '} 
                            <select className="form-control" style={{width:'100%'}} id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeNew = event.target.value)}>
                                {this.communes.map((commune, i) => (
                                    <option value={commune.name} key={i}>{commune.name}</option>
                                ))}
                            </select>
                            <br/>
                            <br/>
                        </form>
                        <div >
                            <hr/>
                            <button className="btn customBtn" onClick={this.addNew}>Opprett ny</button>
                            <br/>
                            <br/>
                        </div>
                    </div>
                    <div className="col-md-6 rounded" style={{backgroundColor:'white', border: "1px solid lightgrey"}}> 
                        <br/> 
                        <h4>Gi en eksisterende bruker</h4>
                        <h4>admin- eller</h4>
                        <h4>kommunerettigheter</h4>
                        <hr/>
                        <select className="form-control" style={{width:'100%'}} id="userSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.existingEmail = event.target.value)}>
                            {this.users.map((user, i) => (
                                <option value={user.email} key={i}>{user.email}</option>
                            ))}
                        </select>
                        <br/>
                        <input name="type"
                            type="radio"
                            value="1"
                            id="type1"                                
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeExist = event.target.value)}
                            required
                            />
                            <label className="form-check-label" htmlFor="type1">
                                Admin
                            </label>
                            <br/>
                            <input name="type"
                                type="radio"
                                value="2"                                    
                                id="type2"                                    
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeExist = event.target.value)}
                                required
                            />
                            <label className="form-check-label" htmlFor="type2">
                                Kommunearbeider
                            </label>
                            <br/>
                            <br/>
                            <label htmlFor="communeSelector">Kommune</label> 
                            {' '} 
                            <select className="form-control" style={{width:'100%'}} id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeExist = event.target.value)}>
                                {this.communes.map((commune, i) => (
                                    <option value={commune.name} key={i}>{commune.name}</option>
                                ))}
                            </select>
                            <br/>
                            <br/>
                            <div>
                                <hr/>
                                <button className="btn customBtn" onClick={this.updateExisting}>Opprett fra eksisterende</button>
                                <br/>
                                <br/>
                            </div>
                    </div>
                </div>
                <div style={{height: '150px'}} /> 
            </div>
        )
    }

    async addNew(){
        if(this.password1 == this.password2 && this.typeNew){
            console.log(this.newEmail + " " + this.password1);
            await userService.createUser(this.newEmail, this.password1, this.communeNew)
                .then(res => {
                    if(res.status === 200) console.log("Ny bruker er registrert!");
                    else {
                        console.log("Kunne ikke legge til bruker fordi grunner.");
                        return;
                    };
                })  
            if(this.typeNew == 1){
                adminService.createAdmin(this.newEmail);
                window.location.reload();
            }
            else if (this.typeNew == 2 ){
                console.log("New commune worker: " + this.newEmail);
                publicWorkerService.createPublicWorker(this.newEmail);
                window.location.reload();
            }
        }
        else{
            alert("Feil");
        }
    }

    updateExisting(){
        if(this.typeExist == 1){
            console.log("Admin from existing user: " + this.existingEmail);
            adminService.createAdmin(this.existingEmail);
            window.location.reload();
        }
        else if(this.typeExist == 2){
            console.log("Commune worker from existing user: " + this.existingEmail + " " + this.communeExist);
            publicWorkerService.createPublicWorker(this.existingEmail, this.communeExist);
            window.location.reload();
        }
        else{
            alert("Velg type");
        }
    }

    setExistingEmail(email){
        this.existingEmail = email;
    }

    mounted(){
        //Get all communes
        communeService.getAllCommunes()
        .then(communes => this.communes = communes.data)
        .catch((error : Error) => console.log(error.message));

        //Get all users 
        userService.getUsers() 
        .then(users => this.users = users.data)
        .catch((error : Error) => console.log(error.message));
    }

    componentDidMount(){
        this.communeNew = communes[0].name;
    }

}