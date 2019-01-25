//@flow

import * as React from 'react';
import { Component,} from 'react-simplified';
import eventService from '../../Services/eventService';
import categoryService from '../../Services/categoryService';
import controllable from 'react-controllables';
import { Alert } from '../../widgets';
import Datetime from 'react-datetime'

let yesterday = Datetime.moment().subtract( 1, 'day' );
let valid = function( current ){
    return current.isAfter( yesterday );
};

@controllable(['center', 'zoom', 'hoverKey', 'clickKey'])
export default class EditEvent extends Component<{ match: { params: { id: number } } }> {
    constructor(props: any) {
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
                <div className="container aroundStuff">
                    <div className="row">
                        <div className="col-lg-10" style={{marginLeft: "8%", marginRight: "8%"}}>
                        <br />
                            <h1>Endre sak:</h1>

                            <hr />
                            <form>
                            <div className="form-group">
                            <h4>Tittel</h4>
                            <input className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({title: event.target.value}))} defaultValue={this.event.title}/>
                            </div>

                            <div className="form-group">
                            <h4>Beskrivelse</h4>
                            <textarea className="form-control" value={this.state.description} style={{width:"100%"}} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({description: event.target.value}))} defaultValue={this.event.description} />
                            </div>

                            <div className="form-group">
                            <h4>Kategori</h4>
                            <select className="form-control" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({category: event.target.value}))}>
                                {this.state.categories.map((categories, i) => (
                                    <option selected={categories.name==this.state.category} id ={"option"+categories.name} key={i}>{categories.name}</option>
                                ))}
                            </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Dato og tid</label>
                                <Datetime locale='nb' isValidDate={ valid } value={this.state.happening_time} onChange={this.saveDate} defaultValue={new Date()}/>
                            </div>

                            <div className="form-group">
                            <h4>Bilde</h4>
                            <img id="picture" src="/image/logo.png" style={{maxWidth: '40%'}} className={"img-fluid"} alt="Responsive image"/>
                            <br />
                            <label htmlFor="InputFile">Last opp nytt bilde om ønsket</label>
                            <input type="file" className="form-control-file" id="InputFile" onChange={this.handleImageAdded}/>
                            <small id="fileHelp" className="form-text text-muted"></small>
                            </div>
                            </form>
                            <hr />

                            <button type="button" className="btn customBtn" onClick={this.save}>Lagre</button>
                            <br />
                            <br />
                            <div style={{height: '100px'}}></div>
                        </div>
                    </div>
                </div>
                </div>
                
           
        );
    }

    saveDate(e){
        let date = e._d;
        this.setState({
            happening_time: date
        })
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
        console.log('save');
        if (!this.state.title) this.state.title = this.event.title;
        if (!this.state.description) this.state.description = this.event.description;
        if (!this.state.category) this.state.category = this.event.category;
        if (!this.state.happening_time) this.state.happening_time = this.event.happening_time;

        let date = this.state.happening_time;
        date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        date = date.toJSON();

        date = date.split('T', 1)[0] + ' ' + date.split('T')[1].split('.', 1);
        let postId: Number;
        await eventService
            .editEvent(this.props.match.params.id, this.state.category, this.state.title, this.state.description, date)
            .then((response) => {
                postId = response.data.insertId;
                console.log(response.data);
            })
            .catch((error : Error) => {
                console.log(error.message);
                Alert.danger("Noe gikk galt, Sak ikke oppdatert");
            });

        if(this.state.imageAdded){
            console.log("ADDING IMAGE");
            console.log(this.state.imageAdded);
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
                let date = new Date(event.data[0].happening_time);
                date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
                this.state.happening_time = date;

                this.state.title = event.data[0].title;
                this.getImage(this.event.picture);
            })
            .catch((error : Error) => console.log(error.message));


        categoryService.getEventCategories()
            .then((categories: Array<Category>) => {
                this.setState({categories: categories.data});
            })
            .catch((error : Error) => console.log(error.message));
    }
}
