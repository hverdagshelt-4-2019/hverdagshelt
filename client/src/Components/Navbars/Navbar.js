//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export default class Navbar extends Component {

    admin_pages = [
        ['minesaker', 'Mine saker', 'folder-open'],
        ['minesvar', 'Mine svar', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['kategorier', 'Kategorier', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
        ['hjelp', 'Hjelp', 'question-circle']
    ];
    public_worker_pages = [
<<<<<<< HEAD
        ['Hjem', 'Hjem', 'glyphicon-home'],
        ['minesaker', 'Mine saker', 'glyphicon-folder-open'],
        ['minesvar', 'Mine svar', 'glyphicon-folder-open'],
        ['leggtilsak', 'Legg til sak', 'glyphicon-plus'],
        ['begivenheter', 'Liste over saker', 'glyphicon-list-alt'],
        ['kategorier', 'Kategorier', 'glyphicon-list-alt'],
        ['statistikk', 'Statistikk', 'glyphicon-stats'],
        ['hjelp', 'Hjelp', 'glyphicon-question-sign']
    ];
    user_pages = [
        ['Hjem', 'Hjem', 'glyphicon-home'],
        ['minesaker', 'Mine saker', 'glyphicon-folder-open'],
        ['minesvar', 'Mine svar', 'glyphicon-folder-open'],
        ['leggtilsak', 'Legg til sak', 'glyphicon-plus'],
        ['begivenheter', 'Liste over saker', 'glyphicon-list-alt'],
        ['statistikk', 'Statistikk', 'glyphicon-stats'],
        ['hjelp', 'Hjelp', 'glyphicon-question-sign']
=======
        ['minesaker', 'Mine saker', 'folder-open'],
        ['minesvar', 'Mine svar', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['kategorier', 'Kategorier', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
        ['hjelp', 'Hjelp', 'question-circle']
    ];
    user_pages = [
        ['minesaker', 'Mine saker', 'folder-open'],
        ['minesvar', 'Mine svar', 'folder-open'],
        ['leggtilsak', 'Legg til sak', 'plus'],
        ['begivenheter', 'Begivenheter', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
        ['hjelp', 'Hjelp', 'question-circle']
>>>>>>> login
    ];
    
    none_pages = [
<<<<<<< HEAD
        ['Hjem', 'Hjem', 'glyphicon-home'],
        ['begivenheter', 'Liste over saker', 'glyphicon-list-alt'],
        ['statistikk', 'Statistikk', 'glyphicon-stats'],
        ['hjelp', 'Hjelp', 'glyphicon-question-sign']
=======
        ['begivenheter', 'Begivenheter', 'list'],
        ['statistikk', 'Statistikk', 'chart-bar'],
        ['hjelp', 'Hjelp', 'question-circle']
>>>>>>> login
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
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <a className="navbar-brand" href="/hjem">HverdagsHelt<img src="Skjermbilde.PNG" width="20" height="17" /></a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul className="navbar-nav">
                    {this.current_list.filter((e,i) => i<10).map( ([destination, text, faname]) => (
                        <li className="nav-item">                       
                            <NavLink className="nav-link" to={destination}><i className={"fas fa-"+faname}></i> {text}</NavLink>
                        </li>
                         ))}
                    </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/minside">
                            <i className="fas fa-user"></i> Min Side
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">
                            <i className="fas fa-sign-out-alt"></i> {
                                        localStorage.getItem('level') === 'none' ? "Logg inn" : "Logg ut"
                                    }
                        </NavLink>
<<<<<<< HEAD
                    </div>
                    <div className="collapse navbar-collapse" id="myNavbar">
                        <ul className={"nav navbar-nav "+css.nav}>
                            {this.current_list.filter((e,i) => i<5).map( ([destination, text, glyphname]) => (
                            <li>
                                <NavLink to={destination}>
                                    <span className={"glyphicon "+glyphname} /> {text}
                                </NavLink>
                            </li>
                            ))}
                            <li className="dropdown">
                                <a className="dropdown-toggle" data-toggle="dropdown" href="#">
                                    Mer
                                    <span className="caret" />
                                </a>
                                <ul className="dropdown-menu">
                                    {this.current_list.filter((e,i) => i>=4).map( ([destination, text, glyphname]) => (
                                        <li>
                                            <NavLink to={destination}>
                                                <span className={"glyphicon "+glyphname} /> {text}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        </ul>
                        <ul className={"nav navbar-nav navbar-right "+css.nav}>
                            <li>
                                <NavLink to="/minside">
                                    <span className="glyphicon glyphicon-user" /> Min Side
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/">
                                    <span className="glyphicon glyphicon-log-out" /> {
                                        localStorage.getItem('level') === 'none' ? "Logg inn" : "Logg ut"
                                    }
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
=======
                    </li>
                    
                </ul>
            </div>  
        </nav>
>>>>>>> login
        );
    }
}