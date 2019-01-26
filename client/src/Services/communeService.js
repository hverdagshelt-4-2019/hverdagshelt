//@flow 

import axios from 'axios';

class Commune{
    commune_name: string;
}

/**
 * Function for getting the auth token from localstorage and returns it as a header
 * @returns {{headers: {Authorization: string}}} Token for API authorization
 */

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
    static getFollowedCommunes() : Promise<Commune[]>{
        return axios.get("/followedCommunes", config());
    }

    static getUnFollowedCommunes(): Promise<Commune[]>{
        return axios.get("/unfollowedCommunes", config());
    }

    static getAllCommunes() : Promise<Commune[]>{
        return axios.get("/communes");
    }

    static followCommune(communeName: string): Promise<void>{
        return axios.post("/followCommune/" + communeName, {}, config());
    }

    static unFollowCommune(communeName: string): Promise<void>{
        return axios.delete("/unfollowCommune/" + communeName, config());
    }
}