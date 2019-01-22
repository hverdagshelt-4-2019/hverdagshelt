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

    static getUnFollowedCommunes(): Promise<void>{
        return axios.get("/unfollowedCommunes", config());
    }

    static getAllCommunes() : Promise<Commune[]>{
        return axios.get("/communes");
    }

    static followCommune(communeName): Promise<void>{
        return axios.post("/followCommune/" + communeName, {}, config());
    }

    static unFollowCommune(communeName): Promise<void>{
        return axios.delete("/unfollowCommune/" + communeName, config());
    }
}