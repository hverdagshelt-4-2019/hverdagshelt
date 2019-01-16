// @flow
import axios from 'axios';
let url = "http://localhost:3000";

class PublicWorker {
    email;
    commune;
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

export default class PublicWorkerService {
    static createPublicWorker(email: string, commune: string): Promise<Object>{
        let publicWorker = new PublicWorker();
        publicWorker.email = email;
        publicWorker.commune = commune;
        return axios.post(url + '/publicworker', publicWorker, config());
    }
}
