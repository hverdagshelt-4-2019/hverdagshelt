import React from "react";
import { Component } from "react-simplified";
import styles from "./style.css";
import FollowCommunesTab from "../CustomTab/FollowCommunesTab";
import userService from "../../Services/userService";

import ChangePassword from "../ChangePassword/ChangePassword";

// material ui components
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const customStyles = {
    textFields: {
        marginLeft: "10%"
    }
}

export default class UserPage extends Component {


    componentDidMount() {
        // TODO: Get the username and display it.
        userService.getUser().then(res => {
            this.setState({
                emailInfo: res.data[0].email,
                usernameInfo: res.data[0].username
            });
        }).catch(err => console.log(err));
    }

    state = {
        name : '',
        emailInfo: "",
        usernameInfo: "",
        edit: false,
        newMail: "",
        error: false,
        label: "Email"
    };

    handleClick(){
        console.log("Lmao");
        userService.updateName(this.state.name).then(res => {
            console.log("Response: " + JSON.stringify(res));
        }).catch(err => console.log(err));
    }

    onEdit = () => {
        this.setState({edit: true});
    }

    cancelEdit = () => {
        this.setState({edit: false});
    }

    handleChange = event => {
        this.setState({
            newMail: event.target.value,
            error: false,
            label: "Email"
        });
    }

    changeEmail = () => {
        if(!this.verifyField()) return;
        userService.updateEmail(this.state.emailInfo, this.state.newMail).then(res => {
            console.log("Res: " + JSON.stringify(res));
            if(res.status === 200){
                this.setState({
                    emailInfo: this.state.newMail,
                    edit: false
                });
            }
        }).catch(err => {
            console.log(err);
            this.setState({
                label: "Denne eposten er allerede registrert",
                error: true
            })
        })
    }

    verifyField() {
        if(this.state.newMail.trim() === ""){
            this.setState({
                error: true,
                label: "Du må skrive inn en ny email"
            })
            return false;
        }
        else if(!this.state.newMail.includes("@")){
            this.setState({
                error: true,
                label: "Du må skrive inn en gyldig email"
            })
            return false;
        }
        return true;
    }

    render() {
        return (
          <div className={styles.root}>
              <div className={styles.infoDiv}>
                  <div className={styles.textHolder}>
                      <div>
                          <Typography variant="h5">Email</Typography>
                      </div>
                      {!this.state.edit &&
                      <div className={styles.comboBox}>
                          <Typography style={customStyles.textFields} variant="h5">{this.state.emailInfo}</Typography>
                          <div style={{padding: "0px 10px"}}/>
                          <Button variant="contained" color="primary" onClick={this.onEdit}>Rediger</Button>
                      </div>
                      }
                      {this.state.edit &&
                      <div className={styles.comboBox}>
                          <TextField style={{width: "260px"}} label={this.state.label} error={this.state.error} onChange={this.handleChange}/>
                          <div style={{padding: "0px 10px"}}/>
                          <Button variant="contained" color="primary" onClick={this.changeEmail}>Lagre</Button>
                          <Button variant="contained" onClick={this.cancelEdit}>Avbryt</Button>
                      </div>
                      }
                  </div>
                  <div className={styles.textHolder}>
                      <div><Typography variant="h5">Fullt navn</Typography></div>
                      <div><Typography style={customStyles.textFields} variant="h5">{this.state.usernameInfo}</Typography></div>
                  </div>
                  <div>
                      <Divider style={{marginBottom: "40px"}}/>
                      <div className={styles.changePassCommuneDiv}>
                          <div className={styles.changePasswordDiv}>
                              <ChangePassword/>
                          </div>
                      </div>
                  </div>
                  <div className={styles.communeTable}>
                      <FollowCommunesTab/>
                  </div>
              </div>
          </div>
        );
    }
}