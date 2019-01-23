//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import eventService, {Event} from '../../Services/eventService';
import css from './eventStyle.css';

class Options extends Component<{id: string}>{
    render(){
        return(
            <div>
                <NavLink to={"/endrebegivenhet/" + this.props.id}>
                    <button className={"btn customBtn2 "+ css.btnEvent}><i className="fas fa-marker customIcon"></i>Rediger</button>
                </NavLink>  
                {' '}

                <button className={"btn btn-danger "+ css.btnEvent} onClick={this.delete}><i className="fas fa-trash-alt customIcon"></i>Slett</button>
            </div>
        )
    }

    delete(){
        eventService.deleteEvent(this.props.id)
        .catch((error : Error) => console.log(error.message));
        window.location.reload();
    }
}


export default class SingleEvent extends Component<{theEvent: Event}>{
    static Options = Options; 

    render(){ 
        return (
                <NavLink className={css.inactive} to={"/begivenhet/"+this.props.theEvent.id}>
                    <li key={this.props.theEvent.id}>
                        <img id={"picture"+this.props.theEvent.id} src="image/temp.jpg"/>
                        <div className={css.info}>
                            <h2 style={{marginLeft: "6px"}} className={css.title}>{this.props.theEvent.title}</h2>
                            <br />
                            <ul>
                                <li style={{width: "33%"}}> <i className="fas fa-edit" style={{marginRight: "4px"}}></i>{this.props.theEvent.category}  </li>
                                <li style={{width: "34%"}}> <i className="fas fa-map-marker-alt" style={{marginRight: "4px"}}></i>{this.props.theEvent.commune_name}  </li>
                                <li style={{width: "33%"}}> <i className="fas fa-calendar" style={{marginRight: "4px"}}></i>{this.props.theEvent.happening_time !== undefined && this.props.theEvent.happening_time.replace('T', ' ').replace('.000Z', '').slice(0, -3)}</li>
                            </ul>
                            
                        </div>
                    </li>
                </NavLink>
        )
    }

    mounted(){
        this.getImage(this.props.theEvent.picture);
    }

    componentDidUpdate(){
        this.getImage(this.props.theEvent.picture);
    } 

    getImage(i: String) {
        let imageLink = '/image/' + i;
        let picture = document.getElementById('picture'+this.props.theEvent.id);
        picture.setAttribute('src', imageLink);
    } 
}