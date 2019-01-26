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
                        <li><NavLink to="/">Hjem</NavLink></li>
                        <li><NavLink to="/om">Om</NavLink></li>
                        <li><NavLink to="/hjelp">Hjelp</NavLink></li>
                    </ul>
                    <p className="text-center">Copyright @2019 | <span className={css.team}>Team 4</span></p>
                </div>

                </footer>
            </div>

        )
    }

}
