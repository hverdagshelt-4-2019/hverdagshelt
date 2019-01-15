// @flow
import axios from 'axios';
let url = "http://localhost:3000";

export default class Admin {
    email: string;
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

class AdminService {

    static createAdmin(email): Promise<Object>{
        let admin = new Admin();
        admin.email = email;
        return axios.post(url + '/admin', config());
    }

}


