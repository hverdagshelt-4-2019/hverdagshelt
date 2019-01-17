//@flow 

import axios from 'axios';

export class Category{
    name : string; 
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

export default class CategoryService{
    static getTicketCategories() : Promise<Category[]>{
        console.log("Getting all categories...");
        return axios.get("/ticketcat");
    }

    static getEventCategories() : Promise<Category[]>{
        console.log("Getting all categories...");
        return axios.get("/eventcat");
    }

    static deleteTicketCategory(name: string) : Promise<Object>{
        return axios.delete("/ticketCategory/" + name, config());
    }

    static deleteEventCategory(name: string) : Promise<Object>{
        return axios.delete("/happeningCategory/" + name, config());
    }

    static addTicketCategory(name: string) : Promise<void>{
        let category = new Category;
        category.name = name; 
        return axios.post("/ticketcat", category, config()); //Need verifytoken
    }

    static addEventCategory(name: string) : Promise<void>{
        let category = new Category;
        category.name = name;
        return axios.post("/eventcat", category, config()); //Need verifytoken
    }
}