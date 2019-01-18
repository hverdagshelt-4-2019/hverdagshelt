import axios from 'axios';

class Event {
    id;
    submitter_id;
    commune_name;
    category;
    title;
    description;
    picture;
    happening_time;
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

    static postEvent(event): Promise<Object> {
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