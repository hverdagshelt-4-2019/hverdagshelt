// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import { Component,} from 'react-simplified';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import css from './styleMap.css';
import ControllableHover from './controllable_hover.js';
import CommuneService from "../Services/communeService";
import axios from 'axios';

import {K_SIZE} from './controllable_hover_styles.js';
import ticketService from "../Services/ticketService";

class ticket {
    id: string;
    heading: string;
    text: string;
    category: string;
    votes: number;
    lat: number;
    lng: number;
    pic: string;

    constructor(i: string, h: string, t: string, c: string, v: number, la: number, lo: number, p: string){
        this.id = i;
        this.heading = h;
        this.text = t;
        this.category = c;
        this.votes = v;
        this.lat = la;
        this.lng = lo;
        this.pic = p;
    }
}
let ta = [];

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

export default class SimpleMap extends Component {

    crd = null;

    static propTypes = {
        zoom: PropTypes.number, // @controllable
        hoverKey: PropTypes.string, // @controllable
        clickKey: PropTypes.string, // @controllable
        onCenterChange: PropTypes.func, // @controllable generated fn
        onZoomChange: PropTypes.func, // @controllable generated fn
        onHoverKeyChange: PropTypes.func, // @controllable generated fn

        greatPlaces: PropTypes.array
    }
    static defaultProps = {
        greatPlaces: ta
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.state = {
            cId: -1,
            greatPlaces: ta,
            center: {
                lat: 62.423336,
                lng: 12.100478
            },
            zoom: 5
        };

    }

    componentDidMount(){
        navigator.geolocation.getCurrentPosition(
            pos => {
                this.setState({
                    center: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    },
                    zoom : 13
                });
            }
        )
    }


    componentWillMount(){

        let communes = [];
        console.log('valid');
        console.log(communes);
        let list = [];
        ticketService.getAllTickets(communes).then(res => {
            list = res.data;
            list.forEach(commune => {
            //console.log(commune.lat);
            //console.log(commune.lng);
            ta.push(new ticket(commune.id.toString(), commune.title, commune.description, commune.category, commune.id, commune.lat, commune.lng, commune.picture));
            //console.log(ta);
            })
            console.log(ta);
            this.setState({greatPlaces: ta});
            console.log(this.state.greatPlaces);
            this._onChildMouseEnter (1);
            this._onChildMouseLeave();
        })

    }

    _onChange = (center, zoom /* , bounds, marginBounds */) => {
        this.props.onCenterChange(center);
        this.props.onZoomChange(zoom);
    }

    _onChildClick = (key, childProps) => {
        this.props.onCenterChange([childProps.lat, childProps.lng]);
        console.log(childProps);
        console.log(this.state.greatPlaces.filter(e => e.id== childProps.id));
        let lt = this.state.greatPlaces.filter(e => e.id== childProps.id);
        let localTicket = lt[0];
        console.log(localTicket);

        this.getImage(localTicket.pic);

        let header = document.getElementById("header");
        header.innerHTML = localTicket.heading;

        let category = document.getElementById("category");
        category.innerHTML = localTicket.category;

        let para = document.createElement("i");
        para.setAttribute("class", "fas fa-thumbs-up " +css.thumbUp)
        let vote = document.getElementById("vote");
        vote.innerHTML = localTicket.votes;
        vote.appendChild(para);

        this.setState({cId: localTicket.id});
    }

    _onChildMouseEnter = (key /*, childProps */) => {
        this.props.onHoverKeyChange(key);
    }

    _onChildMouseLeave = (/* key, childProps */) => {
        this.props.onHoverKeyChange(null);
    }

    
    getImage(i: String){
        let imageLink="/image/"+i;
        let picture = document.getElementById("picture");
        picture.setAttribute("src", imageLink);
    }


    render() {
        return (
            <div id="aroundMap" className={css.aroundMap}>
                <div style={{height: '10px'}}></div>
                <button type="button" className={"btn btn-primary "+css.btnCase}z>Legg til sak</button>
                <div className = {css.leftSide} style={{height: '75vh'}}>
                    <NavLink id="goToCase" className="nav-link" to={"/sak/"+this.state.cId}>
                    <img id="picture" src="/image/logo.png" className={"img-fluid "+css.ticketImg} alt="Responsive image"/>
                    <br/>
                    <br/>
                    <h5 id="header" className={css.header}>Velkommen til hverdagshelt</h5>
                    <hr className={css.hr}/>
                    <p id="category" style={{color: 'white', fontSize: 'small', marginLeft: '10px', marginRight: '10px'}}></p>
                    <hr className={css.hr}/>
                    </NavLink>
                    <div className = {css.aroundButton}>
                        <button id="vote" type="button" className={"btn btn-light " + css.voteB}><i className={"fas "+css["fa-thumbs-up"]}></i></button>
                    </div>
                </div>
                
                <div className={css.map} style={{ height: '75vh'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyC1y6jIJl96kjDPFRoMeQscJqXndKpVrN0' }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        hoverDistance={K_SIZE / 2}
                        onBoundsChange={this._onBoundsChange}
                        onChildClick={this._onChildClick}
                        onChildMouseEnter={this._onChildMouseEnter}
                        onChildMouseLeave={this._onChildMouseLeave}
                        >
                        {this.state.greatPlaces.map(greatPlace =>
                        <ControllableHover
                            key={greatPlace.id}
                            {...greatPlace}
                            text={greatPlace.id}
                            hover={this.props.hoverKey === greatPlace.id}
                             />
                        )}
                    </GoogleMapReact>
                </div>
                <div style={{height: '85vh'}}></div>
            </div>
            );
        }
}
