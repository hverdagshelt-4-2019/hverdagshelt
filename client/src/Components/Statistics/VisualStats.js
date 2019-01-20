//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component} from 'react-simplified';
import { NavLink } from 'react-router-dom';
import {Doughnut} from 'react-chartjs-2';


export default class VisualStats extends Component<{
    title : string, 
    ticketsSent : number, 
    ticketsSolved : number
}>{
    data = {
        datasets: [{
            data: [(this.props.ticketsSent - this.props.ticketsSolved), this.props.ticketsSolved],
            backgroundColor: ['LightCoral', 'lightblue']
        }],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: [
            'Uløste saker',
            'Løste saker'
        ]
    };

    render(){
        return(
            <div>
                <h1>{this.props.title}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Doughnut data={this.data} />
                            <br/>
                        </div>
                        {' '}
                        <div className="col" style={{border:'1px solid lightgrey'}}>b</div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col" style={{border:'1px solid lightgrey'}}>c</div>
                        {' '}
                        <div className="col" style={{border:'1px solid lightgrey'}}>d</div>
                    </div>
                </div>
            </div>
        )
        
    }
}
