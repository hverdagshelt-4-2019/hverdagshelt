import React from "react";
import { Component } from "react-simplified";
import styles from "./style.css";
import userService from "../../Services/userService";

// material ui components
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const header = {
    margin: "auto"
}

export default class ChangePassword extends Component {
    state = {
        oldPass: "",
        newPass: "",
        repeatNewPass: "",
        warning: "",
        success: ""
    }

    handleClick() {
        if (!this.verify()) return;
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    setWarning(warning) {
        this.setState({warning: warning});
    }

    setSuccess(message){
        this.setState({success: message});
    }

    verify() {
        this.setWarning("");
        this.setSuccess("");
        if(this.state.repeatNewPass !== this.state.newPass){
            this.setWarning("Det nye passordet du skrev stemmer ikke med hverandre");
            return false;
        }
        else if(this.state.newPass.length < 8){
            this.setWarning("Passordet ditt er fort kort (må minst være 8 tegn langt).");
            return false;
        }
        console.log("We got here");
        userService.updatePassword(this.state.oldPass, this.state.newPass).then(res => {
            console.log("Res: " + JSON.stringify(res));
            this.setSuccess("Passordet ditt er endret!");
            return true;
        }).catch(err => {
            this.setWarning("Det gamle passordet du oppga stemmer ikke");
            return false;
        })
    }

    render() {
        return (
            <div className={styles.root}>
                <Typography style={header} variant="h4">Endre passord</Typography>
                <TextField type="password" onChange={this.handleChange("oldPass")} label="Gammelt passord"/>
                <TextField type="password" onChange={this.handleChange("newPass")} label="Nytt passord"/>
                <TextField type="password" onChange={this.handleChange("repeatNewPass")} label="Gjenta nytt passord"/>
                <button className="btn customBtn" onClick={this.handleClick}>LAGRE</button>
                {this.state.warning !== "" &&
                <div className="alert alert-danger">
                    <Typography>{this.state.warning}</Typography>
                </div>
                }
                {this.state.success !== "" &&
                <div className="alert alert-success">
                    <Typography>{this.state.success}</Typography>
                </div>
                }
            </div>
        );
    }
}