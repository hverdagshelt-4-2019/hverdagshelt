//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { ticketService } from '../../Services/ticketService';
import { Alert} from '../../widgets';
import { Navbar_person } from '../Navbars/Navbar_person';

export class Ticket extends Component<{ match: { params: { id: number } } }> {
  ticket = '';
  sub_date = null;

  render() {
    return (
        <div>
            <Navbar_person />
            <div className="container">
                <div className="row">
                    <div className="col-lg-8">
                        <h1>{this.ticket.title}</h1>
                        <p className="lead">
                             Status: Avventer svar <span class="glyphicon glyphicon-time"></span>
                        </p>

                        <hr />

                        <p> {this.sub_date} </p>

                        <p><b>Kommune:</b> {this.ticket.responsible_commune}</p>

                        <p><b>Bedrift:</b> //TODO: Statens Vegvesen</p>

                        <p><b>Kategori:</b> {this.ticket.category}</p>

                        <hr />

                        <img id="imageElement" alt="" />
                    
                        <hr />

                        <p>{this.ticket.description}</p>

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
                                //TODO: Map out comments
                            </div>
                         </div>
                   </div>
                </div>
            </div>
        </div>
    );
  }

  getImage(i: String){
      let imageLink="/image/"+i;
      let picture = document.getElementById("imageElement");
      picture.setAttribute("src", imageLink);
  }

  componentDidMount(){
      {this.getImage(this.ticket.picture)}
  }

  mounted() {
    ticketService
      .getTicket(this.props.match.params.id)
      .then(ticket => {this.ticket = ticket.data[0]; this.sub_date = this.ticket.submitted_time.split("T", 1)[0] + ' ' + this.ticket.submitted_time.split("T")[1].split(".", 1); })
      .catch((error: Error) => Alert.danger(error.message));
  }
}
