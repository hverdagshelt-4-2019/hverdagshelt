// @flow
import axios from 'axios';
let url = "http://localhost:3000";

export default class Admin {
    email: string;
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class AdminService {

    static createAdmin(email): Promise<Object>{
        let admin = new Admin();
        admin.email = email;
        return axios.post(url + '/admin', config);
    }

}


