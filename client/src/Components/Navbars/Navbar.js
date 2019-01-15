//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import css from './Navbar.css'

export default class Navbar extends Component {

    admin_pages = [
        ['Hjem', 'Hjem', 'glyphicon-home'],
        ['minesaker', 'Mine saker', 'glyphicon-folder-open'],
        ['minesvar', 'Mine svar', 'glyphicon-folder-open'],
        ['leggtilsak', 'Legg til sak', 'glyphicon-plus'],
        ['begivenheter', 'Liste over saker', 'glyphicon-list-alt'],
        ['kategorier', 'Kategorier', 'glyphicon-list-alt'],
        ['statistikk', 'Statistikk', 'glyphicon-stats'],
        ['hjelp', 'Hjelp', 'glyphicon-question-sign']
    ];
    public_worker_pages = [
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
    ];
    none_pages = [
        ['Hjem', 'Hjem', 'glyphicon-home'],
        ['begivenheter', 'Liste over saker', 'glyphicon-list-alt'],
        ['statistikk', 'Statistikk', 'glyphicon-stats'],
        ['hjelp', 'Hjelp', 'glyphicon-question-sign']
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

    render() {
        return (
            <nav className={"navbar navbar-light bg-light "+css.Navbar}>
                <div className={"container-fluid "+css.container}>
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                            <span className={css['icon-bar']} />
                            <span className={css['icon-bar']} />
                            <span className={css['icon-bar']} />
                        </button>
                        <NavLink  className={css.title+" navbar-brand"} exact to="/hjem">
                            <p><img src="Skjermbilde.PNG" width="20" height="17" />HverdagsHelt</p>
                        </NavLink>
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
                                    <span className="glyphicon glyphicon-log-out" /> Log ut
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}
