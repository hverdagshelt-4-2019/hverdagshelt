import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import {UserList} from "./UserLists";
import userService from "../../Services/userService";
import CompanyService from "../../Services/companyService";
import AdminService from "../../Services/adminService";
import PublicWorkerService from "../../Services/publicWorkerService";
import ExistingUser from './ExistingUser';
import adminService from '../../Services/adminService';
import publicWorkerService from '../../Services/publicWorkerService';
import communeService from '../../Services/communeService';
import categoryService from '../../Services/categoryService';
import {Adder} from './Adder';
import Category from '../../Services/categoryService';
import {SpecificCategory} from './SpecificCategory';
import Typography from '@material-ui/core/Typography';
import autocomplete from '../../Autocomplete';
import styles from './style.1.css';

//from CategoryCreation ->
type P = {
}

type S = {
    adding: boolean,
    editing: boolean
}

export default class Administration extends Component<P, S> {
    users = [];
    companies = [];
    admins = [];
    publicworkers = [];
    currlist = [];
    title = 'Users';

    tabs = ['u', 'c', 'a', 'p'];
    currtab = this.tabs[0];

    //from addPage ->
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
    users1 =  [];    
    user = '';

    //from CategoryCreation ->
    eventCategories: Category[] = [];
    ticketCategories: Category[] = [];
    constructor(props: Object){
        super(props);
        this.state = {
            adding: false,
        }
    }

    //from AddCompany ->
    users2 = [];
    

