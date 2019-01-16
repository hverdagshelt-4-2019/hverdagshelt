//@flow 

import axios from 'axios';
let url = 'http://localhost:3000';

class Commune{
    id : number; 
    name : string; 
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

export default class CommuneService{
    static getFollowedCommunes() : Promise<void>{
        return axios.get(url + "/followedCommunes", config); 
    }

    static getAllCommunes() : Promise<Commune[]>{
        return axios.get(url + "/communes");
    }
}