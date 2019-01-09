//@flow 
//Must add types here later...

import axios from 'axios';
let url = 'http://localhost:8080';
axios.interceptors.response.use(response => response.data);

class Ticket{
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
    getAllCommuneTickets(communeIds){
        console.log("Get tickets from these communes: " + communeIds);
        return axios.get(url + "/communeTickets/" + communeIds); //Temporary endpoint name. 
    }
}

export let ticketService = new TicketService();