    render() {
        return (
            <section id="tabs">
                <div class="container">
                    <div class="row">
                        <div class="col-xs-12 ">
                            <nav>
                                <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Administrer brukere</a>
                                    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Legg til admin</a>
                                    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Legg til kategori</a>
                                    <a class="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false">Legg til bedrift</a>
                                </div>
                            </nav>
                            <div class="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <div>
                                        <div>
                                            <button onClick={e => {this.currlist = this.users; this.title = e.target.innerText; this.currtab = this.tabs[0]}}>Users</button>
                                            <button onClick={e => {this.currlist = this.companies; this.title = e.target.innerText; this.currtab = this.tabs[1]}}>Companies</button>
                                            <button onClick={e => {this.currlist = this.admins; this.title = e.target.innerText; this.currtab = this.tabs[2]}}>Admins</button>
                                            <button onClick={e => {this.currlist = this.publicworkers; this.title = e.target.innerText; this.currtab = this.tabs[3]}}>Public workers</button>
                                        </div>
                                        <UserList people={this.currlist} title={this.title} callback={this.delUser} tab={this.currtab}/>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <div className="container" >
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6" style={{border: "2px solid lightblue"}}>
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
                                                <hr/>
                                                <button className="btn customBtn" onClick={this.addNew}>Opprett ny</button>
                                                <br/>
                                                <br/>
                                            </div>
                                            <div className="col-md-6" style={{border: "2px solid lightblue"}}> 
                                                <br/> 
                                                <h4>Gi en eksisterende bruker</h4>
                                                <h4>admin- eller</h4>
                                                <h4>kommunerettigheter</h4>
                                                <hr/>
                                                <select className="form-control" style={{width:'100%'}} id="userSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.existingEmail = event.target.value)}>
                                                    {this.users1.map((user, i) => (
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
                                                    <hr/>
                                                    <button className="btn customBtn" onClick={this.updateExisting}>Opprett fra eksisterende</button>
                                            </div>
                                        </div>
                                        <div style={{height: '150px'}} /> 
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-6" style={{width: '50%'}}>
                                                <h3>Ticket categories</h3>
                                                <Adder addFunction={this.addTicketCategory.bind(this)} />
                                                    {this.ticketCategories.map((category, i) => (
                                                        <SpecificCategory key={category.id} theCategory={category} deleteFunc={this.deleteTC.bind(this)}/>
                                                    ))}
                                            </div>  
                                            <div className="col-md-6" style={{width: '50%'}}>
                                                <h3>Event categories</h3>
                                                <Adder addFunction={this.addEventCategory.bind(this)} />
                                                    {this.eventCategories.map((category, i) => (
                                                        <SpecificCategory theCategory={category} deleteFunc={this.deleteEC.bind(this)}/>
                                                    ))}
                                            </div> 
                                        </div>
                                        <div style={{height: '200px'}}></div>  
                                    </div>     
                                </div>
                                <div class="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                    <div className="container" >
                                        <hr/>
                                        <div className="row">
                                            <div className="col-md-6" style={{border: "2px solid lightblue"}}>
                                                <br/>
                                                <h4>Registrer nytt selskap</h4>
                                                <hr/>
                                                <form onSubmit={this.validation} autoComplete="off">
                                                    <div className="form-group">
                                                        <div>
                                                        <label>Velg firma bruker:</label>
                                                        </div>
                                                        <div className="autocomplete">
                                                            <input type="text" id="userSelector" placeholder="Bruker e-post" onChange={(event) => {console.log(event.target.value)}}/>
                                                        </div>
                                                        <br/>
                                                    </div>
                                                    <label htmlFor="userSelector">Bedriftsnavn:</label>
                                                    {' '}
                                                    <input id="companyName" placeholder="Bedriftsnavn" type='text' required/>
                                                    <br/>
                                                    <br/>
                                                    <button type="submit" className="btn btn-primary">Send inn</button>
                                                </form>
                                                <hr/>
                                                <br/>
                                                <br/>
                                            </div>
                                        </div>
                                        <div style={{height: '150px'}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    mounted() {
        userService.getUsers()
            .then(res => {this.users = res.data; this.currlist = res.data})
            .catch(err => console.log(err))
        CompanyService.getCompanies()
            .then(res => this.companies = res.data)
            .catch(err => console.log(err))
        AdminService.getAdmins()
            .then(res => this.admins = res.data)
            .catch(err => console.log(err))
        PublicWorkerService.getPublicworkers()
            .then(res => this.publicworkers = res.data)
            .catch(err => console.log(err))

        //from addPage ->
        //Get all communes
        communeService.getAllCommunes()
        .then(communes => this.communes = communes.data)
        .catch((error : Error) => console.log(error.message));

        //Get all users 
        userService.getUsers() 
        .then(users1 => this.users1 = users1.data)
        .catch((error : Error) => console.log(error.message));

        //from CategoryCreation ->
        this.help();

        //fromm addCompany ->
        userService.getUsers()
            .then(res => {
                this.users2 = res.data.map(e => e.email);
                console.log(this.users2.length)
                autocomplete(document.getElementById("userSelector"), this.users2);
            })
            .catch(err => console.log(err))
    }

    delUser(email) {
        console.log(email)
        userService.delUser(email)
            .then(res => console.log(res.data))
            .then(e => {
                this.currlist = this.currlist.filter(e => e.email != email);
                switch(this.currtab) {
                    case 'u':
                        this.users = this.currlist;
                        break;
                    case 'c':
                        this.companies = this.currlist;
                        break;
                    case 'a':
                        this.admins = this.currlist;
                        break;
                    case 'p':
                        this.publicworkers = this.currlist;
                        break;
                    default:
                        break;
                }
            })
            .catch(err => console.log(err))
    }

    //from addPage ->
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

    componentDidMount(){
        this.communeNew = communes[0].name;
    }

    //from CategoryCreation ->
    help() {
        categoryService.getEventCategories()
            .then(res => this.eventCategories = res.data)
            .catch(err => console.log(err))
        categoryService.getTicketCategories()
            .then(res => this.ticketCategories = res.data)
            .catch(err => console.log(err))
    }

    changeSate(){
        this.setState({editing: true});
    }

    addTicketCategory(name: string){
        categoryService.addTicketCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
    }

    addEventCategory(name: string){
        categoryService.addEventCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
    }

    deleteTC(name: string){
        categoryService.deleteTicketCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
            .catch(err => {console.log(err)})
    }

    deleteEC(name: string){
        categoryService.deleteEventCategory(name[0].toUpperCase() + name.slice(1).toLowerCase())
            .then(this.help)
            .catch(err => console.log(err))

    }

    //from addCompany ->
    validation() {
        if(this.users2.includes(document.getElementById('userSelector').value)){
            CompanyService.addOne(document.getElementById('userSelector').value, document.getElementById('companyName').value)
                .then(res => {if(res.status == 200)this.props.history.push('/register')})
                .catch(err => console.log(err))
        } else {
            alert("Vennligst skriv inn en gyldig bruker.");
            document.getElementById('userSelector').value = '';
        }
    }

}