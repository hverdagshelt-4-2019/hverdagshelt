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
import ReactDOM from 'react-dom';

import {K_SIZE} from './controllable_hover_styles.js';
import ticketService from "../Services/ticketService";

class ticket {
    id: string;
    heading: string;
    text: string;
    category: string;
    countcomm: number;
    lat: number;
    lng: number;
    pic: string;

    constructor(i: string, h: string, t: string, c: string, v: number, la: number, lo: number, p: string){
        this.id = i;
        this.heading = h;
        this.text = t;
        this.category = c;
        this.countcomm = v;
        this.lat = la;
        this.lng = lo;
        this.pic = p;
    }
}

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

export default class SimpleMap extends Component {
    crd = null;
    tickets = [];

    static propTypes = {
        zoom: PropTypes.number, // @controllable
        hoverKey: PropTypes.string, // @controllable
        clickKey: PropTypes.string, // @controllable
        onCenterChange: PropTypes.func, // @controllable generated fn
        onZoomChange: PropTypes.func, // @controllable generated fn
        onHoverKeyChange: PropTypes.func, // @controllable generated fn

        greatPlaces: PropTypes.array
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.state = {
            cId: -1,
            center: {
                lat: 62.423336,
                lng: 12.100478
            },
            zoom: 5
        };

    }

    componentDidMount(){

    }


    componentWillMount(){
        navigator.geolocation.getCurrentPosition(
            pos => {
                ticketService.getCommune(pos.coords.latitude, pos.coords.longitude).then(res =>{
                    console.log('valid');
                    let list = [];
                    let ta2 = [];
                    ticketService.getAllTicketsMap(res.data.kommune).then(res => {
                        list = res.data;
                        console.log(list);
                        list.forEach(commune => {
                            ta2.push(new ticket(commune.id.toString(), commune.title, commune.description, commune.category, commune.countcomm, commune.lat, commune.lng, commune.picture));
                        });
                        //this.setState({greatPlaces: ta2});
                        this.tickets = ta2;
                        this.props.onHoverKeyChange(1);
                        this.props.onHoverKeyChange(null);
                    })
                });
                this.setState({
                    center: {
                        lat: pos.coords.latitude,
                        lng: pos.coords.longitude,
                    },
                    zoom: 13
                });
            }
        );



    }

    _onChildClick = (key, childProps) => {
        this.props.onHoverKeyChange(key);
        this.props.onCenterChange([childProps.lat, childProps.lng]);
        console.log(childProps);
        console.log(this.tickets.filter(e => e.id== childProps.text));
        let lt = this.tickets.filter(e => e.id== childProps.text);
        let localTicket = lt[0];
        console.log(localTicket);

        this.getImage(localTicket.pic);

        let header = document.getElementById("header");
        header.innerHTML = localTicket.heading;

        let category = document.getElementById("category");
        category.innerHTML = localTicket.category;

        let para = document.createElement("i");
        let vote = document.getElementById("vote");
        console.log(localTicket);
        vote.innerHTML = localTicket.countcomm;
        vote.appendChild(para);

        this.setState({cId: localTicket.id});
    };

    
    getImage(i: String){
        let imageLink="/image/"+i;
        let picture = document.getElementById("picture");
        picture.setAttribute("src", imageLink);
    }


    render() {
        if(!this.tickets) return (<></>);
        const places = this.tickets.map(place => {
        const { id, ...coords } = place;

        return (
            <ControllableHover
            key={id}
            {...coords}
            text={id}
            // use your hover state (from store, react-controllables etc...)
            hover={this.props.hoverKey === id}
            />
        );
        });
        return (
            <div id="aroundMap" className={css.aroundMap}>
                <div style={{height: '10px'}}></div>
                <div className = {"shadow blue "+css.leftSide} style={{height: '87vh'}}>
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
                        <button id="vote" type="button" className={"btn customBtn " + css.voteB}><i className={"fas "+css["fa-thumbs-up"]}></i></button>
                    </div>
                </div>
                
                <div className={"shadow "+css.map} style={{ height: '87vh'}}>
                    <GoogleMapReact
                        ref="alotOfMarkers"
                        bootstrapURLKeys={{ key: 'AIzaSyC1y6jIJl96kjDPFRoMeQscJqXndKpVrN0' }}
                        center={this.state.center}
                        zoom={this.state.zoom}
                        hoverDistance={K_SIZE / 2}
                        onBoundsChange={this._onBoundsChange}
                        onChildClick={this._onChildClick}
                        onChildMouseEnter={this._onChildMouseEnter}
                        onChildMouseLeave={this._onChildMouseLeave}
                        >
                        {places}
                    </GoogleMapReact>
                </div>
            </div>
            );
        }
}
