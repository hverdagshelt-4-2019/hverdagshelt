import axios from 'axios';
let url = "http://localhost:3000";

class Ticket {
    commune;
    category;
    title;
    description;
    picture;
    status;
    submitted_time;
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

function getCommune(lat: number, long: number): Promise<Object> {
        console.log("Finding commune...");
        return axios.get(url + '/communeByCoordinates/' + lat + '/' + long, config());
    }

class TicketService {

    async postTicket(category: string, title: string, description: string, lat: number, long: number): Promise<Object> {
        let ticket = new Ticket();
        ticket.title = title;
        ticket.category = category;
        ticket.description = description;
        ticket.lat = lat;
        ticket.long = long;
        await getCommune(lat, long).then((response) => ticket.commune = response.data.kommune).catch((error : Error) => console.log(error.message));
        console.log("Posting ticket...");
        console.log(ticket.commune);
        return axios.post(url + '/ticket', ticket, config());
    }

    getTicket(ticketID): Promise<Ticket>{
        console.log("getting ticket");
        return axios.get(url + '/ticket/' + ticketID);
    }

    getAllTickets(communes): Promise<Ticket[]>{
        return axios.get(url + '/tickets', communes);
    }

    editTicket(ticketID, ticket): Promise<Object>{
        return axios.put(url + '/ticket/' + ticketID, ticket, config());
    }

    deleteTicket(ticketID): Promise<Object>{
        return axios.delete(url + '/ticket/' + ticketID, config());
    }
}

export let ticketService = new TicketService;