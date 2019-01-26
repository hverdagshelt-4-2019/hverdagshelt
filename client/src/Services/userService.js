// @flow
import axios from 'axios';

class User {
    email;
    username;
    password;
    commune;
    id;
}

/**
 * Function for getting the auth token from localstorage and returns it as a header
 * @returns {{headers: {Authorization: string}}} Token for API authorization
 */


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

    static createUser(email: string, name: string, password: string, commune : string): Promise<Object>{
        let user = new User();
        user.email = email;
        user.password = password;
        user.commune = commune;
        user.name = name;
        return axios.post('/user', user);
    }

   static updatePassword(oldPassword: string, newPassword: string): Promise<Object>{
        console.log("oldpassword: " + oldPassword + "\nnewpassword: " + newPassword);
        return axios.put('/userpass', {oldPassword: oldPassword, newPassword: newPassword}, config());
   }

   static updateEmail(prevEmail: string, newMail: string): Promise<Object>{
        return axios.put('/usermail/' + prevEmail, {email: newMail}, config());
   }

    static updateName(name: string): Promise<Object>{
        return axios.put('/username', {name: name}, config());
    }


    static getUsers() : Promise<User[]>{
       return axios.get('/users', config());
   }

   static resetPassword(email: string, json: Object): Promise<Object>{
        return axios.put("/forgotPassword/" + email, json);
   }

   static delUser(email: string): Promise<Object> {
        return new Promise(async (resolve, rej) => {
            let res = await axios.delete('/user/' + email, config())
            if(res.status === 401 && res.error === 'Token invalid'){
                localStorage.removeItem('token');
                rej(res.error);
            }
            else resolve(res)
        });
   }

   static getUser(): Promise<Object> {
        return axios.get("/user", config());
   }
}