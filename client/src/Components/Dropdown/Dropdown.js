import React from "react";
import { Component } from "react-simplified";
import styles from "./style.css";

// material ui components
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";

export default class Dropdown extends Component {
    state = {
        value: "",
        changed: false
    }

    handleChange = event => {
        this.setState({
            value: event.target.value,
            changed: true
        });
    }

    handleClick = () => {
        this.setState({changed: false})
        this.props.reciever(this.state.value);
    }

    componentDidMount() {
        const currValue = this.props.currValue? this.props.currValue : "";
        console.log("Props: " + this.props.currValue);
        console.log("Compnent mounted and currValue is: " + currValue);
        this.setState({
            value: currValue
        })
    }

    render(){
        const items = this.props.options? this.props.options : [];
        return (
            <div className={styles.root}>
                <FormControl className={styles.formControl}>
                    <InputLabel shrink htmlFor="age-native-label-placeholder">
                        {this.props.title}
                    </InputLabel>
                    <NativeSelect
                        value={this.state.value}
                        onChange={this.handleChange}
                        input={<Input name="age" id="age-native-label-placeholder" />}
                    >
                        {items.map((element, index) => {
                            return <option value={element} key={index}>{element}</option>
                        })}
                    </NativeSelect>
                    <FormHelperText>{this.props.helperText}</FormHelperText>
                </FormControl>
                {this.state.changed && <button className="btn btn-primary" onClick={this.handleClick}>Save</button>}
            </div>
        )
    }
}