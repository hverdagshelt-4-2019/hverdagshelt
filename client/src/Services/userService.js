// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);
let url = "http://localhost:3000";

class User {
    email;
    password;
}

class UserService {

    loginUser(
        email,
        password
    ): Promise<void> {
        let user = new User();
        user.email = email;
        user.password = password;
        console.log("okay2");
        return axios.post(url + '/login', user);
    }

    createUser(email,password): Promise<Object>{
        let user = new User();
        user.email = email;
        user.password = password;
        return axios.post(url + '/user');
    }

    createAdmin(email, password): Promise<Object>{
        let admin = new User();
        admin.email = email;
        admin.password = password;
        return axios.post(url + '/admin');
    }
}

export let userService = new UserService;


