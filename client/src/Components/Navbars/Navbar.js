//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {

    admin_pages = [
        ['minesaker', 'Mine saker', 'folder-open'],
        ['minesvar', 'Mine svar', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Liste over saker', 'list'],
        ['kategorier', 'Kategorier', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
        ['hjelp', 'Hjelp', 'question-circle']
    ];
    public_worker_pages = [
        ['minesaker', 'Mine saker', 'folder-open'],
        ['minesvar', 'Mine svar', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Liste over saker', 'list'],
        ['kategorier', 'Kategorier', 'list'],
        ['hjelp', 'Hjelp', 'question-circle']
    ];
    user_pages = [
        ['minesaker', 'Mine saker', 'folder-open'],
        ['minesvar', 'Mine svar', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Liste over saker', 'list'],
        ['kategorier', 'Kategorier', 'list'],
        ['hjelp', 'Hjelp', 'question-circle']
    ];
    current_list = [];

    mounted() {
        let level = localStorage.getItem('level');
        if(level === 'admin') this.current_list = this.admin_pages;
        else if (level === 'publicworker') this.current_list = this.public_worker_pages;
        else this.current_list = this.user_pages;
    }

    render() {
        return (
            <nav class="navbar navbar-expand-md navbar-light bg-light">
                <a class="navbar-brand" href="/">HverdagsHelt<img src="Skjermbilde.PNG" width="20" height="17" /></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav">
                        {this.current_list.filter((e,i) => i<5).map( ([destination, text, faname]) => (
                        <li>
                            <NavLink to={destination}>
                                <i class={"fas fa-"+faname}></i>
                                {text}
                            </NavLink>
                        </li>
                        ))}  
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown">
                                Mer
                            </a>
                            <div class="dropdown-menu">
                                {this.current_list.filter((e,i) => i>=5).map( ([destination, text, faname]) => (
                                        <li>
                                            <NavLink to={destination}>
                                                <span className={"fas fa-"+faname} /> {text}
                                            </NavLink>
                                        </li>
                                    ))}
                            </div>
                        </li>
                    </ul>
                <ul class="navbar-nav ml-auto">
                    <li>
                        <NavLink to="/minside">
                            <i class="fas fa-user"></i> Min Side
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/">
                            <i class="fas fa-sign-out-alt"></i> Log ut
                        </NavLink>
                    </li>
                    
                </ul>
            </div>  
        </nav>
        );
    }
}
