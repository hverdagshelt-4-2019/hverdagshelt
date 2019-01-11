//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/TicketService';
import { Alert} from '../../widgets';
import { Navbar_person } from '../Navbars/Navbar_person';

export class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket = '';

  render() {
    return (
        <div>
            <Navbar_person />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h1>Hull i veien</h1>
                        <p className="lead">
                             Status: Avventer svar <span class="glyphicon glyphicon-time"></span>
                        </p>

                        <hr />

                        <p>January 1, 2018 12:00</p>

                        <p><b>Kommune:</b> Trondheim</p>

                        <p><b>Bedrift:</b> Statens Vegvesen</p>

                        <p><b>Kategori:</b> Veiproblem</p>

                        <hr />

                        <img src="http://placehold.it/900x300" alt="" />
                    
                        <hr />

                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</p>

                        <hr />

                        Map here

                        <hr />

                        <div>
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

  mounted() {
    ticketService
      .getTicket(this.props.match.params.id)
      .then(ticket => (this.ticket = ticket[0]))
      .catch((error: Error) => Alert.danger(error.message));
  }
}
