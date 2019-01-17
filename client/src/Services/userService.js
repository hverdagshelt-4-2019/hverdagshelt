// @flow
import axios from 'axios';

class User {
    email;
    password;
    commune;
    id;
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
        return axios.get('/level', config())
    }
    static loginUser(
        email: string,
        password: string
    ): Promise<{data: {token: string, level: string, id: string, commune: string, company: string}}> {
        let user = new User();
        user.email = email;
        user.password = password;
        return axios.post('/login', user);
    }

    static createUser(email: string, password: string, commune : string): Promise<Object>{
        let user = new User();
        user.email = email;
        user.password = password;
        user.commune = commune; 
        return axios.post('/user', user);
    }

   static updatePassword(oldPassword: string, newPassword: string): Promise<Object>{
       return axios.post('/userpass', {oldPassword, newPassword});
   }

   static updateEmail(email: string): Promise<Object>{
        return axios.post('/usermail', {email});
   }

   static getUsers() : Promise<User[]>{
       return axios.get('/users');
   }
}


