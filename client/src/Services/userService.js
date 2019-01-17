// @flow
import axios from 'axios';
let url = `http://localhost:3000`;

class User {
    email;
    password;
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

export default class userService {

    static getLevel() : Promise<{data: {level: string, commune: string}}> {
        return axios.get(url + '/level', config())
    }
    static loginUser(
        email: string,
        password: string
    ): Promise<{data: {token: string, level: string, id: string, commune: string, company: string}}> {
        let user = new User();
        user.email = email;
        user.password = password;
        return axios.post(url + '/login', user);
    }

    static createUser(email: string, password: string): Promise<Object>{
        let user = new User();
        user.email = email;
        user.password = password;
        return axios.post(url + '/user', user);
    }

   static updatePassword(oldPassword: string, newPassword: string): Promise<Object>{
       return axios.post(url + '/userpass', {oldPassword, newPassword});
   }

   static updateEmail(email: string): Promise<Object>{
        return axios.post(url + '/usermail', {email});
   }

   static getUsers() : Promise<User[]>{
       return axios.get(url + '/users');
   }

   static resetPassword(email, json): Promise<Object>{
        return axios.put(url + "/forgotPassword/" + email, json);
   }
}


