//@flow 

import axios from 'axios';
let url = 'http://localhost:8080';
axios.interceptors.response.use(response => response.data);

class Category{
    id : number;
    name : string; 
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class CategoryService{
    getTicketCategories() : Promise<Category[]>{
        console.log("Getting all categories...");
        return axios.get(url + "/ticketcat");
    }

    getEventCategories() : Promise<Category[]>{
        console.log("Getting all categories...");
        return axios.get(url + "/eventcat");
    }

    deleteTicketCategory(id) : Promise<void>{
        return axios.delete(url + "/ticketcat/" + id)
    }

    deleteEventCategory(id) : Promise<void>{
        return axios.delete(url + "/eventcat/" + id)
    }

    addTicketCategory(name) : Promise<void>{
        category = new Category;
        category.name = name; 
        return axios.post(url + "/ticketcat", category, config); //Need verifytoken
    }

    addEventCategory(name) : Promise<void>{
        category = new Category;
        category.name = name;
        return axios.post(url + "/eventcat", category, config); //Need verifytoken
    }
}

export let categoryService = new CategoryService();