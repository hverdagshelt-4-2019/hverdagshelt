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

var yesterday = Datetime.moment().subtract( 1, 'day' );
var valid = function( current ){
return current.isAfter( yesterday );
};

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
        };
    }

    eventCategories: Category[] = [];

   handleDate(e) {
       let date = e._d;
       this.setState({
           happening_time: date
       });
   }


  render() {
    return (
        <div className="container aroundStuff">
            <div className="row">
                <div className="col-lg-10" style={{marginLeft: "8%", marginRight: "8%"}}>
                <br />
                    <h1>Meld fra om en ny begivenhet</h1>
                    <hr />
                    <form>
                    <div className="form-group">
                        <h4>Tittel</h4>
                        <input className="form-control" maxlength="128" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))}/>
                    </div>

                    <div className="form-group">
                        <h4>Beskrivelse</h4>
                        <textarea className="form-control" maxlength="512" style={{width:"100%", resize: "none"}} 
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
                    <Datetime locale='nb' isValidDate={ valid } value={this.state.happening_time} onChange={this.handleDate} defaultValue={new Date()}/>
                    </div>

                    <div className="form-group">
                    <h4>Bilde</h4>
                    <label htmlFor="InputFile">Last opp bilde</label>
                    <input type="file" className="form-control-file" id="InputFile" />
                    <small id="fileHelp" className="form-text text-muted"></small>
                    </div>                            
                    </form>
                    <hr />

                    <button type="button" className="btn customBtn" onClick={this.save}>Send</button>
                    <br />
                    <br />
                    <div style={{height: '100px'}}></div>
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
        if(this.state.title !== '' && this.state.description !== '' && this.state.category !== '' && this.state.happening_time !== null && this.commune !== null){
            let eventId: Number;
            let sendingDate = new Date(this.state.happening_time);
            sendingDate.setMinutes(sendingDate.getMinutes() - sendingDate.getTimezoneOffset());
            sendingDate = sendingDate.toJSON();
            if(sendingDate === null || sendingDate === undefined) {
                Alert.danger('Opplasting mislyktes, sjekk at du har lagt inn dato/tidspunkt riktig.');
                document.documentElement.scrollTop = 0;
            }
            await eventService
            .postEvent(this.state.commune, this.state.category, this.state.title, this.state.description, sendingDate.split('T', 1)[0] + ' ' + sendingDate.split('T')[1].split('.', 1))
            .then((response) => {
                eventId = response.data.insertId;
            })
            .catch((error : Error) => {
                console.log(error.message);
                Alert.danger('Opplasting mislyktes, vennligst prøv igjen!');
                document.documentElement.scrollTop = 0;
            });

            if(eventId !== null && document.getElementById("InputFile").files[0] !== undefined){
            this.addImage(eventId);
            }

            if(eventId !== null) {
                this.props.history.push('/begivenheter');
                Alert.success('Begivenhet opplastet!');
                document.documentElement.scrollTop = 0;
            }
        } else {
             Alert.danger('Opplasting mislyktes! Sjekk at du fylte inn alle nødvendige felt (bilde er frivillig).');
             document.documentElement.scrollTop = 0;
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
    }
}