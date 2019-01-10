// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import {Component,} from 'react-simplified';
import {NavLink } from 'react-router-dom';

export default class uploadImage extends Component {

    addTicketI(){
        let url = "http://localhost:3000/ticketI/";
        console.log("postImage");
        let file = document.getElementById("InputFile").files[0];
        console.log(file);
        let formData = new FormData();
        formData.append("overskrift", "test");
        formData.append("uploaded_image", file);
        fetch(url,
            {
                method: "POST",
                /*headers:
                    {
                        "Content-Type": "application/json; charset=utf-8"
                    },*/
                body: formData,
            })
        .then(response => response.json())
        .then(json => {
            console.log(json);
        })
        .catch(error => {
            console.error("Error: ", error);
        });
    }

    render() {
        return (
            <form className="bg-light w-75" >
                <div className="form-group">
                    <label htmlFor="InputFile">Last opp bilde</label>
                    <input type="file" className="form-control-file" id="InputFile"/>
                    <small id="fileHelp" className="form-text text-muted">Last opp bildet som skal være på visningen av saken</small>
                </div>
                <button type="submit" onClick={this.addTicketI} style={{width: "100%"}} className="btn btn-primary">Legg til</button>
            </form>
            );
        }
}
