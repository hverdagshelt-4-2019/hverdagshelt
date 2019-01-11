import axios from 'axios';
axios.interceptors.response.use(response => response.data);
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

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class EventService {

    postEvent(event): Promise<Object> {
        console.log(config)
        return axios.post(url + '/event', event, config);
    }

    getEvent(eventID): Promise<Event>{
        return axios.get(url + '/event/' + eventID);
    }

    getAllEvents(): Promise<Event[]>{
        return axios.get(url + '/events');
    }

    editEvent(eventID, event): Promise<Object> {
        return axios.put(url + '/event/' + eventID, event, config);
    }

    deleteEvent(eventID): Promise<Object> {
        return axios.delete(url + '/event/' + eventID, config);
    }
}

export let eventService = new EventService;