import React from "react";
import { Component } from "react-simplified";

// material ui components
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import FollowCommunes from "../CustomTable/FollowCommunes";
import UnFollowCommunes from "../CustomTable/UnFollowCommunes";

export default class FollowCommunesTab extends Component {
    state = {
        value: 0
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        return (
            <div style={{display: "inline-block"}}>
                <Paper>
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Followed communes"/>
                        <Tab label="Unfollowed communes"/>
                    </Tabs>
                </Paper>
                {this.state.value === 0 &&
                <FollowCommunes/>
                }
                {this.state.value === 1 &&
                <UnFollowCommunes/>
                }
            </div>
        );
    }
}