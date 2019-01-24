//@flow

import {Component} from 'react-simplified'
import * as React from "react";

export default class PageNavigator extends Component<{props: {increment: function, decrement: function, pageNumber: number, base: number, pageLim: number, totalLimit: number}}> {
    render() {
        return (
            <div style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                {<button onClick={this.props.decrement} style={{visibility: (((this.props.base*this.props.pageLim) > 0) ? "visible" : "hidden")}}><i className="fas fa-arrow-left"></i></button>}
                <div>Side: {this.props.pageNumber}</div>
                {<button onClick={this.props.increment} style={{visibility: (((this.props.base+1)*this.props.pageLim) < this.props.totalLimit) ? "visible": "hidden"}}><i className="fas fa-arrow-right "></i></button>}
            </div>
        )
    }
}