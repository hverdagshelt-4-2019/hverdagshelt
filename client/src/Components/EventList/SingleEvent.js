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


export default class SingleEvent extends Component<{}>{
    static Options = Options; 

    render(){ 
        return (
            <NavLink style={{color: 'black'}} to={"/begivenhet/" + this.props.theEvent.id}>
                <li className="list-group-item shadow p-3 mb-5 bg-white rounded" >
                <div className="container" >
                    <div className="row">

                        <div className="col-sm-4">
                            <img id={"picture"+this.props.theEvent.id} src="image/temp.jpg" className={"img-fluid "} alt="Responsive image" style={{maxWidth: '100%'}} />
                        </div>
                        <div className="col-sm-8" >
                            <h4>{this.props.theEvent.title}</h4>
                            {' '}
                            <h6>Arrangeres: {' '} {this.props.theEvent.happening_time !== undefined && this.props.theEvent.happening_time.replace('T', ' ').replace('.000Z', '')}</h6>
                            
                            {' '} 
                            Kategori:{' '} {this.props.theEvent.category} 
                            <br/> 
                            Kommune: {' '} {this.props.theEvent.commune_name} 
                            <br/>
                            <br/>
                        </div>
                    </div>
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