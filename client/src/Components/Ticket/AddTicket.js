//@flow
/**
 * Component for adding ticket
 */
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
        };
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
        });
   }


  render() {
    return (
        <div>
                <div className="container aroundStuff">
                    <div className="row">
                        <div className="col-lg-10" style={{marginLeft: "8%", marginRight: "8%"}}>
                            <br />
                            <h1>Rapporter en ny sak</h1>
                            <hr />
                            <form>
                            <div className="form-group">

                            <h4>Tittel</h4>
                            <input className="form-control" maxlength="64" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))}/>
</div>
<div className="form-group">
                             <h4>Beskrivelse</h4>
                            <textarea className="form-control" maxlength="512"style={{width:"100%", resize: "none"}} 
                                onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({description: event.target.value}))}
                            />
</div>
<div className="form-group">
                            <h4>Kategori</h4>
                            
                            <select className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({category: event.target.value}))}>
                                {this.ticketCategories.map((categories, i) => (
                                <option value={categories.name} key={i}>
                                    {categories.name}
                                </option>
                                ))}
                            </select>
</div>
<div className="form-group">

                            <h4>Bilde</h4>
                            <label htmlFor="InputFile">Last opp bilde</label>
                            <input type="file" className="form-control-file" id="InputFile" />
                            <small id="fileHelp" className="form-text text-muted"></small>
                            </div>
                            <hr />
                            <div className="form-group">

                            <div className = "map" style={{ height: '300px', width: '100%'}}>
                                <h6>Velg område på kartet for hendelsen du vil rapportere</h6>
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
                            </div>
                            </form>

                            <div style={{height: '10px'}}></div>
                            <hr />
                            
                            <button type="button" className="btn customBtn" onClick={this.save}>Send</button>

                            <br />
                            <br />
                            <div style={{height: '100px'}}></div>
                    </div>
                </div>
            </div>
        </div>
    );
  }

    /**
     * Take an image and send it to backend saving it and then updates the ticket in the db to contain link to the picture
     * @param id id of ticket to save image to
     */

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

    /**
     * Saves a ticket to DB
     * @returns {Promise<void>}
     */

    async save() {
        if(this.state.title && this.state.description && this.state.category){
            let postId: Number;
            await ticketService
            .postTicket(this.state.category, this.state.title, this.state.description, this.state.greatPlaces[0].lat, this.state.greatPlaces[0].lng)
            .then((response) => {
                postId = response.data.insertId;
            })
            .catch((error : Error) => {
                console.log(error.message);
                Alert.danger('Opplasting mislyktes, vennligst prøv igjen!');   
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });

            if(postId !== null && document.getElementById("InputFile").files[0] !== undefined){
            this.addImage(postId);
            }

            if(this.state.title && this.state.description && this.state.category && postId !== null){
                this.props.history.push('/');
                Alert.success("Sak lagt til");
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
        } else {
            Alert.danger('Opplasting mislyktes, sjekk at du har fylt inn alle feltene (bilde er frivillig).');
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    }

    mounted() {
        categoryService.getTicketCategories()
        .then((categories: Array<Category>) => {
            this.ticketCategories = categories.data;
            this.setState({category: this.ticketCategories[0].name});
        })
        .catch((error : Error) => console.log(error.message));
    }
}