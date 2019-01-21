//@flow

import * as React from 'react';
import { Component,} from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService from '../../Services/categoryService';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import {K_SIZE} from './../../map/controllable_hover_styles.js';
import { Alert } from '../../widgets';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class EditTicket extends Component<{ match: { params: { id: number } } }> {
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
                ],
                category: '',
                commune: '',
                title: '',
                description: '',
                picture: '',
                lat: '',
                long: '',
                imageAdded: false,
                categories: []
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
    handleImageAdded() {
       this.state.imageAdded ? this.setState({imageAdded: false}) : this.setState({imageAdded: true});
   }
    ticket='';


  render() {
      const ctr = {
          lat: this.ticket.lat,
          lng: this.ticket.lng
      };
    return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Endre sak:</h1>

                            <hr />

                            <h4>Tittel:</h4>
                            <input className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))} defaultValue={this.ticket.title}/>

                             <h4>Beskrivelse:</h4>
                            <textarea className="form-control" value={this.state.description} style={{width:"100%"}} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({description: event.target.value}))} defaultValue={this.ticket.description} />
                            
                                                        
                            <h4>Kategori:</h4>
                            <select onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({category: event.target.value}))}>
                                {this.state.categories.map((categories, i) => (
                                    <option selected={categories.name==this.state.category} id ={"option"+categories.name} key={i}>{categories.name}</option>
                                ))}
                            </select>
                            

                            <h4>Bilde:</h4>
                            <img id="picture" src="/image/logo.png" style={{maxWidth: '40%'}} className={"img-fluid"} alt="Responsive image"/>
                            <br />
                            <label htmlFor="InputFile">Last opp nytt bilde om ønsket</label>
                            <input type="file" className="form-control-file" id="InputFile" onChange={this.handleImageAdded}/>
                            <small id="fileHelp" className="form-text text-muted"></small>
                            
                            <hr />

                            {/* add default value */}
                            <div className = "map" style={{ height: '300px', width: '100%'}}>
                                <GoogleMapReact
                                    bootstrapURLKeys={{ key: 'AIzaSyC1y6jIJl96kjDPFRoMeQscJqXndKpVrN0' }}
                                    center={ctr}
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

                            <button type="button" className="btn btn-primary" onClick={this.save}>Lagre</button>

                        </div>
                    </div>
                </div>
                <div style={{height: '150px'}}></div>
            </div>
        );
    }

    addImage(id: number){
        let token = localStorage.getItem('authToken');
        let Authorization = 'none';
        if(token){
            Authorization = "Bearer " + token;
        }else{
            console.log("No token");
        }
        let url = "/image/";
        console.log("postImage");
        let file = document.getElementById("InputFile").files[0];
        console.log(file);
        let formData = new FormData();
        formData.append("id", id);
        formData.append("uploaded_image", file);
        fetch(url,
            {
                method: "POST",
                headers:
                    {
                        "authorization": Authorization
                    },
                body: formData,
            })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }

    async save() {
        if (!this.state.title) this.state.title = this.ticket.title;
        if (!this.state.description) this.state.description = this.ticket.description;
        if (!this.state.category) this.state.category = this.ticket.category;
        if (!this.state.long) this.state.long = this.ticket.long;
        if (!this.state.lat) this.state.lat = this.ticket.lat;
        let postId: Number;
        let posted = true;
        await ticketService
        .editTicket(this.props.match.params.id, this.state.category, this.state.title, this.state.description, this.state.greatPlaces[0].lat, this.state.greatPlaces[0].lng, this.ticket.submitter_email)
        .then((response) => {
            postId = response.data.insertId;
        })
        .catch((error : Error) => {
            console.log(error.message);
            Alert.danger("Noe gikk galt, Sak ikke oppdatert");
            posted = false;
            });
        if(posted){
            if(postId !== null && this.state.imageAdded){
                this.addImage(this.props.match.params.id);
            }
            console.log(this.state.imageAdded);
            Alert.success("Sak oppdatert");
            console.log("done");
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    getImage(i: String){
        let imageLink="/image/"+i;
        let picture = document.getElementById("picture");
        picture.setAttribute("src", imageLink);
    }

    mounted() {

        ticketService
        .getTicket(this.props.match.params.id)
        .then(ticket => {
            this.ticket = ticket.data[0];
            this.state.category = ticket.data[0].category;
            this.state.description = ticket.data[0].description;
            this.state.greatPlaces[0].lat= this.ticket.lat;
            this.state.greatPlaces[0].lng= this.ticket.lng;
            this.getImage(this.ticket.picture);
            })
        .catch((error : Error) => console.log(error.message));

        categoryService.getTicketCategories()
        .then((categories: Array<Category>) => {
            this.setState({categories: categories.data});
        })
        .catch((error : Error) => console.log(error.message));
    }
}
