//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component} from 'react-simplified';
import { NavLink } from 'react-router-dom';

export default class DropDown extends Component{
    commmune = this.props.communes[0];

    render(){
        return(
                <select 
                    value={this.props.selected}
                    onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.commune = event.target.value)} 
                    onClick={this.handleSelect}
                >
                    {this.props.communes.map((commune, i) => (
                        <option key={i}  value={commune}>{commune}</option>
                    ))}
                </select>
        )
    }

    handleSelect(){
        this.props.clickFunc(this.commune);
    }
}
