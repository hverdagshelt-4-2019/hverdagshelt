import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import userService from '../../Services/userService';

export default class AddCompany extends Component {
    users = [];
    newCompany = '';

    render() {
        return (
            <div className="container" >
                <hr/>
                <div className="row">
                    <div className="col-md-6" style={{border: "2px solid lightblue"}}>
                        <br/>
                        <h4>Registrer nytt selskap</h4>
                        <hr/>
                        <form>
                            <div className="form-group">
                                <select className="form-control" style={{width:'100%'}} id="userSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.newCompany = event.target.value)}>
                                    {
                                        this.users.map((user, index) => {
                                            return (
                                                <option value={user.email} key={user.id}>{user.email}</option>
                                            );
                                        })
                                    }
                                </select>
                                <br/>
                                <input name="type"
                                       type="radio"
                                       value="1"
                                       id="type1"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeNew = event.target.value)}
                                       required
                                />
                                <label className="form-check-label" htmlFor="type1">
                                    Admin
                                </label>
                                <br/>
                                <input name="type"
                                       type="radio"
                                       value="2"
                                       id="type2"
                                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.typeNew = event.target.value)}
                                       required
                                />
                                <label className="form-check-label" htmlFor="type2">
                                    Kommunearbeider
                                </label>
                            </div>
                            <label htmlFor="communeSelector">Kommune</label>
                            {' '}
                            <select className="form-control" style={{width:'100%'}} id="communeSelector" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => (this.communeNew = event.target.value)}>

                            </select>
                            <br/>
                            <br/>
                        </form>
                        <hr/>
                        <button className="btn btn-primary" onClick={this.addNew}>Opprett ny</button>
                        <br/>
                        <br/>
                    </div>
                </div>
                <div style={{height: '150px'}} />
            </div>
        );
    }

    mounted() {
        userService.getUsers()
            .then(res => this.users = res.data)
            .catch(err => console.log(err))
    }
}