//@flow

import {Component} from 'react-simplified'
import * as React from "react";
import css from './pageStyle.css';

export default class PageNavigator extends Component<{props: {increment: function, decrement: function, pageNumber: number, base: number, pageLim: number, totalLimit: number}}> {
    render() {
        return (
            <div className={"shadow "+css.aroundPage} style={{display: "flex", flexDirection: "row"}}>
                {<button className="btn customBtn" onClick={this.props.decrement} style={{marginRight: "10px",visibility: (((this.props.base*this.props.pageLim) > 0) ? "visible" : "hidden")}}><i className="fas fa-arrow-left"></i></button>}
                <div className={css.side}>Side: {this.props.pageNumber}</div>
                {<button className="btn customBtn" onClick={this.props.increment} style={{marginLeft: "10px", visibility: (((this.props.base+1)*this.props.pageLim) < this.props.totalLimit) ? "visible": "hidden"}}><i className="fas fa-arrow-right "></i></button>}
            </div>
        )
    }
}