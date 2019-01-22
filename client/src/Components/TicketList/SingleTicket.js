//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import css from './ticketStyle.css';

class Options extends Component{
    render(){
        return(
            <div>
                <NavLink to={"/endresak/" + this.props.id}>
                    <button className={"btn customBtn " + css.btnOnTicket}><i className="fas fa-marker customIcon"></i>Rediger</button>
                </NavLink>    
            </div>
        )
    }

    
}


export default class SingleTicket extends Component<{}>{
    static Options = Options; 

    render(){; 
        return (
            <NavLink className={css.inactive} to={"/sak/"+this.props.theTicket.id}>
                <li key={this.props.theTicket.id}>
                        <img id={"picture"+this.props.theTicket.id} src="image/temp.jpg"/>
                        <div className={css.info}>
                            <h2 style={{marginLeft: "6px"}} className={css.title}>{this.props.theTicket.title}</h2>

                            <p id={"status"+this.props.theTicket.id} style={{marginLeft: "6px", fontWeight: "900", color: "#666B6E"}} className="desc">
                                <i id={"it"+this.props.theTicket.id} style={{marginRight: "4px"}}></i>{this.props.theTicket.status}
                            </p>

                            <ul>
                                <li style={{width: "33%"}}> <i className="fas fa-edit" style={{marginRight: "4px"}}></i>{this.props.theTicket.category} </li>
                                <li style={{width: "34%"}}> <i className="fas fa-map-marker-alt" style={{marginRight: "4px"}}></i>{this.props.theTicket.responsible_commune} </li>
                                <li style={{width: "33%"}}> <i className="fas fa-calendar" style={{marginRight: "4px"}}></i>{this.props.theTicket.submitted_time !== undefined && this.props.theTicket.submitted_time.replace('T', ' ').replace('.000Z', '').slice(0, -9)}</li>
                            </ul>

                        </div>
                </li>
            </NavLink>
        )
    }

    mounted(){
        this.getImage(this.props.theTicket.picture);
        let s = document.getElementById("status"+this.props.theTicket.id);
        let i = document.getElementById("it"+this.props.theTicket.id);
        if(this.props.theTicket.status == "Fullført"){
            s.style.color = "green";
            i.setAttribute("class", "fas fa-check");
        }else if(this.props.theTicket.status == "Bearbeides"){
            s.style.color = "#FFCD24";
            i.setAttribute("class", "fas fa-spinner");
        }else {
            i.setAttribute("class", "fas fa-clipboard-list");
        }
        console.log(s);
        
    }

    componentDidUpdate(){
        this.getImage(this.props.theTicket.picture);
        let s = document.getElementById("status"+this.props.theTicket.id);
        let i = document.getElementById("it"+this.props.theTicket.id);
        if(this.props.theTicket.status == "Fullført"){
            s.style.color = "green";
            i.setAttribute("class", "fas fa-check");
        }else if(this.props.theTicket.status == "Bearbeides"){
            s.style.color = "#FFCD24";
            i.setAttribute("class", "fas fa-spinner");
        }else {
            i.setAttribute("class", "fas fa-clipboard-list");
        }
        console.log(s);
    } 

    getImage(i: String) {
        try{
            let imageLink = '/image/' + i;
            let picture = document.getElementById('picture'+this.props.theTicket.id);
            picture.setAttribute('src', imageLink);
        }catch(err) {
            let imageLink = '/image/' + "270profil.jpg";
            let picture = document.getElementById('picture'+this.props.theTicket.id);
            picture.setAttribute('src', imageLink);
            console.log("image not found")  
        }
    } 
}