//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';

class Options extends Component{
    render(){
        return(
            <div>
                <NavLink to={"/endresak/" + this.props.id}>
                    <button className="btn btn-primary">Rediger</button>
                </NavLink>    
            </div>
        )
    }

    
}


export default class SingleTicket extends Component<{}>{
    static Options = Options; 

    render(){; 
        return (
            <NavLink style={{color: 'white'}} to={"/sak/" + this.props.theTicket.id}>
                <li className="list-group-item shadow p-3 mb-5 rounded" style={{backgroundColor: "#8FC1E3", color: "white"}}>
                <div className="container">
                    <div className="row">

                        <div className="col-sm-4">
                            <img id={"picture"+this.props.theTicket.id} src="image/temp.jpg" className={"img-fluid "} alt="Responsive image" style={{maxWidth: '100%'}} />
                        </div>
                        <div className="col-sm-8" >
                            <h4>{this.props.theTicket.title}</h4>
                            {' '}
                            <h6>Innsendt: {' '} {this.props.theTicket.submitted_time !== undefined && this.props.theTicket.submitted_time.replace('T', ' ').replace('.000Z', '')}</h6>
                            
                            {' '} 
                            Kategori:{' '} {this.props.theTicket.category} 
                            <br/> 
                            Kommune: {' '} {this.props.theTicket.responsible_commune} 
                            <br/>
                            <br/>
                            <div>
                                <div style={{float:'right'}}><h3>Status: {' '} {this.props.theTicket.status}</h3></div>
                                <div style={{float:'left'}}>{this.props.children}{' '}</div>
                            </div>

                        </div>
                    </div>
                </div>
            </li>
            </NavLink>
            
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