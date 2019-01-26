import axios from 'axios';

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

class Company {
    id;
    email;
    name;
}

export default class CompanyService {
    static getCompanies(): Promise<Company[]> {
        return axios.get('/companies')
    }

    static addOne(email, name): Promise<Object> {
        let newComp = {email: email, companyName: name};
        return axios.post('/company', newComp, config());
    }
}