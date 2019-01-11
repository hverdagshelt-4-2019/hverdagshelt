import axios from 'axios';
axios.interceptors.response.use(response => response.data);
let url = "http://localhost:3000";

class Ticket {
    commune;
    category;
    title;
    description;
    picture;
    lat;
    long;
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class TicketService {

    postEvent(ticket): Promise<Object> {
        console.log(config)
        return axios.post(url + '/event', ticket, config);
    }

    getEvent(ticketID): Promise<Ticket>{
        return axios.get(url + '/event/' + eventID);
    }

    getAllEvents(): Promise<Ticket[]>{
        return axios.get(url + '/events');
    }

    editEvent(ticketID, ticket): Promise<Object> {
        return axios.put(url + '/event/' + eventID, ticket, config);
    }

    deleteEvent(eventID): Promise<Object> {
        return axios.delete(url + '/event/' + eventID, config);
    }
}

export let ticketService = new TicketService;