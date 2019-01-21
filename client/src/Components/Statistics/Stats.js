//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component} from 'react-simplified';
import { NavLink } from 'react-router-dom';
import VisualStats from './VisualStats';

export default class Stats extends Component{
    ticketsSent = 10000; 
    ticketsSolved = 2000;

    render(){
        if(this.props.national){
            return this.renderNational();
        }
        else{
            return this.renderLocal();
        }
    }

    renderNational(){
        return(
            <div>
                <VisualStats 
                    title="National statistikk" 
                    ticketsSolved={this.ticketsSolved} 
                    ticketsSent={this.ticketsSent}/>
            </div>
        )
    }

    renderLocal(){
        return(
            <div>
                <VisualStats 
                    title="Lokal statistikk" 
                    ticketsSolved={this.ticketsSolved}
                    ticketsSent={this.ticketsSent}/>
            </div>
        )
    }


}
