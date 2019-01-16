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

export default class ticketService {

    static postTicket(ticket): Promise<Object> {
        return axios.post(url + '/ticket', ticket, config());
    }

    static getTicket(ticketID): Promise<Ticket>{
        console.log("getting ticket");
        return axios.get(url + '/ticket/' + ticketID);
    }

    static getAllTickets(communes): Promise<Ticket[]>{
        return axios.get(url + '/tickets', communes);
    }

    static editTicket(ticketID, ticket): Promise<Object>{
        return axios.put(url + '/ticket/' + ticketID, ticket, config());
    }

    static deleteTicket(ticketID): Promise<Object>{
        return axios.delete(url + '/ticket/' + ticketID, config());
    }
}
