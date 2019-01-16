// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import { Component,} from 'react-simplified';
import {NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import css from './styleMap.css';
import ControllableHover from './controllable_hover.js';
import CommuneService from "../Services/communeService";
import axios from 'axios';

import {K_SIZE} from './controllable_hover_styles.js';
import {ticketService} from "../Services/ticketService";

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
ta.push(new ticket('0',"Det har hvert hull i denne veien for flere år", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae placerat neque. Aenean et ornare lectus, et malesuada tellus. Praesent ullamcorper volutpat felis id semper. Pellentesque mattis egestas aliquet. Vivamus tempus orci nec neque hendrerit scelerisque. Fusce non augue eu ex blandit tristique. Pellentesque eget tincidunt urna, et imperdiet turpis. Vivamus imperdiet arcu eget ullamcorper ultricies. Donec volutpat nibh eget lobortis consectetur. Phasellus aliquam risus tellus, in tincidunt neque blandit eu. Duis vel fermentum urna.", 
"veiproblemer", 8, 63.42, 10.38, "temp.jpg"));
ta.push(new ticket('1', "Nå har lyset gått", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae placerat neque. Aenean et ornare lectus, et malesuada tellus. Praesent ullamcorper volutpat felis id semper. Pellentesque mattis egestas aliquet. Vivamus tempus orci nec neque hendrerit scelerisque. Fusce non augue eu ex blandit tristique. Pellentesque eget tincidunt urna, et imperdiet turpis. Vivamus imperdiet arcu eget ullamcorper ultricies. Donec volutpat nibh eget lobortis consectetur. Phasellus aliquam risus tellus, in tincidunt neque blandit eu. Duis vel fermentum urna."
, "lysproblemer", 2, 63.425, 10.386, "temp.jpg"));
ta.push(new ticket('2', "Test", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vitae placerat neque. Aenean et ornare lectus, et malesuada tellus. Praesent ullamcorper volutpat felis id semper. Pellentesque mattis egestas aliquet. Vivamus tempus orci nec neque hendrerit scelerisque. Fusce non augue eu ex blandit tristique. Pellentesque eget tincidunt urna, et imperdiet turpis. Vivamus imperdiet arcu eget ullamcorper ultricies. Donec volutpat nibh eget lobortis consectetur. Phasellus aliquam risus tellus, in tincidunt neque blandit eu. Duis vel fermentum urna."
, "testproblemer", 0, 63.41, 10.3723, "0kopimaskin.jpg"));

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

export default class SimpleMap extends Component {

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
        center: {
            lat: 63.42,
            lng: 10.38
        },
        zoom: 13,
        greatPlaces: ta
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
        this.state = {
            cId: -1,
        };
    }

    mounted(){
        let communes = [];
        let validToken = 0;
        ticketService.verifyToken().then(res => (validToken = res.status)).then(res =>{
            console.log(validToken);
        if(validToken === 200){
            console.log('valid');
            CommuneService.getFollowedCommunes()
                .then(res => {communes = res.data;
                console.log(communes);
                ticketService.getAllTickets(communes).then(res => {
                    ta = res.data;
                    console.log(ta);
                    ta.forEach(commune => {
                    console.log(commune.lat);
                    console.log(commune.lng);
                    this.props.greatPlaces.push({id: commune.id, lat: commune.lat, lon: commune.lng});
                    })
                })
                })
        } else {
            console.log('not valid');
        }})
    }

    _onChange = (center, zoom /* , bounds, marginBounds */) => {
        this.props.onCenterChange(center);
        this.props.onZoomChange(zoom);
    }

    _onChildClick = (key, childProps) => {
        this.props.onCenterChange([childProps.lat, childProps.lng]);
        console.log(childProps.text);
        console.log(ta[childProps.text]);
        let localTicket = ta[childProps.text];

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
        const places = this.props.greatPlaces
        .map(place => {
            const {id, ...coords} = place;

            return (
                <ControllableHover
                key={id}
                {...coords}
                text={id}
                // use your hover state (from store, react-controllables etc...)
                hover={this.props.hoverKey === id} />
            );
        });
        return (
            <div id="aroundMap" className={css.aroundMap}>
                <div style={{height: '10px'}}></div>
                <button type="button" className={"btn btn-primary "+css.btnCase}>Legg til sak</button>
                <div className = {css.leftSide} style={{height: '75vh'}}>
                    <NavLink id="goToCase" className="nav-link" to={"/sak/"+this.state.cId}>
                    <img id="picture" src="logo.png" className={"img-fluid "+css.ticketImg} alt="Responsive image"/>
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
                    center={this.props.center}
                    zoom={this.props.zoom}
                    hoverDistance={K_SIZE / 2}
                    onBoundsChange={this._onBoundsChange}
                    onChildClick={this._onChildClick}
                    onChildMouseEnter={this._onChildMouseEnter}
                    onChildMouseLeave={this._onChildMouseLeave}
                    >
                    {places}
                    </GoogleMapReact>
                </div>
                <div style={{height: '85vh'}}></div>
            </div>
            );
        }
}
