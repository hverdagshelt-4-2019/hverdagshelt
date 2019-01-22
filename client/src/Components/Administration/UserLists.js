import * as React from 'react';
import { Component } from 'react-simplified';
import userService from "../../Services/userService";
import CustomDialog from "../CustomDialog/CustomDialog";


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
                                            <CustomDialog
                                                option1Text="Avbryt"
                                                buttonText="Slett"
                                                title="Slett bruker"
                                                buttonType="danger"
                                                option2Text="Slett"
                                                option2Method={this.props.callback}
                                                callbackData={e.email}
                                                dialogText="Er du sikker på at du vil slette denne brukeren? Handlingen er permanent og kan ikke reverseres."
                                            />
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