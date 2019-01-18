import axios from 'axios';
import ticketService from './ticketService';

class Event {
    id;
    submitter_id;
    commune_name;
    category;
    title;
    description;
    picture;
    happening_time;
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

export default class EventService {

    static async postEvent(category: string, title: string, description: string, lat: number, long: number, datetime): Promise<Object> {
        let event = new Event();
        event.title = title;
        event.category = category;
        event.description = description;
        event.lat = lat;
        event.long = long;
        event.happening_time = datetime;
        await ticketService.getCommune(lat, long).then((response) => event.commune_name = response.data.kommune).catch((error : Error) => console.log(error.message));
        console.log("Posting event...");
        console.log(event.commune);
        return axios.post('/event', event, config());
    }

    postEvent(event): Promise<Object> {
        return axios.post('/event', event, config());
    }

    static getEvent(eventID): Promise<Event>{
        return axios.get('/event/' + eventID);
    }

    static getAllEvents(): Promise<Event[]>{
        return axios.get('/events', config());
    }

    static editEvent(eventID, event): Promise<Object> {
        return axios.put('/event/' + eventID, event, config());
    }

    static deleteEvent(eventID): Promise<Object> {
        return axios.delete('/event/' + eventID, config());
    }
}