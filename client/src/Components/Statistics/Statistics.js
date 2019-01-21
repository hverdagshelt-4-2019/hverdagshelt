//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component} from 'react-simplified';
import { NavLink } from 'react-router-dom';
import Stats from './Stats';
import VisualStats from './VisualStats';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';

export default class Statistics extends Component{
    title = '';

    constructor(props){
        super(props);
        this.state = {
            ticketsSent : '',  
            ticketsSolved : '',
            categories : [],
            ticketsPerCat : [],
            ticketsPerMonth : []
        }
    }

    

    render(){
        return(
            <div>
                <ul className="nav nav-tabs">
                    <li className="nav-item"  onClick={this.setNational}>
                        <NavLink 
                            className="nav-link active" 
                            data-toggle="tab" 
                            to="/National"
                        >
                            Nasjonalt
                        </NavLink>
                    </li> 
                    <li className="nav-item" onClick={this.setLocal}>                            
                        <NavLink 
                            className="nav-link" 
                            data-toggle="tab" 
                            to="Lokal"
                        >
                            Lokalt
                        </NavLink>
                    </li>
                </ul>

                <div>
                <h1>{this.props.title}</h1>
                <div className="container">
                    <div className="row">
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Doughnut data = {{
                                datasets: [{
                                    data: [(this.state.ticketsSent - this.state.ticketsSolved), this.state.ticketsSolved],
                                    backgroundColor: ['LightCoral', 'lightblue']
                                }],

                                // These labels appear in the legend and in the tooltips when hovering different arcs
                                labels: [
                                    'Uløste saker',
                                    'Løste saker'
                                ]
                            }} />
                            <hr/>
                            <small>Innsendte saker: {this.state.ticketsSent}</small><br/>
                            <small>Løste saker: {this.state.ticketsSolved}</small><br/>
                            <small>Uløste saker: {(this.state.ticketsSent - this.state.ticketsSolved)}</small><br/>
                            <small>Prosentandel løste saker: {((this.state.ticketsSolved / this.state.ticketsSent)*100).toFixed(2)}{' '}%</small>
                            <br/>
                            <br/>
                        </div>
                        {' '}
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Bar data = {{
                                labels: this.state.categories,
                                datasets: [{
                                    label: "Antall saker",
                                    backgroundColor: 'lightblue',
                                    borderColor: 'lightgrey',
                                    data: this.state.ticketsPerCat,
                                }]
                            }} />
                            <hr/>
                        </div>
                    </div>
                    <br/>
                    <div className="row">
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Line data={{
                                labels : ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
                                datasets: [{
                                    label: "Saker innsendt per måned",
                                    backgroundColor: 'lightblue',
                                    data: this.state.ticketsPerMonth
                                }]
                            }}/>
                            <hr/>
                        </div>
                        {' '}
                        <div className="col" style={{border:'1px solid lightgrey'}}>d</div>
                    </div>
                </div>
            </div>
            </div>
        )
    }

    mounted(){
        //Need functions to get different data from db to set in props

        this.setState({
            ticketsSent : 4627,  
            ticketsSolved : 4400,
            categories : ["Forsøpling", "Vei", "Hærverk"],
            ticketsPerCat : [12, 3, 6],
            ticketsPerMonth : [650, 634, 501, 203, 200, 340, 630, 300, 240, 301, 403, 654]
        });
    }

    setNational(){
        //States below will get data from props 
        this.setState({
            ticketsSent : 4627,  
            ticketsSolved : 4400,
            ticketsPerCat : [12, 3, 6],
            ticketsPerMonth : [650, 634, 501, 203, 200, 340, 630, 300, 240, 301, 403, 654]
        });
    }

    setLocal(){
        //States below will get data from props
        this.setState({
            ticketsSent : 605,  
            ticketsSolved : 450,
            ticketsPerCat : [2, 1, 4],
            ticketsPerMonth : [65, 63, 50, 20, 20, 34, 63, 30, 24, 30, 40, 64]
        });
    }
}
