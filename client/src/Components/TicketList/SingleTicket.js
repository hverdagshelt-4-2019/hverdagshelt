//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


export default class SingleTicket extends Component<{}>{
    render(){
        return (
            <li className="list-group-item shadow p-3 mb-5 bg-white rounded" >
                <div className="container" >
                    <div className="row">

                        <div className="col-sm-4">
                            <img id={"picture"+this.props.theTicket.id} src="image/temp.jpg" className={"img-fluid "} alt="Responsive image" style={{maxWidth: '100%'}} />
                        </div>
                        <div className="col-sm-8" >
                            <NavLink 
                                activeStyle={{ color: 'darkblue' }} 
                                to={"/sak/" + this.props.theTicket.id}>
                                    <h4>{this.props.theTicket.title}</h4>
                            </NavLink>
                            {' '}
                            <h6>Innsendt: {' '} {this.props.theTicket.submitted_time !== undefined && this.props.theTicket.submitted_time.replace('T', ' ').replace('.000Z', '')}</h6>
                            
                            {' '} 
                            Kategori:{' '} {this.props.theTicket.category} 
                            <br/> 
                            Kommune: {' '} {this.props.theTicket.responsible_commune} 
                            <br/>
                            <div style={{float:'right'}}><h3>Status: {' '} {this.props.theTicket.status}</h3></div>
                            
                        </div>
                    </div>
                </div>
            </li>
        )
    }

    mounted(){
        this.getImage(this.props.theTicket.picture);
    }

    componentDidUpdate(){
        this.getImage(this.props.theTicket.picture);
    } 

    getImage(i: String) {
        let imageLink = '/image/' + i;
        let picture = document.getElementById('picture'+this.props.theTicket.id);
        picture.setAttribute('src', imageLink);
    } 
}