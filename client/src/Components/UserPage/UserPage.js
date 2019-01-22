import React from "react";
import { Component } from "react-simplified";
import styles from "./style.css";
import FollowCommunesTab from "../CustomTab/FollowCommunesTab";
import userService from "../../Services/userService";

import ChangePassword from "../ChangePassword/ChangePassword";

// material ui components
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";

const customStyles = {
    textFields: {
        marginLeft: "10%"
    }
}

export default class UserPage extends Component {


    componentDidMount() {
        // TODO: Get fullname of user.
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