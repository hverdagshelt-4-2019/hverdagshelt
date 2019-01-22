// @flow
import axios from 'axios';

export class Admin {
    id: number;
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
        return axios.post('/admin', admin, config());
    }

    static getAdmins(): Promise<Admin[]> {
        return axios.get('admins');
    }
}


