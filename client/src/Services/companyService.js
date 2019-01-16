import axios from 'axios';
let url = 'http://localhost:3000';

class Company {
    id;
    email;
    name;
}

export default class CompanyService {
    static getCompanies(): Promise<Company[]> {
        return axios.get(url + '/companies')
    }
}