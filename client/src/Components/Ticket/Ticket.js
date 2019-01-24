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
import Dropdown from "../Dropdown/Dropdown";
import styles from "./style.css";
import CompanyService from '../../Services/companyService'
import { Alert } from '../../widgets';
import { K_SIZE } from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket: {lat:any, lng:any, picture:any} = {lat: '', lng: '', picture: ''};
  sub_date = null;
  comments = [];
  companies = ['Ingen'];

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
      this.state = {
          statusText: ''
      };
  }

  editStatus(cat) {
    let res = ticketService.setStatus(this.ticket.id, {status: cat, statusText: this.state.statusText, email: this.ticket.submitter_email, responsible_commune: this.ticket.responsible_commune});
    console.log("Response: " + res);
  }

  editCompany(cat) {
    ticketService.setCompany(this.ticket.id, {name: cat})
        .then(e => console.log(e))
        .catch(err => console.log(err))
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
      if(!this.ticket) return (<></>);
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

    const status = ["Ubehandlet", "Bearbeides", "Fullført"];

    return (
      <div className="aroundStuff">
        <div style={{height: "1em"}}/>
        <img id="picture" src="" className={"img-fluid imgMiddle"} alt="Responsive image"/>

        <hr />
        <div className="container">
          <div className="row">
            <div className="col-lg-10" style={{marginLeft: "8%", marginRight: "8%"}}>
              <br />
              <h1>{this.ticket.title}</h1>

              <div className={styles.statusDiv}>
                <p id={"status"+this.ticket.id}>
                    <i id={"it"+this.ticket.id}></i>
                </p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p style={{fontWeight: "900", color: "#666B6E", marginTop: "15px"}} id={"statust"+this.ticket.id}>
                {this.canSetStatus() && this.ticket.status && <Dropdown options={status} currValue={this.ticket.status} reciever={this.editStatus}/>}
                {this.canSetStatus() && this.ticket.status && <textarea className="form-control-sm" style={{resize: "none"}} value={this.state.statusText} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({statusText: event.target.value}))}/>}
                {!this.canSetStatus() && this.ticket.status && <p>{this.ticket.status} </p>}
                </p>
                  {!this.canSetStatus() && this.ticket.status && <p>{this.state.statusText}</p>}
              </div>

              <p>
                <i className="fas fa-user" style={{marginRight: "4px"}}></i> {this.ticket.name}
              </p>

              <hr />
              <ul className="inlineStuff">
                <li style={{width: "33%"}}>
                  <i className="fas fa-calendar" style={{marginRight: "4px"}}></i> {this.ticket.submitted_time !== undefined && this.sub}
                </li>
                <li style={{width: "34%"}}>
                  <i className="fas fa-map-marker-alt" style={{marginRight: "4px"}}></i> {this.ticket.responsible_commune}
                </li>
                <li style={{width: "33%"}}>
                  <i className="fas fa-edit" style={{marginRight: "4px"}}></i> {this.ticket.category}
                </li>
              </ul>
              <hr />
              <p>
                <b>Ansvarlig bedrift:</b> {this.ticket.company_name} {this.canSetStatus() && this.companies.length > 1 && <Dropdown options={this.companies} currValue={this.ticket.company_name} reciever={this.editCompany}/>}
              </p>

              <hr />

              <label>{this.ticket.description}</label>

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
                    <button type="submit" className="btn customBtn">
                      Send
                    </button>
                  </form>
                </div>
              </div>

              <div className="media mb-4">
                <div className="media-body">
                    {this.comments.map(e => {
                        return(<Comment name={e.name} description={e.description}/>
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
                this.state.statusText = ticket.data[0].statusText;
                this.sub_date =
                    this.ticket.submitted_time.split('T', 1)[0] + ' ' + this.ticket.submitted_time.split('T')[1].split('.', 1);
                console.log(this.props.match.params.id);
                this.props.greatPlaces[0].lat=this.ticket.lat;
                this.props.greatPlaces[0].lng=this.ticket.lng;
                console.log("lat: " + this.ticket.lat + ". lng: " + this.ticket.lng)
                console.log(this.ticket.picture);
                this.getImage(this.ticket.picture);
                let s = document.getElementById("status"+ticket.id);
                let st = document.getElementById("statust"+ticket.id);
                let i = document.getElementById("it"+ticket.id);
                console.log("hei"+this.ticket.status);
                if(this.ticket.status == "Fullført"){
                    s.style.color = "green";
                    st.style.color = "green";
                    i.setAttribute("class", "fas fa-check");
                }else if(this.ticket.status == "Bearbeides"){
                    s.style.color = "#FFCD24";
                    st.style.color = "#FFCD24";
                    i.setAttribute("class", "fas fa-spinner");
                }else {
                    i.setAttribute("class", "fas fa-clipboard-list");
                }
            })
            .catch((error: Error) => Alert.danger(error.message));
        commentService.getAllComments(this.props.match.params.id)
            .then(comments => {this.comments = comments.data; this.forceUpdate()})
            .catch((error: Error) => { 
              Alert.danger(error.message);
              });
        // communes = communes.concat(res);
        CompanyService.getCompanies()
            .then(res => {this.companies = this.companies.concat(res.data.map(e => e.name)); console.log(this.companies.length); this.forceUpdate()})//this.companies = this.companies.concat(res.data))
            .then(console.log('length: ' + this.companies.length))
            .catch(err => console.log(err))
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

  canSetStatus() {
    return localStorage.getItem('level') === 'publicworker' || localStorage.getItem('level') === 'company';

  }
}
