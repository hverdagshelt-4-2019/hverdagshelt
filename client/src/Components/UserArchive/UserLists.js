import * as React from 'react';
import { Component } from 'react-simplified';
import userService from "../../Services/userService";


export class UserList extends Component<{props: {people: Object[], title: string, callback: function, tab: string}}> {

    render() {
        return(
            <div>
                <h1>
                    {
                        this.props.title
                    }
                </h1>
                {
                    this.props.people.map(e => {
                        return (
                            <div className="card" style={{minWidth: "650px", width: "75%", margin: "auto"}}>
                                <div className="card-body">
                                    <div style={{display: "flex", alignItems: "center", flexDirection: "row", justifyContent: "space-between"}}>
                                        <div>
                                            <h5 className="card-title">
                                                E-post: {e.email}
                                            </h5>
                                            <h5>
                                                Bruker ID: {e.id}
                                            </h5>
                                            {
                                                this.props.tab === 'c' &&
                                                (<h5>
                                                    Bedriftsnavn: {e.name}
                                                </h5>)
                                            }
                                        </div>
                                        <div className="p-5">
                                            <button className="btn btn-danger" onClick={be => this.props.callback(e.email)}><h3>SLETT</h3></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}