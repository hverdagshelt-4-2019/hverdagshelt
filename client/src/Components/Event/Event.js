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
                    <time>
                        <span>{
                            this.event.happening_time !== undefined && this.event.happening_time.replace('T', ' ').replace('.000Z', '').slice(0, -9)
                        }</span>
                    </time>
                    <img id="picture" alt="Responsive Image" />
                    <div className={css.eventInfo}>
                    <h2 className="title">{this.event.title}</h2>
                    <hr/>
                    
                    <ul className="inlineStuff">
                    <li style={{width: "33%"}}>
                    <i className="fas fa-clock" style={{marginRight: "4px"}}></i> {this.event.happening_time !== undefined && this.event.happening_time.replace('T', ' ').replace('.000Z', '').slice(10, -3)}
                    </li>
                    <li style={{width: "34%"}}>
                    <i className="fas fa-map-marker-alt" style={{marginRight: "4px"}}></i> {this.event.commune_name}
                    </li>
                    <li style={{width: "33%"}}>
                    <i className="fas fa-archive" style={{marginRight: "4px"}}></i> {this.event.category}
                    </li>
                    </ul>
                    
                    <hr/>
                    <p>{this.event.description}</p>
                    </div>
            </div>

        );
    }

    mounted() {
        this.formatDate;
        eventService.
            getEvent(this.props.match.params.id)
            .then(event => {
                this.event = event.data[0];
                this.sub_date = this.event.happening_time;
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
