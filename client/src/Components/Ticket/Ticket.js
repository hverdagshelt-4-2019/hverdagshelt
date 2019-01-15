//@flow

import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/ticketService';
import { commentService } from '../../Services/ticketCommentService';

import Alert from '../../widgets';
import Navbar_person from '../Navbars/Navbar_person';

import { K_SIZE } from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket = '';
  sub_date = null;
  comments = [];

  static propTypes = {
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

  _onChange = (center, zoom /* , bounds, marginBounds */) => {
    this.props.onCenterChange(center);
    this.props.onZoomChange(zoom);
  };

  _onChildClick = (key, childProps) => {
    this.props.onCenterChange([childProps.lat, childProps.lng]);
  };

  _onChildMouseEnter = (key /*, childProps */) => {
    this.props.onHoverKeyChange(key);
  };

  _onChildMouseLeave = (/* key, childProps */) => {
    this.props.onHoverKeyChange(null);
  };

  render() {
    const places = this.props.greatPlaces.map(place => {
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
      <div>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <h1>{this.ticket.title}</h1>
              <p className="lead">
                Status: Avventer svar <span className="glyphicon glyphicon-time" />
              </p>

              <hr />

              <p> {this.sub_date} </p>

              <p>
                <b>Kommune:</b> {this.ticket.responsible_commune}
              </p>

              <p>
                <b>Bedrift:</b> {this.ticket.company}
              </p>

              <p>
                <b>Kategori:</b> {this.ticket.category}
              </p>

              <hr />

              <img id="imageElement" alt="" />

              <hr />

              <p>{this.ticket.description}</p>

              <hr />
              <div className="map" style={{ height: '300px', width: '100%' }}>
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
              <hr />

              <div>
                <br />
                <h5 className="card-header">Kommenter:</h5>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <textarea className="form-control" rows="3" />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </form>
                </div>
              </div>

              <div className="media mb-4">
                <div className="media-body">

                </div>
              </div>
              <div style={{ height: '100px' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  mounted() {
    console.log('mounting');
    ticketService
      .getTicket(this.props.match.params.id)
      .then(ticket => {
        this.ticket = ticket.data[0];
        this.sub_date =
          this.ticket.submitted_time.split('T', 1)[0] + ' ' + this.ticket.submitted_time.split('T')[1].split('.', 1);
        console.log(this.props.match.params.id)
      })
      .catch((error: Error) => Alert.danger(error.message));
    commentService.getAllComments(this.props.match.params.id)
        .then(comments => {this.comments = comments.data;})
        .catch((error: Error) => Alert.danger(error.message));
  }

  postComment(){

  }

  getImage(i: String) {
    let imageLink = '/image/' + i;
    let picture = document.getElementById('imageElement');
    picture.setAttribute('src', imageLink);
  }

  componentDidMount() {
    console.log('did mount');
    {
      this.getImage(this.ticket.picture);
    }
  }
}
