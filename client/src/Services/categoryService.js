//@flow 

import axios from 'axios';
let url = 'http://localhost:3000';

export class Category{
    name : string; 
}

function config() {
    let wtf = "Bearer " + localStorage.getItem('authToken');
    return {
        headers: {
            Authorization: wtf
        }
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

    static deleteTicketCategory(name: string) : Promise<Object>{
        let category = new Category;
        category.name = name;
        return axios.delete(url + "/ticketCategory", category);
    }

    static deleteEventCategory(name: string) : Promise<Object>{
        let category = new Category;
        category.name = name;
        return axios.delete(url + "/happeningCategory", category, config());
    }

    static addTicketCategory(name: string) : Promise<void>{
        let category = new Category;
        category.name = name; 
        return axios.post(url + "/ticketcat", category, config()); //Need verifytoken
    }

    static addEventCategory(name: string) : Promise<void>{
        let category = new Category;
        category.name = name;
        return axios.post(url + "/eventcat", category, config()); //Need verifytoken
    }
}