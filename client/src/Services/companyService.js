import axios from 'axios';

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