import React from "react";
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
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Switch from "@material-ui/core/Switch";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from '@material-ui/core/InputAdornment';

export default class FollowCommunes extends Component {
    state = {
        rows: [],
        data: [],
        checkedCommunes: [],
        statusText: [],
        rowsPerPage: 5,
        page: 0,
        query: ""
    }

    componentDidMount() {
        communeService.getAllCommunes().then(res => {
            this.setState({
                data: res.data.map(e => e.name),
                statusText: res.data.map(e => "Follow")
            }, () => this.sortArray());
        }).catch(err => console.log(err))
    }

    handleChangePage = (event, page) => {
        this.setState({page: page});
    }

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    }

    sortArray() {
        this.setState({
            rows: this.state.data.filter(e => e.toLowerCase().startsWith(this.state.query.trim().toLowerCase()))
        })
    }

    onClick = id => (event, checked) => {
        console.log("Id is: " + id);
        console.log("Checked is: " + checked);
        if(checked) {
            this.setState(prevState => ({
                statusText: {
                    ...prevState.statusText,
                    [id]: "Unfollow"
                }
            }));
        }
        else {
            this.setState(prevState => ({
                statusText: {
                    ...prevState.statusText,
                    [id]: "Follow"
                }
            }));
        }
    }

    handleChange = event => {
        this.setState({query: event.target.value}, () => {
            this.sortArray();
        });
    }

    render() {
        const page = this.state.page;
        const rowsPerPage = this.state.rowsPerPage;
        return (
            <div>
                <Paper className={styles.root}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    <div className={styles.tableHeader}>
                                        Kommune (søk for å få opp flere)
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
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <div className={styles.rowHolder}>
                                            {row}
                                            <div>
                                                <Switch onChange={this.onClick(index)} value={row}/>
                                                <Typography>{this.state.statusText? this.state.statusText[index] : ""}</Typography>
                                            </div>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    colSpan={3}
                                    count={this.state.rows.length}
                                    rowsPerPage={this.state.rowsPerPage}
                                    page={this.state.page}
                                    selectProps={{native: true}}
                                    onChangePage={this.handleChangePage}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                />
                            </TableRow>
                        </TableFooter>
                    </Table>
                </Paper>
            </div>
        );
    }
}