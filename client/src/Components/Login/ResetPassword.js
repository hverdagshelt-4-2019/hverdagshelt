import * as React from 'react';
import { Component } from 'react-simplified';
import styles from "./style.css";
import userService from "../../Services/userService";

// material ui components
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import SendIcon from "@material-ui/icons/Send";

const customStyle = {
    sendButton: {
        margin: "20px 0px"
    }
}

export default class ResetPassword extends Component{
    email = "";

    handleChange = event => {
        this.email = event.target.value;
    }

    resetPassword() {
        console.log("Resetting password");
        console.log("This.email = " + this.email);
        userService.resetPassword(this.email, {email: this.email}).then(res => {
            console.log("Response: " + JSON.stringify(res));
        }).catch(err => console.log(err));
    }

    render(){
        return (
          <div className={styles.resetPasswordRoot}>
              <Paper style={{padding: "20px 200px", backgroundColor: "#eff0fc", backgroundSize: "cover"}}>
                  <div className={styles.formDiv}>
                      <Typography className={styles.filler} variant="h5">Tilbakestill passord</Typography>
                      <Divider className={styles.divider}/>
                      <div className={styles.emptySpace}/>
                      <TextField label="Email" onChange={this.handleChange} className={styles.textfield}/>
                      <div className={styles.buttonDiv}>
                          <Button variant="contained" color="primary" style={customStyle.sendButton} onClick={this.resetPassword}>
                              Send
                              <SendIcon/>
                          </Button>
                      </div>
                  </div>
              </Paper>
          </div>
        );
    }
}