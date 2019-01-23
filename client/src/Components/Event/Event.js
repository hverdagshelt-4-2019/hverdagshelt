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
import css from './style.css';

export default class Event extends Component<{ match: { params: { id: number } } }> {
    event: {picture:any} = {picture: ''};
    sub_date = null;


    render() {
        if(!this.event) return (<></>);
        return (
           <div className={css.eventContainer}>
                    <time dateTime="2014-07-20">
                        <span className="day">4</span>
                        <span className="month">Jul</span>
                        <span className="year">2014</span>
                    </time>
                    <img id="picture" alt="Responsive Image" />
                    <div className={css.eventInfo}>
                    <h2 className="title">{this.event.title}</h2>
                    <hr/>
                    <p><i className="fas fa-map-marker-alt" style={{marginRight: "4px"}}></i> {this.event.commune_name}</p>
                    <hr/>
                    <p><i className="fas fa-archive" style={{marginRight: "4px"}}></i> {this.event.category}</p>
                    <hr/>
                    <p><i className="fas fa-calendar" style={{marginRight: "8px"}}></i>{this.event.happening_time !== undefined && this.event.happening_time.replace('T', ' ').replace('.000Z', '').slice(0, -3)}</p>
                    <hr/>
                    <p>{this.event.description}</p>
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
