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
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from '@material-ui/core/InputAdornment';
import CircularProgress from "@material-ui/core/CircularProgress";

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
        communeService.getFollowedCommunes().then(res => {
            this.setState({
                data: res.data.map(e => e.commune_name),
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

    removeItem(item) {
        const index = this.state.data.indexOf(item);
        if(index >= 0) {
            let copy = this.state.data.filter(e => e !== item);
            this.setState({
                data: copy
            })
            this.sortArray();
        }
        else {
            console.log("What ze fook");
        }
    }

    onUnFollow = (value, index, event) => {
        this.setState({
            loadingIndex: index
        }, () => {
            communeService.unFollowCommune(value).then(res => {
                if(res.status === 200){
                    // TODO: Give feedback
                    this.removeItem(value);
                    this.sortArray();
                    console.log("Removed commune");
                }
                else {
                    // TODO: Give feedback
                    console.log("Rip");
                }
                this.setState({
                    loadingIndex: -1
                })
            }).catch(err => {
                console.log(err);
                this.setState({
                    loadingIndex: -1
                })
            })
        })
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
                                        Kommune
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
                                                {this.state.loadingIndex !== index &&
                                                <Button variant="contained" color="secondary" onClick={this.onUnFollow.bind(this, row, index)}>
                                                    Unfollow
                                                </Button>
                                                }

                                                {this.state.loadingIndex === index &&
                                                <CircularProgress/>
                                                }
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