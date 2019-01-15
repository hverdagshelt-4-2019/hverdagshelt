import axios from 'axios';
let url = "http://localhost:3000";

class Ticket {
    responsible_commune;
    submitter_email;
    category;
    title;
    description;
    picture;
    status;
    submitted_time;
    company;
    lat;
    lng;
}

function config() {
    let token = localStorage.getItem('authToken');
    let Authorization = 'none';
    if(token)
        Authorization = "Bearer " + token;
    return {
        headers: {
            Authorization
        }
    }
}

class TicketService {

    postTicket(ticket): Promise<Object> {
        return axios.post(url + '/ticket', ticket, config());
    }

    getTicket(ticketID): Promise<Ticket>{
        console.log("getting ticket");
        return axios.get(url + '/ticket/' + ticketID);
    }

    getAllTickets(): Promise<Ticket[]>{
        return axios.get(url + '/tickets');
    }

    editTicket(ticketID, ticket): Promise<Object>{
        return axios.put(url + '/ticket/' + ticketID, ticket, config());
    }

    deleteTicket(ticketID): Promise<Object>{
        return axios.delete(url + '/ticket/' + ticketID, config());
    }
}

export let ticketService = new TicketService;