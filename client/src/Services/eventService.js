import axios from 'axios';
import ticketService from './ticketService';

export class Event {
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

    static postEvent(commune: string, category: string, title: string, description: string, happening_time): Promise<Object> {
        let event = new Event();
        event.title = title;
        event.category = category;
        event.description = description;
        event.commune_name = commune;
        event.happening_time = happening_time;
        console.log("Posting event...");
        console.log('Time: ' + event.happening_time);
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


    static editEvent(eventID: number, category: string, title: string, description: string, happening_time: string): Promise<Object>{
        console.log('fff');
        let event = new Event();
        event.title = title;
        event.category = category;
        event.description = description;
        event.happening_time = happening_time;


        console.log('saving servie event');
        console.log(happening_time);
        return axios.put('/event/' + eventID, event, config());
    }

    static deleteEvent(eventID): Promise<Object> {
        return axios.delete('/event/' + eventID, config());
    }
}

