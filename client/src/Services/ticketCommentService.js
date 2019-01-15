import axios from 'axios';
let url = "http://localhost:3000";

//TODO: Dette er feil klasse

class Ticket {
    id;
    submitter_id;
    commune;
    category;
    title;
    description;
    picture;
    lat;
    long;
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
        console.log(config)
        return axios.post(url + '/ticket', ticket, config());
    }

    getTicket(ticketID): Promise<Ticket>{
        return axios.get(url + '/ticket/' + ticketID);
    }

    getAllTickets(): Promise<Ticket[]>{
        return axios.get(url + '/tickets');
    }

    editTicket(ticketID, ticket): Promise<Object> {
        return axios.put(url + '/ticket/' + ticketID, ticket, config());
    }

    deleteTicket(ticketID): Promise<Object> {
        return axios.delete(url + '/ticket/' + ticketID, config());
    }
}

export let ticketService = new TicketService;