import axios from 'axios';

class Ticket {
    submitter_email;
    name;
    responsible_commune;
    category;
    title;
    description;
    picture;
    status;
    statusText;
    submitted_time;
    company_name;
    countcomm;
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




export default class TicketService {

    static getCommune(lat: number, lng: number): Promise<Object> {
        console.log("Finding commune...");
        return axios.get('/communeByCoordinates/' + lat + '/' + lng);
    }

    static async postTicket(category: string, title: string, description: string, lat: number, lng: number): Promise<Object> {
        let ticket = new Ticket();
        ticket.title = title;
        ticket.category = category;
        ticket.description = description;
        ticket.lat = lat;
        ticket.lng = lng;
        await this.getCommune(lat, lng).then((response) => ticket.commune = response.data.kommune).catch((error : Error) => console.log(error.message));
        console.log("Posting ticket...");
        console.log(ticket.commune);
        return axios.post('/ticket', ticket, config());
    }

    static getTicket(ticketID): Promise<Ticket>{
        console.log("getting ticket");
        return axios.get('/ticket/' + ticketID);
    }


    static getAllTickets(): Promise<Ticket[]>{
        return axios.get('/tickets', config());
    }

    static getAllTicketsMap(commune): Promise<Ticket[]>{
        return axios.get('/ticketsMap/' + commune, config());
    }


    static async editTicket(ticketID: number, category: string, title: string, description: string, lat: number, lng: number, submitter_email: string): Promise<Object>{
        let ticket = new Ticket();
        ticket.title = title;
        ticket.category = category;
        ticket.description = description;
        ticket.lat = lat;
        ticket.lng = lng;
        ticket.submitter_email = submitter_email;
        await this.getCommune(lat, lng).then((response) => ticket.commune = response.data.kommune).catch((error : Error) => console.log(error.message));
        console.log("Posting ticket...");
        console.log(ticket.commune);
        console.log(ticket.lng);
        console.log(ticket.lat);
        return axios.put('/ticketedit/' + ticketID, ticket, config());
    }

    static deleteTicket(ticketID): Promise<Object>{
        return axios.delete('/ticket/' + ticketID, config());
    }

    static setStatus(id, obj): Promise<Object> {
        return axios.put("/ticketstatus/" + id, obj, config());
    }

    static setCompany(id, obj): Promise<Object> {
        return axios.put('/ticketcomp/' + id, obj, config());
    }

    static getTicketsUser(): Promise<Ticket[]>{
        return axios.get('/ticketsByUser', config());
    }

    static verifyToken(): Promise<Object>{
        return axios.get('/tokenValid', config());
    }
}
