//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

export class Navbar_person extends Component {
  render() {
    return (
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
              <span className="icon-bar" />
              <span className="icon-bar" />
              <span className="icon-bar" />
            </button> 
            <NavLink className="navbar-brand" exact to="/hjem">
              <p>HverdagsHelt<img src="Skjermbilde.PNG" width="20" height="17" /></p>
            </NavLink>
          </div>
          <div className="collapse navbar-collapse" id="myNavbar">
            <ul className="nav navbar-nav">
              <li className="active">
                <NavLink to="/hjem">
                  <span className="glyphicon glyphicon-home" /> Hjem
                </NavLink>
              </li>
              <li>
                <NavLink to="/minesaker">
                  <span className="glyphicon glyphicon-folder-open" /> Mine saker
                </NavLink>
              </li>
              <li>
                <NavLink to="/leggtilsak">
                  <span className="glyphicon glyphicon-plus" /> Legg til sak
                </NavLink>
              </li>
              <li>
                <NavLink to="/begivenheter">
                  <span className="glyphicon glyphicon-calendar" /> Begivenheter
                </NavLink>
              </li>
              <li>
                <NavLink to="/statistikk">
                  <span className="glyphicon glyphicon-stats" /> Statistikk
                </NavLink>
              </li>
              <li>
                <NavLink to="/hjelp">
                  <span className="glyphicon glyphicon-question-sign" /> Hjelp
                </NavLink>
              </li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
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