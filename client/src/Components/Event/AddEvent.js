//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import eventService from '../../Services/eventService';
import categoryService from '../../Services/categoryService';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import { Alert } from '../../widgets';
import {K_SIZE} from './../../map/controllable_hover_styles.js';
import Datetime from 'react-datetime';


export default class AddEvent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category: '',
            commune: localStorage.getItem('commune'),
            title: '',
            description: '',
            picture: '',
            happening_time: new Date(),
            imageAdded: false
        };
        this.handleImageAdded = this.handleImageAdded.bind(this);
    }

    eventCategories: Category[] = [];

   handleImageAdded() {
       this.state.imageAdded ? this.setState({imageAdded: false}) : this.setState({imageAdded: true});
   }

   handleDate(e) {
       let date = e._d;
       this.setState({
           happening_time: date.toJSON()
       });
   }


  render() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-lg-8">
                    <h1>Meld fra om en ny begivenhet</h1>
                    <form>
                    <div className="form-group">
                        <h4>Tittel</h4>
                        <input className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))}/>
                    </div>

                    <div className="form-group">
                        <h4>Beskrivelse</h4>
                        <textarea className="form-control" style={{width:"100%"}} 
                            onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({description: event.target.value}))}
                        />
                    </div>

                    <div className="form-group">
                        <h4>Kategori</h4>    
                        <select className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({category: event.target.value}))}>
                            {this.eventCategories.map((categories, i) => (
                            <option value={categories.name} key={i}>
                                {categories.name}
                            </option>
                            ))}
                        </select>
                    </div>

     
                    <div className="form-group">
                    <label className="form-label">Dato og tid</label>
                    <Datetime locale='nb' onChange={this.handleDate} defaultValue={new Date()}/>
                    </div>
                    <div className="form-group">
                    <h4>Bilde</h4>
                    <label htmlFor="InputFile">Last opp bilde</label>
                    <input type="file" className="form-control-file" id="InputFile" onChange={this.handleImageAdded}/>
                    <small id="fileHelp" className="form-text text-muted"></small>
                    </div>                            
                    </form>
                    <button type="button" className="btn btn-primary" onClick={this.save}>Send</button>
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
        let url = "/imageEvent/";
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
        if(this.state.title !== null && this.state.description !== null && this.state.category !== null && this.state.happening_time !== null && this.commune !== null){
            let eventId: Number;
            await eventService
            .postEvent(this.state.commune, this.state.category, this.state.title, this.state.description, this.state.happening_time.split('T', 1)[0] + ' ' + this.state.happening_time.split('T')[1].split('.', 1))
            .then((response) => {
                eventId = response.data.insertId;
            })
            .catch((error : Error) => console.log(error.message));

            if(eventId !== null && this.state.imageAdded){
            this.addImage(eventId);
            }
        }
    }

    mounted() {
        categoryService.getEventCategories()
        .then((categories: Array<Category>) => {
            this.eventCategories = categories.data;
            this.setState({category: this.eventCategories[0].name});
            console.log(this.state.category);
        })
        .catch((error : Error) => console.log(error.message));
        console.log(this.state.commune);
    }
}