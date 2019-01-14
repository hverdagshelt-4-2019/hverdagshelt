//@flow 

import axios from 'axios';
let url = 'http://localhost:8080';
axios.interceptors.response.use(response => response.data);

class Category{
    id : number;
    name : string; 
}

class CategoryService{
    getTicketCategories() : Promise<Category[]>{
        return axios.get(url + "/eventcat"); 
    }

    getEventCategories() : Promise<Category[]>{
        return axios.get(url + "/ticketcat");
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
        //return axios.post(url + "/ticketcat", category); //Need verifytoken
    }

    addTicketCategory(name) : Promise<void>{
        category = new Category;
        category.name = name; 
        //return axios.post(url + "/eventcat", category); //Need verifytoken
    }
}

export let categoryService = new CategoryService();