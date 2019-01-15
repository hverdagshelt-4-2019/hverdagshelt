//@flow 

import axios from 'axios';
let url = 'http://localhost:8080';

class Category{
    id : number;
    name : string; 
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

export default class CategoryService{
    static getTicketCategories() : Promise<Category[]>{
        console.log("Getting all categories...");
        return axios.get(url + "/ticketcat");
    }

    static getEventCategories() : Promise<Category[]>{
        console.log("Getting all categories...");
        return axios.get(url + "/eventcat");
    }

    static deleteTicketCategory(id) : Promise<void>{
        return axios.delete(url + "/ticketcat/" + id)
    }

    static deleteEventCategory(id) : Promise<void>{
        return axios.delete(url + "/eventcat/" + id)
    }

    static addTicketCategory(name) : Promise<void>{
        let category = new Category;
        category.name = name; 
        return axios.post(url + "/ticketcat", category, config); //Need verifytoken
    }

    static addEventCategory(name) : Promise<void>{
        let category = new Category;
        category.name = name;
        return axios.post(url + "/eventcat", category, config); //Need verifytoken
    }
}