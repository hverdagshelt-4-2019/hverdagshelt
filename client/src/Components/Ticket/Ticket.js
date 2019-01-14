//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/TicketService';
import { Alert} from '../../widgets';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';

import {K_SIZE} from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket = '';

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
        <div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h1>this.ticket.title</h1>
                        <p className="lead">
                             Status: Avventer svar <span className="glyphicon glyphicon-time"></span>
                        </p>

                        <hr />

                        <p>January 1, 2018 12:00</p>

                        <p><b>Kommune:</b> Trondheim</p>

                        <p><b>Bedrift:</b> Statens Vegvesen</p>

                        <p><b>Kategori:</b> Veiproblem</p>

                        <hr />

                        <img src="http://placehold.it/900x300" alt="" />
                    
                        <hr />

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>

                        <hr />
                        <div className = "map" style={{ height: '300px', width: '100%'}}>
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
                        <div style={{height: '300px'}}></div>
                        <hr />

                        <div>
                            <br />
                            <h5 className="card-header">Kommenter:</h5>
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <textarea className="form-control" rows="3"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Send</button>
                                </form>
                            </div>
                        </div>

        
                       <div className="media mb-4">
                            <div className="media-body">
                                <h5 className="mt-0">Commenter Name</h5>
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </div>
                         </div>
                         <div style={{height: '100px'}}></div>
                   </div>
                </div>
            </div>
        </div>
    );
  }

  mounted() {
    ticketService
      .getTicket(this.props.match.params.id)
      .then(ticket => (this.ticket = ticket[0]))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
