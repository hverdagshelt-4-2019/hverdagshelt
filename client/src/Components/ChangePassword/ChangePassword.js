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
        warning: ""
    }

    handleClick() {
        if (!this.verify()) return;
        alert("Eyyyy");
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        });
    }

    verify() {
        // TODO: Give feedback for different scenarios.
        if(this.state.repeatNewPass !== this.state.newPass){
            this.warning = "Insert meme here";
            return false;
        }
        else if(this.state.newPass.length < 8){
            this.warning = "Passordet ditt er fort kort (må minst være 8 tegn langt).";
            return false;
        }
        userService.updatePassword(this.state.oldPass, this.state.newPass).then(res => {
            console.log("Res: " + JSON.stringify(res));
            return true;
        }).catch(err => {
            // TODO: Give feedback if previous password does not match
            console.log("We got error");
            console.log(err);
            return false;
        })
    }

    render() {
        return (
            <form>
                <div className={styles.root}>
                    <Typography style={header} variant="h4">Endre passord</Typography>
                    <TextField type="password" onChange={this.handleChange("oldPass")} label="Gammelt passord"/>
                    <TextField type="password" onChange={this.handleChange("newPass")} label="Nytt passord"/>
                    <TextField type="password" onChange={this.handleChange("repeatNewPass")} label="Gjenta nytt passord"/>
                    <Button variant="contained" color="primary" onClick={this.handleClick}>Lagre</Button>
                </div>
            </form>
        );
    }
}