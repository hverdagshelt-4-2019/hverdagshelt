//@flow

import * as React from 'react';
import { Component,} from 'react-simplified';
import eventService from '../../Services/eventService';
import categoryService from '../../Services/categoryService';
import GoogleMapReact from 'google-map-react';
import ControllableHover from './../../map/controllable_hover.js';
import controllable from 'react-controllables';
import shouldPureComponentUpdate from 'react-pure-render/function';
import PropTypes from 'prop-types';
import {K_SIZE} from './../../map/controllable_hover_styles.js';
import { Alert } from '../../widgets';

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class EditEvent extends Component<{ match: { params: { id: number } } }> {
    constructor(props) {
        super(props);
        this.state = {
            category: '',
            title: '',
            description: '',
            picture: '',
            imageAdded: false,
            happening_time: '',
            categories: []
        };
    }

    handleImageAdded() {
        this.state.imageAdded ? this.setState({imageAdded: false}) : this.setState({imageAdded: true});
    }
    event='';


    render() {

        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1>Endre sak:</h1>

                            <hr />

                            <h4>Tittel:</h4>
                            <input className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))} defaultValue={this.event.title}/>

                            <h4>Beskrivelse:</h4>
                            <textarea className="form-control" value={this.state.description} style={{width:"100%"}} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({description: event.target.value}))} defaultValue={this.event.description} />


                            <h4>Kategori:</h4>
                            <select onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({category: event.target.value}))}>
                                {this.state.categories.map((categories, i) => (
                                    <option selected={categories.name==this.state.category} id ={"option"+categories.name} key={i}>{categories.name}</option>
                                ))}
                            </select>

                            <div className="form-group">
                                <label className="form-label">Dato og tid</label>
                                <input className="form-control" type="datetime-local"/>
                            </div>


                            <h4>Bilde:</h4>
                            <img id="picture" src="/image/logo.png" style={{maxWidth: '40%'}} className={"img-fluid"} alt="Responsive image"/>
                            <br />
                            <label htmlFor="InputFile">Last opp nytt bilde om ønsket</label>
                            <input type="file" className="form-control-file" id="InputFile" onChange={this.handleImageAdded}/>
                            <small id="fileHelp" className="form-text text-muted"></small>

                            <hr />

                            {/* add default value */}

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
        console.log('save');
        if (!this.state.title) this.state.title = this.event.title;
        if (!this.state.description) this.state.description = this.event.description;
        if (!this.state.category) this.state.category = this.event.category;
        if (!this.state.happening_time) this.state.happening_time = this.event.happening_time;
        this.state.happening_time = this.state.happening_time.split('T', 1)[0] + ' ' + this.state.happening_time.split('T')[1].split('.', 1);
        console.log(this.state.happening_time);

        let postId: Number;
        await eventService
            .editEvent(this.props.match.params.id, this.state.category, this.state.title, this.state.description, this.state.happening_time)
            .then((response) => {
                postId = response.data.insertId;
                console.log(response.data);
            })
            .catch((error : Error) => {
                console.log(error.message);
                Alert.danger("Noe gikk galt, Sak ikke oppdatert");
            });

        if(postId !== null && this.state.imageAdded){
            this.addImage(this.props.match.params.id);
        }
        console.log(this.state.imageAdded);
        Alert.success("Sak oppdatert");
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        console.log("done")
    }

    getImage(i: String){
        let imageLink="/image/"+i;
        let picture = document.getElementById("picture");
        picture.setAttribute("src", imageLink);
    }

    mounted() {

        eventService
            .getEvent(this.props.match.params.id)
            .then(event => {
                this.event = event.data[0];
                this.state.category = event.data[0].category;
                this.state.description = event.data[0].description;
                this.state.happening_time = event.data[0].happening_time;
                this.state.title = event.data[0].title;
                this.getImage(this.event.picture);
                console.log(this.state)
            })
            .catch((error : Error) => console.log(error.message));

        categoryService.getEventCategories()
            .then((categories: Array<Category>) => {
                this.setState({categories: categories.data});
            })
            .catch((error : Error) => console.log(error.message));
    }
}
