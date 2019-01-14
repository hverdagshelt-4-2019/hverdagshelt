import axios from 'axios';
let url = "http://localhost:3000";

class Category {
    name;
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class TicketService {

    postTicket(ticket): Promise<Object> {
        console.log(config)
        return axios.post(url + '/ticket', ticket, config);
    }

    getTicket(ticketID): Promise<Ticket>{
        return axios.get(url + '/ticket/' + ticketID);
    }

    getAllTickets(): Promise<Ticket[]>{
        return axios.get(url + '/tickets');
    }

    editTicket(ticketID, ticket): Promise<Object> {
        return axios.put(url + '/ticket/' + ticketID, ticket, config);
    }

    deleteTicket(ticketID): Promise<Object> {
        return axios.delete(url + '/ticket/' + ticketID, config);
    }
}

export let ticketService = new TicketService;