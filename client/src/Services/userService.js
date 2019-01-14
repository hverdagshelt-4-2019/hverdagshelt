// @flow
import axios from 'axios';
let url = `http://localhost:3000`;

class User {
    email;
    password;
}



export default class userService {

    static loginUser(
        email: string,
        password: string
    ): Promise<{data: {token: string}}> {
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

   getUsers() : Promise<User[]>{
       return axios.get(url + '/users');
   }
}


