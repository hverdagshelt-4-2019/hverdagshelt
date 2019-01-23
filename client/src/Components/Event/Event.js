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

export default class Event extends Component<{ match: { params: { id: number } } }> {
    event: {picture:any} = {picture: ''};
    sub_date = null;


    render() {
        if(!this.event) return (<></>);
        return (
             <div className="aroundStuff">
                <div className="card">
                <img id="picture" className="card-img-top" style={{maxWidth: "100%", maxHeight: "300px"}} alt="Responsive image"/>
                <div className="card-header">
                <h1>{this.event.title}</h1>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><b>Dato:</b> {this.event.happening_time !== undefined && this.event.happening_time.replace('T', ' ').replace('.000Z', '').slice(0, -3)}</li>
                    <li className="list-group-item"><b>Kommune:</b> {this.event.commune_name}</li>
                    <li className="list-group-item"><b>Kategori:</b> {this.event.category}</li>
                    <li className="list-group-item"><b>Beskrivelse:</b> {this.event.description}</li>
                </ul>
                </div>
           </div>
        );
    }

    mounted() {
        eventService.
            getEvent(this.props.match.params.id)
            .then(event => {
                this.event = event.data[0];
                this.sub_date = this.event.happening_time.split('T', 1)[0] + ' ' + this.event.happening_time.split('T')[1].split('.', 1);
                console.log(this.props.match.params.id);
                console.log(this.event.picture);
                this.getImage(this.event.picture);
            })
            .catch((error: Error) => console.log(error.message));
    }


    getImage(i: String) {
        let imageLink = '/image/' + i;
        let picture: HTMLElement|null = document.getElementById('picture');
        if(picture)
            picture.setAttribute('src', imageLink);
    }
}
