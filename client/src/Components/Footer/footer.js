// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import {Component,} from 'react-simplified';
import {NavLink } from 'react-router-dom';
import css from './styleFooter.css';

export default class Footer extends Component {

    render() {
        return (
            <div className="aroundFoot">
                <br/>
                <footer className="footer bg-primary mb-2 p-3 text-white">
                    <div className="container h3" style={{opacity: "0.8"}}>
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
        }
}
