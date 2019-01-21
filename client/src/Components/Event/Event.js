//@flow

import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import eventService from '../../Services/eventService';
import { Alert } from '../../widgets';
import { K_SIZE } from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class event extends Component<{ match: { params: { id: number } } }> {
    event: {lat:any, lng:any, picture:any} = {lat: '', lng: '', picture: ''};
    sub_date = null;



    /*static propTypes = {
        zoom: PropTypes.number, // @controllable
        hoverKey: PropTypes.string, // @controllable
        clickKey: PropTypes.string, // @controllable
        onCenterChange: PropTypes.func, // @controllable generated fn
        onZoomChange: PropTypes.func, // @controllable generated fn
        onHoverKeyChange: PropTypes.func, // @controllable generated fn

        greatPlaces: PropTypes.array
    };
    static defaultProps = {
        center: {
            lat: 63.42,
            lng: 10.38
        },
        zoom: 13,
        greatPlaces: [{ id: 'Temp ex', lat: 63.42, lng: 10.38 }]
    };

    shouldComponentUpdate = shouldPureComponentUpdate;

    constructor(props) {
        super(props);
    }

    _onChange = (center, zoom ) => {
        this.props.onCenterChange(center);
        this.props.onZoomChange(zoom);
    };

    _onChildClick = (key, childProps) => {
        this.props.onCenterChange([childProps.lat, childProps.lng]);
    };

    _onChildMouseEnter = (key) => {
        this.props.onHoverKeyChange(key);
    };

    _onChildMouseLeave = () => {
        this.props.onHoverKeyChange(null);
    };*/

    render() {
        if(!this.event) return (<></>);


        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>{this.event.title}</h1>

                            <p className="col-lg-8">
                                Registrert av: {this.event.submitter_id}
                            </p>

                            <hr />

                            <p>
                                <b>Dato:</b> {this.event.happening_time !== undefined && this.event.happening_time.replace('T', ' ').replace('.000Z', '')}
                            </p>

                            <p>
                                <b>Kommune:</b> {this.event.commune_name}
                            </p>

                            <p>
                                <b>Kategori:</b> {this.event.category}
                            </p>

                            <hr />

                            <img id="picture" src="logo.png" className={"img-fluid "} alt="Responsive image"/>

                            <hr />

                            <p>{this.event.description}</p>



                            <div style={{ height: '100px' }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    mounted() {
        console.log('mounting');
        eventService.
            getEvent(this.props.match.params.id)
            .then(event => {
                this.event = event.data[0];
                this.sub_date =
                    this.event.happening_time.split('T', 1)[0] + ' ' + this.event.happening_time.split('T')[1].split('.', 1);
                console.log(this.props.match.params.id);
               /* this.props.greatPlaces[0].lat=this.event.lat;
                this.props.greatPlaces[0].lng=this.event.lng;
                console.log("lat: " + this.event.lat + ". lng: " + this.event.lng)
                console.log(this.event.picture);
                this.getImage(this.event.picture); //xss
                this.state.center.lat=this.event.lat;
                this.state.center.lng=this.event.lng;
                window.location.reload();*/
            })
            .catch((error: Error) => Alert.danger(error.message));
    }


    getImage(i: String) {
        let imageLink = '/image/' + i;
        let picture: HTMLElement|null = document.getElementById('picture');
        if(picture)
            picture.setAttribute('src', imageLink);
    }

    componentDidMount() {
        console.log('did mount');
        {
            this.getImage(this.event.picture);
        }
    }

}
