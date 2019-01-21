import React from 'react';
import { Component } from "react-simplified";
import styles from "./style.css";
import communeService from "../../Services/communeService";

// material ui components
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from "@material-ui/icons/Search";

export default class CustomTable extends Component {
    text = "";
    state = {
        rows: [],
        data: [],
        query: ""
    }

    componentDidMount() {
        communeService.getAllCommunes().then(res => this.setState({
            data: res.data.map(e => e.name),
            rows: res.data.map(e => e.name).slice(0, 8)
        })).catch(err => console.log(err))
    }

    sortArray() {
        if(this.state.query.trim().length < 2) return;
        this.setState({
            rows: this.state.data.filter(e => e.toLowerCase().startsWith(this.state.query.trim().toLowerCase()))
        })
    }

    getSelectedItem = event => {
        this.props.reciever(event.currentTarget.value);
    }

    handleChange = event => {
        this.setState({query: event.target.value}, () => {
            this.sortArray();
        });
    }

    render() {
        return (
            <div>
                <TextField
                    label="Search"
                    value={this.state.query}
                    margin="normal"
                    onChange={this.handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
                <Paper className={styles.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Kommune (søk for å få opp flere)
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className={styles.rowHolder}>
                                            {row}
                                            <input type="radio" value={row} onChange={this.getSelectedItem} name="radioButtons"/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        )
    }
}