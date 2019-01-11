import axios from 'axios';
axios.interceptors.response.use(response => response.data);
let url = "http://localhost:3000";

class Category {
        name;
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class CategoryService {

    postTicketCategory(category): Promise<Object> {
        console.log(config)
        return axios.post(url + '/ticketcat', category, config);
    }

    getAllTicketCategory(): Promise<Category[]>{
        return axios.get(url + '/ticketcat');
    }

    deleteTicketCategory(ticketCategoryID): Promise<Object> {
        return axios.delete(url + '/ticketcat/' + ticketCategoryID,);
    }

    postEventCategory(category): Promise<Object> {
        console.log(config)
        return axios.post(url + '/eventcat', {category}, config);
    }

    getAllEventCategory(): Promise<Category[]>{
        return axios.get(url + '/eventcat');
    }

    deleteTicketCategory(eventCategoryID): Promise<Object> {
        return axios.delete(url + '/eventcat/' + eventCategoryID,);
    }
}

export let categoryService = new CategoryService;