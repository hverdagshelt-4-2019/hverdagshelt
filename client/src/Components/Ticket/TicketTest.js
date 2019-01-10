//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Navbar_person } from '../Navbars/Navbar_person';

export class TicketTest extends Component {
  render() {
    return (
            <div>
                <Navbar_person />
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1 className="mt-4">Grafiti</h1>
                            <p className="lead">
                                 by
                                 {' '}
                                <a href="#">Start Bootstrap</a>
                            </p>

                            <hr />

                            <p>January 1, 2018 12:00</p>

                            <hr />

                            <img className="img-fluid rounded" src="http://placehold.it/900x300" alt="" />

                            <hr />

                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>

                            <hr />

                            Map here

                            <hr />

                            <div className="card my-4">
                                <h5 className="card-header">Kommenter:</h5>
                                <div className="card-body">
                                    <form>
                                        <div className="form-group">
                                            <textarea className="form-control" rows="3"></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Send</button>
                                    </form>
                                </div>
                            </div>

        
                            <div className="media mb-4">
                                <div className="media-body">
                                    <h5 className="mt-0">Commenter Name</h5>
                                    Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                </div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}