// @flow
import axios from 'axios';
let url = "http://localhost:3000";

class Admin {
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

export default class AdminService {

    static createAdmin(email): Promise<Object>{
        let admin = new Admin();
        admin.email = email;
        console.log('Trying to make an admin...')
        return axios.post(url + '/admin', admin, config());
    }

}


