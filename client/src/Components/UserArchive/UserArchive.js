import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import {UserList} from "./UserLists";
import userService from "../../Services/userService";
import CompanyService from "../../Services/companyService";
import AdminService from "../../Services/adminService";
import PublicWorkerService from "../../Services/publicWorkerService";

export default class UserArchive extends Component {
    users = [];
    companies = [];
    admins = [];
    publicworkers = [];
    currlist = [];
    title = 'Brukere';

    tabs = ['u', 'c', 'a', 'p'];
    currtab = this.tabs[0];

    render() {
        return (
            <div>
                <div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" class="btn btn-secondary" onClick={e => {this.currlist = this.users; this.title = e.target.innerText; this.currtab = this.tabs[0]}}>Brukere</button>
                        <button type="button" class="btn btn-secondary" onClick={e => {this.currlist = this.companies; this.title = e.target.innerText; this.currtab = this.tabs[1]}}>Bedrifter</button>
                        <button type="button" class="btn btn-secondary" onClick={e => {this.currlist = this.admins; this.title = e.target.innerText; this.currtab = this.tabs[2]}}>Admins</button>
                        <button type="button" class="btn btn-secondary" onClick={e => {this.currlist = this.publicworkers; this.title = e.target.innerText; this.currtab = this.tabs[3]}}>Kommunearbeidere</button>
                    </div>
                   
                    
                </div>
                <UserList people={this.currlist} title={this.title} callback={this.delUser} tab={this.currtab}/>
            </div>
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
}