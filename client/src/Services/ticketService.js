//@flow
//Must add types here later...

import axios from 'axios';
let url = 'http://localhost:3000';
axios.interceptors.response.use(response => response.data);

class Ticket {
  id;
  submitter_id;
  repsonsible_commune_id;
  responsible_company_id;
  category_id;
  title;
  description;
  picture;
  submitted_time;
  finished_time;
  status;
  lat;
  lng;
}

class TicketService{
    //Possibly not use this? Probably not 
    /*
    getAllCommuneTickets(communeIds){
        console.log("Get tickets from these communes: " + communeIds);
        return axios.get(url + "/communeTickets/" + communeIds); //Temporary endpoint name. 
    }
    */

    getTicketsByCategory(communeId, categories){
        console.log("Getting tickets from the commune: " + communeId + " by categories: " + categories);
        return axios.get(url + "/tickets/category", categories) 
    }


  getTicket(id: number): Promise<Ticket[]> {
    return axios.get('/ticket/' + id);
  }

  deleteTicket(id: number): Promise<void> {
    return axios.delete('/ticket/' + id);
  }

}

export let ticketService = new TicketService();
