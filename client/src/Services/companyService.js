import axios from 'axios';

class Company {
    id;
    email;
    name;
}

export default class CompanyService {
    static getCompanies(): Promise<Company[]> {
        return axios.get('/companies')
    }
}