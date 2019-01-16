import axios from 'axios';
let url = "http://localhost:3000";

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

class EventService {

    postEvent(event): Promise<Object> {
        return axios.post(url + '/event', event, config());
    }

    getEvent(eventID): Promise<Event>{
        return axios.get(url + '/event/' + eventID);
    }

    getAllEvents(): Promise<Event[]>{
        return axios.get(url + '/events');
    }

    editEvent(eventID, event): Promise<Object> {
        return axios.put(url + '/event/' + eventID, event, config());
    }

    deleteEvent(eventID): Promise<Object> {
        return axios.delete(url + '/event/' + eventID, config());
    }
}

export let eventService = new EventService;