//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import ticketService from '../../Services/ticketService';
import categoryService from '../../Services/categoryService';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Alert } from '../../widgets';
import {K_SIZE} from './../../map/controllable_hover_styles.js';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class AddTicket extends Component<{ match: { params: { id: number } } }> {
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
            imageAdded: false
        };
        this.handleImageAdded = this.handleImageAdded.bind(this);
    }

    ticketCategories: Category[] = [];

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
        this.setState({greatPlaces: [pa],
        lat : lat,
        long: lng
        });
   }

   handleImageAdded() {
       this.state.imageAdded ? this.setState({imageAdded: false}) : this.setState({imageAdded: true});
   }

  render() {
    return (
        <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Rapporter en ny sak</h1>

                            <hr />

                            <h4>Tittel</h4>
                            <input className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))}/>

                             <h4>Beskrivelse</h4>
                            <textarea className="form-control" style={{width:"100%"}} 
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({description: event.target.value}))}
                            />

                            <h4>Kategori</h4>
                            
                            <select onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({category: event.target.value}))}>
                                {this.ticketCategories.map((categories, i) => (
                                <option value={categories.name} key={i}>
                                    {categories.name}
                                </option>
                                ))}
                            </select>


                            <h4>Bilde</h4>
                            <label htmlFor="InputFile">Last opp bilde</label>
                            <input type="file" className="form-control-file" id="InputFile" onChange={this.handleImageAdded}/>
                            <small id="fileHelp" className="form-text text-muted"></small>
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
                            
                            <button type="button" className="btn btn-primary" onClick={this.save}>Send</button>

                            <br />
                            <br />
                            <div style={{height: '100px'}}></div>
                    </div>
                </div>
            </div>
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
        let postId: Number;
        await ticketService
        .postTicket(this.state.category, this.state.title, this.state.description, this.state.lat, this.state.long)
        .then((response) => {
            postId = response.data.insertId;
        })
        .catch((error : Error) => console.log(error.message));
        console.log(postId);

        if(postId !== null && this.state.imageAdded){
        this.addImage(postId);
        }
        console.log(this.state.imageAdded);
    }

    mounted() {
        categoryService.getTicketCategories()
        .then((categories: Array<Category>) => this.ticketCategories = categories.data)
        .catch((error : Error) => console.log(error.message));
        
    }
}