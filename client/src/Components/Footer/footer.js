// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import {Component,} from 'react-simplified';
import {NavLink } from 'react-router-dom';
import css from './styleFooter.css';

export default class Footer extends Component {
    render() {
        return(
            <div>
                <div style={{height: '120px'}}></div>
                <footer className={"blue " + css.footer}>
                <div className="container">
                    <ul className={css.foote_bottom_ul_amrc}>
                        <li><NavLink to="/hjem">Hjem</NavLink></li>
                        <li><NavLink to="/om">Om</NavLink></li>
                        <li><NavLink to="/hjelp">Hjelp</NavLink></li>
                    </ul>
                    <p className="text-center">Copyright @2019 | <span className={css.team}>Team 4</span></p>
                </div>

                </footer>
            </div>

        )
    }
/*
    render() {
        return (
            <div className="aroundFoot">
                <br/>
                <footer className="footer mb-2 p-3 text-white">
                    <div className="container h3">
                        <ul className="list-inline text-center">
                        <li className="list-inline-item">
                        <a className="btn-floating" href="/some/valid/uri">
                            <i className="fab fa-facebook-square"> </i>
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a className="btn-floating btn-tw mx-1" href="/some/valid/uri">
                            <i className="fab fa-twitter-square"> </i>
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a className="btn-floating btn-gplus mx-1" href="/some/valid/uri">
                            <i className="fab fa-google-plus-square"> </i>
                        </a>
                        </li>
                        <li className="list-inline-item">
                        <a className="btn-floating btn-li" href="/some/valid/uri">
                            <i className="fab fa-linkedin"> </i>
                        </a>
                        </li>
                        </ul>
                    </div>
                    <div className="text-center font-italic">©2019 Copyright: Team 4</div>
                </footer>
            </div>
            );
        }*/
}
