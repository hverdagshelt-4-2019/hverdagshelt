// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);
let url = "http://localhost:8080/";

class User {
    email: string;
    password: string;
}

class LoginService {

    loginUser(
        email: string,
        password: string
    ): Promise<void> {
        let user = new User();
        user.email = email;
        user.password = password;
        return axios.post(url + '/login/', user);
    }
}

export let loginService = new LoginService;


