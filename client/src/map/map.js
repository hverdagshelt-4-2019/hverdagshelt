// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import {Component,} from 'react-simplified';
import {NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import shouldPureComponentUpdate from 'react-pure-render/function';
import controllable from 'react-controllables';
import css from './styleMap.css';
import ControllableHover from './controllable_hover.js';
import axios from 'axios';

import {K_SIZE} from './controllable_hover_styles.js';
import createHashHistory from 'history/createHashHistory';
        const history = createHashHistory();


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
, "testproblemer", 0, 63.41, 10.3723, "temp.jpg"));

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
    }

    componentWillMount(){
       /* console.log(ta);
        ta.forEach(ticket => {
            console.log(ticket.lat);
            this.props.greatPlaces.push({id: ticket.id, lat: ticket.lat, lon: ticket.lon});    
        })*/
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

        this.getImage(localTicket.pic)

        let header = document.getElementById("header");
        header.innerHTML = localTicket.heading;

        let category = document.getElementById("category");
        category.innerHTML = localTicket.category;

        let para = document.createElement("i");
        para.setAttribute("class", "fas fa-thumbs-up")
        let vote = document.getElementById("vote");
        vote.innerHTML = localTicket.votes;
        vote.appendChild(para);

    }

    _onChildMouseEnter = (key /*, childProps */) => {
        this.props.onHoverKeyChange(key);
    }

    _onChildMouseLeave = (/* key, childProps */) => {
        this.props.onHoverKeyChange(null);
    }

    getImage(i: String){
        let imageLink="/image/"+i;
        let picture = document.getElementById("ID TIL IMG ELEMENTET");
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
            <div style={{ height: '100%', width: '100%', paddingBottom: '300px'}}>
                <div style={{height: '100px'}}></div>
                <div className = "leftSide bg-primary" style={{height: '75vh'}}>
                    <img id="picture" src="logo.png" className="img-fluid ticketImg" alt="Responsive image"/>
                    <br/>
                    <br/>
                    <h5 id="header" className="header">Velkommen til hverdagshelt</h5>
                    <hr/>
                    <p id="category" style={{color: 'white', fontSize: 'small'}}></p>
                    <hr/>
                    <div className = "aroundButton">
                        <button id="vote" type="button" className="btn btn-light voteB"><i className="fas fa-thumbs-up"></i></button>
                    </div>
                </div>
                <div className = "map" style={{ height: '75vh'}}>
                    <GoogleMapReact
                    
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
            </div>
            );
        }
}
