//@flow

import * as React from 'react';
import { Component,} from 'react-simplified';
import ticketService from '../../Services/ticketService';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import {K_SIZE} from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

export default class EditTicket extends Component {
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
            greatPlaces:  [
        {id: 'Temp ex', lat: 63.42, lng: 10.38}
        ]
        };

        shouldComponentUpdate = shouldPureComponentUpdate;

        constructor(props) {
            super(props);
            this.state = {
                greatPlaces:  [
                {id: 'Temp ex', lat: 63.42, lng: 10.38}
                ]
            };
        }

        _onChange = (center, zoom /* , bounds, marginBounds */) => {
            this.props.onCenterChange(center);
            this.props.onZoomChange(zoom);
        }

        _onChildClick = (key, childProps) => {
            this.props.onCenterChange([childProps.lat, childProps.lng]);

        }

        _onChildMouseEnter = (key /*, childProps */) => {
            this.props.onHoverKeyChange(key);
        }

        _onChildMouseLeave = (/* key, childProps */) => {
            this.props.onHoverKeyChange(null);
        }

    _onClick = ({x, y, lat, lng, event}) => {
        console.log(lat, lng);
            let pa = this.state.greatPlaces[0];
            pa.lat = lat;
            pa.lng = lng;
            this.setState({greatPlaces: [pa]});
    }
  render() {
    return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Endre sak:</h1>

                            <hr />

                            <h4>Tittel:</h4>
                            <input className="form-control" defaultValue="Hull i veien"/>

                             <h4>Beskrivelse:</h4>
                            <textarea className="form-control" style={{width:"100%"}} defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus."/>
                            
                            <h4>Kategori:</h4>
                            <select>
                                <option>Hærverk</option>
                                <option>Søppel</option>
                                <option selected="selected">Veiproblem</option>
                            </select>

                            <h4>Bilde:</h4>
                           
                            <input type="file" className="form-control-file" id="InputFile"/>
                            <small id="fileHelp" className="form-text text-muted"></small>
                            {/* need to fix default value here */}

                            <hr />

                            <div className = "map" style={{ height: '300px', width: '100%'}}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyC1y6jIJl96kjDPFRoMeQscJqXndKpVrN0' }}
                                    center={this.props.center}
                                    zoom={this.props.zoom}
                                    onClick={this._onClick} 
                                    >
                                    <ControllableHover
                                        key={this.props.greatPlaces[0].id}
                                        {...this.state.greatPlaces[0]}
                                        text={this.props.greatPlaces[0].id}
                                        hover={this.props.hoverKey === this.props.greatPlaces[0].id} />
                                </GoogleMapReact>
                            </div>
                            <div style={{height: '10px'}}></div>
                            <hr />

                            <button type="button" className="btn btn-primary">Lagre</button>

                        </div>
                    </div>
                </div>
                <div style={{height: '150px'}}></div>
            </div>
        );
    }
}