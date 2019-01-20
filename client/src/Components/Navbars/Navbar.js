//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import css from './Navbar.css'

export default class Navbar extends Component {

    admin_pages = [
        ['kart', 'Kart', 'map-marked-alt'],
        ['minesaker', 'Mine saker', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['kategorier', 'Kategorier', 'edit'],
        ['statistikk', 'Statistikk', 'chart-bar'],
        ['leggtil', 'Legg til admin', 'user-plus'],
    ];
    public_worker_pages = [
        ['kart', 'Kart', 'map-marked-alt'],
        ['minesaker', 'Mine saker', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['leggtilbegivenhet', 'Legg til begivenhet', 'plus'],
        ['statistikk', 'Statistikk', 'chart-bar'],
    ];
    company_pages = [
        ['kart', 'Kart', 'map-marked-alt'],
        ['minesaker', 'Mine saker', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
    ];
    user_pages = [
        ['kart', 'Kart', 'map-marked-alt'],
        ['minesaker', 'Mine saker', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
    ];

    none_pages = [
        ['kart', 'Kart', 'map-marked-alt'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
    ];
    current_list = [];

    componentDidMount() {
        let level = localStorage.getItem('level');
        if(level === 'admin') this.current_list = this.admin_pages;
        else if (level === 'publicworker') this.current_list = this.public_worker_pages;
        else if (level === 'user') this.current_list = this.user_pages;
        else this.current_list = this.none_pages;
        console.log(this.current_list);
    }

    logout() {
        window.localStorage.clear();    // Deletes your token. And everything else...
        window.localStorage.setItem('level', 'none');
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark blue shadow">
                <a className="navbar-brand" href="/hjem" style={{color: "white"}}>HverdagsHelt<img style={{marginLeft: "4px"}} src="Skjermbilde.PNG" width="20" height="17" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar" >
                    <ul className="navbar-nav">
                    {this.current_list.map( ([destination, text, faname]) => (
                        <li key={destination} className="nav-item">
                            <NavLink style={{color: "white", height: "50px"}} className={"nav-link " + css.customLink} activeClassName={css.active} exact to={'/' + destination}>
                                <div className="topOfLink">
                                    <i style={{marginRight: "6px"}} className={"fas fa-"+faname}></i>{text}
                                </div>
                            </NavLink>
                        </li>
                         ))}
                    </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink style={{color: "white", height: "50px"}} className={"nav-link " + css.customLink} activeClassName={css.active} exact to="/minside">
                            <div className="topOfLink">
                                <i className="fas fa-user"></i> Min Side
                            </div>
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a style={{color: "white", height: "50px"}}className={"nav-link " + css.customLink} href="/" onClick={this.logout}>
                            <div className="topOfLink">
                                <i className="fas fa-sign-out-alt"></i> {
                                    localStorage.getItem('level') === 'none' ? "Logg inn" : "Logg ut"
                                }
                            </div>
                        </a>
                    </li>
                    
                </ul>
            </div>  
        </nav>
        );
    }
}