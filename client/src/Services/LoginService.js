// @flow
import axios from 'axios';
axios.interceptors.response.use(response => response.data);
let url = 'http://localhost:3000';

class User {
  email;
  password;
}

class LoginService {
  loginUser(email, password): Promise<void> {
    let user = new User();
    user.email = email;
    user.password = password;
    return axios.post(url + '/login/', user);
  }
}

export let loginService = new LoginService();
