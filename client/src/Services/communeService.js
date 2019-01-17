//@flow 

import axios from 'axios';

class Commune{
    name : string; 
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


export default class CommuneService{
    static getFollowedCommunes() : Promise<void>{
        return axios.get("/followedCommunes", config());
    }

    static getAllCommunes() : Promise<Commune[]>{
        return axios.get("/communes");
    }

    // TODO: Fix this method.
    static followCommune(communeName): Promise<void>{
        return axios.post("/followCommune/" + communeName)
    }
}