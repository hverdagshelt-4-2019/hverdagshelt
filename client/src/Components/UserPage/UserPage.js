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
        // TODO: Get fullname of user.
    }

    State = {
        name : ''
    };

    handleClick(){
        userService.updateName(this.state.name);
    }

    render() {
        return (
          <div className={styles.root}>
              <div className={styles.infoDiv}>
                  <div className={styles.textHolder}>
                      <div><Typography variant="h5">Email</Typography></div>
                      <div><Typography style={customStyles.textFields} variant="h5">aleksander.johansen@hotmail.com</Typography></div>
                  </div>
                  <div className={styles.textHolder}>
                      <div><Typography variant="h5">Fullt navn</Typography></div>
                      <div><Typography style={customStyles.textFields} variant="h5">Aleksander Johansen</Typography></div>
                  </div>
                  <div>
                      <Divider style={{marginBottom: "40px"}}/>
                      <div className={styles.changePassCommuneDiv}>
                          <div className={styles.changePasswordDiv}>
                              <ChangePassword/>
                          </div>
                          <form>
                              <div className='form-group'>
                                  <h2 variant="h4">Endre brukernavn</h2>
                                  <br />
                                  <TextField onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.setState({name: event.target.value}))} label="Nytt brukernavn"/>
                                  <Button variant="contained" color="primary" onClick={this.handleClick}>Lagre</Button>
                              </div>
                          </form>
                          <div className={styles.communeTable}>
                              <FollowCommunesTab/>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
}