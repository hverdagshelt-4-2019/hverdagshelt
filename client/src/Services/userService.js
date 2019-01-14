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

   updatePassword(password): Promise<Object>{
       return axios.post(url + '/userpass', {password});
   }

   updateEmail(email): Promise<Object>{
        return axios.post(url + '/usermail', {email});
   }

   getUsers() : Promise<User[]>{
       return axios.get(url + '/users');
   }
}

export let userService = new UserService;


