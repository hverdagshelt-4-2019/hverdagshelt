import React from "react";
import { Component } from "react-simplified";

// material ui components
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class CustomDialog extends Component {
    state = {
        open: false
    }

    handleClickOpen() {
        this.setState({open: true});
    }

    handleClose() {
        this.setState({open: false});
    }

    option1() {
        this.handleClose();
        if(this.props.option1Method) {
            if(this.props.callbackData){
                this.props.option1Method(this.props.callbackData);
            }
            else {
                this.props.option1Method();
            }
        }
    }

    option2() {
        this.handleClose();
        if(this.props.option2Method) {
            if(this.props.callbackData){
                this.props.option2Method(this.props.callbackData);
            }
            else {
                this.props.option2Method();
            }
        }
    }

    render() {
        return (
            <div>
                {this.props.buttonType === "danger" &&
                <button className="btn btn-danger" onClick={this.handleClickOpen}><i class="fa fa-trash"></i> {' '} {this.props.buttonText}</button>
                }

                {this.props.buttonType !== "danger" &&
                <button className="btn btn-success">{this.props.buttonText}</button>
                }
                <Dialog
                    fullScreen={this.props.fullScreen}
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{this.props.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {this.props.dialogText}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.option1} color="primary">
                            {this.props.option1Text}
                        </Button>
                        <Button onClick={this.option2} color="primary" autoFocus>
                            {this.props.option2Text}
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}