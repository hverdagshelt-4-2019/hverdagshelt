import * as React from 'react';
import { Component } from 'react-simplified';
import userService from "../../Services/userService";
import CustomDialog from "../CustomDialog/CustomDialog";
import styles from './style.css'

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
                            <div className={"card " + styles.myFlex}>
                                <div className="card-body">
                                    <div className={styles.myFlexContent}>
                                        <div>
                                            {
                                                this.props.tab != 'c' &&
                                                (<h5>
                                                     Brukernavn: {e.username}
                                                </h5>)
                                            }
                                            {
                                                this.props.tab === 'c' &&
                                                (<h5>
                                                    Bedriftsnavn: {e.name}
                                                </h5>)
                                            }
                                            <h5 className="card-title">
                                                E-post: {e.email}
                                            </h5>
                                            <h5>
                                                Bruker ID: {e.id}
                                            </h5>
                                            {
                                                this.props.tab === 'p' &&
                                                (<h5>
                                                    Arbeidskommune: {e.commune_name}
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