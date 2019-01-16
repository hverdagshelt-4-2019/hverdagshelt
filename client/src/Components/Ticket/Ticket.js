//@flow

import * as React from 'react';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Component } from 'react-simplified';
import ticketService from '../../Services/ticketService';
import commentService from '../../Services/ticketCommentService';
import Comment from '../Comment/Comment.js';

import { Alert } from '../../widgets';

import { K_SIZE } from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket = '';
  sub_date = null;
  comments = [];

  comment = {
      description: ''
  };

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
          const ctr = {
      lat: this.ticket.lat,
      lng: this.ticket.lng
      };
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
                Status: {this.ticket.status} <span className="glyphicon glyphicon-time" />
              </p>

              <hr />

              <p>
                <b>Registrert:</b> {this.ticket.submitted_time !== undefined && this.ticket.submitted_time.replace('T', ' ').replace('.000Z', '')}
              </p>

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

              <img id="picture" src="logo.png" className={"img-fluid "} alt="Responsive image"/>

              <hr />

              <p>{this.ticket.description}</p>

              <hr />
              <div className="map" style={{ height: '300px', width: '100%' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: 'AIzaSyC1y6jIJl96kjDPFRoMeQscJqXndKpVrN0' }}
                  center={ctr}
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
                  <form onSubmit={this.postComment}>
                    <div className="form-group">
                      <textarea className="form-control" rows="3" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.comment.description = event.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">
                      Send
                    </button>
                  </form>
                </div>
              </div>

              <div className="media mb-4">
                <div className="media-body">
                    {this.comments.map(e => {
                        return(<Comment email={e.email} description={e.description}/>
                        )
                    })}
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
        console.log(this.props.match.params.id);
        this.props.greatPlaces[0].lat=this.ticket.lat;
        this.props.greatPlaces[0].lng=this.ticket.lng;
        console.log("lat: " + this.ticket.lat + ". lng: " + this.ticket.lng)
        console.log(this.ticket.picture)
        this.getImage(this.ticket.picture)//xss 
        this.state.center.lat=this.ticket.lat;
        this.state.center.lng=this.ticket.lng;
      })
      .catch((error: Error) => Alert.danger(error.message));
    commentService.getAllComments(this.props.match.params.id)
        .then(comments => {this.comments = comments.data; this.forceUpdate()})
        .catch((error: Error) => Alert.danger(error.message));
  }

  postComment(e){
      e.preventDefault();
      if(!this.comment.description) return null;
      console.log('posting');

      commentService.postComment(this.props.match.params.id, this.comment.description);
      window.location.reload();
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
      this.getImage(this.ticket.picture);
    }
  }
}
