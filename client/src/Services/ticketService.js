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

class TicketService {

    postTicket(ticket): Promise<Object> {
        return axios.post(url + '/login/', ticket,{headers: { "Authorization": localStorage.getItem('authToken') }});
    }

    getTicket(ticketID): Promise<Ticket>{
        return axios.get('/ticket/' + ticketID);
    }
}

export let loginService = new LoginService;