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

class RegisterService{
    postNewUser(email, password) : Promise<void>{
        if(!email | !password) return new Error; //if email or password is missing, return error.
        let person = new Person(); //salt and id generated back-end
        person.email = email; person.password = password; 
        return axios.post(url + "/user", person); //OK
    }

    postPublicUser(email, password) : Promise<void>{
        publicUser = new Person();
        publicUser.email = email; publicUser.password = password;
        axios.post(url + "/publicworker", publicUser); //Need verifytoken as middle argument here. 
    }

    postAdmin(email, password) : Promise<void>{
        admin = new Person();
        admin.email = email; admin.password = password;
        axios.post(url + "/admin", admin); //Need verifytoken as middle argument here. 
    }

    getAllUsers() : Promise<Person[]>{
        return axios.get(url + "/users"); //OK
    }

    updateUser(id : number, type : number) : Promise<void>{ 
        //Update a person to admin or commune worker
        //return axios.put(url + "/"); //Need endpoint!
    }
}

export let registerService = new RegisterService();
