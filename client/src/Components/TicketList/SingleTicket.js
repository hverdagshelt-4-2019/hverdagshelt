//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';


export default class SingleTicket extends Component<{
    
}>{
    render(){
        return (
            <div className="container">
                <div className="row">

                    <div className="col-sm-4">
                        <img src="" />*Insert image here*
                    </div>

                    <div className="col-sm-8" >
                        <NavLink 
                            activeStyle={{ color: 'darkblue' }} 
                            to={"/sak/" + this.props.id}>
                                <h4>{this.props.title}</h4>
                        </NavLink>
                        
                        {' '} 
                        Kategori:{' '} {this.props.category} 
                        <br/> 
                        Kommune: {' '} {this.props.commune} 
                    </div>
                </div>
            </div>
        )
    }
}