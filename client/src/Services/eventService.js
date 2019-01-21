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
    time; //Was changed from happening_time
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

    static postEvent(commune: string, category: string, title: string, description: string, dateTime): Promise<Object> {
        let event = new Event();
        event.title = title;
        event.category = category;
        event.description = description;
        event.commune_name = commune;
        event.time = dateTime;
        console.log("Posting event...");
        console.log('Name of commune: ' + event.commune_name);
        return axios.post('/event', event, config());
    }

    getEvent(eventID): Promise<Event>{
        return axios.get('/event/' + eventID);
    }

    getAllEvents(): Promise<Event[]>{
        return axios.get('/events');
    }

    editEvent(eventID, event): Promise<Object> {
        return axios.put('/event/' + eventID, event, config());
    }

    deleteEvent(eventID): Promise<Object> {
        return axios.delete('/event/' + eventID, config());
    }
}

