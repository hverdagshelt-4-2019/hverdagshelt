// @flow
/* eslint eqeqeq: "off" */
import * as React from 'react';
import { Component,} from 'react-simplified';
import { NavLink,} from 'react-router-dom';

export default class uploadImage extends Component {

    addImage(id: number){
        let token = localStorage.getItem('authToken');
        let Authorization = 'none';
        if(token){
            Authorization = "Bearer " + token;
        }else{
            console.log("No token");
            //Alert to user
        }
        let url = "http://localhost:3000/image/";
        console.log("postImage");
        let file = document.getElementById("InputFile").files[0];
        console.log(file);
        //axios.post(url + '/image', formData, config());
        let formData = new FormData();
        formData.append("id", id);
        formData.append("uploaded_image", file);
        fetch(url,
            {
                method: "POST",
                headers:
                    {
                        "authorization": Authorization
                    },
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
                <button type="submit" onClick={() => {this.addImage(1)}} style={{width: "100%"}} className="btn btn-primary">Legg til</button>
            </form>
            );
        }
}
