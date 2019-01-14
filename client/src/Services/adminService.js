// @flow
import axios from 'axios';
let url = "http://localhost:3000";

class Admin {
    email;
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class AdminService {

    createAdmin(email): Promise<Object>{
        let admin = new Admin();
        admin.email = email;
        return axios.post(url + '/admin', config);
    }

}

export let adminService = new AdminService;


