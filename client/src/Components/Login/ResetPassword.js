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
import {NavLink, Redirect} from "react-router-dom";

const customStyle = {
    sendButton: {
        margin: "20px 0px"
    }
}

export default class ResetPassword extends Component{
    state = {
        email: "",
        sent: false,
        redirect: false
    }

    handleChange = event => {
        this.setState({email: event.target.value});
    }

    resetPassword() {
        userService.resetPassword(this.state.email, {email: this.state.email}).then(res => {
            console.log("Response: " + JSON.stringify(res));
            this.setState({sent: true});
        }).catch(err => console.log(err));
    }

    redirect = event => {
        this.setState({redirect: true});
    }

    render(){
        return (
          <div className={styles.resetPasswordRoot}>
              {this.state.redirect && <Redirect from='/resetpassord' to='/'/>}
              <Paper style={{padding: "20px 200px", backgroundColor: "#eff0fc", backgroundSize: "cover"}}>
                  {!this.state.sent &&
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
                  }
                  {this.state.sent &&
                  <div className={styles.formDiv}>
                      <Typography style={{paddingBottom: "32%"}} variant="h4">Passordet har blitt tilbakestilt!</Typography>
                      <Button variant="contained" color="primary" onClick={this.redirect}>
                          Logg inn her!
                      </Button>
                      <br/>
                  </div>
                  }
              </Paper>
          </div>
        );
    }
}