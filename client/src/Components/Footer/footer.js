// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import {Component,} from 'react-simplified';
import {NavLink } from 'react-router-dom';
import css from './styleFooter.css';

export default class Footer extends Component {
    render() {
        return(
            <footer className={css.footer}>


            <div className="container">
                <ul className={css.foote_bottom_ul_amrc}>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
                <p className="text-center">Copyright @2019 | <a className={css.team} href="#">Team 4</a></p>

                <ul className={css.social_footer_ul+" "+css.footer}>
                    <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                    <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                    <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
                    <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                </ul>
            </div>

            </footer>

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
