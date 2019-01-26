// @flow
import axios from 'axios';

class PublicWorker {
    email;
    username;
    commune_name;
}

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

export default class PublicWorkerService {
    static createPublicWorker(email: string, commune: string): Promise<Object>{
        let publicWorker = new PublicWorker();
        publicWorker.email = email;
        publicWorker.commune = commune;
        return axios.post('/publicworker', publicWorker, config());
    }

    static getPublicworkers(): Promise<PublicWorker[]> {
        return axios.get('/publicworkers', config());
    }
}
