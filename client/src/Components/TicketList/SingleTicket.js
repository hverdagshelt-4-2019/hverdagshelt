//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

export default class SingleTicket extends Component<{
    title : string;
    category : string;
}>{
    render(){
        return (
            <div className="container">
                <div className="row">

                    <div 
                        className="col-sm-4"
                        style={{
                        width: '200px',
                        height: '100px',
                        border: '1px solid black',
                        margin: '2px'
                    }}>
                        <img src="" />
                    </div>

                    <div className="col-sm-8" >
                        <NavLink 
                            activeStyle={{ color: 'darkblue' }} 
                            to={' '}>
                                <h4>{this.props.title}</h4>
                        </NavLink>
                        <br/>
                        <br/>
                        {' '} - {this.props.category}{' '} - By {' '}

                        <div >
                            <button className="btn btn-primary btn-sm">Legg til bedrift</button>{' '}<button className="btn btn-primary btn-sm">Svar</button>
                        </div>      

                    </div>
                </div>
            </div>
        )
    }
}