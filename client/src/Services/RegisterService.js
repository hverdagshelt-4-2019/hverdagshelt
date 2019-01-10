//@flow

import axios from 'axios';
let url = 'http://localhost:8080';
axios.interceptors.response.use(response => response.data);

class Person {
  id;
  email;
  salt;
  password;
}

class RegisterService {
  postNewUser(email, password) {
    if (!email | !password) return new Error(); //if email or password is missing, return error.
    console.log(email + ' ' + password);
    let person = new Person(null, email, null, password); //salt/id generated later.
    return axios.post(url + '/registration', person);
  }
}

export let registerService = new RegisterService();
